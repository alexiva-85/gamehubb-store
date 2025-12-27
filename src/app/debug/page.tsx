'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectTelegramEnv } from '@/lib/telegram/detect';
import { BuildInfo } from '@/components/BuildInfo';

/**
 * Debug page for diagnosing Telegram WebApp detection.
 * Shows safe diagnostic information without exposing sensitive data.
 */
export default function DebugPage() {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<ReturnType<typeof detectTelegramEnv> & {
    initDataLength: number;
    platform: string;
    version: string;
    startParam: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const env = detectTelegramEnv();
    const tg = (window as any).Telegram;
    const webApp = tg?.WebApp;
    
    // Получаем startParam из initDataUnsafe или через retrieveLaunchParams
    let startParam = webApp?.initDataUnsafe?.start_param ?? '';
    
    // Если не нашли, пытаемся получить через @tma.js/sdk-react
    if (!startParam && env.shouldUseTelegram) {
      import('@tma.js/sdk-react')
        .then(({ retrieveLaunchParams }) => {
          try {
            const lp = retrieveLaunchParams();
            startParam = lp.tgWebAppStartParam || '';
            setDebugInfo({
              ...env,
              initDataLength: env.initDataLength,
              platform: webApp?.platform ?? 'unknown',
              version: webApp?.version ?? 'unknown',
              startParam,
            });
          } catch (e) {
            // Игнорируем ошибки
          }
        })
        .catch(() => {
          // Игнорируем ошибки загрузки модуля
        });
    }

    setDebugInfo({
      ...env,
      initDataLength: env.initDataLength,
      platform: webApp?.platform ?? 'unknown',
      version: webApp?.version ?? 'unknown',
      startParam,
    });
  }, []);

  return (
    <div style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Telegram WebApp Debug
      </h1>

      {debugInfo === null ? (
        <p>Loading debug information...</p>
      ) : (
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
              Detection Status
            </h2>
            <div style={{ display: 'grid', gap: '8px', fontFamily: 'monospace', fontSize: '14px' }}>
              <div>
                <strong>shouldUseTelegram:</strong>{' '}
                <span style={{ color: debugInfo.shouldUseTelegram ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.shouldUseTelegram)}
                </span>
              </div>
              <div>
                <strong>hasWebAppObject:</strong>{' '}
                <span style={{ color: debugInfo.hasWebAppObject ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasWebAppObject)}
                </span>
              </div>
              <div>
                <strong>uaHasTelegram:</strong>{' '}
                <span style={{ color: debugInfo.uaHasTelegram ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.uaHasTelegram)}
                </span>
              </div>
              <div>
                <strong>hasTgParamsInUrl:</strong>{' '}
                <span style={{ color: debugInfo.hasTgParamsInUrl ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasTgParamsInUrl)}
                </span>
              </div>
              <div>
                <strong>hasWebviewProxy:</strong>{' '}
                <span style={{ color: debugInfo.hasWebviewProxy ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasWebviewProxy)}
                </span>
              </div>
              <div>
                <strong>hasInitData:</strong>{' '}
                <span style={{ color: debugInfo.hasInitData ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasInitData)}
                </span>
              </div>
              <div>
                <strong>allowMock:</strong>{' '}
                <span style={{ color: debugInfo.allowMock ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.allowMock)}
                </span>
              </div>
              <div>
                <strong>initDataLength:</strong> {debugInfo.initDataLength}
              </div>
              <div>
                <strong>platform:</strong> {debugInfo.platform}
              </div>
              <div>
                <strong>version:</strong> {debugInfo.version}
              </div>
              <div>
                <strong>startParam:</strong> {debugInfo.startParam || '(empty)'}
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: debugInfo.shouldUseTelegram ? '#d4edda' : '#f8d7da',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
          }}>
            <strong>Status:</strong>{' '}
            {debugInfo.shouldUseTelegram
              ? '✅ Telegram WebApp detected (will use TelegramApp)'
              : debugInfo.hasWebAppObject && !debugInfo.hasInitData
              ? '⚠️ WebApp object present but no initData (likely opened in browser)'
              : '❌ Not in Telegram environment (will show OutsideTelegram)'}
          </div>
        </div>
      )}

      <div>
        <button
          onClick={() => router.push('/catalog')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#0088cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '500',
          }}
        >
          Open catalog
        </button>
      </div>
      <BuildInfo />
    </div>
  );
}

