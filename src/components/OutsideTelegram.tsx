'use client';

import { useState } from 'react';

type OutsideTelegramProps = {
  onMockMode?: () => void;
};

/**
 * OutsideTelegram - компонент для отображения вне Telegram.
 * НЕ использует TGUI компоненты, так как AppRoot недоступен вне Telegram.
 */
export function OutsideTelegram({ onMockMode }: OutsideTelegramProps) {
  const [showMock, setShowMock] = useState(false);
  const botUrl = process.env.NEXT_PUBLIC_TG_BOT_URL || '';
  const allowMock = (process.env.NEXT_PUBLIC_ALLOW_TG_MOCK || 'false') === 'true';

  const handleMockMode = () => {
    setShowMock(true);
    onMockMode?.();
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
          Open this app in Telegram
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          This is a Telegram Mini App. Please open it from the bot.
        </p>
        {botUrl && (
          <a
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#0088cc',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
            }}
          >
            Open bot
          </a>
        )}
      </div>

      {allowMock && (
        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
            For developers
          </h2>
          {!showMock ? (
            <button
              onClick={handleMockMode}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Continue in mock mode
            </button>
          ) : (
            <p style={{ fontSize: '14px', color: '#666' }}>
              Mock mode enabled. Reloading...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

