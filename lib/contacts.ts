/**
 * Contact information utilities
 * Reads from environment variables with fallback defaults
 */

export interface ContactInfo {
  email: string;
  supportTgUsername: string | null;
  botTgUsername: string;
}

/**
 * Get contact information from environment variables with fallbacks
 */
export function getContactInfo(): ContactInfo {
  const email = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'gamehubb.store@gmail.com';
  const supportTgUsername = process.env.NEXT_PUBLIC_SUPPORT_TG_USERNAME || null;
  const botTgUsername = process.env.NEXT_PUBLIC_SUPPORT_BOT_USERNAME || 'GameHubb_TopUp_bot';

  return {
    email,
    supportTgUsername: supportTgUsername || null,
    botTgUsername,
  };
}

/**
 * Get Telegram username to display (support if available, otherwise bot)
 */
export function getDisplayTelegramUsername(contactInfo: ContactInfo): string {
  return contactInfo.supportTgUsername || contactInfo.botTgUsername;
}

/**
 * Get Telegram link URL
 */
export function getTelegramLink(username: string): string {
  // Remove @ if present
  const cleanUsername = username.replace(/^@/, '');
  return `https://t.me/${cleanUsername}`;
}

interface TelegramWebApp {
  openTelegramLink?: (url: string) => void;
}

interface TelegramWindow {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}

function getTelegramWebApp(): TelegramWebApp | undefined {
  if (typeof window === 'undefined') return undefined;
  const win = window as unknown as Window & TelegramWindow;
  return win.Telegram?.WebApp;
}

/**
 * Open Telegram link (supports Telegram WebView)
 */
export function openTelegramLink(username: string): void {
  const url = getTelegramLink(username);
  
  // Check if we're in Telegram WebView
  if (typeof window !== 'undefined') {
    const tg = getTelegramWebApp();
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url);
      return;
    }
  }
  
  // Fallback to regular window.open
  window.open(url, '_blank', 'noopener,noreferrer');
}
