'use client';

import { type PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { OutsideTelegram } from '@/components/OutsideTelegram';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useDidMount } from '@/hooks/useDidMount';
import { isTelegramMiniApp } from '@/lib/telegram/env';

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
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [platform, setPlatform] = useState<'ios' | 'base'>('base');
  const didMount = useDidMount();
  const [isTelegram, setIsTelegram] = useState<boolean | null>(null);
  const [useMockMode, setUseMockMode] = useState(false);

  // Проверяем окружение только после монтирования
  useEffect(() => {
    if (didMount) {
      setIsTelegram(isTelegramMiniApp());
    }
  }, [didMount]);

  // Пока не определили окружение - показываем загрузку
  if (!didMount || isTelegram === null) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;
  }

  // Вне Telegram показываем OutsideTelegram (без AppRoot и без Telegram SDK)
  if (!isTelegram && !useMockMode) {
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
  return (
    <AppearanceContext.Provider value={{ appearance, platform, setAppearance, setPlatform }}>
      <TelegramApp>{children}</TelegramApp>
    </AppearanceContext.Provider>
  );
}

