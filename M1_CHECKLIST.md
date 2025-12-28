# M1: Catalog Implementation - Чек-лист проверки

## Acceptance Criteria

✅ В Supabase есть таблица Products (через Prisma migration)  
✅ В проекте есть seed, который upsert'ит >= 10 товаров  
✅ GET /api/products возвращает 200 и массив товаров (только active), + поле source: "db"|"fallback"  
✅ /catalog отображает карточки товаров (название, цена, категория) и не бывает пустым  
✅ Никаких "Throw test error" и прочих дев-заглушек на /catalog

## После мержа PR

### 1. Применить миграции в Supabase

**Важно:** Миграции НЕ выполняются автоматически в build. Нужно применить вручную.

**Вариант A: Через Vercel CLI (рекомендуется)**
```bash
# Установить Vercel CLI если еще не установлен
npm i -g vercel

# Логин в Vercel
vercel login

# Применить миграции
vercel env pull .env.local
pnpm prisma migrate deploy
```

**Вариант B: Через Supabase Dashboard**
1. Открыть Supabase Dashboard → SQL Editor
2. Скопировать содержимое файла `prisma/migrations/*/migration.sql`
3. Выполнить SQL в Supabase SQL Editor

**Вариант C: Через локальное подключение**
```bash
# Установить DATABASE_URL в .env
DATABASE_URL="postgresql://user:password@host:port/database"

# Применить миграции
pnpm prisma migrate deploy
```

### 2. Выполнить seed

**Через Vercel CLI:**
```bash
vercel env pull .env.local
pnpm prisma db seed
```

**Или через Supabase Dashboard:**
- Seed можно выполнить через Vercel CLI или локально с правильным DATABASE_URL

**Проверка seed:**
- В Supabase Dashboard → Table Editor → products
- Должно быть >= 10 товаров с разными категориями

### 3. Проверить API

```bash
# Локально
curl http://localhost:3000/api/products

# В проде
curl https://gamehubb-store.vercel.app/api/products
```

**Ожидаемый ответ:**
```json
{
  "source": "db",
  "items": [
    {
      "id": "...",
      "sku": "GAME-TOPUP-100",
      "title": "Пополнение счета 100₽",
      "priceRub": 100,
      "currency": "RUB",
      "category": "Top-up",
      ...
    },
    ...
  ]
}
```

**Проверки:**
- ✅ Статус 200
- ✅ `source: "db"` (не "fallback")
- ✅ `items` массив с >= 10 товарами
- ✅ Все товары имеют `isActive: true`
- ✅ Сортировка по category, затем title

### 4. Проверить UI /catalog

**Локально:**
```
http://localhost:3000/catalog
```

**В проде:**
```
https://gamehubb-store.vercel.app/catalog
```

**Проверки:**
- ✅ Страница открывается без ошибок
- ✅ Отображается заголовок "Каталог товаров"
- ✅ Видны карточки товаров (сетка)
- ✅ Каждая карточка содержит:
  - Название товара
  - Описание (если есть)
  - Категорию (badge)
  - Цену в рублях (форматированную)
  - Кнопку "Купить"
- ✅ Нет заглушек "Throw test error"
- ✅ Нет пустого экрана
- ✅ Если БД пустая, показываются fallback товары с уведомлением

### 5. Проверка fallback механизма

**Тест fallback (опционально):**
1. Временно удалить все товары из БД (через Supabase Dashboard)
2. Проверить `/api/products` - должен вернуть `source: "fallback"`
3. Проверить `/catalog` - должен показать товары из fallback
4. Восстановить товары через seed

## Команды для проверки

```bash
# Генерация Prisma Client
pnpm db:generate

# Применение миграций (в проде)
pnpm db:migrate:deploy

# Заполнение БД товарами
pnpm db:seed

# Сборка проекта
pnpm build

# Запуск локально
pnpm dev
```

## Переменные окружения

**Требуется:**
- `DATABASE_URL` - строка подключения к Supabase PostgreSQL

**Формат:**
```
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

## Troubleshooting

### Миграция не применяется
- Проверить DATABASE_URL в Vercel Environment Variables
- Убедиться что используется `prisma migrate deploy` (не `migrate dev`)
- Проверить права доступа к БД

### Seed не работает
- Проверить что миграция применена (таблица products существует)
- Проверить DATABASE_URL
- Проверить логи выполнения seed

### API возвращает fallback
- Проверить что seed выполнен
- Проверить что товары в БД имеют `isActive: true`
- Проверить логи API на ошибки

### Каталог пустой
- Проверить что API `/api/products` возвращает товары
- Проверить консоль браузера на ошибки
- Проверить что fallback работает (должен показывать товары даже если БД пустая)

