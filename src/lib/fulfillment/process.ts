import { prisma } from '@/lib/prisma';
import { fulfillOrder, getFulfillmentProvider } from './index';

/**
 * Выполнить fulfillment для заказа с сохранением результатов в БД.
 * Атомарно обновляет fulfillmentStatus и сохраняет результаты.
 */
export async function processOrderFulfillment(orderId: number): Promise<void> {
  // Получаем заказ с товарами
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  if (order.status !== 'PAID') {
    throw new Error(`Order ${orderId} is not in PAID status`);
  }

  // Выполняем fulfillment
  const fulfillmentResult = await fulfillOrder(
    orderId,
    order.items.map((item: { productId: number; quantity: number }) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  );

  // Сохраняем результаты в БД
  const fulfillmentStatus = fulfillmentResult.success ? 'SUCCESS' : 'FAILED';
  const lastError = fulfillmentResult.success
    ? null
    : fulfillmentResult.results
        .filter((r: { productId: number; result: { success: boolean; error?: string } }) => !r.result.success)
        .map((r: { productId: number; result: { success: boolean; error?: string } }) => r.result.error || 'Unknown error')
        .join('; ');

  await prisma.order.update({
    where: { id: orderId },
    data: {
      fulfillmentStatus,
      fulfillmentAttemptCount: { increment: 1 },
      fulfillmentLastError: lastError,
      fulfillmentPayloadJson: fulfillmentResult.payload as any, // Prisma Json type
      // Если успешно, переводим заказ в FULFILLED
      ...(fulfillmentResult.success && { status: 'FULFILLED' }),
    },
  });

  console.log(`[Fulfillment] Order ${orderId} processed: ${fulfillmentStatus}`, {
    attemptCount: order.fulfillmentAttemptCount + 1,
    lastError,
  });
}

/**
 * Атомарно перевести заказ в PENDING статус fulfillment.
 * Возвращает true если переход успешен, false если уже в процессе или завершён.
 * Не запускает fulfillment если attemptCount >= 3 (требуется ручной retry через admin).
 */
export async function tryStartFulfillment(orderId: number): Promise<boolean> {
  try {
    const result = await prisma.order.updateMany({
      where: {
        id: orderId,
        status: 'PAID',
        fulfillmentStatus: {
          in: ['NOT_STARTED', 'FAILED'],
        },
        // Ограничение: не более 3 автоматических попыток
        fulfillmentAttemptCount: {
          lt: 3,
        },
      },
      data: {
        fulfillmentStatus: 'PENDING',
      },
    });

    return result.count > 0;
  } catch (error) {
    console.error(`[Fulfillment] Failed to start fulfillment for order ${orderId}:`, error);
    return false;
  }
}

