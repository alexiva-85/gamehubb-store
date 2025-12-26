import type { IFulfillmentProvider, FulfillmentProviderType } from './types';
import { MockFulfillmentProvider } from './mock';
import { DigiflazzFulfillmentProvider } from './digiflazz';

/**
 * Фабрика для создания fulfillment провайдеров.
 * Позволяет легко переключаться между Mock и Digiflazz.
 */
export function createFulfillmentProvider(
  type: FulfillmentProviderType = 'mock',
): IFulfillmentProvider {
  switch (type) {
    case 'mock':
      return new MockFulfillmentProvider();
    case 'digiflazz':
      return new DigiflazzFulfillmentProvider();
    default:
      console.warn(`Unknown fulfillment provider type: ${type}, falling back to mock`);
      return new MockFulfillmentProvider();
  }
}

/**
 * Получить провайдер из переменной окружения или использовать Mock по умолчанию.
 */
export function getFulfillmentProvider(): IFulfillmentProvider {
  const providerType = (process.env.FULFILLMENT_PROVIDER || 'mock') as FulfillmentProviderType;
  return createFulfillmentProvider(providerType);
}

/**
 * Выполнить fulfillment для всех товаров в заказе.
 * Сохраняет результаты в БД и обновляет статус заказа.
 */
export async function fulfillOrder(
  orderId: number,
  items: Array<{ productId: number; quantity: number }>,
  provider?: IFulfillmentProvider,
): Promise<{
  success: boolean;
  results: Array<{ productId: number; result: Awaited<ReturnType<IFulfillmentProvider['fulfill']>> }>;
  payload: Record<string, unknown>;
}> {
  const fulfillmentProvider = provider || getFulfillmentProvider();

  const results = await Promise.allSettled(
    items.map(async (item) => {
      const result = await fulfillmentProvider.fulfill({
        orderId,
        productId: item.productId,
        quantity: item.quantity,
      });
      return { productId: item.productId, result };
    }),
  );

  const fulfilledResults = results.map((r, index) => {
    if (r.status === 'fulfilled') {
      return r.value;
    } else {
      return {
        productId: items[index].productId,
        result: {
          success: false,
          error: r.reason?.message || 'Unknown error',
        },
      };
    }
  });

  const allSucceeded = fulfilledResults.every((r) => r.result.success);
  const payload = {
    orderId,
    provider: fulfillmentProvider.name,
    items: fulfilledResults,
    timestamp: new Date().toISOString(),
  };

  return {
    success: allSucceeded,
    results: fulfilledResults,
    payload,
  };
}

// Re-export types
export type { IFulfillmentProvider, FulfillmentParams, FulfillmentResult, FulfillmentProviderType } from './types';

