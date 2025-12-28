# M1: Products Catalog - Чек-лист для проверки в проде

## Перед мержем PR

### Локальная проверка
- [ ] `pnpm install` - зависимости установлены
- [ ] `pnpm db:generate` - Prisma Client сгенерирован
- [ ] `pnpm db:migrate` - миграция применена (если есть DATABASE_URL)
- [ ] `pnpm db:seed` - seed выполнен (если есть DATABASE_URL)
- [ ] `pnpm build` - сборка проходит без ошибок
- [ ] `pnpm lint` - нет ошибок линтера

### Локальная проверка функциональности
- [ ] `http://localhost:3000/api/products` - возвращает 200 и JSON с products
- [ ] `http://localhost:3000/catalog` - отображает товары (из БД или fallback)
- [ ] Каталог не пустой даже если БД пустая (fallback работает)

## После мержа в main

### Переменные окружения в Vercel
- [ ] `DATABASE_URL` - добавлена и настроена (Supabase connection string)

### Миграция в проде
- [ ] Выполнить миграцию: `pnpm db:migrate` (через Vercel CLI или Supabase dashboard)
- [ ] Проверить что таблица `products` создана в Supabase

### Seed в проде
- [ ] Выполнить seed: `pnpm db:seed` (через Vercel CLI или Supabase dashboard)
- [ ] Проверить что в таблице `products` есть минимум 10 товаров

### Проверка в проде
- [ ] `https://gamehubb-store.vercel.app/api/products` - возвращает 200
- [ ] Ответ содержит `source: "db"` (не fallback)
- [ ] Ответ содержит `products` массив с >= 10 товарами
- [ ] `https://gamehubb-store.vercel.app/catalog` - открывается без ошибок
- [ ] Каталог показывает товары из БД
- [ ] Каталог не пустой

### Проверка в Telegram WebView
- [ ] Открыть бота `@GameHubb_TopUp_bot`
- [ ] Перейти на `/catalog`
- [ ] Каталог отображается корректно
- [ ] Товары видны и кликабельны (если есть функционал)

## Критерии приемки M1

✅ В прод БД есть таблица Product (products) в Supabase  
✅ `/api/products` → 200 и список >= 10 товаров (без авторизации)  
✅ `/catalog` показывает товары без логина (не пустой)  
✅ Fallback работает если БД пустая (каталог никогда не пустой)

