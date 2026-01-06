import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramInitData, parseTelegramUser } from '@/lib/telegram';
import { formatRubFromKopeks } from '@/lib/money';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = body;

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
      return NextResponse.json({ request: null });
    }

    // Get active withdrawal request (PENDING or APPROVED)
    const activeRequest = await prisma.withdrawalRequest.findFirst({
      where: {
        userId: user.id,
        status: {
          in: ['PENDING', 'APPROVED'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get withdrawal history (last 10 requests)
    const withdrawalHistory = await prisma.withdrawalRequest.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        amountRub: true,
        asset: true,
        status: true,
        adminNote: true,
        txHash: true,
        paidAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      request: activeRequest ? {
        id: activeRequest.id,
        amountRub: Math.floor(activeRequest.amountRub / 100), // Convert kopecks to rubles for UI
        asset: activeRequest.asset,
        tonAddress: activeRequest.tonAddress,
        status: activeRequest.status,
        adminNote: activeRequest.adminNote,
        txHash: activeRequest.txHash,
        createdAt: activeRequest.createdAt,
        updatedAt: activeRequest.updatedAt,
      } : null,
      history: withdrawalHistory.map(req => ({
        id: req.id,
        amountRub: Math.floor(req.amountRub / 100), // Convert kopecks to rubles for UI
        asset: req.asset,
        status: req.status,
        adminNote: req.adminNote, // User can see their own admin notes
        txHash: req.txHash,
        paidAt: req.paidAt,
        createdAt: req.createdAt,
        updatedAt: req.updatedAt,
      })),
    });
  } catch (error) {
    console.error('[withdrawals/my] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

