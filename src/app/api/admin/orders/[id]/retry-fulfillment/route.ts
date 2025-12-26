import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { tryStartFulfillment, processOrderFulfillment } from '@/lib/fulfillment/process';

type Params = {
  id: string;
};

/**
 * Защищённый endpoint для ручного повторного запуска fulfillment.
 * Требует x-admin-key заголовок.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const orderId = Number(id);

  // Проверка admin key
  const adminKey = req.headers.get('x-admin-key');
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    console.error('ADMIN_KEY is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  if (adminKey !== expectedKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!Number.isFinite(orderId) || orderId <= 0) {
    return NextResponse.json({ error: 'Invalid order id' }, { status: 400 });
  }

  // Проверяем существование заказа
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  if (order.status !== 'PAID') {
    return NextResponse.json(
      { error: `Order is not in PAID status (current: ${order.status})` },
      { status: 400 },
    );
  }

  // Для admin endpoint разрешаем retry даже после 3 попыток
  // Но проверяем, что заказ не в процессе выполнения
  if (order.fulfillmentStatus === 'PENDING') {
    return NextResponse.json(
      {
        error: 'Fulfillment is already in progress',
        currentStatus: order.fulfillmentStatus,
      },
      { status: 409 },
    );
  }

  if (order.fulfillmentStatus === 'SUCCESS') {
    return NextResponse.json(
      {
        error: 'Fulfillment already completed successfully',
        currentStatus: order.fulfillmentStatus,
      },
      { status: 409 },
    );
  }

  // Атомарно переводим в PENDING (для admin разрешаем даже после 3 попыток)
  const result = await prisma.order.updateMany({
    where: {
      id: orderId,
      status: 'PAID',
      fulfillmentStatus: {
        in: ['NOT_STARTED', 'FAILED'],
      },
    },
    data: {
      fulfillmentStatus: 'PENDING',
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      {
        error: 'Fulfillment cannot be started',
        currentStatus: order.fulfillmentStatus,
        message: 'Order status does not allow fulfillment retry',
      },
      { status: 409 },
    );
  }

  // Запускаем fulfillment асинхронно
  processOrderFulfillment(orderId).catch((error) => {
    console.error(`[Admin Retry] Failed to process order ${orderId}:`, error);
    // On error, mark as FAILED
    prisma.order
      .update({
        where: { id: orderId },
        data: {
          fulfillmentStatus: 'FAILED',
          fulfillmentLastError: error.message || 'Unknown error',
          fulfillmentAttemptCount: { increment: 1 },
        },
      })
      .catch((updateError) => {
        console.error(`[Admin Retry] Failed to update order ${orderId} status:`, updateError);
      });
  });

  return NextResponse.json({
    success: true,
    message: `Fulfillment started for order ${orderId}`,
    orderId,
  });
}

