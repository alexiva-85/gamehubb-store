import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const ref_id = req.nextUrl.searchParams.get('ref_id');

  if (!ref_id) {
    return Response.json({ error: 'ref_id required' }, { status: 400 });
  }

  // Find transaction by refId (unique constraint)
  const row = await prisma.digiflazzTransaction.findUnique({
    where: { refId: ref_id },
  });

  // Count transactions with this refId
  const count = await prisma.digiflazzTransaction.count({
    where: { refId: ref_id },
  });

  return Response.json({
    ref_id,
    found: !!row,
    count,
    row: row
      ? {
          refId: row.refId,
          status: row.status,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        }
      : null,
  });
}

