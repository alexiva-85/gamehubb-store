# Инструкции по деплою M0.1

## A) GitHub

### 1. Создание репозитория

1. Перейдите на https://github.com/new
2. Repository name: `gamehubb-store`
3. Description: `GameHubb Store - Telegram Mini App`
4. Visibility: **Private**
5. НЕ добавляйте README, .gitignore или license (они уже есть)
6. Нажмите "Create repository"

### 2. Настройка git remote

После создания репозитория выполните:

```bash
# Удалить старый remote (если нужно)
git remote remove origin

# Добавить новый remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gamehubb-store.git

# Или если используете SSH:
# git remote add origin git@github.com:YOUR_USERNAME/gamehubb-store.git

# Запушить код
git push -u origin main
```

## B) Vercel

### 1. Создание проекта

1. Перейдите на https://vercel.com/new
2. Import Git Repository → выберите `gamehubb-store`
3. Project Name: `gamehubb-store` (или оставьте по умолчанию)
4. Framework Preset: Next.js (должен определиться автоматически)
5. Root Directory: `./` (по умолчанию)
6. Build Command: `pnpm build` (или оставьте по умолчанию)
7. Output Directory: `.next` (по умолчанию)
8. Install Command: `pnpm install` (или оставьте по умолчанию)
9. Production Branch: `main`

### 2. Переменные окружения

В настройках проекта (Settings → Environment Variables) добавьте:

```
APP_BASE_URL=https://YOUR_DOMAIN.com
NEXT_PUBLIC_APP_BASE_URL=https://YOUR_DOMAIN.com
NEXT_PUBLIC_ALLOW_TG_MOCK=0
```

**Важно:** Замените `YOUR_DOMAIN.com` на ваш реальный домен после его подключения.

### 3. Первый деплой

После настройки переменных окружения:
1. Перейдите на вкладку "Deployments"
2. Нажмите "Redeploy" на последнем деплое (или он запустится автоматически после push)

## C) Domain

### 1. Подключение домена

1. В настройках проекта Vercel перейдите в Settings → Domains
2. Добавьте ваш домен (например: `gamehubb.store` или `store.gamehubb.com`)
3. Следуйте инструкциям Vercel для настройки DNS записей:
   - Для apex domain (example.com): добавьте A record
   - Для subdomain (www.example.com): добавьте CNAME record
4. Дождитесь проверки SSL (обычно 1-5 минут)

### 2. Обновление переменных окружения

После подключения домена обновите переменные окружения в Vercel:
- `APP_BASE_URL=https://YOUR_ACTUAL_DOMAIN`
- `NEXT_PUBLIC_APP_BASE_URL=https://YOUR_ACTUAL_DOMAIN`

И выполните Redeploy.

## D) Проверка

Проверьте в проде (замените на ваш домен):

- `https://YOUR_DOMAIN/api/build-info` - должен вернуть 200 и JSON
- `https://YOUR_DOMAIN/debug` - должен вернуть 200
- `https://YOUR_DOMAIN/catalog` - должен вернуть 200

## E) Telegram

### Обновление WebApp URL в BotFather

1. Откройте Telegram и найдите @BotFather
2. Отправьте команду `/mybots`
3. Выберите `@GameHubb_TopUp_bot`
4. Выберите "Bot Settings" → "Menu Button"
5. Введите URL: `https://YOUR_DOMAIN`
6. Сохраните изменения

### Проверка в Telegram

1. Откройте бота `@GameHubb_TopUp_bot` в Telegram
2. Нажмите на кнопку меню (Menu Button) или отправьте команду `/start`
3. Перейдите на `/debug`
4. Проверьте, что "Telegram InitData" показывает "present"

## Результат

После выполнения всех шагов у вас будет:
- ✅ GitHub репозиторий: `https://github.com/YOUR_USERNAME/gamehubb-store`
- ✅ Vercel проект с деплоем
- ✅ Подключенный домен с SSL
- ✅ Работающий Telegram WebApp

