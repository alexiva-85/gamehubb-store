import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramInitData, parseTelegramUser } from '@/lib/telegram';
import { sendWithdrawalRequestEmail } from '@/lib/email';
import { formatRubFromKopeks, MIN_WITHDRAW_RUB, MIN_WITHDRAW_KOPEKS, rubToKopeks } from '@/lib/money';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData, amountRub, asset, tonAddress } = body;

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
    const username = telegramUser.username ? `@${telegramUser.username}` : null;

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

    // Validate request data
    if (!amountRub || typeof amountRub !== 'number' || amountRub < MIN_WITHDRAW_RUB) {
      return NextResponse.json(
        { error: `Минимальная сумма вывода: ${MIN_WITHDRAW_RUB}₽` },
        { status: 400 }
      );
    }

    if (!asset || (asset !== 'TON' && asset !== 'USDT_TON')) {
      return NextResponse.json(
        { error: 'Неверный актив. Доступно: TON, USDT_TON' },
        { status: 400 }
      );
    }

    if (!tonAddress || typeof tonAddress !== 'string' || tonAddress.trim() === '') {
      return NextResponse.json(
        { error: 'TON адрес обязателен' },
        { status: 400 }
      );
    }

    // Check for active withdrawal request
    const activeRequest = await prisma.withdrawalRequest.findFirst({
      where: {
        userId: user.id,
        status: {
          in: ['PENDING', 'APPROVED'],
        },
      },
    });

    if (activeRequest) {
      return NextResponse.json(
        { error: 'У вас уже есть активная заявка на вывод' },
        { status: 409 }
      );
    }

    // Get available amount from referral summary
    const now = new Date();
    const allRewards = await prisma.referralEvent.findMany({
      where: { inviterId: user.id },
      select: {
        amount: true,
        status: true,
        lockedUntil: true,
      },
    });

    let availableAmount = 0;
    for (const reward of allRewards) {
      if (reward.status === 'PAID' || reward.status === 'CANCELED') {
        continue;
      }
      if (reward.status === 'LOCKED') {
        if (reward.lockedUntil && reward.lockedUntil > now) {
          continue; // Still locked
        }
        // LOCKED but past lockedUntil -> treat as AVAILABLE
        availableAmount += reward.amount;
      } else if (reward.status === 'AVAILABLE') {
        availableAmount += reward.amount;
      }
    }

    // Convert amountRub to kopecks for comparison
    const amountRubKopecks = rubToKopeks(amountRub);
    if (availableAmount < amountRubKopecks) {
      return NextResponse.json(
        { error: `Недостаточно средств. Доступно: ${formatRubFromKopeks(availableAmount)}` },
        { status: 400 }
      );
    }

    // Create withdrawal request
    // Store amount in kopecks in DB (amountRub field stores kopecks)
    const withdrawalRequest = await prisma.withdrawalRequest.create({
      data: {
        userId: user.id,
        username,
        amountRub: amountRubKopecks, // Store in kopecks
        asset,
        tonAddress: tonAddress.trim(),
        status: 'PENDING',
      },
    });

    // Send email notification
    const adminUrl = process.env.NEXT_PUBLIC_APP_BASE_URL 
      ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/admin/withdrawals`
      : `${request.nextUrl.origin}/admin/withdrawals`;

    await sendWithdrawalRequestEmail(
      username,
      tgId,
      amountRub, // Pass rubles to email (for display)
      asset,
      tonAddress.trim(),
      adminUrl
    );

    return NextResponse.json({
      id: withdrawalRequest.id,
      status: withdrawalRequest.status,
      amountRub: amountRub, // Return rubles for UI
      asset: withdrawalRequest.asset,
      createdAt: withdrawalRequest.createdAt,
    });
  } catch (error) {
    console.error('[withdrawals/request] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

