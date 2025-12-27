#!/bin/bash

# Скрипт для настройки GitHub remote после создания репозитория
# Использование: ./setup-github.sh YOUR_GITHUB_USERNAME

if [ -z "$1" ]; then
  echo "Использование: ./setup-github.sh YOUR_GITHUB_USERNAME"
  echo "Пример: ./setup-github.sh alexiva-85"
  exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="gamehubb-store"

echo "Настройка GitHub remote для $REPO_NAME..."

# Удаляем старый remote если он есть
if git remote get-url origin &>/dev/null; then
  echo "Удаление старого remote..."
  git remote remove origin
fi

# Добавляем новый remote
echo "Добавление нового remote: https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# Проверяем remote
echo ""
echo "Текущие remotes:"
git remote -v

echo ""
echo "Готово! Теперь выполните:"
echo "  git push -u origin main"
echo ""
echo "Или если репозиторий еще не создан на GitHub:"
echo "  1. Создайте репозиторий на https://github.com/new"
echo "  2. Название: $REPO_NAME"
echo "  3. Видимость: Private"
echo "  4. Затем выполните: git push -u origin main"

