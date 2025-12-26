'use client';

import { Cell } from '@telegram-apps/telegram-ui';

type BannerProps = {
  type?: 'error' | 'info' | 'success' | 'warning';
  children: React.ReactNode;
  className?: string;
};

/**
 * Компонент для отображения баннеров с ошибками, информацией и т.д.
 * Использует Telegram-native стили.
 */
export function Banner({ type = 'info', children, className }: BannerProps) {
  const getColor = () => {
    switch (type) {
      case 'error':
        return 'var(--tg-theme-destructive-text-color, #ff3b30)';
      case 'warning':
        return 'var(--tg-theme-hint-color, #ff9500)';
      case 'success':
        return 'var(--tg-theme-link-color, #34c759)';
      default:
        return 'var(--tg-theme-hint-color, #999999)';
    }
  };

  return (
    <div
      className={className}
      style={{
        padding: '12px 16px',
        color: getColor(),
        backgroundColor: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
        borderRadius: '8px',
        margin: '8px 16px',
        fontSize: '14px',
        lineHeight: '1.4',
      }}
    >
      {children}
    </div>
  );
}


