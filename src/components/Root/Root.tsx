'use client';

import { type PropsWithChildren } from 'react';

import './styles.css';

/**
 * Root component - теперь просто обёртка для стилей.
 * Вся логика Telegram перенесена в TelegramApp.
 * Providers теперь управляет рендерингом TelegramApp или OutsideTelegram.
 */
export function Root(props: PropsWithChildren) {
  return <>{props.children}</>;
}
