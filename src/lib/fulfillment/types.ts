/**
 * Типы и интерфейсы для fulfillment провайдеров.
 * Позволяет легко переключаться между Mock и Digiflazz.
 */

export type FulfillmentProviderType = 'mock' | 'digiflazz';

/**
 * Результат выполнения заказа (fulfillment)
 */
export type FulfillmentResult = {
  success: boolean;
  transactionId?: string;
  message?: string;
  error?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Параметры для выполнения заказа
 */
export type FulfillmentParams = {
  orderId: number;
  productId: number;
  quantity: number;
  // Дополнительные параметры для конкретного провайдера
  // Например, для Digiflazz: target, customField и т.д.
  [key: string]: unknown;
};

/**
 * Интерфейс провайдера fulfillment
 */
export interface IFulfillmentProvider {
  /**
   * Уникальное имя провайдера
   */
  readonly name: string;

  /**
   * Выполнить заказ (fulfillment)
   * @param params Параметры заказа
   * @returns Результат выполнения
   */
  fulfill(params: FulfillmentParams): Promise<FulfillmentResult>;

  /**
   * Проверить статус выполнения заказа
   * @param transactionId ID транзакции от провайдера
   * @returns Результат проверки
   */
  checkStatus?(transactionId: string): Promise<FulfillmentResult>;

  /**
   * Проверить доступность продукта
   * @param productId ID продукта
   * @returns Доступен ли продукт
   */
  isProductAvailable?(productId: number): Promise<boolean>;
}



