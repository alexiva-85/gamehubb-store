import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyNotification } from '@/lib/tbank';
import { tryStartFulfillment, processOrderFulfillment } from '@/lib/fulfillment/process';

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>;

  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return new Response('Bad Request', { status: 400 });
  }

  const password = process.env.TBANK_PASSWORD;

  if (!password) {
    console.error('TBANK_PASSWORD is not configured');
    return new Response('Server Error', { status: 500 });
  }

  if (!verifyNotification(payload, password)) {
    console.warn('T-Bank notification signature invalid');
    return new Response('Bad Token', { status: 400 });
  }

  const orderId = payload['OrderId'];
  const paymentId = payload['PaymentId'];
  const status = payload['Status'];
  const amount = payload['Amount'];

  if (!status || typeof status !== 'string') {
    return new Response('Bad Request', { status: 400 });
  }

  if (typeof amount !== 'number') {
    return new Response('Bad Request', { status: 400 });
  }

  let order =
    typeof orderId === 'number'
      ? await prisma.order.findUnique({ where: { id: orderId } })
      : null;

  if (!order && typeof paymentId === 'string') {
    order = await prisma.order.findFirst({
      where: { providerPaymentId: paymentId },
    });
  }

  if (!order) {
    console.warn('Order not found for T-Bank notification', { orderId, paymentId });
    // Still respond OK to avoid infinite retries for unknown orders.
    return new Response('OK', { status: 200 });
  }

  if (order.totalAmountKopeks !== amount) {
    console.warn('Amount mismatch in T-Bank notification', {
      expected: order.totalAmountKopeks,
      actual: amount,
    });
    return new Response('Amount mismatch', { status: 400 });
  }

  // Idempotent logging of notification.
  try {
    await prisma.paymentNotificationLog.create({
      data: {
        providerPaymentId: String(paymentId ?? order.providerPaymentId ?? ''),
        status,
        payloadJson: JSON.stringify(payload),
      },
    });
  } catch (error) {
    // Ignore unique constraint violations (same status for same payment).
    console.warn('Failed to insert PaymentNotificationLog', error);
  }

  // Idempotent status transitions.
  if (status === 'AUTHORIZED') {
    if (order.status === 'NEW' || order.status === 'PAYMENT_CREATED') {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'AUTHORIZED',
          providerPaymentId: typeof paymentId === 'string' ? paymentId : order.providerPaymentId,
        },
      });
    }
  } else if (status === 'CONFIRMED') {
    if (order.status !== 'PAID' && order.status !== 'FULFILLED') {
      // Update order to PAID status
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          providerPaymentId: typeof paymentId === 'string' ? paymentId : order.providerPaymentId,
          paidAt: new Date(),
        },
      });

      // Atomically try to start fulfillment (only if NOT_STARTED or FAILED, and attemptCount < 3)
      const canStart = await tryStartFulfillment(order.id);

      if (canStart) {
        // Process fulfillment asynchronously (don't block webhook response)
        processOrderFulfillment(order.id).catch((error) => {
          console.error(`[Fulfillment] Failed to process order ${order.id}:`, error);
          // On error, mark as FAILED
          prisma.order
            .update({
              where: { id: order.id },
              data: {
                fulfillmentStatus: 'FAILED',
                fulfillmentLastError: error.message || 'Unknown error',
                fulfillmentAttemptCount: { increment: 1 },
              },
            })
            .catch((updateError: unknown) => {
              console.error(`[Fulfillment] Failed to update order ${order.id} status:`, updateError);
            });
        });
      } else {
        // Check if it's because of attempt limit
        const currentOrder = await prisma.order.findUnique({
          where: { id: order.id },
          select: { fulfillmentAttemptCount: true, fulfillmentStatus: true },
        });

        if (currentOrder && currentOrder.fulfillmentAttemptCount >= 3) {
          console.warn(
            `[Fulfillment] Order ${order.id} reached max attempts (${currentOrder.fulfillmentAttemptCount}), requires manual retry`,
          );
          // Mark as FAILED if not already
          if (currentOrder.fulfillmentStatus !== 'FAILED') {
            await prisma.order.update({
              where: { id: order.id },
              data: {
                fulfillmentStatus: 'FAILED',
                fulfillmentLastError:
                  'Превышено максимальное количество попыток. Обратитесь в поддержку.',
              },
            });
          }
        } else {
          // Fulfillment already in progress or completed
          console.log(`[Fulfillment] Order ${order.id} fulfillment already started or completed`);
        }
      }
    }
  }

  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
}


