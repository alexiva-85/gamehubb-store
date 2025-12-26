'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
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
import { OutsideTelegram } from '@/components/OutsideTelegram';
import { useDidMount } from '@/hooks/useDidMount';
import { setLocale } from '@/core/i18n/locale';
import { isTelegramWebApp } from '@/lib/telegram/isTelegramEnv';

import './styles.css';

type RootInnerProps = PropsWithChildren<{
  onAppearanceChange?: (appearance: 'light' | 'dark') => void;
  onPlatformChange?: (platform: 'ios' | 'base') => void;
}>;

function RootInner({ children, onAppearanceChange, onPlatformChange }: RootInnerProps) {
  // These hooks may throw if SDK is not initialized, but ErrorBoundary will catch
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.language_code);
  }, [initDataUser]);

  // Update appearance and platform in parent
  useEffect(() => {
    const appearance = isDark ? 'dark' : 'light';
    onAppearanceChange?.(appearance);
  }, [isDark, onAppearanceChange]);

  useEffect(() => {
    const platform = ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base';
    onPlatformChange?.(platform);
  }, [lp.tgWebAppPlatform, onPlatformChange]);

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      {children}
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();
  const [useMockMode, setUseMockMode] = useState(false);
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [platform, setPlatform] = useState<'ios' | 'base'>('base');

  // Check if we're in Telegram environment only after mount
  useEffect(() => {
    if (didMount) {
      setIsTelegram(isTelegramWebApp());
    }
  }, [didMount]);

  // Handlers to update appearance and platform from RootInner
  const handleAppearanceChange = (appearance: 'light' | 'dark') => {
    setAppearance(appearance);
  };

  const handlePlatformChange = (platform: 'ios' | 'base') => {
    setPlatform(platform);
  };

  // AppRoot must wrap everything to prevent TGUI errors
  // It should be the outermost container for all TGUI components
  return (
    <AppRoot appearance={appearance} platform={platform}>
      {!didMount || isTelegram === null ? (
        <div className="root__loading">Loading</div>
      ) : !isTelegram && !useMockMode ? (
        <ErrorBoundary fallback={ErrorPage}>
          <OutsideTelegram
            onMockMode={() => {
              setUseMockMode(true);
              // Reload page to apply mock mode
              window.location.reload();
            }}
          />
        </ErrorBoundary>
      ) : (
        <ErrorBoundary fallback={ErrorPage}>
          <RootInner
            {...props}
            onAppearanceChange={handleAppearanceChange}
            onPlatformChange={handlePlatformChange}
          />
        </ErrorBoundary>
      )}
    </AppRoot>
  );
}
