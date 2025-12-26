'use client';

import { type PropsWithChildren, createContext, useContext, useState, useEffect } from 'react';
import { AppRoot } from '@telegram-apps/telegram-ui';

import { Root } from '@/components/Root/Root';

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
 * Root providers component that wraps the entire app with AppRoot.
 * This ensures all @telegram-apps/telegram-ui components are always within AppRoot.
 */
export function Providers({ children }: PropsWithChildren) {
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');
  const [platform, setPlatform] = useState<'ios' | 'base'>('base');

  // AppRoot must be the outermost container for all TGUI components
  // It wraps everything including Root component
  return (
    <AppearanceContext.Provider value={{ appearance, platform, setAppearance, setPlatform }}>
      <AppRoot appearance={appearance} platform={platform}>
        <Root>{children}</Root>
      </AppRoot>
    </AppearanceContext.Provider>
  );
}

