'use client';

import { themeParams, useSignal, useLaunchParams } from '@tma.js/sdk-react';
import { useMemo } from 'react';

/**
 * Получает CSS переменные из Telegram theme params.
 * Использует fallback значения для случаев, когда theme params недоступны.
 */
export function getThemeVars(): Record<string, string> {
  if (typeof window === 'undefined') {
    return getDefaultThemeVars();
  }

  // @tma.js/sdk-react уже привязывает CSS переменные через themeParams.bindCssVars()
  // Но мы можем вернуть объект для прямого использования в inline стилях
  return {
    '--tg-theme-bg-color': 'var(--tg-theme-bg-color, #ffffff)',
    '--tg-theme-text-color': 'var(--tg-theme-text-color, #000000)',
    '--tg-theme-hint-color': 'var(--tg-theme-hint-color, #999999)',
    '--tg-theme-link-color': 'var(--tg-theme-link-color, #2481cc)',
    '--tg-theme-button-color': 'var(--tg-theme-button-color, #2481cc)',
    '--tg-theme-button-text-color': 'var(--tg-theme-button-text-color, #ffffff)',
    '--tg-theme-secondary-bg-color': 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
    '--tg-theme-header-bg-color': 'var(--tg-theme-header-bg-color, #ffffff)',
    '--tg-theme-section-bg-color': 'var(--tg-theme-section-bg-color, #ffffff)',
    '--tg-theme-section-header-text-color': 'var(--tg-theme-section-header-text-color, #999999)',
    '--tg-theme-subtitle-text-color': 'var(--tg-theme-subtitle-text-color, #999999)',
    '--tg-theme-destructive-text-color': 'var(--tg-theme-destructive-text-color, #ff3b30)',
  };
}

function getDefaultThemeVars(): Record<string, string> {
  return {
    '--tg-theme-bg-color': '#ffffff',
    '--tg-theme-text-color': '#000000',
    '--tg-theme-hint-color': '#999999',
    '--tg-theme-link-color': '#2481cc',
    '--tg-theme-button-color': '#2481cc',
    '--tg-theme-button-text-color': '#ffffff',
    '--tg-theme-secondary-bg-color': '#f1f1f1',
    '--tg-theme-header-bg-color': '#ffffff',
    '--tg-theme-section-bg-color': '#ffffff',
    '--tg-theme-section-header-text-color': '#999999',
    '--tg-theme-subtitle-text-color': '#999999',
    '--tg-theme-destructive-text-color': '#ff3b30',
  };
}

/**
 * Hook для получения текущих theme params в компонентах.
 */
export function useThemeParams() {
  const tp = useSignal(themeParams.state);
  const lp = useLaunchParams();

  return useMemo(() => {
    const state = tp || {};
    const hasState = Object.keys(state).length > 0;

    if (hasState) {
      return state;
    }

    // Fallback to launch params theme params
    return lp.tgWebAppThemeParams || {};
  }, [tp, lp.tgWebAppThemeParams]);
}


