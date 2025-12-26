/**
 * Единый детектор окружения Telegram Mini App
 */

/**
 * Проверяет наличие tgWebAppData в URL (hash или search)
 */
function hasTgWebAppDataInUrl(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  return hash.includes('tgWebAppData=') || search.includes('tgWebAppData=');
}

/**
 * Проверяет, открыт ли мини-апп в Telegram
 * Учитывает:
 * - window.Telegram?.WebApp (официальный скрипт)
 * - window.TelegramWebviewProxy (WebView proxy)
 * - tgWebAppData в URL (hash или search)
 * @returns true если приложение открыто в Telegram, false иначе
 */
export function isTelegramMiniApp(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const hasWebAppObject = Boolean((window as any).Telegram?.WebApp);
  const hasWebviewProxy = Boolean((window as any).TelegramWebviewProxy);
  const hasTgWebAppData = hasTgWebAppDataInUrl();
  
  return hasWebAppObject || hasWebviewProxy || hasTgWebAppData;
}

/**
 * Получает объект Telegram WebApp, если он доступен
 */
export function getTelegramWebApp(): any {
  if (typeof window === 'undefined') {
    return null;
  }
  return (window as any).Telegram?.WebApp || null;
}

