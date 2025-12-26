/**
 * Единый детектор окружения Telegram Mini App
 */

/**
 * Проверяет, открыт ли мини-апп в Telegram
 * @returns true если приложение открыто в Telegram, false иначе
 */
export function isTelegramMiniApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return Boolean((window as any).Telegram?.WebApp);
}

