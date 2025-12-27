/**
 * Строгая детекция окружения Telegram WebView.
 * Используется для предотвращения ложных срабатываний в обычных браузерах.
 * 
 * Важно: НЕ считаем "мы в Telegram" по факту window.Telegram?.WebApp (это ложноположительно).
 * Основное условие "мы реально в Telegram WebView":
 * - window.Telegram?.WebApp?.initData существует и длина > 0
 * ИЛИ
 * - в URL есть tgWebAppData / tgWebAppVersion / tgWebAppPlatform
 * ИЛИ
 * - есть window.TelegramWebviewProxy
 */

export interface TelegramEnvDetection {
  hasWebAppObject: boolean; // Для debug только
  hasInitData: boolean;
  initDataLength: number;
  allowMock: boolean;
  shouldUseTelegram: boolean;
  // Debug flags
  uaHasTelegram: boolean;
  hasTgParamsInUrl: boolean;
  hasWebviewProxy: boolean;
}

/**
 * Проверяет наличие window.Telegram?.WebApp объекта
 */
function checkWebAppObject(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return !!(window as any).Telegram?.WebApp;
}

/**
 * Проверяет userAgent на наличие "Telegram"
 */
function checkUserAgent(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  return /Telegram/i.test(navigator.userAgent);
}

/**
 * Проверяет URL на наличие параметров Telegram WebApp
 */
function checkUrlParams(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const search = window.location.search || '';
  const hash = window.location.hash || '';
  const combined = search + hash;
  
  return (
    combined.includes('tgWebAppData=') ||
    combined.includes('tgWebAppVersion=') ||
    combined.includes('tgWebAppPlatform=')
  );
}

/**
 * Проверяет наличие initData в window.Telegram?.WebApp
 * Возвращает объект с hasInitData и initDataLength
 */
function checkInitData(): { hasInitData: boolean; initDataLength: number } {
  if (typeof window === 'undefined') {
    return { hasInitData: false, initDataLength: 0 };
  }
  const webApp = (window as any).Telegram?.WebApp;
  if (!webApp) {
    return { hasInitData: false, initDataLength: 0 };
  }
  const initData = webApp.initData;
  const hasInitData = typeof initData === 'string' && initData.length > 0;
  const initDataLength = hasInitData ? initData.length : 0;
  return { hasInitData, initDataLength };
}

/**
 * Проверяет наличие TelegramWebviewProxy или Telegram?.WebView
 */
function checkWebviewProxy(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return !!(
    (window as any).TelegramWebviewProxy ||
    (window as any).Telegram?.WebView
  );
}

/**
 * Строгая детекция окружения Telegram WebView.
 * 
 * Раздельные понятия:
 * - hasWebAppObject = !!window.Telegram?.WebApp (может быть true даже вне Telegram)
 * - hasInitData = (window.Telegram?.WebApp?.initData?.length ?? 0) > 0
 * - hasTgParamsInUrl = наличие tgWebAppData/tgWebAppVersion/tgWebAppPlatform в search или hash
 * - hasWebviewProxy = !!(window.TelegramWebviewProxy || window.Telegram?.WebView)
 * - uaHasTelegram = /Telegram/i.test(navigator.userAgent)
 * 
 * isTelegramWebView = hasInitData || hasTgParamsInUrl || hasWebviewProxy || uaHasTelegram
 * 
 * Новое итоговое правило:
 * shouldUseTelegram = allowMock || (isTelegramWebView && hasInitData)
 * 
 * Пояснение: запуск Mini App должен давать initData. Без initData считаем, что это НЕ запуск из бота.
 */
export function detectTelegramEnv(): TelegramEnvDetection {
  if (typeof window === 'undefined') {
    return {
      hasWebAppObject: false,
      hasInitData: false,
      initDataLength: 0,
      allowMock: false,
      shouldUseTelegram: false,
      uaHasTelegram: false,
      hasTgParamsInUrl: false,
      hasWebviewProxy: false,
    };
  }

  const hasWebAppObject = checkWebAppObject(); // Только для debug
  const { hasInitData, initDataLength } = checkInitData();
  const hasTgParamsInUrl = checkUrlParams();
  const hasWebviewProxy = checkWebviewProxy();
  const uaHasTelegram = checkUserAgent();
  const allowMock = (process.env.NEXT_PUBLIC_ALLOW_TG_MOCK || 'false') === 'true';

  // Основное условие "мы реально в Telegram WebView":
  // - window.Telegram?.WebApp?.initData существует и длина > 0
  // ИЛИ
  // - в URL есть tgWebAppData / tgWebAppVersion / tgWebAppPlatform
  // ИЛИ
  // - есть window.TelegramWebviewProxy
  // НЕ используем uaHasTelegram и hasWebAppObject для определения shouldUseTelegram
  const shouldUseTelegram = allowMock || hasInitData || hasTgParamsInUrl || hasWebviewProxy;

  return {
    hasWebAppObject, // Только для debug
    hasInitData,
    initDataLength,
    allowMock,
    shouldUseTelegram,
    uaHasTelegram,
    hasTgParamsInUrl,
    hasWebviewProxy,
  };
}

