'use client';

import { type PropsWithChildren, useEffect } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { setLocale } from '@/core/i18n/locale';
import { useAppearance } from './providers';

/**
 * TelegramApp - компонент, который монтируется ТОЛЬКО внутри Telegram Mini App.
 * Содержит всю логику инициализации Telegram SDK, провайдеры и хуки.
 * Этот компонент НЕ должен рендериться вне Telegram.
 */
export function TelegramApp({ children }: PropsWithChildren) {
  // Эти хуки могут вызывать Telegram API, поэтому они должны быть только внутри TelegramApp
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);
  const { setAppearance, setPlatform } = useAppearance();

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.language_code);
  }, [initDataUser]);

  // Update appearance and platform in Providers
  useEffect(() => {
    const appearance = isDark ? 'dark' : 'light';
    setAppearance(appearance);
  }, [isDark, setAppearance]);

  useEffect(() => {
    const platform = ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base';
    setPlatform(platform);
  }, [lp.tgWebAppPlatform, setPlatform]);

  // AppRoot должен быть только внутри TelegramApp
  return (
    <ErrorBoundary fallback={ErrorPage}>
      <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
        <AppRoot
          appearance={isDark ? 'dark' : 'light'}
          platform={['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'}
        >
          {children}
        </AppRoot>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}

