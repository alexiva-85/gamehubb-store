'use client';

export function getInitData(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  // Prefer real Telegram WebApp initData if available.
  const tg = (window as any).Telegram;
  const initData: string | undefined = tg?.WebApp?.initData;

  if (initData && typeof initData === 'string' && initData.length > 0) {
    return initData;
  }

  // Fallback: allow passing initData via search param during local development.
  const url = new URL(window.location.href);
  const fromQuery = url.searchParams.get('initData');

  return fromQuery && fromQuery.length > 0 ? fromQuery : null;
}

export function openExternal(url: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const tg = (window as any).Telegram;
    const webApp = tg?.WebApp;

    if (webApp && typeof webApp.openLink === 'function') {
      webApp.openLink(url);
      return;
    }
  } catch {
    // Ignore and fallback to window.open.
  }

  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Копирует текст в буфер обмена.
 * Использует Telegram WebApp API если доступен, иначе fallback на Clipboard API.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const tg = (window as any).Telegram;
    const webApp = tg?.WebApp;

    // Telegram WebApp API для копирования
    if (webApp && typeof webApp.ready === 'function') {
      webApp.ready();
      if (typeof webApp.sendData === 'function') {
        // Используем Clipboard API как fallback, так как Telegram WebApp не имеет прямого метода копирования
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          await navigator.clipboard.writeText(text);
          // Показываем уведомление через Telegram WebApp
          if (webApp.showAlert) {
            webApp.showAlert('Текст скопирован в буфер обмена');
          }
          return true;
        }
      }
    }

    // Fallback: стандартный Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback для старых браузеров
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Открывает Telegram бота поддержки или копирует текст для поддержки.
 */
export function openSupport(text?: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const supportBot = process.env.NEXT_PUBLIC_SUPPORT_BOT_USERNAME || 'support';
  const supportUrl = `https://t.me/${supportBot}`;

  if (text) {
    // Копируем текст и открываем бота
    copyToClipboard(text).then(() => {
      openExternal(supportUrl);
    });
  } else {
    openExternal(supportUrl);
  }
}


