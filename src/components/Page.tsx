'use client';

import { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTelegramMiniApp } from '@/lib/telegram/env';

export function Page({ children, back = true }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default true
   */
  back?: boolean
}>) {
  const router = useRouter();

  // Используем backButton только внутри Telegram
  useEffect(() => {
    if (!isTelegramMiniApp()) {
      return;
    }

    // Динамически импортируем backButton только если мы в Telegram
    import('@tma.js/sdk-react').then(({ backButton }) => {
      if (back) {
        backButton.show();
      } else {
        backButton.hide();
      }

      return backButton.onClick(() => {
        router.back();
      });
    });
  }, [back, router]);

  return <>{children}</>;
}
