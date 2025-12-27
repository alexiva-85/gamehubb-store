'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { detectTelegramEnv } from '@/lib/telegram/detect';

/**
 * Компонент для обработки start_param из Telegram WebApp.
 * Автоматически редиректит на /debug если start_param=debug.
 */
export function StartParamRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasRedirected) {
      return;
    }

    // Проверяем окружение
    const env = detectTelegramEnv();
    if (!env.shouldUseTelegram) {
      return;
    }

    // Пытаемся получить start_param из window.Telegram.WebApp.initDataUnsafe
    const tg = (window as any).Telegram;
    const webApp = tg?.WebApp;
    let param = webApp?.initDataUnsafe?.start_param;

    // Если не нашли, пытаемся получить через @tma.js/sdk-react (динамически)
    if (!param) {
      import('@tma.js/sdk-react')
        .then(({ retrieveLaunchParams }) => {
          try {
            const lp = retrieveLaunchParams();
            param = lp.tgWebAppStartParam || null;
            
            // Редирект на /debug если start_param=debug и мы не на /debug
            if (param === 'debug' && pathname !== '/debug') {
              router.push('/debug');
              setHasRedirected(true);
            }
          } catch (e) {
            // Игнорируем ошибки
          }
        })
        .catch(() => {
          // Игнорируем ошибки загрузки модуля
        });
    } else {
      // Редирект на /debug если start_param=debug и мы не на /debug
      if (param === 'debug' && pathname !== '/debug') {
        router.push('/debug');
        setHasRedirected(true);
      }
    }
  }, [router, pathname, hasRedirected]);

  return null;
}

