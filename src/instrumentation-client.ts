// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.

import { retrieveLaunchParams } from '@tma.js/sdk-react';
import { init } from './core/init';
import { mockEnv } from './mockEnv';
import { isTelegramWebApp } from './lib/telegram/isTelegramEnv';

mockEnv().then(() => {
  try {
    // Check if we're in Telegram environment
    const isTelegram = isTelegramWebApp();
    const allowMock = process.env.NEXT_PUBLIC_ALLOW_TG_MOCK === 'true';

    // If not in Telegram and mock mode is not allowed, skip initialization
    // The UI will handle showing the fallback screen
    if (!isTelegram && !allowMock) {
      return;
    }

    const launchParams = retrieveLaunchParams();
    const { tgWebAppPlatform: platform } = launchParams;
    const debug =
      (launchParams.tgWebAppStartParam || '').includes('debug') ||
      process.env.NODE_ENV === 'development';

    // Configure all application dependencies.
    init({
      debug,
      eruda: debug && ['ios', 'android'].includes(platform),
      mockForMacOS: platform === 'macos',
    });
  } catch (e) {
    // Gracefully handle errors - don't crash the app
    console.warn('Failed to initialize Telegram SDK:', e);
  }
});
