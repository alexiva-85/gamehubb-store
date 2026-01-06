import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatRubFromKopeks } from '@/lib/money';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

function checkAdminKey(key: string | null): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    return false;
  }
  return key === adminKey;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { key, status, adminNote, txHash } = body;

    // Check admin key from body or header
    const keyFromHeader = request.headers.get('x-admin-key');
    if (!checkAdminKey(key) && !checkAdminKey(keyFromHeader)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!status || !['APPROVED', 'PAID', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Require adminNote for REJECTED status
    if (status === 'REJECTED' && (!adminNote || adminNote.trim() === '')) {
      return NextResponse.json(
        { error: 'Причина отказа обязательна при отклонении заявки' },
        { status: 400 }
      );
    }

    // Get current withdrawal request to check status
    const currentRequest = await prisma.withdrawalRequest.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!currentRequest) {
      return NextResponse.json(
        { error: 'Withdrawal request not found' },
        { status: 404 }
      );
    }

    // Idempotency guard: cannot mark as PAID if already PAID
    if (status === 'PAID' && currentRequest.status === 'PAID') {
      return NextResponse.json(
        { error: 'Request is already marked as PAID' },
        { status: 400 }
      );
    }

    // Update in transaction
    const withdrawalRequest = await prisma.$transaction(async (tx) => {
      const updateData: any = {
        status,
      };

      if (adminNote !== undefined) {
        updateData.adminNote = adminNote || null;
      }

      if (txHash !== undefined) {
        updateData.txHash = txHash || null;
      }

      if (status === 'PAID') {
        updateData.paidAt = new Date();
      }

      const updated = await tx.withdrawalRequest.update({
        where: { id },
        data: updateData,
      });

      // If marking as PAID, update referral events
      if (status === 'PAID') {
        await tx.referralEvent.updateMany({
          where: {
            withdrawalRequestId: id,
          },
          data: {
            status: 'PAID',
            paidOutAt: new Date(),
          },
        });
      }

      // If REJECTED or CANCELED, release reservation
      if (status === 'REJECTED') {
        // Get events that were AVAILABLE before reservation
        const eventsToRelease = await tx.referralEvent.findMany({
          where: {
            withdrawalRequestId: id,
            status: {
              in: ['AVAILABLE', 'LOCKED'],
            },
          },
        });

        // Release reservation and restore status if needed
        await tx.referralEvent.updateMany({
          where: {
            withdrawalRequestId: id,
          },
          data: {
            withdrawalRequestId: null,
            // Note: status remains as is (AVAILABLE or LOCKED)
            // We don't change status back because events might have been LOCKED before
          },
        });
      }

      return updated;
    });

    return NextResponse.json({
      id: withdrawalRequest.id,
      status: withdrawalRequest.status,
      adminNote: withdrawalRequest.adminNote,
      txHash: withdrawalRequest.txHash,
      paidAt: withdrawalRequest.paidAt,
    });
  } catch (error) {
    console.error('[admin/withdrawals/[id]] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

