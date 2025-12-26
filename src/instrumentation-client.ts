// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.

import { isTelegramMiniApp } from './lib/telegram/env';

// Проверяем окружение ДО любых вызовов Telegram API
if (typeof window !== 'undefined') {
  const isTelegram = isTelegramMiniApp();
  const allowMock = process.env.NEXT_PUBLIC_ALLOW_TG_MOCK === 'true';

  // Инициализация Telegram SDK происходит только внутри TelegramApp компонента
  // Здесь мы только проверяем окружение и решаем, нужно ли инициализировать SDK
  if (isTelegram || allowMock) {
    // Динамически импортируем инициализацию только если нужно
    import('./core/init').then(({ init }) => {
      import('./mockEnv').then(({ mockEnv }) => {
        import('@tma.js/sdk-react').then(({ retrieveLaunchParams }) => {
          mockEnv().then(() => {
            try {
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
        });
      });
    });
  }
}
