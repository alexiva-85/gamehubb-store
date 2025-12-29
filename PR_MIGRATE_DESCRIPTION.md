# Chore: Database Migration Instructions

## Цель

Добавить документацию и скрипты для применения Prisma миграций в Supabase Postgres (Production) без нарушения Vercel build.

## Что сделано

### 1. Документация

- ✅ Создан `docs/db-setup.md` с инструкциями:
  - Настройка переменных окружения (DATABASE_URL, DIRECT_URL)
  - Команды для генерации Prisma Client
  - Команды для применения миграций (локально, через Vercel CLI, через Supabase Dashboard)
  - Методы проверки миграций (Prisma Studio, Supabase Dashboard, SQL)
  - Troubleshooting

### 2. Скрипты в package.json

- ✅ Добавлен `prisma:generate` - генерация Prisma Client
- ✅ Добавлен `prisma:migrate:deploy` - применение миграций в проде

### 3. Конфигурация Prisma

- ✅ Обновлен `prisma/schema.prisma` - добавлен `directUrl = env("DIRECT_URL")` для миграций
- ✅ Обновлен `prisma.config.ts` - добавлен `directUrl` в datasource
- ✅ Обновлен `lib/prisma.ts` - совместимость с Prisma 6.x

### 4. Важные моменты

- ⚠️ **Миграции НЕ выполняются автоматически в Vercel build**
- ✅ Используется `DIRECT_URL` для миграций (прямое подключение, не через pooler)
- ✅ Используется `DATABASE_URL` для приложения (через transaction pooler)
- ✅ Все инструкции без секретов (только имена переменных)

## Переменные окружения

**Требуются в Vercel (уже настроены):**
- `DATABASE_URL` - для Prisma Client (через transaction pooler)
- `DIRECT_URL` - для миграций (прямое подключение)

**Локально (в .env):**
- `DATABASE_URL` - строка подключения через pooler
- `DIRECT_URL` - строка подключения напрямую

## Чек-лист применения миграций

### Локально

- [ ] Создать `.env` с `DATABASE_URL` и `DIRECT_URL`
- [ ] Выполнить `pnpm prisma:generate` для генерации клиента
- [ ] Выполнить `pnpm prisma:migrate:deploy` для применения миграций
- [ ] Проверить через Prisma Studio или Supabase Dashboard что таблицы созданы

### Через Vercel CLI

- [ ] Установить Vercel CLI: `npm i -g vercel`
- [ ] Логин: `vercel login`
- [ ] Получить env: `vercel env pull .env.local`
- [ ] Применить миграции: `pnpm prisma:migrate:deploy` (использует DIRECT_URL из .env.local)
- [ ] Проверить в Supabase Dashboard что таблицы созданы

### Через Supabase Dashboard

- [ ] Открыть Supabase Dashboard → SQL Editor
- [ ] Скопировать SQL из `prisma/migrations/*/migration.sql`
- [ ] Выполнить SQL в Supabase SQL Editor
- [ ] Проверить в Table Editor что таблицы созданы

## Проверка после применения миграций

1. **Проверить таблицы:**
   ```sql
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = 'products';
   ```

2. **Проверить миграции:**
   ```sql
   SELECT * FROM _prisma_migrations;
   ```

3. **Через Prisma Studio:**
   ```bash
   pnpm prisma studio
   ```

## Команды

```bash
# Генерация Prisma Client
pnpm prisma:generate

# Применение миграций (использует DIRECT_URL)
pnpm prisma:migrate:deploy

# Seed (после миграций)
pnpm prisma db seed
```

## Важно

- ⚠️ Миграции применяются вручную, НЕ в Vercel build
- ✅ Prisma автоматически использует `DIRECT_URL` для миграций
- ✅ `DATABASE_URL` используется только для Prisma Client в приложении
- ✅ Никаких секретов в репозитории

