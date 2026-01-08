import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const ref_id = req.nextUrl.searchParams.get('ref_id');
  const orderId = req.nextUrl.searchParams.get('orderId');

  if (!ref_id && !orderId) {
    return Response.json({ error: 'ref_id or orderId required' }, { status: 400 });
  }

  let rows: any[] = [];
  let count = 0;
  let searchBy = '';

  if (ref_id) {
    // Find transaction by refId (unique constraint)
    const row = await prisma.digiflazzTransaction.findUnique({
      where: { refId: ref_id },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            productSku: true,
            customerNo: true,
          },
        },
      },
    });

    rows = row ? [row] : [];
    count = rows.length;
    searchBy = 'ref_id';
  } else if (orderId) {
    // Find transactions by orderId (limit 20)
    rows = await prisma.digiflazzTransaction.findMany({
      where: { orderId: orderId },
      include: {
        order: {
          select: {
            id: true,
            status: true,
            productSku: true,
            customerNo: true,
          },
        },
      },
      take: 20,
      orderBy: { createdAt: 'desc' },
    });

    count = rows.length;
    searchBy = 'orderId';
  }

  // Format response without secrets
  const formattedRows = rows.map(row => ({
    refId: row.refId,
    orderId: row.orderId,
    status: row.status,
    buyerSkuCode: row.buyerSkuCode,
    customerNo: row.customerNo,
    amount: row.amount,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    order: row.order,
    // Don't return digiflazzResponse to avoid exposing secrets
  }));

  return Response.json({
    search_by: searchBy,
    ref_id: ref_id || null,
    orderId: orderId || null,
    found: rows.length > 0,
    count,
    rows: formattedRows,
    // For backward compatibility, include first row as 'row'
    row: formattedRows.length > 0 ? formattedRows[0] : null,
  });
}

