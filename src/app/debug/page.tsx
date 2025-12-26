'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Debug page for diagnosing Telegram WebApp detection.
 * Shows safe diagnostic information without exposing sensitive data.
 */
export default function DebugPage() {
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<{
    inTelegram: boolean;
    hasWebAppObject: boolean;
    hasWebviewProxy: boolean;
    hasTgWebAppDataInUrl: boolean;
    hasInitData: boolean;
    initDataLength: number;
    platform: string;
    version: string;
    startParam: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const tg = (window as any).Telegram;
    const webApp = tg?.WebApp;
    const hasWebAppObject = Boolean(webApp);
    const hasWebviewProxy = Boolean((window as any).TelegramWebviewProxy);
    
    // Проверяем tgWebAppData в URL
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const hasTgWebAppDataInUrl = hash.includes('tgWebAppData=') || search.includes('tgWebAppData=');
    
    // Определяем inTelegram
    const inTelegram = hasWebAppObject || hasWebviewProxy || hasTgWebAppDataInUrl;
    
    // Определяем hasInitData и initDataLength
    let hasInitData = false;
    let initDataLength = 0;
    
    if (webApp?.initData) {
      hasInitData = true;
      initDataLength = webApp.initData.length;
    } else if (hasTgWebAppDataInUrl) {
      // Извлекаем tgWebAppData из URL для подсчета длины
      const tgWebAppDataMatch = (hash + search).match(/tgWebAppData=([^&]+)/);
      if (tgWebAppDataMatch && tgWebAppDataMatch[1]) {
        hasInitData = true;
        initDataLength = tgWebAppDataMatch[1].length;
      }
    }

    setDebugInfo({
      inTelegram,
      hasWebAppObject,
      hasWebviewProxy,
      hasTgWebAppDataInUrl,
      hasInitData,
      initDataLength,
      platform: webApp?.platform ?? 'unknown',
      version: webApp?.version ?? 'unknown',
      startParam: webApp?.initDataUnsafe?.start_param ?? '',
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
                <strong>inTelegram:</strong>{' '}
                <span style={{ color: debugInfo.inTelegram ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.inTelegram)}
                </span>
              </div>
              <div>
                <strong>hasWebAppObject:</strong>{' '}
                <span style={{ color: debugInfo.hasWebAppObject ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasWebAppObject)}
                </span>
              </div>
              <div>
                <strong>hasWebviewProxy:</strong>{' '}
                <span style={{ color: debugInfo.hasWebviewProxy ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasWebviewProxy)}
                </span>
              </div>
              <div>
                <strong>hasTgWebAppDataInUrl:</strong>{' '}
                <span style={{ color: debugInfo.hasTgWebAppDataInUrl ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasTgWebAppDataInUrl)}
                </span>
              </div>
              <div>
                <strong>hasInitData:</strong>{' '}
                <span style={{ color: debugInfo.hasInitData ? '#28a745' : '#dc3545' }}>
                  {String(debugInfo.hasInitData)}
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
            backgroundColor: debugInfo.inTelegram ? '#d4edda' : '#f8d7da',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px',
          }}>
            <strong>Status:</strong>{' '}
            {debugInfo.inTelegram
              ? '✅ Telegram WebApp detected'
              : '❌ Not in Telegram environment'}
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
    </div>
  );
}

