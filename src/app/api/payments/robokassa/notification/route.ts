import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { verifyNotificationSignature, parseNotificationParams } from '@/lib/robokassa';
import { tryStartFulfillment, processOrderFulfillment } from '@/lib/fulfillment/process';

/**
 * Обработчик webhook уведомлений от Robokassa
 * 
 * Robokassa отправляет уведомления методом POST на ResultURL
 * Параметры передаются в теле запроса (application/x-www-form-urlencoded)
 * 
 * Формат уведомления:
 * - OutSum: сумма платежа в рублях
 * - InvId: номер заказа (наш orderId)
 * - SignatureValue: подпись MD5(OutSum:InvId:Password2)
 * - Culture: язык интерфейса (опционально)
 */
export async function POST(req: NextRequest) {
  let formData: URLSearchParams;

  try {
    // Robokassa отправляет данные как application/x-www-form-urlencoded
    const body = await req.text();
    formData = new URLSearchParams(body);
  } catch (error) {
    console.error('Failed to parse Robokassa notification body:', error);
    return new Response('Bad Request', { status: 400 });
  }

  const password2 = process.env.ROBOKASSA_PASSWORD2;

  if (!password2) {
    console.error('ROBOKASSA_PASSWORD2 is not configured');
    return new Response('Server Error', { status: 500 });
  }

  // Парсим параметры уведомления
  let notificationParams;
  try {
    notificationParams = parseNotificationParams(formData);
  } catch (error) {
    console.error('Failed to parse notification parameters:', error);
    return new Response('Bad Request', { status: 400 });
  }

  const { outSum, invId, signatureValue } = notificationParams;

  // Проверяем подпись
  if (!verifyNotificationSignature(outSum, invId, signatureValue, password2)) {
    console.warn('Robokassa notification signature invalid', {
      outSum,
      invId,
      receivedSignature: signatureValue,
    });
    return new Response('Bad Signature', { status: 400 });
  }

  // Ищем заказ по InvId (который равен нашему orderId)
  const order = await prisma.order.findUnique({
    where: { id: invId },
  });

  if (!order) {
    console.warn('Order not found for Robokassa notification', { invId });
    // Возвращаем OK, чтобы Robokassa не повторял запрос
    return new Response('OK', { status: 200 });
  }

  // Конвертируем сумму из рублей в копейки для сравнения
  const amountKopeks = Math.round(outSum * 100);

  if (order.totalAmountKopeks !== amountKopeks) {
    console.warn('Amount mismatch in Robokassa notification', {
      expected: order.totalAmountKopeks,
      actual: amountKopeks,
      orderId: order.id,
    });
    return new Response('Amount mismatch', { status: 400 });
  }

  // Idempotent logging of notification
  try {
    await prisma.paymentNotificationLog.create({
      data: {
        providerPaymentId: String(invId),
        status: 'PAID', // Robokassa отправляет уведомление только об успешной оплате
        payloadJson: JSON.stringify({
          OutSum: outSum,
          InvId: invId,
          SignatureValue: signatureValue,
          Culture: notificationParams.culture,
        }),
      },
    });
  } catch (error) {
    // Ignore unique constraint violations (same status for same payment)
    console.warn('Failed to insert PaymentNotificationLog', error);
  }

  // Robokassa отправляет уведомление только об успешной оплате
  // Обновляем статус заказа на PAID
  if (order.status !== 'PAID' && order.status !== 'FULFILLED') {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        providerPaymentId: String(invId),
        paidAt: new Date(),
      },
    });

    // Atomically try to start fulfillment
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
          .catch((updateError) => {
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

  // Robokassa ожидает ответ "OK" в случае успешной обработки
  return new Response('OK', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

