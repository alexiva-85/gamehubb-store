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

**Production и Preview:**
- `DATABASE_URL` - для приложения (transaction pooler, порт 6543, pgbouncer=true)
- `DIRECT_URL` - для миграций (session pooler, порт 5432)

**⚠️ ВАЖНО для Vercel Preview:**
Для успешного Preview deploy необходимо настроить те же переменные окружения, что и в Production:
- Settings → Environment Variables → Add для Preview environment
- `DATABASE_URL` - Supabase Transaction pooler (порт 6543, pgbouncer=true)
- `DIRECT_URL` - Supabase Session pooler IPv4 (порт 5432)

**Формат:**
- `DATABASE_URL`: `postgresql://postgres.<projectRef>:<password>@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
- `DIRECT_URL`: `postgresql://postgres.<projectRef>:<password>@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres`

## Команды

### Генерация Prisma Client

**Локально (с env loading):**
```bash
set -a && source .env.local && set +a && pnpm prisma:generate
```

Или напрямую:
```bash
set -a && source .env.local && set +a && pnpm prisma generate
```

**В Vercel:**
Prisma Client генерируется автоматически во время build через `prisma generate` (если настроен в build script).

**Когда использовать:**
- После изменения `prisma/schema.prisma`
- После клонирования репозитория
- Перед сборкой проекта

### Применение миграций

**⚠️ ВАЖНО: Миграции НЕ выполняются автоматически в Vercel build!**

Применять миграции нужно вручную:

#### Локально

**Важно:** `prisma.config.ts` использует `dotenv/config`, но для надежности рекомендуется явно загружать env:

```bash
# Загрузить env переменные и применить миграции
set -a && source .env.local && set +a && pnpm prisma:migrate:deploy
```

Или напрямую:
```bash
set -a && source .env.local && set +a && pnpm prisma migrate deploy
```

**Примечание:** `set -a` экспортирует все переменные из .env.local, `set +a` отключает автоматический экспорт.

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

