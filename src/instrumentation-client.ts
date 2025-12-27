// This file is normally used for setting up analytics and other
// services that require one-time initialization on the client.

// Проверяем окружение ДО любых вызовов Telegram API
// Полностью отключаем instrumentation вне Telegram, чтобы не загружать bridge
if (typeof window !== 'undefined') {
  // Используем строгую детекцию Telegram WebView
  // Импортируем динамически, чтобы не загружать модуль вне Telegram
  import('./lib/telegram/detect').then(({ detectTelegramEnv }) => {
    const env = detectTelegramEnv();

    // Полностью отключаем вне Telegram - не загружаем никакие модули bridge
    // Инициализация Telegram SDK происходит только внутри TelegramApp компонента
    // Здесь мы только проверяем окружение и решаем, нужно ли инициализировать SDK
    // НЕ вызываем retrieveLaunchParams если не в Telegram и не в mock режиме
    // Запускаем init/retrieveLaunchParams ТОЛЬКО если shouldUseTelegram===true
    if (!env.shouldUseTelegram) {
      return;
    }

    // Динамически импортируем инициализацию только если нужно
    import('./core/init').then(({ init }) => {
      import('./mockEnv').then(({ mockEnv }) => {
        import('@tma.js/sdk-react').then(({ retrieveLaunchParams }) => {
          mockEnv().then(() => {
            try {
              // Дополнительная проверка перед вызовом retrieveLaunchParams
              // Повторно проверяем shouldUseTelegram на случай изменения окружения
              const currentEnv = detectTelegramEnv();
              if (!currentEnv.shouldUseTelegram) {
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
        });
      });
    });
  });
}
