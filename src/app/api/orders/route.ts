import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireTelegramUser } from '@/lib/telegram';
import { initPayment } from '@/lib/robokassa';

type OrderItemInput = {
  productId: number;
  qty: number;
};

type CreateOrderBody = {
  items?: OrderItemInput[];
};

export async function POST(req: NextRequest) {
  let body: CreateOrderBody;

  try {
    body = (await req.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ error: 'Items are required' }, { status: 400 });
  }

  const normalizedItems = body.items.map((item) => ({
    productId: Number(item.productId),
    qty: Number(item.qty),
  }));

  if (normalizedItems.some((i) => !Number.isFinite(i.productId) || i.productId <= 0 || i.qty <= 0)) {
    return NextResponse.json({ error: 'Invalid items' }, { status: 400 });
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

  const productIds = [...new Set(normalizedItems.map((i) => i.productId))];

  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  if (products.length !== productIds.length) {
    return NextResponse.json({ error: 'Some products are not available' }, { status: 400 });
  }

  const productsById = new Map(products.map((p) => [p.id, p]));

  const totalKopeks = normalizedItems.reduce((sum, item) => {
    const product = productsById.get(item.productId);
    if (!product) return sum;
    return sum + product.priceCents * item.qty;
  }, 0);

  if (totalKopeks <= 0) {
    return NextResponse.json({ error: 'Total amount must be greater than zero' }, { status: 400 });
  }

  const appBaseUrl = process.env.APP_BASE_URL;

  if (!appBaseUrl) {
    console.error('APP_BASE_URL is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const currency = products[0]?.currency ?? 'RUB';

  // 1. Create order and order items.
  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        tgUserId: user.id,
        status: 'NEW',
        totalCents: totalKopeks,
        totalAmountKopeks: totalKopeks,
        currency,
        provider: 'ROBOKASSA',
        items: {
          create: normalizedItems.map((item) => {
            const product = productsById.get(item.productId)!;
            return {
              productId: product.id,
              quantity: item.qty,
              priceCents: product.priceCents,
            };
          }),
        },
      },
    });

    return createdOrder;
  });

  // 2. Init payment with Robokassa.
  try {
    const payment = initPayment({
      orderId: order.id,
      amountKopeks: totalKopeks,
      description: `Game top-up order ${order.id}`,
      notificationUrl: `${appBaseUrl}/api/payments/robokassa/notification`,
      successUrl: `${appBaseUrl}/pay/success?orderId=${order.id}`,
      failUrl: `${appBaseUrl}/pay/fail?orderId=${order.id}`,
    });

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAYMENT_CREATED',
        providerPaymentId: payment.paymentId,
        providerPaymentUrl: payment.paymentUrl,
      },
    });

    return NextResponse.json({
      orderId: updatedOrder.id,
      paymentUrl: updatedOrder.providerPaymentUrl,
      amountKopeks: totalKopeks,
      currency: updatedOrder.currency,
    });
  } catch (error) {
    console.error('Robokassa init payment failed', error);

    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELED' },
    });

    return NextResponse.json({ error: 'Failed to init payment' }, { status: 502 });
  }
}



