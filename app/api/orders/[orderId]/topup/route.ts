import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { digiflazzTopup } from '@/lib/digiflazz';
import { generateDigiflazzRefId } from '@/lib/digiflazz-ref';

// Use Node.js runtime for undici and Prisma
export const runtime = 'nodejs';

// Check if topup is enabled
function isTopupEnabled(): boolean {
  return process.env.DIGIFLAZZ_TOPUP_ENABLED === 'true';
}

interface DigiflazzTopupResponse {
  data?: {
    status?: string;
    rc?: string | number;
    price?: number;
    amount?: number;
  };
  rc?: string | number;
  price?: number;
  amount?: number;
}

// Determine status from Digiflazz response (same logic as /api/digiflazz/topup)
function determineStatus(response: DigiflazzTopupResponse): 'CREATED' | 'SENT' | 'SUCCESS' | 'FAILED' | 'PENDING' {
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Check feature flag
    if (!isTopupEnabled()) {
      return NextResponse.json(
        { 
          code: 'DIGIFLAZZ_DISABLED'
        },
        { status: 409 }
      );
    }

    // Find order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'ORDER_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Validate required fields for Digiflazz
    if (!order.productSku || !order.customerNo) {
      return NextResponse.json(
        { error: 'MISSING_ORDER_FIELDS' },
        { status: 400 }
      );
    }

    // Generate or get existing ref_id
    let refId = order.digiflazzRefId;
    if (!refId) {
      refId = generateDigiflazzRefId(orderId);
      
      // Save ref_id to order (generate once and save)
      await prisma.order.update({
        where: { id: orderId },
        data: { digiflazzRefId: refId },
      });
    }

    // Check for existing Digiflazz transaction (idempotency)
    const existingTx = await prisma.digiflazzTransaction.findUnique({
      where: { refId },
    });

    if (existingTx) {
      // Return cached response (strict idempotency)
      return NextResponse.json(
        {
          cached: true,
          orderId: order.id,
          ref_id: refId,
          status: existingTx.status,
          data: existingTx.digiflazzResponse ?? null,
        },
        { status: 200 }
      );
    }

    // Call Digiflazz API
    let digiflazzResponse: DigiflazzTopupResponse;
    try {
      const response = await digiflazzTopup({
        refId,
        buyerSkuCode: order.productSku,
        customerNo: order.customerNo,
      });
      digiflazzResponse = response as unknown as DigiflazzTopupResponse;
    } catch (error) {
      // Create failed transaction record
      await prisma.digiflazzTransaction.create({
        data: {
          refId,
          orderId: order.id,
          buyerSkuCode: order.productSku,
          customerNo: order.customerNo,
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

    // Create transaction record
    await prisma.digiflazzTransaction.create({
      data: {
        refId,
        orderId: order.id,
        buyerSkuCode: order.productSku,
        customerNo: order.customerNo,
        status: newStatus,
        digiflazzResponse: digiflazzResponse as Prisma.InputJsonValue,
        amount: digiflazzResponse.price || digiflazzResponse.amount || null,
      },
    });

    // Log without secrets
    console.log('[orders/topup] transaction processed', {
      order_id: orderId,
      ref_id: refId,
      status: newStatus,
    });

    return NextResponse.json(
      {
        cached: false,
        orderId: order.id,
        ref_id: refId,
        status: newStatus,
        data: digiflazzResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[orders/topup] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'DIGIFLAZZ_ERROR',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 502 }
    );
  }
}

