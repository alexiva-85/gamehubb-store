import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const updateData: any = {
      status,
    };

    if (adminNote !== undefined) {
      updateData.adminNote = adminNote || null;
    }

    if (txHash !== undefined) {
      updateData.txHash = txHash || null;
    }

    const withdrawalRequest = await prisma.withdrawalRequest.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      id: withdrawalRequest.id,
      status: withdrawalRequest.status,
      adminNote: withdrawalRequest.adminNote,
      txHash: withdrawalRequest.txHash,
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

