# Fix: Vercel Build - Prisma Client Generation

## Проблема

Vercel build падал с ошибкой:
```
Type error: Module '"@prisma/client"' has no exported member 'PrismaClient'.
```

Причины:
1. **Prisma 7.x установлен вместо требуемого 6.x** - по документации проекта Prisma должен быть зафиксирован на 6.x
2. **Ignored build scripts** - pnpm игнорировал build scripts для `prisma`, `@prisma/engines`, `@prisma/client`
3. **PrismaClient не генерировался** перед `next build` на Vercel

## Решение

### 1. Откат Prisma на 6.x
- ✅ `prisma`: `^7.2.0` → `^6.0.1`
- ✅ `@prisma/client`: `^7.2.0` → `^6.0.1`
- ✅ Удалены зависимости: `@prisma/adapter-pg`, `pg`, `@types/pg` (не нужны в Prisma 6.x)

### 2. Обновление Prisma Schema
- ✅ Добавлен `url = env("DATABASE_URL")` в `datasource db` (требуется в Prisma 6.x)

### 3. Упрощение lib/prisma.ts
- ✅ Удален код с адаптером (не нужен в Prisma 6.x)
- ✅ Используется стандартный `PrismaClient` без адаптера

### 4. Гарантия генерации Prisma Client
- ✅ Добавлен `prisma generate` в build script: `"build": "prisma generate && next build"`
- ✅ Добавлен postinstall hook: `"postinstall": "prisma generate"`
- ✅ Исправлен `prisma.config.ts` для TypeScript type safety

### 5. Настройка pnpm
- ✅ Обновлен `.npmrc`: `enable-pre-post-scripts=true`
- ✅ Build scripts теперь выполняются автоматически

### 6. Очистка
- ✅ Удалена deprecated секция `package.json#prisma.seed` (используется `prisma.config.ts`)

## Измененные файлы

- `package.json` - версии Prisma, build/postinstall scripts
- `pnpm-lock.yaml` - обновлен lockfile
- `` - добавлен `url` в datasource
- `lib/prisma.ts` - упрощен для Prisma 6.x
- `prisma.config.ts` - исправлен TypeScript тип
- `.npmrc` - добавлен `enable-pre-post-scripts=true`

## Проверка

### Локально:
```bash
pnpm install
pnpm build  # ✅ Проходит успешно
```

### На Vercel:
1. После мержа PR, Vercel автоматически запустит build
2. Build должен пройти успешно:
   - `prisma generate` выполнится перед `next build`
   - `PrismaClient` будет доступен для импорта
   - Нет ошибок типов

### Ожидаемый результат:
- ✅ Build проходит без ошибок
- ✅ `PrismaClient` успешно импортируется
- ✅ Нет предупреждений "Ignored build scripts"
- ✅ Prisma Client генерируется на каждом build

## Дополнительно

- Все изменения протестированы локально
- Сборка проходит успешно
- Нет breaking changes для существующего функционала
- Соответствует требованиям проекта (Prisma 6.x)

