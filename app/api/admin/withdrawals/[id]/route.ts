import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma, WithdrawalStatus, PayoutAsset } from '@prisma/client';
import { requireAdmin } from '@/lib/adminAuth';
import { toNumberSafe } from '@/lib/utils';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const { id } = await params;

    const withdrawalRequest = await prisma.withdrawalRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            tgId: true,
          },
        },
      },
    });

    if (!withdrawalRequest) {
      return NextResponse.json(
        { error: 'Withdrawal request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: withdrawalRequest.id,
      tgUserId: withdrawalRequest.user.tgId,
      username: withdrawalRequest.username,
      amountRub: Math.floor(withdrawalRequest.amountRub / 100), // Convert kopecks to rubles for UI
      asset: withdrawalRequest.asset,
      tonAddress: withdrawalRequest.tonAddress,
      status: withdrawalRequest.status,
      adminNote: withdrawalRequest.adminNote,
      txHash: withdrawalRequest.txHash,
      paidAt: withdrawalRequest.paidAt?.toISOString() || null,
      createdAt: withdrawalRequest.createdAt.toISOString(),
      updatedAt: withdrawalRequest.updatedAt.toISOString(),
      // Payout snapshot fields
      payoutAsset: withdrawalRequest.payoutAsset,
      payoutAmount: toNumberSafe(withdrawalRequest.payoutAmount),
      payoutBaseRub: toNumberSafe(withdrawalRequest.payoutBaseRub),
      exchangeRate: toNumberSafe(withdrawalRequest.exchangeRate),
      rateSource: withdrawalRequest.rateSource,
      rateCapturedAt: withdrawalRequest.rateCapturedAt?.toISOString() || null,
      payoutFeeRub: toNumberSafe(withdrawalRequest.payoutFeeRub),
      payoutNotes: withdrawalRequest.payoutNotes,
      payoutSnapshot: withdrawalRequest.payoutSnapshot,
    });
  } catch (error) {
    console.error('[admin/withdrawals/[id]] GET error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
    }

    const { id } = await params;
    const body = await request.json();
    const { status, adminNote, txHash, payout, action, rateRubPerUsdt } = body;

    // Handle "fixRate" action (fix exchange rate before payment)
    if (action === 'fixRate') {
      // Validate rate
      if (!rateRubPerUsdt || isNaN(Number(rateRubPerUsdt)) || Number(rateRubPerUsdt) <= 0) {
        return NextResponse.json(
          { 
            code: 'INVALID_RATE',
            error: 'rateRubPerUsdt is required and must be a positive number' 
          },
          { status: 400 }
        );
      }

      // Get current withdrawal request
      const currentRequest = await prisma.withdrawalRequest.findUnique({
        where: { id },
        select: { 
          amountRub: true,
          status: true,
        },
      });

      if (!currentRequest) {
        return NextResponse.json(
          { error: 'Withdrawal request not found' },
          { status: 404 }
        );
      }

      // Don't allow fixing rate for PAID requests
      if (currentRequest.status === 'PAID') {
        return NextResponse.json(
          { 
            code: 'IMMUTABLE_PAYOUT',
            error: 'Cannot modify payout snapshot after request is marked as PAID' 
          },
          { status: 400 }
        );
      }

      // Calculate payout amount (amountRub is in kopecks, convert to rubles)
      const amountRub = currentRequest.amountRub / 100;
      const rate = Number(rateRubPerUsdt);
      const payoutAmount = Math.round((amountRub / rate) * 100) / 100; // Round to 2 decimal places

      // Update withdrawal request with rate and calculated payout
      const updated = await prisma.withdrawalRequest.update({
        where: { id },
        data: {
          exchangeRate: new Prisma.Decimal(rate),
          payoutAmount: new Prisma.Decimal(payoutAmount),
          payoutBaseRub: new Prisma.Decimal(amountRub),
          payoutAsset: 'USDT', // Default to USDT for now
          rateSource: 'MANUAL',
          rateCapturedAt: new Date(),
          // Update adminNote if provided
          ...(adminNote !== undefined ? { adminNote: adminNote || null } : {}),
        },
      });

      return NextResponse.json({
        id: updated.id,
        exchangeRate: toNumberSafe(updated.exchangeRate),
        payoutAmount: toNumberSafe(updated.payoutAmount),
        payoutBaseRub: toNumberSafe(updated.payoutBaseRub),
        rateSource: updated.rateSource,
        rateCapturedAt: updated.rateCapturedAt?.toISOString() || null,
        adminNote: updated.adminNote,
      });
    }

    // Original logic for status updates
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

    // Get current withdrawal request to check status and payout fields
    const currentRequest = await prisma.withdrawalRequest.findUnique({
      where: { id },
      select: { 
        status: true,
        payoutAsset: true,
        payoutAmount: true,
        payoutBaseRub: true,
      },
    });

    if (!currentRequest) {
      return NextResponse.json(
        { error: 'Withdrawal request not found' },
        { status: 404 }
      );
    }

    // Immutability guard: if already PAID, prevent changes to payout fields
    if (currentRequest.status === 'PAID') {
      // Check if trying to change payout fields
      if (payout !== undefined) {
        return NextResponse.json(
          { 
            code: 'IMMUTABLE_PAYOUT',
            error: 'Cannot modify payout snapshot after request is marked as PAID' 
          },
          { status: 400 }
        );
      }
      // Allow other updates (adminNote, txHash) but not status change
      if (status !== 'PAID') {
        return NextResponse.json(
          { 
            code: 'IMMUTABLE_STATUS',
            error: 'Cannot change status of a PAID request' 
          },
          { status: 400 }
        );
      }
    }

    // Validation for PAID status: require payout snapshot
    if (status === 'PAID') {
      if (!payout || typeof payout !== 'object') {
        return NextResponse.json(
          { 
            code: 'MISSING_PAYOUT',
            error: 'Payout snapshot is required when marking request as PAID' 
          },
          { status: 400 }
        );
      }

      // Required fields
      if (!payout.asset || !['RUB', 'USDT', 'TON'].includes(payout.asset)) {
        return NextResponse.json(
          { 
            code: 'INVALID_PAYOUT_ASSET',
            error: 'payout.asset is required and must be RUB, USDT, or TON' 
          },
          { status: 400 }
        );
      }

      if (!payout.amount || isNaN(Number(payout.amount))) {
        return NextResponse.json(
          { 
            code: 'INVALID_PAYOUT_AMOUNT',
            error: 'payout.amount is required and must be a valid number' 
          },
          { status: 400 }
        );
      }

      if (!payout.baseRub || isNaN(Number(payout.baseRub))) {
        return NextResponse.json(
          { 
            code: 'INVALID_PAYOUT_BASE_RUB',
            error: 'payout.baseRub is required and must be a valid number' 
          },
          { status: 400 }
        );
      }

      // If asset is not RUB, require exchange rate
      if (payout.asset !== 'RUB') {
        if (!payout.rate || isNaN(Number(payout.rate))) {
          return NextResponse.json(
            { 
              code: 'MISSING_EXCHANGE_RATE',
              error: 'payout.rate is required when payout.asset is not RUB' 
            },
            { status: 400 }
          );
        }

        if (!payout.rateSource || typeof payout.rateSource !== 'string') {
          return NextResponse.json(
            { 
              code: 'MISSING_RATE_SOURCE',
              error: 'payout.rateSource is required when payout.asset is not RUB' 
            },
            { status: 400 }
          );
        }
      }
    }

    // Update in transaction
    const withdrawalRequest = await prisma.$transaction(async (tx) => {
      const updateData: {
        status: WithdrawalStatus;
        adminNote?: string | null;
        txHash?: string | null;
        paidAt?: Date;
        payoutAsset?: PayoutAsset;
        payoutAmount?: Prisma.Decimal;
        payoutBaseRub?: Prisma.Decimal;
        exchangeRate?: Prisma.Decimal | null;
        rateSource?: string | null;
        rateCapturedAt?: Date | null;
        payoutFeeRub?: Prisma.Decimal | null;
        payoutNotes?: string | null;
        payoutSnapshot?: Prisma.InputJsonValue;
      } = {
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

        // Compute payout fields with synchronization
        const asset = payout.asset;
        const capturedAt = payout.rateCapturedAt ? new Date(payout.rateCapturedAt) : new Date();
        const rateSource = payout.rateSource || 'MANUAL';
        const exchangeRate = asset === 'RUB' ? null : new Prisma.Decimal(payout.rate);

        // Set payout snapshot fields (top-level)
        updateData.payoutAsset = asset;
        updateData.payoutAmount = new Prisma.Decimal(payout.amount);
        updateData.payoutBaseRub = new Prisma.Decimal(payout.baseRub);
        updateData.exchangeRate = exchangeRate;
        updateData.rateSource = rateSource; // Always set, even for RUB (at least "MANUAL")
        updateData.rateCapturedAt = capturedAt; // Always set, even for RUB

        if (payout.feeRub !== undefined) {
          updateData.payoutFeeRub = payout.feeRub 
            ? new Prisma.Decimal(payout.feeRub) 
            : null;
        }

        if (payout.notes !== undefined) {
          updateData.payoutNotes = payout.notes || null;
        }

        // Create payout snapshot JSON (synchronized with top-level fields)
        updateData.payoutSnapshot = {
          baseCurrency: 'RUB',
          asset: asset,
          amount: String(payout.amount),
          baseRub: String(payout.baseRub),
          exchangeRate: exchangeRate ? String(exchangeRate) : null,
          rateSource: rateSource, // Same as top-level rateSource
          rateCapturedAt: capturedAt.toISOString(), // Same as top-level rateCapturedAt
          feeRub: payout.feeRub ? String(payout.feeRub) : null,
          notes: payout.notes || null,
          capturedAt: new Date().toISOString(),
        };
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
      payoutAsset: withdrawalRequest.payoutAsset,
      payoutAmount: toNumberSafe(withdrawalRequest.payoutAmount),
      payoutBaseRub: toNumberSafe(withdrawalRequest.payoutBaseRub),
      exchangeRate: toNumberSafe(withdrawalRequest.exchangeRate),
      rateSource: withdrawalRequest.rateSource,
      rateCapturedAt: withdrawalRequest.rateCapturedAt?.toISOString() || null,
      payoutFeeRub: toNumberSafe(withdrawalRequest.payoutFeeRub),
      payoutNotes: withdrawalRequest.payoutNotes,
      payoutSnapshot: withdrawalRequest.payoutSnapshot,
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

