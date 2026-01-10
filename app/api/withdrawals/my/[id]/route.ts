import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramInitData, parseTelegramUser } from '@/lib/telegram';
import { toNumberSafe } from '@/lib/utils';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // Get initData from query or header
    const initData = request.nextUrl.searchParams.get('initData') || 
                     request.headers.get('x-telegram-init-data');

    // Validate initData
    if (!initData || typeof initData !== 'string' || initData.trim() === '') {
      return NextResponse.json(
        { error: 'Telegram initData not found' },
        { status: 401 }
      );
    }

    const botToken = process.env.TG_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json(
        { error: 'Internal error' },
        { status: 500 }
      );
    }

    const isValid = validateTelegramInitData(initData, botToken);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Telegram initData not found' },
        { status: 401 }
      );
    }

    const telegramUser = parseTelegramUser(initData);
    if (!telegramUser || !telegramUser.id) {
      return NextResponse.json(
        { error: 'Telegram initData not found' },
        { status: 401 }
      );
    }

    const tgId = String(telegramUser.id);

    // Get user
    const user = await prisma.user.findUnique({
      where: { tgId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get withdrawal request
    const withdrawalRequest = await prisma.withdrawalRequest.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        username: true,
        amountRub: true,
        asset: true,
        tonAddress: true,
        status: true,
        adminNote: true,
        txHash: true,
        paidAt: true,
        createdAt: true,
        updatedAt: true,
        // Payout snapshot fields
        payoutAsset: true,
        payoutAmount: true,
        payoutBaseRub: true,
        exchangeRate: true,
        rateSource: true,
        rateCapturedAt: true,
        payoutFeeRub: true,
        payoutNotes: true,
        payoutSnapshot: true,
      },
    });

    if (!withdrawalRequest) {
      return NextResponse.json(
        { error: 'Withdrawal request not found' },
        { status: 404 }
      );
    }

    // Check ownership
    if (withdrawalRequest.userId !== user.id) {
      return NextResponse.json(
        { error: 'Withdrawal request not found' },
        { status: 404 }
      );
    }


    return NextResponse.json({
      id: withdrawalRequest.id,
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
    console.error('[withdrawals/my/[id]] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
