import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { digiflazzStatus } from '@/lib/digiflazz';
import { normalizeDigiflazzStatusResponse } from '@/lib/digiflazz-helpers';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

// Check internal token
function checkInternalToken(request: NextRequest): boolean {
  const token = process.env.INTERNAL_ACTION_TOKEN;
  if (!token) {
    // If env not set, allow (for dev)
    return true;
  }
  const headerToken = request.headers.get('x-internal-token');
  return headerToken === token;
}

// Determine status from Digiflazz response (same logic as topup)
function determineStatus(response: any): 'CREATED' | 'SENT' | 'SUCCESS' | 'FAILED' | 'PENDING' {
  // Priority 1: Check data.status field (most reliable indicator from Digiflazz)
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

  // Fallback: Check data.rc field (if data.status is not present)
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

export async function POST(request: NextRequest) {
  try {
    // Check internal token
    if (!checkInternalToken(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    // Get ref_id from body or query
    const { searchParams } = new URL(request.url);
    let refId = searchParams.get('ref_id');
    
    if (!refId) {
      try {
        const body = await request.json();
        refId = body.ref_id;
      } catch {
        // Body might be empty, continue
      }
    }

    if (!refId || typeof refId !== 'string') {
      return NextResponse.json(
        { error: 'ref_id is required' },
        { status: 400 }
      );
    }

    const force = searchParams.get('force') === 'true';

    // Find transaction
    const tx = await prisma.digiflazzTransaction.findUnique({
      where: { refId },
      include: {
        order: {
          select: {
            id: true,
            fulfilledAt: true,
          },
        },
      },
    });

    if (!tx) {
      return NextResponse.json(
        { error: 'TX_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if already final status (SUCCESS or FAILED)
    if ((tx.status === 'SUCCESS' || tx.status === 'FAILED') && !force) {
      // Normalize cached response too
      const cachedResponse = tx.digiflazzResponse 
        ? normalizeDigiflazzStatusResponse(tx.digiflazzResponse, tx.buyerSkuCode, tx.customerNo)
        : null;
      
      return NextResponse.json(
        {
          cached: true,
          ref_id: refId,
          orderId: tx.orderId,
          status: tx.status,
          data: cachedResponse,
        },
        { status: 200 }
      );
    }

    // Anti-spam: check if updated recently (< 10 seconds)
    if (!force) {
      const now = new Date();
      const updatedAt = tx.updatedAt;
      const diffSeconds = (now.getTime() - updatedAt.getTime()) / 1000;
      
      if (diffSeconds < 10) {
        // Normalize cached response too
        const cachedResponse = tx.digiflazzResponse 
          ? normalizeDigiflazzStatusResponse(tx.digiflazzResponse, tx.buyerSkuCode, tx.customerNo)
          : null;
        
        return NextResponse.json(
          {
            cached: true,
            ref_id: refId,
            orderId: tx.orderId,
            status: tx.status,
            data: cachedResponse,
          },
          { status: 200 }
        );
      }
    }

    // Call Digiflazz status API
    let digiflazzResponse: any;
    try {
      digiflazzResponse = await digiflazzStatus(refId);
    } catch (error) {
      console.error('[digiflazz/refresh] Digiflazz status error', {
        ref_id: refId,
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return NextResponse.json(
        {
          error: 'DIGIFLAZZ_ERROR',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 502 }
      );
    }

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

    // If status became SUCCESS and order exists, update order
    if (newStatus === 'SUCCESS' && tx.orderId && tx.order) {
      const orderUpdateData: any = {};
      
      if (!tx.order.fulfilledAt) {
        orderUpdateData.fulfilledAt = new Date();
      }
      
      // Get current order status to check if we need to update it
      const currentOrder = await prisma.order.findUnique({
        where: { id: tx.orderId },
        select: { status: true },
      });

      if (currentOrder && currentOrder.status !== 'FULFILLED') {
        orderUpdateData.status = 'FULFILLED';
      }

      if (Object.keys(orderUpdateData).length > 0) {
        await prisma.order.update({
          where: { id: tx.orderId },
          data: orderUpdateData,
        });
      }
    }

    // Normalize response for user (fill empty customer_no/buyer_sku_code from tx)
    const normalizedResponse = normalizeDigiflazzStatusResponse(
      digiflazzResponse,
      tx.buyerSkuCode,
      tx.customerNo
    );

    // Log without secrets
    console.log('[digiflazz/refresh] status updated', {
      ref_id: refId,
      order_id: tx.orderId,
      old_status: tx.status,
      new_status: newStatus,
    });

    return NextResponse.json(
      {
        cached: false,
        ref_id: refId,
        orderId: tx.orderId,
        status: newStatus,
        data: normalizedResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[digiflazz/refresh] error', {
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
