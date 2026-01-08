import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Use Node.js runtime for Prisma
export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const ref_id = req.nextUrl.searchParams.get('ref_id');
  const order_id = req.nextUrl.searchParams.get('order_id');

  if (!ref_id && !order_id) {
    return Response.json({ error: 'ref_id or order_id required' }, { status: 400 });
  }

  let row = null;
  let count = 0;
  let searchBy = '';

  if (ref_id) {
    // Find transaction by refId (unique constraint)
    row = await prisma.digiflazzTransaction.findUnique({
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

    count = await prisma.digiflazzTransaction.count({
      where: { refId: ref_id },
    });

    searchBy = 'ref_id';
  } else if (order_id) {
    // Find transactions by orderId
    const rows = await prisma.digiflazzTransaction.findMany({
      where: { orderId: order_id },
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

    count = rows.length;
    row = rows.length > 0 ? rows[0] : null; // Return first match for compatibility
    searchBy = 'order_id';
  }

  return Response.json({
    search_by: searchBy,
    ref_id: ref_id || row?.refId || null,
    order_id: order_id || row?.orderId || null,
    found: !!row,
    count,
    row: row
      ? {
          refId: row.refId,
          orderId: row.orderId,
          status: row.status,
          buyerSkuCode: row.buyerSkuCode,
          customerNo: row.customerNo,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
          order: row.order,
        }
      : null,
  });
}

