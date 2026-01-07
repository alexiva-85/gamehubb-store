import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refId = searchParams.get('ref_id');

    // Validate ref_id
    if (!refId || refId.trim().length === 0) {
      return NextResponse.json(
        { error: 'ref_id query parameter is required' },
        { status: 400 }
      );
    }

    const trimmedRefId = refId.trim();

    // Find transaction by refId (unique constraint)
    const row = await prisma.digiflazzTransaction.findUnique({
      where: { refId: trimmedRefId },
      select: {
        refId: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        buyerSkuCode: true,
        customerNo: true,
        amount: true,
      },
    });

    // Count transactions with this refId (should be 0 or 1 due to unique constraint)
    const count = await prisma.digiflazzTransaction.count({
      where: { refId: trimmedRefId },
    });

    return NextResponse.json(
      {
        ref_id: trimmedRefId,
        found: row !== null,
        count,
        row: row
          ? {
              refId: row.refId,
              status: row.status,
              buyerSkuCode: row.buyerSkuCode,
              customerNo: row.customerNo,
              amount: row.amount,
              createdAt: row.createdAt.toISOString(),
              updatedAt: row.updatedAt.toISOString(),
            }
          : null,
        db_hint: {
          node_env: process.env.NODE_ENV ?? null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[debug/digiflazz-tx] error', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
    });

    return NextResponse.json(
      {
        error: 'Failed to query Digiflazz transaction',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

