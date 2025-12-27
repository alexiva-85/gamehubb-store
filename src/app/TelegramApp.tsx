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
 * 
 * Хуки из @tma.js/sdk-react могут бросать ошибки вне Telegram,
 * но они обернуты в ErrorBoundary, который поймает ошибки и покажет ErrorPage.
 * Providers уже проверяет окружение перед рендерингом этого компонента.
 */
export function TelegramApp({ children }: PropsWithChildren) {
  // Хуки должны вызываться на верхнем уровне компонента
  // Если они бросают ошибку, ErrorBoundary на уровне Providers поймает её
  // и покажет OutsideTelegram
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);
  const { setAppearance, setPlatform } = useAppearance();

  // Set the user locale.
  useEffect(() => {
    if (initDataUser) {
      try {
        setLocale(initDataUser.language_code);
      } catch (e) {
        console.warn('Failed to set locale:', e);
      }
    }
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


