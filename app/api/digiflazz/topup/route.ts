import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { digiflazzTopup } from '@/lib/digiflazz';

// Use Node.js runtime for undici and Prisma
export const runtime = 'nodejs';

// Check if topup is enabled
function isTopupEnabled(): boolean {
  return process.env.DIGIFLAZZ_TOPUP_ENABLED === 'true';
}

// Determine status from Digiflazz response
function determineStatus(response: any): 'CREATED' | 'SENT' | 'SUCCESS' | 'FAILED' | 'PENDING' {
  // Priority 1: Check data.status field (if data is an object)
  if (response.data && typeof response.data === 'object' && response.data.status) {
    const status = String(response.data.status).trim();
    if (status.toLowerCase() === 'pending') {
      return 'PENDING';
    }
    if (status.toLowerCase() === 'sukses' || status.toLowerCase() === 'success') {
      return 'SUCCESS';
    }
    if (status.toLowerCase() === 'gagal' || status.toLowerCase() === 'failed') {
      return 'FAILED';
    }
  }

  // Priority 2: Check data as string
  if (response.data && typeof response.data === 'string') {
    const dataStr = response.data.toLowerCase();
    if (dataStr.includes('sukses') || dataStr.includes('success')) {
      return 'SUCCESS';
    }
    if (dataStr.includes('pending') || dataStr.includes('proses')) {
      return 'PENDING';
    }
    if (dataStr.includes('gagal') || dataStr.includes('failed')) {
      return 'FAILED';
    }
  }

  // Priority 3: Fallback to rc field
  // Don't treat rc=="" as error if data.status is present
  if (response.rc === '0' || response.rc === 0) {
    return 'SUCCESS';
  }

  // Default: FAILED
  return 'FAILED';
}

export async function POST(request: NextRequest) {
  try {
    // Check feature flag
    if (!isTopupEnabled()) {
      return NextResponse.json(
        { error: 'Topup disabled' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { ref_id, buyer_sku_code, customer_no } = body;

    // Validate required fields
    if (!ref_id || typeof ref_id !== 'string' || ref_id.trim().length < 6) {
      return NextResponse.json(
        { error: 'ref_id is required and must be at least 6 characters' },
        { status: 400 }
      );
    }

    if (!buyer_sku_code || typeof buyer_sku_code !== 'string' || buyer_sku_code.trim() === '') {
      return NextResponse.json(
        { error: 'buyer_sku_code is required' },
        { status: 400 }
      );
    }

    if (!customer_no || typeof customer_no !== 'string' || customer_no.trim() === '') {
      return NextResponse.json(
        { error: 'customer_no is required' },
        { status: 400 }
      );
    }

    const refId = ref_id.trim();
    const buyerSkuCode = buyer_sku_code.trim();
    const customerNo = customer_no.trim();

    // Strict idempotency: check for existing transaction by ref_id
    const existing = await prisma.digiflazzTransaction.findUnique({
      where: { refId },
    });

    if (existing) {
      // If ref_id already exists, return cached response (strict idempotency)
      // Never call Digiflazz again for the same ref_id
      const cachedResponse = existing.digiflazzResponse || { message: 'Transaction already processed' };
      return NextResponse.json(
        {
          cached: true,
          data: cachedResponse,
        },
        { status: 200 }
      );
    }

    // Create new transaction record
    const transaction = await prisma.digiflazzTransaction.create({
      data: {
        refId,
        buyerSkuCode,
        customerNo,
        status: 'CREATED',
      },
    });

    // Call Digiflazz API
    let digiflazzResponse: any;
    try {
      digiflazzResponse = await digiflazzTopup({
        refId,
        buyerSkuCode,
        customerNo,
      });
    } catch (error) {
      // Update status to FAILED on error
      await prisma.digiflazzTransaction.update({
        where: { id: transaction.id },
        data: {
          status: 'FAILED',
          digiflazzResponse: {
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        },
      });

      throw error;
    }

    // Determine status from response
    const newStatus = determineStatus(digiflazzResponse);

    // Update transaction with response
    await prisma.digiflazzTransaction.update({
      where: { id: transaction.id },
      data: {
        status: newStatus,
        digiflazzResponse,
        amount: digiflazzResponse.price || digiflazzResponse.amount || null,
      },
    });

    // Log without secrets
    if (newStatus === 'FAILED') {
      console.error('[digiflazz/topup] transaction failed', {
        ref_id: refId,
        rc: digiflazzResponse.rc,
        message: digiflazzResponse.data || digiflazzResponse.message || 'Unknown error',
      });
    } else {
      console.log('[digiflazz/topup] transaction processed', {
        ref_id: refId,
        status: newStatus,
      });
    }

    return NextResponse.json(
      {
        cached: false,
        data: digiflazzResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[digiflazz/topup] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to process Digiflazz topup',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}

