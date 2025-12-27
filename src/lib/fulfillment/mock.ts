import type { IFulfillmentProvider, FulfillmentParams, FulfillmentResult } from './types';

/**
 * Mock fulfillment провайдер для разработки и тестирования.
 * Симулирует выполнение заказов с задержкой и случайными результатами.
 */
export class MockFulfillmentProvider implements IFulfillmentProvider {
  readonly name = 'mock';

  /**
   * Симулирует выполнение заказа с задержкой 1-3 секунды.
   * В 95% случаев возвращает успех, в 5% - ошибку.
   */
  async fulfill(params: FulfillmentParams): Promise<FulfillmentResult> {
    const { orderId, productId, quantity } = params;

    // Симулируем задержку обработки (1-3 секунды)
    const delay = Math.random() * 2000 + 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    // 95% успех, 5% ошибка
    const success = Math.random() > 0.05;

    if (success) {
      const transactionId = `MOCK-${orderId}-${Date.now()}-${Math.random().toString(36).substring(7)}`;

      console.log(`[Mock Fulfillment] Order ${orderId} fulfilled successfully`, {
        productId,
        quantity,
        transactionId,
      });

      return {
        success: true,
        transactionId,
        message: `Mock fulfillment completed for order ${orderId}`,
        metadata: {
          provider: 'mock',
          fulfilledAt: new Date().toISOString(),
          productId,
          quantity,
        },
      };
    } else {
      const errorMessages = [
        'Insufficient stock',
        'Product temporarily unavailable',
        'Processing timeout',
        'Invalid product configuration',
      ];
      const error = errorMessages[Math.floor(Math.random() * errorMessages.length)];

      console.error(`[Mock Fulfillment] Order ${orderId} failed`, {
        productId,
        quantity,
        error,
      });

      return {
        success: false,
        error,
        message: `Mock fulfillment failed: ${error}`,
        metadata: {
          provider: 'mock',
          failedAt: new Date().toISOString(),
          productId,
          quantity,
        },
      };
    }
  }

  /**
   * Проверка статуса (для Mock всегда возвращает успех)
   */
  async checkStatus(transactionId: string): Promise<FulfillmentResult> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      transactionId,
      message: 'Mock transaction completed',
      metadata: {
        provider: 'mock',
        status: 'completed',
      },
    };
  }

  /**
   * Проверка доступности продукта (для Mock всегда true)
   */
  async isProductAvailable(productId: number): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }
}



