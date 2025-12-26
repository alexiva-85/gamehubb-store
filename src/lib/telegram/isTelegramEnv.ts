/**
 * Утилиты для определения, открыт ли мини-апп в Telegram
 */

/**
 * Проверяет, доступен ли объект Telegram.WebApp
 */
export function getTgWebApp(): any | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const tg = (window as any).Telegram;
  return tg?.WebApp || null;
}

/**
 * Проверяет, открыт ли мини-апп в Telegram
 * @returns true если приложение открыто в Telegram, false иначе
 */
export function isTelegramWebApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Основная проверка: наличие window.Telegram?.WebApp
  const tgWebApp = getTgWebApp();
  if (tgWebApp) {
    return true;
  }

  // Запасной вариант: проверка userAgent
  const userAgent = window.navigator?.userAgent || '';
  if (userAgent.includes('Telegram')) {
    return true;
  }

  return false;
}

