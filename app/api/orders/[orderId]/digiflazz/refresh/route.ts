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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    // Check internal token
    if (!checkInternalToken(request)) {
      return NextResponse.json(
        { error: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    const { orderId } = await params;
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';

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

    // Check for digiflazz_ref_id
    if (!order.digiflazzRefId) {
      return NextResponse.json(
        { error: 'NO_DIGIFLAZZ_REF_ID' },
        { status: 400 }
      );
    }

    const refId = order.digiflazzRefId;

    // Find transaction
    const tx = await prisma.digiflazzTransaction.findFirst({
      where: {
        refId,
        orderId: order.id,
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
          orderId: order.id,
          ref_id: refId,
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
            orderId: order.id,
            ref_id: refId,
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
      console.error('[orders/digiflazz/refresh] Digiflazz status error', {
        order_id: orderId,
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

    // If status became SUCCESS, update order
    if (newStatus === 'SUCCESS') {
      const orderUpdateData: any = {};
      
      if (!order.fulfilledAt) {
        orderUpdateData.fulfilledAt = new Date();
      }
      
      // Update status to FULFILLED if it's not already
      if (order.status !== 'FULFILLED') {
        orderUpdateData.status = 'FULFILLED';
      }

      if (Object.keys(orderUpdateData).length > 0) {
        await prisma.order.update({
          where: { id: order.id },
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
    console.log('[orders/digiflazz/refresh] status updated', {
      order_id: orderId,
      ref_id: refId,
      old_status: tx.status,
      new_status: newStatus,
    });

    return NextResponse.json(
      {
        cached: false,
        orderId: order.id,
        ref_id: refId,
        status: newStatus,
        data: normalizedResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[orders/digiflazz/refresh] error', {
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
