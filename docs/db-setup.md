# Database Setup & Migrations

## Переменные окружения

### Локально

Создайте файл `.env` в корне проекта:

```env
# Supabase PostgreSQL connection strings
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host:port/database?sslmode=require"
```

**Важно:**
- `DATABASE_URL` - используется для Prisma Client (через transaction pooler/pgbouncer)
- `DIRECT_URL` - используется для миграций (прямое подключение, без pooler)
- В Vercel эти переменные уже настроены в Environment Variables

### В Vercel

Переменные окружения уже настроены:
- `DATABASE_URL` - для приложения (transaction pooler)
- `DIRECT_URL` - для миграций (direct connection)

## Команды

### Генерация Prisma Client

```bash
pnpm prisma:generate
```

Или напрямую:
```bash
pnpm prisma generate
```

**Когда использовать:**
- После изменения `prisma/schema.prisma`
- После клонирования репозитория
- Перед сборкой проекта

### Применение миграций

**⚠️ ВАЖНО: Миграции НЕ выполняются автоматически в Vercel build!**

Применять миграции нужно вручную:

#### Локально

```bash
# Убедитесь что DIRECT_URL настроен в .env
pnpm prisma:migrate:deploy
```

Или напрямую:
```bash
pnpm prisma migrate deploy
```

#### Через Vercel CLI

```bash
# Установить Vercel CLI (если еще не установлен)
npm i -g vercel

# Логин в Vercel
vercel login

# Получить переменные окружения из Vercel
vercel env pull .env.local

# Применить миграции (использует DIRECT_URL из .env.local)
pnpm prisma migrate deploy
```

#### Через Supabase Dashboard

1. Откройте Supabase Dashboard → SQL Editor
2. Скопируйте содержимое файла `prisma/migrations/*/migration.sql`
3. Выполните SQL в Supabase SQL Editor

## Проверка миграций

### Через Prisma Studio

```bash
pnpm prisma studio
```

Откроется веб-интерфейс на `http://localhost:5555` для просмотра данных.

### Через Supabase Dashboard

1. Откройте Supabase Dashboard → Table Editor
2. Проверьте наличие таблиц:
   - `products` - таблица товаров
   - `_prisma_migrations` - история миграций Prisma

### Через SQL запрос

```sql
-- Проверить наличие таблицы products
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'products';

-- Проверить примененные миграции
SELECT * FROM _prisma_migrations;
```

## Seed (заполнение данными)

После применения миграций можно заполнить БД тестовыми данными:

```bash
pnpm prisma db seed
```

Или напрямую:
```bash
tsx prisma/seed.ts
```

**Примечание:** Seed идемпотентный - можно запускать многократно без дубликатов.

## Troubleshooting

### Ошибка подключения к БД

- Проверьте что `DIRECT_URL` указан правильно (без pgbouncer)
- Убедитесь что используется `sslmode=require` для Supabase
- Проверьте что IP адрес не заблокирован в Supabase (Settings → Database → Connection Pooling)

### Миграция не применяется

- Убедитесь что используете `DIRECT_URL` (не `DATABASE_URL`)
- Проверьте права доступа к БД
- Проверьте что миграция не была применена ранее (`_prisma_migrations` таблица)

### Prisma Client не генерируется

- Убедитесь что `prisma/schema.prisma` существует
- Проверьте что `DATABASE_URL` настроен (для валидации схемы)
- Выполните `pnpm prisma generate` вручную

## Важные замечания

- ⚠️ **Миграции НЕ выполняются в Vercel build** - только `prisma generate`
- ✅ Используйте `DIRECT_URL` для миграций (не через pooler)
- ✅ Используйте `DATABASE_URL` для приложения (через pooler)
- ✅ Всегда проверяйте миграции локально перед применением в проде

