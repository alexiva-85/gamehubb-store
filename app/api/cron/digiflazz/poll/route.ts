import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { digiflazzStatus } from '@/lib/digiflazz';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

// Check cron secret
function checkCronSecret(request: Request): boolean {
  // Allow requests from Vercel Cron (by User-Agent)
  const userAgent = request.headers.get('user-agent');
  if (userAgent && userAgent.startsWith('vercel-cron/')) {
    return true;
  }

  const secret = process.env.CRON_SECRET;
  
  // If CRON_SECRET not set, allow (dev mode)
  if (!secret) {
    return true;
  }

  // Check Authorization Bearer token (for Vercel Cron with secret)
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    // Extract token from "Bearer <token>" format
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (match && match[1] === secret) {
      return true;
    }
  }

  // Check x-cron-secret header (for manual testing)
  const headerSecret = request.headers.get('x-cron-secret');
  if (headerSecret === secret) {
    return true;
  }

  return false;
}

// Determine status from Digiflazz response
function determineStatus(response: any): 'CREATED' | 'SENT' | 'SUCCESS' | 'FAILED' | 'PENDING' {
  // Priority 1: Check data.status field
  if (response?.data?.status) {
    const status = String(response.data.status).trim();
    const statusLower = status.toLowerCase();
    
    if (statusLower === 'pending') {
      return 'PENDING';
    }
    if (statusLower === 'sukses' || statusLower === 'success') {
      return 'SUCCESS';
    }
    if (statusLower === 'gagal' || statusLower === 'failed') {
      return 'FAILED';
    }
  }

  // Fallback: Check data.rc field
  if (response?.data?.rc !== undefined) {
    if (response.data.rc === '0' || response.data.rc === 0) {
      return 'SUCCESS';
    }
    return 'FAILED';
  }

  // Fallback: Check top-level rc field
  if (response?.rc !== undefined) {
    if (response.rc === '0' || response.rc === 0) {
      return 'SUCCESS';
    }
    return 'FAILED';
  }

  // Default: FAILED
  return 'FAILED';
}

// Process single transaction
async function processTransaction(tx: any): Promise<{
  success: boolean;
  newStatus: string;
  orderUpdated: boolean;
  error?: { ref_id: string; message: string };
}> {
  try {
    // Call Digiflazz status API
    const digiflazzResponse = await digiflazzStatus(tx.refId);

    // Determine new status
    const newStatus = determineStatus(digiflazzResponse);

    // Update transaction
    // IMPORTANT: Never update buyer_sku_code and customer_no from status response
    // These fields should remain as originally set from topup/order
    const updateData: any = {
      status: newStatus,
      digiflazzResponse, // Save full response as-is
      updatedAt: new Date(),
    };

    // Update amount only if tx.amount is null AND response has price/amount
    if (tx.amount === null) {
      if (digiflazzResponse?.data?.price !== undefined || digiflazzResponse?.price !== undefined) {
        updateData.amount = digiflazzResponse.data?.price || digiflazzResponse.price || null;
      } else if (digiflazzResponse?.data?.amount !== undefined || digiflazzResponse?.amount !== undefined) {
        updateData.amount = digiflazzResponse.data?.amount || digiflazzResponse.amount || null;
      }
    }
    // If tx.amount already exists, don't touch it

    await prisma.digiflazzTransaction.update({
      where: { id: tx.id },
      data: updateData,
    });

    // If status became SUCCESS and order_id is not null, update order
    let orderUpdated = false;
    if (newStatus === 'SUCCESS' && tx.orderId) {
      const order = await prisma.order.findUnique({
        where: { id: tx.orderId },
        select: { fulfilledAt: true },
      });

      if (order && !order.fulfilledAt) {
        await prisma.order.update({
          where: { id: tx.orderId },
          data: { fulfilledAt: new Date() },
        });
        orderUpdated = true;
      }
    }

    return { success: true, newStatus, orderUpdated };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error('[cron/digiflazz/poll] transaction error', {
      ref_id: tx.refId,
      error: errorMessage,
    });

    // Mark as FAILED on error
    await prisma.digiflazzTransaction.update({
      where: { id: tx.id },
      data: {
        status: 'FAILED',
        digiflazzResponse: {
          error: errorMessage,
        },
        updatedAt: new Date(),
      },
    });

    return {
      success: false,
      newStatus: 'FAILED',
      orderUpdated: false,
      error: {
        ref_id: tx.refId,
        message: errorMessage,
      },
    };
  }
}

// Process transactions in batches with max concurrency
async function processBatch(
  transactions: any[],
  maxConcurrency: number = 3
): Promise<{
  processed: number;
  updatedSuccess: number;
  updatedFailed: number;
  stillPending: number;
  errors: Array<{ ref_id: string; message: string }>;
  touched: string[];
}> {
  let updatedSuccess = 0;
  let updatedFailed = 0;
  let stillPending = 0;
  const errors: Array<{ ref_id: string; message: string }> = [];
  const touched: string[] = [];

  // Process in batches
  for (let i = 0; i < transactions.length; i += maxConcurrency) {
    const batch = transactions.slice(i, i + maxConcurrency);
    
    const results = await Promise.all(
      batch.map(tx => processTransaction(tx))
    );

    for (let j = 0; j < results.length; j++) {
      const result = results[j];
      const tx = batch[j];
      
      // Add ref_id to touched list
      if (tx?.refId) {
        touched.push(tx.refId);
      }
      
      if (result.error) {
        errors.push(result.error);
      }

      if (result.success) {
        if (result.newStatus === 'SUCCESS') {
          updatedSuccess++;
        } else if (result.newStatus === 'FAILED') {
          updatedFailed++;
        } else {
          stillPending++;
        }
      } else {
        updatedFailed++;
      }
    }
  }

  return {
    processed: transactions.length,
    updatedSuccess,
    updatedFailed,
    stillPending,
    errors,
    touched: touched.filter(Boolean).slice(0, 20), // Max 20
  };
}

// Common handler for both GET and POST
async function handler(request: Request) {
  try {
    // Check cron secret
    if (!checkCronSecret(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Parse query params
    const { searchParams } = new URL(request.url);
    const includeOrphans = searchParams.get('include_orphans') === 'true';

    // Find pending transactions older than 30 seconds
    const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

    // Build where clause
    const whereClause: any = {
      status: 'PENDING',
      updatedAt: {
        lt: thirtySecondsAgo,
      },
    };

    // By default, only process transactions with order_id (exclude orphans/test transactions)
    if (!includeOrphans) {
      whereClause.orderId = {
        not: null,
      };
    }

    const pendingTransactions = await prisma.digiflazzTransaction.findMany({
      where: whereClause,
      take: 20,
      orderBy: {
        updatedAt: 'asc', // Process oldest first
      },
      include: {
        order: {
          select: {
            id: true,
            fulfilledAt: true,
          },
        },
      },
    });

    // Count skipped recent transactions (for info)
    const skippedRecent = await prisma.digiflazzTransaction.count({
      where: {
        status: 'PENDING',
        updatedAt: {
          gte: thirtySecondsAgo,
        },
        ...(includeOrphans ? {} : { orderId: { not: null } }),
      },
    });

    if (pendingTransactions.length === 0) {
      return NextResponse.json(
        {
          processed: 0,
          updatedSuccess: 0,
          updatedFailed: 0,
          stillPending: 0,
          skippedRecent,
          errors: [],
          touched: [],
        },
        { status: 200 }
      );
    }

    // Process transactions with max concurrency of 3
    const results = await processBatch(pendingTransactions, 3);

    // Log without secrets
    console.log('[cron/digiflazz/poll] batch processed', {
      processed: results.processed,
      success: results.updatedSuccess,
      failed: results.updatedFailed,
      pending: results.stillPending,
      skipped_recent: skippedRecent,
      errors_count: results.errors.length,
    });

    return NextResponse.json(
      {
        processed: results.processed,
        updatedSuccess: results.updatedSuccess,
        updatedFailed: results.updatedFailed,
        stillPending: results.stillPending,
        skippedRecent,
        errors: results.errors,
        touched: results.touched,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[cron/digiflazz/poll] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'INTERNAL_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET handler for Vercel Cron (Vercel Cron uses GET requests)
export async function GET(req: Request) {
  return handler(req);
}

// POST handler for manual testing
export async function POST(req: Request) {
  return handler(req);
}
