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

function RootInner({ children }: PropsWithChildren) {
  const lp = useLaunchParams();

  const isDark = useSignal(miniApp.isDark);
  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    initDataUser && setLocale(initDataUser.language_code);
  }, [initDataUser]);

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <AppRoot
        appearance={isDark ? 'dark' : 'light'}
        platform={
          ['macos', 'ios'].includes(lp.tgWebAppPlatform) ? 'ios' : 'base'
        }
      >
        {children}
      </AppRoot>
    </TonConnectUIProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of
  // the Server Side Rendering. That's why we are showing loader on the server
  // side.
  const didMount = useDidMount();
  const [useMockMode, setUseMockMode] = useState(false);

  // Check if we're in Telegram environment
  const isTelegram = isTelegramWebApp();

  // If not in Telegram and mock mode is not enabled, show fallback
  if (didMount && !isTelegram && !useMockMode) {
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

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div className="root__loading">Loading</div>
  );
}
