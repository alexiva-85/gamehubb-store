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
  if (response.rc === '0' || response.rc === 0) {
    const dataStr = typeof response.data === 'string' ? response.data.toLowerCase() : '';
    if (dataStr.includes('sukses') || dataStr.includes('success')) {
      return 'SUCCESS';
    }
    if (dataStr.includes('pending') || dataStr.includes('proses')) {
      return 'PENDING';
    }
    return 'SENT';
  }
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

    // Check for existing transaction (idempotency)
    const existing = await prisma.digiflazzTransaction.findUnique({
      where: { refId },
    });

    if (existing) {
      // If status is SUCCESS, PENDING, or SENT, return cached response
      if (existing.status === 'SUCCESS' || existing.status === 'PENDING' || existing.status === 'SENT') {
        const cachedResponse = existing.digiflazzResponse || { message: 'Transaction already processed' };
        return NextResponse.json(
          {
            cached: true,
            data: cachedResponse,
          },
          { status: 200 }
        );
      }
      // If FAILED or CREATED, allow retry (will update existing record)
    }

    // Create or update transaction record
    const transaction = await prisma.digiflazzTransaction.upsert({
      where: { refId },
      create: {
        refId,
        buyerSkuCode,
        customerNo,
        status: 'CREATED',
      },
      update: {
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

