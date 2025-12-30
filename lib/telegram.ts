import crypto from 'crypto';

/**
 * Validate Telegram WebApp initData
 * @param initData - Raw initData string from Telegram.WebApp.initData
 * @param botToken - Telegram bot token from environment
 * @returns true if valid, false otherwise
 */
export function validateTelegramInitData(initData: string, botToken: string): boolean {
  if (!initData || !botToken) {
    return false;
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    // Sort parameters and create data check string
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create secret key from bot token
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Calculate hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram initData:', error);
    return false;
  }
}

/**
 * Extract user data from Telegram initData
 * @param initData - Raw initData string
 * @returns Parsed user data or null
 */
export function parseTelegramUser(initData: string): { id: string; [key: string]: any } | null {
  if (!initData) {
    return null;
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const userParam = urlParams.get('user');

    if (!userParam) {
      return null;
    }

    const user = JSON.parse(decodeURIComponent(userParam));
    return user;
  } catch (error) {
    console.error('Error parsing Telegram user:', error);
    return null;
  }
}

/**
 * Extract start_param from Telegram initData
 * @param initData - Raw initData string
 * @returns start_param value or null
 */
export function getStartParamFromInitData(initData: string): string | null {
  if (!initData) {
    return null;
  }

  try {
    const urlParams = new URLSearchParams(initData);
    return urlParams.get('start_param') || null;
  } catch (error) {
    console.error('Error extracting start_param:', error);
    return null;
  }
}

