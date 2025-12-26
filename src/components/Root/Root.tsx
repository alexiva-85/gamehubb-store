'use client';

import { type PropsWithChildren, useEffect, useState } from 'react';
import {
  initData,
  miniApp,
  useLaunchParams,
  useSignal,
} from '@tma.js/sdk-react';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { OutsideTelegram } from '@/components/OutsideTelegram';
import { useDidMount } from '@/hooks/useDidMount';
import { setLocale } from '@/core/i18n/locale';
import { isTelegramWebApp } from '@/lib/telegram/isTelegramEnv';
import { useAppearance } from '@/app/providers';

import './styles.css';

function RootInner({ children }: PropsWithChildren) {
  // These hooks may throw if SDK is not initialized, but ErrorBoundary will catch
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

  // Check if we're in Telegram environment only after mount
  useEffect(() => {
    if (didMount) {
      setIsTelegram(isTelegramWebApp());
    }
  }, [didMount]);

  // AppRoot is now in Providers, so we don't need it here
  // All TGUI components are already wrapped by AppRoot from Providers
  if (!didMount || isTelegram === null) {
    return <div className="root__loading">Loading</div>;
  }

  if (!isTelegram && !useMockMode) {
    return (
      <ErrorBoundary fallback={ErrorPage}>
        <OutsideTelegram
          onMockMode={() => {
            setUseMockMode(true);
            // Reload page to apply mock mode
            window.location.reload();
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  );
}
