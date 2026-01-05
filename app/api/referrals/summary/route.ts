import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramInitData, parseTelegramUser } from '@/lib/telegram';
import { isReferralProgramEnabled } from '@/lib/config';

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    // Check feature flag
    if (!isReferralProgramEnabled()) {
      return NextResponse.json({ enabled: false }, { status: 404 });
    }

    // Safely parse body
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    // Extract initData from body
    const initData = typeof body === 'object' && body !== null && 'initData' in body
      ? (body as { initData?: unknown }).initData
      : undefined;

    // If no initData, return 401
    if (!initData || typeof initData !== 'string' || initData.trim() === '') {
      return NextResponse.json(
        { error: 'Telegram initData not found' },
        { status: 401 }
      );
    }

    // All summary calculation in try/catch
    try {
      // Validate initData
      const botToken = process.env.TG_BOT_TOKEN;
      if (!botToken) {
        console.error('TG_BOT_TOKEN is not set');
        return NextResponse.json(
          { error: 'Internal error' },
          { status: 500 }
        );
      }

      const isValid = validateTelegramInitData(initData, botToken);
      if (!isValid) {
        console.error('Invalid Telegram initData');
        return NextResponse.json(
          { error: 'Telegram initData not found' },
          { status: 401 }
        );
      }

      // Parse user from initData
      const telegramUser = parseTelegramUser(initData);
      if (!telegramUser || !telegramUser.id) {
        console.error('Failed to parse Telegram user');
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

      // Count referrals (users who have this user as referredBy)
      const referralsCount = await prisma.user.count({
        where: { referredById: user.id },
      });

      // Get current time for locked/available calculation
      const now = new Date();

      // Calculate reward amounts by status
      const allRewards = await prisma.referralEvent.findMany({
        where: { inviterId: user.id },
        select: {
          amount: true,
          status: true,
          lockedUntil: true,
        },
      });

      let lockedAmount = 0;
      let availableAmount = 0;
      let paidAmount = 0;
      let canceledAmount = 0;

      for (const reward of allRewards) {
        if (reward.status === 'PAID') {
          paidAmount += reward.amount;
        } else if (reward.status === 'CANCELED') {
          canceledAmount += reward.amount;
        } else if (reward.status === 'LOCKED') {
          if (reward.lockedUntil && reward.lockedUntil > now) {
            lockedAmount += reward.amount;
          } else {
            // LOCKED but past lockedUntil -> treat as AVAILABLE
            availableAmount += reward.amount;
          }
        } else if (reward.status === 'AVAILABLE') {
          availableAmount += reward.amount;
        }
      }

      return NextResponse.json({
        referralCode: user.referralCode,
        referralsCount,
        rewards: {
          lockedAmount,
          availableAmount,
          paidAmount,
          canceledAmount,
        },
        note: 'Withdrawal is manual within 24h after request',
      });
    } catch (calcError) {
      // Log error safely (no secrets)
      const err = calcError instanceof Error ? calcError : new Error('Unknown error');
      console.error('[referrals/summary] error', {
        message: err.message,
        name: err.name,
      });

      return NextResponse.json(
        { error: 'Internal error' },
        { status: 500 }
      );
    }
  } catch (error) {
    // Outer catch for request parsing and feature flag
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('[referrals/summary] error', {
      message: err.message,
      name: err.name,
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

