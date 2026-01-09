import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatRubFromKopeks } from '@/lib/money';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

function checkAdminKey(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_KEY;
  if (!adminKey) {
    // If ADMIN_KEY not set, allow (dev mode)
    return true;
  }

  // Check query parameter
  const keyFromQuery = request.nextUrl.searchParams.get('key');
  if (keyFromQuery === adminKey) {
    return true;
  }

  // Check header
  const keyFromHeader = request.headers.get('x-admin-key');
  if (keyFromHeader === adminKey) {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  try {
    if (!checkAdminKey(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const requests = await prisma.withdrawalRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            tgId: true,
          },
        },
      },
    });

    const formattedRequests = requests.map((req) => ({
      id: req.id,
      tgUserId: req.user.tgId,
      username: req.username,
      amountRub: Math.floor(req.amountRub / 100), // Convert kopecks to rubles for UI
      asset: req.asset,
      tonAddress: req.tonAddress,
      status: req.status,
      adminNote: req.adminNote,
      txHash: req.txHash,
      createdAt: req.createdAt.toISOString(),
      updatedAt: req.updatedAt.toISOString(),
    }));

    return NextResponse.json({ requests: formattedRequests });
  } catch (error) {
    console.error('[admin/withdrawals] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

