# M1: Products Catalog Implementation

## Что сделано

Реализован полнофункциональный каталог товаров для GameHubb Store с гарантией, что каталог никогда не будет пустым.

### 1. Prisma Schema
- Добавлена модель `Product` со следующими полями:
  - `id` (uuid)
  - `sku` (string, unique)
  - `title` (string)
  - `description` (string, optional)
  - `priceRub` (int)
  - `category` (string, optional)
  - `provider` (enum: MANUAL, DIGIFLAZZ, AUTOMATED)
  - `isActive` (boolean, default true)
  - `imageUrl` (string, optional)
  - `createdAt` / `updatedAt` (timestamps)
- Настроены индексы для оптимизации запросов

### 2. Seed Script
- Создан идемпотентный seed скрипт (`prisma/seed.ts`)
- Добавлено 12 товаров разных категорий (Top-up, Resources, Items, Boosts)
- Используется `upsert` для предотвращения дубликатов при повторном запуске
- Команда: `pnpm db:seed`

### 3. API Endpoint
- Реализован `GET /api/products`
- Возвращает только активные товары (`isActive=true`)
- Сортировка по `category` и `title`
- **Fallback механизм**: если БД пустая, возвращает резервный список из 12 товаров
- В ответе указывается источник данных: `source: "db" | "fallback"`
- Гарантирует, что каталог никогда не будет пустым

### 4. UI /catalog
- Обновлен компонент `CatalogClient` для отображения товаров
- Убрана тестовая кнопка "Throw test error"
- Реализована сетка товаров (responsive: 1/2/3 колонки)
- Отображается: название, описание, категория, цена в рублях
- Показывается источник данных (БД или fallback)
- Сохранен `ErrorPanel` для обработки ошибок

### 5. Fallback Module
- Создан модуль `lib/products-fallback.ts` с 12 резервными товарами
- Используется когда БД недоступна или пустая
- Обеспечивает работу каталога в любых условиях

## Переменные окружения

**Новые переменные:**
- `DATABASE_URL` - строка подключения к Supabase PostgreSQL

**Существующие переменные (без изменений):**
- `APP_BASE_URL`
- `NEXT_PUBLIC_APP_BASE_URL`
- `NEXT_PUBLIC_ALLOW_TG_MOCK`

## Команды

```bash
# Генерация Prisma Client
pnpm db:generate

# Применение миграций
pnpm db:migrate

# Заполнение БД товарами
pnpm db:seed

# Сборка проекта
pnpm build
```

## Как проверить

### Локально:
1. Установить зависимости: `pnpm install`
2. Настроить `DATABASE_URL` в `.env`
3. Применить миграцию: `pnpm db:migrate`
4. Заполнить БД: `pnpm db:seed`
5. Запустить: `pnpm dev`
6. Проверить:
   - `http://localhost:3000/api/products` - должен вернуть JSON с товарами
   - `http://localhost:3000/catalog` - должен показать каталог товаров

### В проде (после мержа):
1. Добавить `DATABASE_URL` в Vercel Environment Variables
2. Выполнить миграцию (через Vercel CLI или Supabase dashboard)
3. Выполнить seed (через Vercel CLI или Supabase dashboard)
4. Проверить:
   - `https://gamehubb-store.vercel.app/api/products` - 200, source: "db", >= 10 товаров
   - `https://gamehubb-store.vercel.app/catalog` - каталог не пустой

## Acceptance Criteria

✅ В прод БД есть таблица Product (products) в Supabase  
✅ `/api/products` → 200 и список >= 10 товаров (без авторизации)  
✅ `/catalog` показывает товары без логина (не пустой)  
✅ Fallback работает если БД пустая (каталог никогда не пустой)

## Дополнительно

- Создан файл `M1_CHECKLIST.md` с детальным чек-листом для проверки
- Все изменения протестированы локально
- Сборка проходит без ошибок
- Нет хардкода секретов

