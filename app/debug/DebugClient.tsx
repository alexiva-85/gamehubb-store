'use client';

import { useEffect, useState } from 'react';

interface BuildInfo {
  buildTime: string;
  nodeVersion: string;
  envName: string;
  gitSha: string | null;
}

interface TelegramDiagnostics {
  hasTelegramObject: boolean;
  hasWebAppObject: boolean;
  initDataLength: number;
  initDataPreview: string;
  platform: string | null;
  version: string | null;
  currentUrl: string;
}

export default function DebugClient() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tgDiagnostics, setTgDiagnostics] = useState<TelegramDiagnostics | null>(null);

  useEffect(() => {
    fetch('/api/build-info')
      .then((res) => res.json())
      .then((data) => {
        setBuildInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Read Telegram data on client only
    if (typeof window === 'undefined') return;

    const tg = (window as any).Telegram?.WebApp;
    const initData = tg?.initData ?? '';
    const initDataUnsafe = tg?.initDataUnsafe ?? null;

    const diagnostics: TelegramDiagnostics = {
      hasTelegramObject: typeof (window as any).Telegram !== 'undefined',
      hasWebAppObject: typeof tg !== 'undefined',
      initDataLength: initData.length,
      initDataPreview: initData.length > 0 
        ? initData.slice(0, 20) + (initData.length > 20 ? '...' : '')
        : '',
      platform: tg?.platform ?? null,
      version: tg?.version ?? null,
      currentUrl: window.location.href,
    };

    setTgDiagnostics(diagnostics);
  }, []);

  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'N/A';
  const initDataStatus = tgDiagnostics?.initDataLength && tgDiagnostics.initDataLength > 0 
    ? 'present' 
    : 'absent';

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Build Info</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {buildInfo && (
          <pre className="bg-white p-2 rounded text-sm overflow-auto">
            {JSON.stringify(buildInfo, null, 2)}
          </pre>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">User Agent</h2>
        <p className="text-sm break-all">{userAgent}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Telegram InitData</h2>
        <p className="text-sm mb-2">
          Status: <strong>{initDataStatus}</strong>
        </p>
        {tgDiagnostics && (
          <div className="bg-white p-2 rounded text-sm space-y-1">
            <div>
              <strong>hasTelegramObject:</strong> {tgDiagnostics.hasTelegramObject ? 'true' : 'false'}
            </div>
            <div>
              <strong>hasWebAppObject:</strong> {tgDiagnostics.hasWebAppObject ? 'true' : 'false'}
            </div>
            <div>
              <strong>initData length:</strong> {tgDiagnostics.initDataLength}
            </div>
            {tgDiagnostics.initDataPreview && (
              <div>
                <strong>initData preview:</strong> {tgDiagnostics.initDataPreview}
              </div>
            )}
            {tgDiagnostics.platform && (
              <div>
                <strong>platform:</strong> {tgDiagnostics.platform}
              </div>
            )}
            {tgDiagnostics.version && (
              <div>
                <strong>version:</strong> {tgDiagnostics.version}
              </div>
            )}
            <div>
              <strong>current URL:</strong> <span className="break-all">{tgDiagnostics.currentUrl}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

