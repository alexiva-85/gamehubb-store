import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { validateTelegramInitData, parseTelegramUser, getStartParamFromInitData } from '@/lib/telegram';
import { generateReferralCode, parseReferralFromStartParam } from '@/lib/referral';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData, startParam: startParamFromBody } = body;

    // If no initData, return null user (web outside Telegram)
    if (!initData) {
      return NextResponse.json({ user: null });
    }

    // Validate initData
    const botToken = process.env.TG_BOT_TOKEN;
    if (!botToken) {
      console.error('TG_BOT_TOKEN is not set');
      return NextResponse.json({ user: null });
    }

    const isValid = validateTelegramInitData(initData, botToken);
    if (!isValid) {
      console.error('Invalid Telegram initData');
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // Parse user from initData
    const telegramUser = parseTelegramUser(initData);
    if (!telegramUser || !telegramUser.id) {
      console.error('Failed to parse Telegram user');
      return NextResponse.json({ user: null });
    }

    const tgId = String(telegramUser.id); // Ensure string type

    // Get startParam from initData or body
    const startParamFromInitData = getStartParamFromInitData(initData);
    const startParam = startParamFromInitData || startParamFromBody || null;

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { tgId },
    });

    if (!user) {
      // Create new user with referral code
      const referralCode = await generateReferralCode();
      user = await prisma.user.create({
        data: {
          tgId,
          referralCode,
        },
      });
    }

    // Process referral attribution if startParam contains referral code
    if (startParam && user && !user.referredById) {
      const referralCode = parseReferralFromStartParam(startParam);

      if (referralCode) {
        // Find inviter by referral code
        const inviter = await prisma.user.findUnique({
          where: { referralCode },
        });

        // Check: inviter exists, not self-referral, user not already referred
        if (inviter && inviter.id !== user.id) {
          const userId = user.id; // Save user.id before transaction
          const inviterId = inviter.id;

          // Atomic update with transaction
          await prisma.$transaction(async (tx) => {
            // Re-check referredById in transaction to prevent race conditions
            const currentUser = await tx.user.findUnique({
              where: { id: userId },
            });

            if (currentUser && !currentUser.referredById) {
              await tx.user.update({
                where: { id: userId },
                data: {
                  referredById: inviterId,
                  referredAt: new Date(),
                },
              });
            }
          });

          // Refresh user data
          user = await prisma.user.findUnique({
            where: { id: userId },
          });
        }
      }
    }

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        tgId: user.tgId,
        referralCode: user.referralCode,
        referredById: user.referredById || null,
      },
    });
  } catch (error) {
    console.error('Error in /api/me:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

