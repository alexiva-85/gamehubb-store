'use client';

import { type PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

import { OutsideTelegram } from '@/components/OutsideTelegram';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';

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
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);
  const [useMockMode, setUseMockMode] = useState(false);

  // Whitelist путей, которые обходят Telegram guard
  // /api/health* - это API routes (не проходят через Providers), но на всякий случай оставляем
  const isBypassed = pathname === '/debug' || pathname.startsWith('/api/health');

  // Если путь в whitelist - возвращаем children без проверок Telegram
  if (isBypassed) {
    return <>{children}</>;
  }

  // Проверяем окружение только после монтирования на клиенте
  useEffect(() => {
    if (!didMount) {
      return;
    }

    // Используем window.Telegram?.WebApp как источник правды
    // Проверка выполняется ТОЛЬКО на клиенте
    const tg = (typeof window !== 'undefined' ? (window as any).Telegram : null);
    const webApp = tg?.WebApp;
    const inTelegram = Boolean(webApp);

    setIsTelegram(inTelegram);
  }, [didMount]);

  // Пока не определили окружение - показываем загрузку
  if (!didMount || isTelegram === null) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'system-ui, sans-serif' }}>
        Checking Telegram…
      </div>
    );
  }

  // Проверяем mock mode из env
  const allowMock = (process.env.NEXT_PUBLIC_ALLOW_TG_MOCK || 'false') === 'true';

  // Вне Telegram показываем OutsideTelegram (без AppRoot и без Telegram SDK)
  if (!isTelegram && !useMockMode && !allowMock) {
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
  const isMockMode = useMockMode || allowMock;

  return (
    <AppearanceContext.Provider value={{ appearance, platform, setAppearance, setPlatform }}>
      {isMockMode && !isTelegram && (
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#fff3cd',
          borderBottom: '1px solid #ffc107',
          textAlign: 'center',
          fontSize: '14px',
          color: '#856404',
        }}>
          ⚠️ Mock mode (preview)
        </div>
      )}
      <TelegramApp>{children}</TelegramApp>
    </AppearanceContext.Provider>
  );
}

