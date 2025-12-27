/**
 * Initializes the application and configures its dependencies.
 * Все импорты из @tma.js/sdk-react делаются динамически, чтобы не загружать bridge вне Telegram.
 */
export async function init(options: {
  debug: boolean;
  eruda: boolean;
  mockForMacOS: boolean;
}): Promise<void> {
  // Используем строгую детекцию Telegram WebView
  const { detectTelegramEnv } = await import('@/lib/telegram/detect');
  const env = detectTelegramEnv();

  // Запускаем init/retrieveLaunchParams ТОЛЬКО если shouldUseTelegram===true
  if (!env.shouldUseTelegram) {
    return;
  }

  // Динамически импортируем все из @tma.js/sdk-react только если мы в Telegram
  const {
    setDebug,
    backButton,
    initData,
    init: initSDK,
    miniApp,
    viewport,
    mockTelegramEnv,
    themeParams,
    retrieveLaunchParams,
    emitEvent,
  } = await import('@tma.js/sdk-react');

  type ThemeParams = import('@tma.js/sdk-react').ThemeParams;

  try {
    // Set @tma.js/sdk-react debug mode and initialize it.
    setDebug(options.debug);
    initSDK();
  } catch (e) {
    console.warn('Failed to initialize Telegram SDK:', e);
    return;
  }

  // Add Eruda if needed.
  if (options.eruda) {
    try {
      void import('eruda').then(({ default: eruda }) => {
        eruda.init();
        eruda.position({ x: window.innerWidth - 50, y: 0 });
      });
    } catch (e) {
      console.warn('Failed to initialize Eruda:', e);
    }
  }

  // Telegram for macOS has a ton of bugs, including cases, when the client doesn't
  // even response to the "web_app_request_theme" method. It also generates an incorrect
  // event for the "web_app_request_safe_area" method.
  if (options.mockForMacOS) {
    try {
      let firstThemeSent = false;
      mockTelegramEnv({
        onEvent(event, next) {
          if (event.name === 'web_app_request_theme') {
            let tp: Partial<ThemeParams> = {};
            if (firstThemeSent) {
              const state = themeParams.state;
              tp = state as Partial<ThemeParams>;
            } else {
              firstThemeSent = true;
              try {
                const lp = retrieveLaunchParams();
                tp = (lp.tgWebAppThemeParams || {}) as Partial<ThemeParams>;
              } catch (e) {
                console.warn('Failed to retrieve launch params:', e);
              }
            }
            return emitEvent('theme_changed', { theme_params: tp as any });
          }

          if (event.name === 'web_app_request_safe_area') {
            return emitEvent('safe_area_changed', {
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            });
          }

          next();
        },
      });
    } catch (e) {
      console.warn('Failed to setup mock Telegram env:', e);
    }
  }

  // Mount all components used in the project.
  try {
    backButton.mount();
  } catch (e) {
    console.warn('Failed to mount backButton:', e);
  }

  try {
    initData.restore();
  } catch (e) {
    console.warn('Failed to restore initData:', e);
  }

  try {
    miniApp.mount();
    themeParams.bindCssVars();
  } catch (e) {
    // miniApp not available
    console.warn('Failed to mount miniApp:', e);
  }

  try {
    viewport.mount().then(() => {
      viewport.bindCssVars();
    });
  } catch (e) {
    // viewport not available
    console.warn('Failed to mount viewport:', e);
  }
}
