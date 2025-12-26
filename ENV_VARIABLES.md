# Environment Variables Reference

## Обязательные для запуска UI (клиент)

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `NEXT_PUBLIC_TG_BOT_URL` | `src/components/OutsideTelegram.tsx:15` | ❌ Нет | `""` | URL бота для кнопки "Open bot" |
| `NEXT_PUBLIC_ALLOW_TG_MOCK` | `src/mockEnv.ts:7`, `src/instrumentation-client.ts:9`, `src/components/OutsideTelegram.tsx:16` | ❌ Нет | `"false"` | Разрешить мок-режим для разработки |
| `NEXT_PUBLIC_SUPPORT_BOT_USERNAME` | `src/lib/tg.ts:102` | ❌ Нет | `"support"` | Username бота поддержки |

## Core required (базовая инфраструктура)

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `DATABASE_URL` | `prisma/schema.prisma`, `prisma.config.ts`, `src/lib/prismaClient.ts` | ✅ Да | - | Supabase Pooler (Transaction), runtime connection string |
| `DIRECT_URL` | `prisma/schema.prisma` | ✅ Да | - | Supabase Pooler (Session), для миграций/DDL. Direct connection может быть IPv6-only и требовать IPv4 add-on |
| `APP_BASE_URL` | `src/app/api/orders/route.ts:74` | ✅ Да | - | Базовый URL деплоя на Vercel (для webhook'ов и редиректов) |

## Telegram required (для работы Telegram Mini App)

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `TG_BOT_TOKEN` | `src/lib/telegram.ts:23` | ✅ Да | - | Токен Telegram бота |

## Payments required (для работы платежей)

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `ROBOKASSA_MERCHANT_LOGIN` | `src/lib/robokassa.ts:60` | ✅ Да | - | Логин мерчанта Robokassa |
| `ROBOKASSA_PASSWORD1` | `src/lib/robokassa.ts:61` | ✅ Да | - | Пароль #1 для формирования подписи |
| `ROBOKASSA_PASSWORD2` | `src/app/api/payments/robokassa/notification/route.ts:31` | ✅ Да | - | Пароль #2 для проверки подписи |

## Опциональные для сервера

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `ADMIN_KEY` | `src/app/api/admin/orders/[id]/retry-fulfillment/route.ts:20` | ❌ Нет | - | Секретный ключ для admin endpoints |

## Опциональные для сервера

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `ROBOKASSA_TEST_MODE` | `src/lib/robokassa.ts:62` | ❌ Нет | `"false"` | Тестовый режим Robokassa |
| `ROBOKASSA_API_BASE_URL` | `src/lib/robokassa.ts:63` | ❌ Нет | Авто | Автоматически определяется по TEST_MODE |
| `FULFILLMENT_PROVIDER` | `src/lib/fulfillment/index.ts:27` | ❌ Нет | `"mock"` | Провайдер fulfillment (mock/digiflazz) |
| `DIGIFLAZZ_API_KEY` | `src/lib/fulfillment/digiflazz.ts:18` | ❌ Нет | `""` | Только если FULFILLMENT_PROVIDER=digiflazz |
| `DIGIFLAZZ_USERNAME` | `src/lib/fulfillment/digiflazz.ts:19` | ❌ Нет | `""` | Только если FULFILLMENT_PROVIDER=digiflazz |
| `DIGIFLAZZ_BASE_URL` | `src/lib/fulfillment/digiflazz.ts:20` | ❌ Нет | `"https://api.digiflazz.com/v1"` | Только если FULFILLMENT_PROVIDER=digiflazz |
| `TBANK_PASSWORD` | `src/app/api/payments/tbank/notification/route.ts:16` | ❌ Нет | - | Только для T-Bank (legacy) |
| `TBANK_TERMINAL_KEY` | `src/lib/tbank.ts:69` | ❌ Нет | - | Только для T-Bank (legacy) |
| `TBANK_API_BASE_URL` | `src/lib/tbank.ts:71` | ❌ Нет | Авто | Только для T-Bank (legacy) |
| `TG_INITDATA_BYPASS_FOR_E2E` | `src/lib/telegram.ts:33` | ❌ Нет | - | Только для E2E тестов |
| `E2E_TG_INIT_DATA` | `src/lib/api.ts:39` | ❌ Нет | - | Только для E2E тестов |
| `NEXT_PUBLIC_E2E_TG_INIT_DATA` | `src/lib/api.ts:39` | ❌ Нет | - | Только для E2E тестов |

## Системные (автоматически)

| Name | Где используется | Обязательна | Дефолт | Примечание |
|------|-------------------|-------------|--------|------------|
| `NODE_ENV` | Множество мест | ✅ Да | - | Устанавливается автоматически |

## Health Check Endpoints

Проект предоставляет несколько health check endpoint'ов для диагностики:

- `/api/health` - Core health (DATABASE_URL, DIRECT_URL, APP_BASE_URL)
- `/api/health/telegram` - Telegram feature health (TG_BOT_TOKEN)
- `/api/health/payments` - Payments feature health (ROBOKASSA_*)

Каждый endpoint возвращает статус наличия переменных окружения без раскрытия их значений.

## Минимальный набор для запуска в Telegram

Для базового запуска UI в Telegram нужны только:
- Ничего! Все `NEXT_PUBLIC_*` переменные имеют дефолты

Для работы API нужны:
- **Core required**: `DATABASE_URL`, `DIRECT_URL`, `APP_BASE_URL`
- **Telegram required**: `TG_BOT_TOKEN`
- **Payments required**: `ROBOKASSA_MERCHANT_LOGIN`, `ROBOKASSA_PASSWORD1`, `ROBOKASSA_PASSWORD2`

