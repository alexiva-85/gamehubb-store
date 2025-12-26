import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireTelegramUser } from '@/lib/telegram';

type Params = {
  id: string;
};

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const orderId = Number(id);

  if (!Number.isFinite(orderId) || orderId <= 0) {
    return NextResponse.json({ error: 'Invalid order id' }, { status: 400 });
  }

  let user;
  try {
    user = await requireTelegramUser(req);
  } catch (e) {
    if (e instanceof Response) {
      return e;
    }
    console.error('Telegram initData validation failed', e);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || order.tgUserId !== user.id) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    status: order.status,
    totalAmountKopeks: order.totalAmountKopeks,
    currency: order.currency,
    fulfillmentStatus: order.fulfillmentStatus,
    fulfillmentAttemptCount: order.fulfillmentAttemptCount,
    fulfillmentLastError: order.fulfillmentLastError,
    items: order.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      title: item.product.name,
      qty: item.quantity,
      priceKopeks: item.priceCents,
      imageUrl: item.product.imageUrl,
    })),
  });
}


