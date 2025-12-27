'use client';

import { type PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import { OutsideTelegram } from '@/components/OutsideTelegram';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { StartParamRouter } from '@/components/StartParamRouter';
import { useDidMount } from '@/hooks/useDidMount';
import { detectTelegramEnv } from '@/lib/telegram/detect';
import { getTelegramWebApp } from '@/lib/telegram/env';

// Dynamic import TelegramApp с ssr: false, чтобы код не выполнялся на сервере
// и не бандлился для путей, где он не нужен
const TelegramApp = dynamic(() => import('./TelegramApp').then(m => ({ default: m.TelegramApp })), {
  ssr: false,
});

type AppearanceContextType = {
  appearance: 'light' | 'dark';
  platform: 'ios' | 'base';
  setAppearance: (appearance: 'light' | 'dark') => void;
  setPlatform: (platform: 'ios' | 'base') => void;
};

const AppearanceContext = createContext<AppearanceContextType | null>(null);

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within Providers');
  }
  return context;
}

/**
 * Root providers component that conditionally renders TelegramApp or OutsideTelegram.
 * TelegramApp монтируется ТОЛЬКО внутри Telegram, чтобы избежать вызовов Telegram API вне Mini App.
 */
export function Providers({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [platform, setPlatform] = useState<'ios' | 'base'>('base');
  const didMount = useDidMount();
  const [telegramEnv, setTelegramEnv] = useState<ReturnType<typeof detectTelegramEnv> | null>(null);
  const [useMockMode, setUseMockMode] = useState(false);
  const [shouldBypass, setShouldBypass] = useState<boolean | null>(null);

  // Whitelist путей, которые обходят Telegram guard
  // Проверяем путь как из usePathname, так и из window.location для максимальной надежности
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const currentPath = pathname || window.location.pathname;
    const bypass = 
      currentPath === '/debug' || 
      currentPath.startsWith('/api/health') ||
      window.location.pathname === '/debug' ||
      window.location.pathname.startsWith('/api/health');
    setShouldBypass(bypass);
  }, [pathname]);

  // На сервере или до инициализации - проверяем pathname напрямую
  const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
  const isBypassed = 
    shouldBypass === true ||
    currentPath === '/debug' || 
    currentPath.startsWith('/api/health') ||
    (typeof window !== 'undefined' && (window.location.pathname === '/debug' || window.location.pathname.startsWith('/api/health')));

  // Если путь в whitelist - возвращаем children без проверок Telegram
  if (isBypassed) {
    return <>{children}</>;
  }

  // Проверяем окружение только после монтирования на клиенте
  // Добавляем небольшую задержку, чтобы скрипт Telegram успел создать WebApp
  useEffect(() => {
    if (!didMount) {
      return;
    }

    // Даем скрипту Telegram время на инициализацию
    const checkTelegram = () => {
      const env = detectTelegramEnv();
      setTelegramEnv(env);

      // Если WebApp доступен и мы в Telegram, вызываем ready() и expand()
      if (env.shouldUseTelegram && env.hasWebAppObject) {
        const webApp = getTelegramWebApp();
        if (webApp) {
          try {
            webApp.ready();
            webApp.expand();
          } catch (error) {
            // Игнорируем ошибки, если методы недоступны
            console.warn('Telegram WebApp methods not available:', error);
          }
        }
      }
    };

    // Проверяем сразу и через небольшую задержку
    checkTelegram();
    const timeoutId = setTimeout(checkTelegram, 100);

    return () => clearTimeout(timeoutId);
  }, [didMount]);

  // Пока не определили окружение - показываем загрузку
  if (!didMount || telegramEnv === null) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        Checking Telegram…
      </div>
    );
  }

  // Проверяем query override ?forceMock=1
  const [forceMock, setForceMock] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const allowMock = (process.env.NEXT_PUBLIC_ALLOW_TG_MOCK || 'false') === 'true';
      if (params.get('forceMock') === '1' && allowMock) {
        setForceMock(true);
      }
    }
  }, []);

  // Используем shouldUseTelegram для решения показывать app или OutsideTelegram
  const shouldUseTelegram = telegramEnv.shouldUseTelegram || useMockMode || forceMock;

  // Вне Telegram показываем OutsideTelegram (без AppRoot и без Telegram SDK)
  if (!shouldUseTelegram) {
    return (
      <ErrorBoundary fallback={ErrorPage}>
        <OutsideTelegram
          onMockMode={() => {
            setUseMockMode(true);
            window.location.reload();
          }}
        />
      </ErrorBoundary>
    );
  }

  // Внутри Telegram (или в mock mode) - монтируем TelegramApp
  // TelegramApp содержит AppRoot и всю Telegram-логику
  const isMockMode = useMockMode || telegramEnv.allowMock;

  // Компонент-обертка для ErrorBoundary fallback
  function TelegramAppErrorFallback({ error }: { error: Error }) {
    // Если TelegramApp упал, показываем OutsideTelegram
    console.warn('TelegramApp failed, showing OutsideTelegram:', error);
    return (
      <ErrorBoundary fallback={ErrorPage}>
        <OutsideTelegram
          onMockMode={() => {
            setUseMockMode(true);
            window.location.reload();
          }}
        />
      </ErrorBoundary>
    );
  }

  return (
    <AppearanceContext.Provider value={{ appearance, platform, setAppearance, setPlatform }}>
      {(isMockMode || forceMock) && !telegramEnv.hasInitData && (
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#fff3cd',
          borderBottom: '1px solid #ffc107',
          textAlign: 'center',
          fontSize: '14px',
          color: '#856404',
        }}>
          ⚠️ Mock mode
        </div>
      )}
      {shouldUseTelegram && <StartParamRouter />}
      <ErrorBoundary fallback={TelegramAppErrorFallback}>
        <TelegramApp>{children}</TelegramApp>
      </ErrorBoundary>
    </AppearanceContext.Provider>
  );
}

