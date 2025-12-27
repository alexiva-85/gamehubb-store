# Быстрый деплой M0.1

## Шаг 1: Создайте GitHub репозиторий

**Вручную через веб-интерфейс:**
1. Откройте https://github.com/new
2. Repository name: `gamehubb-store`
3. Description: `GameHubb Store - Telegram Mini App`
4. Visibility: **Private** ✅
5. **НЕ** добавляйте README, .gitignore или license
6. Нажмите "Create repository"

## Шаг 2: Настройте git и запушьте код

После создания репозитория выполните:

```bash
# Если username = alexiva-85, используйте:
./setup-github.sh alexiva-85

# Или вручную:
git remote add origin https://github.com/alexiva-85/gamehubb-store.git
git push -u origin main
```

## Шаг 3: Создайте Vercel проект

1. Откройте https://vercel.com/new
2. Import Git Repository → выберите `gamehubb-store`
3. Framework: Next.js (автоопределение)
4. Production Branch: `main`
5. **НЕ** добавляйте переменные окружения пока (добавим после подключения домена)
6. Нажмите "Deploy"

## Шаг 4: Подключите домен

1. В Vercel: Settings → Domains
2. Добавьте ваш домен
3. Настройте DNS по инструкциям Vercel
4. Дождитесь SSL (1-5 минут)

## Шаг 5: Настройте переменные окружения в Vercel

После подключения домена (например: `gamehubb.store`):

1. Settings → Environment Variables
2. Добавьте:
   - `APP_BASE_URL` = `https://YOUR_DOMAIN`
   - `NEXT_PUBLIC_APP_BASE_URL` = `https://YOUR_DOMAIN`
   - `NEXT_PUBLIC_ALLOW_TG_MOCK` = `0`
3. Redeploy проект

## Шаг 6: Проверка

Проверьте:
- `https://YOUR_DOMAIN/api/build-info` → должен вернуть JSON
- `https://YOUR_DOMAIN/debug` → должна открыться страница
- `https://YOUR_DOMAIN/catalog` → должна открыться страница с ErrorPanel

## Шаг 7: Обновите Telegram WebApp URL

1. Откройте @BotFather в Telegram
2. `/mybots` → выберите `@GameHubb_TopUp_bot`
3. "Bot Settings" → "Menu Button"
4. URL: `https://YOUR_DOMAIN`
5. Сохраните

## Шаг 8: Проверка в Telegram

1. Откройте `@GameHubb_TopUp_bot`
2. Нажмите Menu Button
3. Перейдите на `/debug`
4. Проверьте: "Telegram InitData" должен быть **present**

---

**После завершения пришлите:**
- URL прод-домена
- Ссылку на GitHub repo
- Скриншот /debug из Telegram (где видно initData present)

