import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatRubFromKopeks } from '@/lib/money';
import { requireAdmin } from '@/lib/adminAuth';

// Use Node.js runtime to avoid edge runtime issues with Prisma
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const authError = requireAdmin(request);
    if (authError) {
      return authError;
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

    // Helper to safely convert Decimal to number
    const toNumberSafe = (v: any): number | null => {
      if (v === null || v === undefined) return null;
      if (typeof v === 'number') return v;
      if (typeof v === 'bigint') return Number(v);
      if (typeof v === 'object' && typeof (v as any).toNumber === 'function') {
        return (v as any).toNumber();
      }
      return Number(v);
    };

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
      paidAt: req.paidAt?.toISOString() || null,
      createdAt: req.createdAt.toISOString(),
      updatedAt: req.updatedAt.toISOString(),
      // Payout snapshot fields
      payoutAsset: req.payoutAsset,
      payoutAmount: toNumberSafe(req.payoutAmount),
      payoutBaseRub: toNumberSafe(req.payoutBaseRub),
      exchangeRate: toNumberSafe(req.exchangeRate),
      rateSource: req.rateSource,
      rateCapturedAt: req.rateCapturedAt?.toISOString() || null,
      payoutFeeRub: toNumberSafe(req.payoutFeeRub),
      payoutNotes: req.payoutNotes,
      payoutSnapshot: req.payoutSnapshot,
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

