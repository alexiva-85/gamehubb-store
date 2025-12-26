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

    setDebugInfo({
      inTelegram: Boolean(webApp),
      hasInitData: Boolean(webApp?.initData),
      initDataLength: webApp?.initData?.length ?? 0,
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

