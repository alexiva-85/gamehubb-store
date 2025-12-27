# Fulfillment System

Система fulfillment для автоматического выполнения заказов после оплаты.

## Архитектура

Система построена на интерфейсе провайдера (`IFulfillmentProvider`), что позволяет легко переключаться между разными провайдерами (Mock, Digiflazz и т.д.).

## Провайдеры

### Mock Provider (по умолчанию)

Используется для разработки и тестирования. Симулирует выполнение заказов:
- Задержка 1-3 секунды
- 95% успешных выполнений, 5% ошибок
- Не требует внешних API

**Использование:**
```env
FULFILLMENT_PROVIDER=mock
```

### Digiflazz Provider

Провайдер для интеграции с Digiflazz API (TODO: реализовать).

**Использование:**
```env
FULFILLMENT_PROVIDER=digiflazz
DIGIFLAZZ_API_KEY=your_api_key
DIGIFLAZZ_USERNAME=your_username
DIGIFLAZZ_BASE_URL=https://api.digiflazz.com/v1  # опционально
```

## Как добавить новый провайдер

1. Создайте класс, реализующий `IFulfillmentProvider`:
```typescript
import type { IFulfillmentProvider, FulfillmentParams, FulfillmentResult } from './types';

export class MyFulfillmentProvider implements IFulfillmentProvider {
  readonly name = 'my-provider';

  async fulfill(params: FulfillmentParams): Promise<FulfillmentResult> {
    // Ваша логика выполнения заказа
  }
}
```

2. Добавьте провайдер в фабрику (`src/lib/fulfillment/index.ts`):
```typescript
export function createFulfillmentProvider(type: FulfillmentProviderType) {
  switch (type) {
    case 'my-provider':
      return new MyFulfillmentProvider();
    // ...
  }
}
```

3. Обновите тип `FulfillmentProviderType` в `types.ts`

## Интеграция

Fulfillment автоматически запускается после подтверждения оплаты в webhook (`/api/payments/tbank/notification`):

1. Заказ переходит в статус `PAID`
2. Автоматически запускается fulfillment для всех товаров в заказе
3. При успешном выполнении заказ переходит в статус `FULFILLED`
4. При ошибке заказ остается в статусе `PAID` (можно повторить позже)

## API

### `fulfillOrder(orderId, items, provider?)`

Выполняет fulfillment для всех товаров в заказе.

```typescript
import { fulfillOrder } from '@/lib/fulfillment';

const results = await fulfillOrder(
  123,
  [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ]
);
```

### `getFulfillmentProvider()`

Получает провайдер из переменной окружения.

```typescript
import { getFulfillmentProvider } from '@/lib/fulfillment';

const provider = getFulfillmentProvider();
const result = await provider.fulfill({
  orderId: 123,
  productId: 1,
  quantity: 2,
});
```



