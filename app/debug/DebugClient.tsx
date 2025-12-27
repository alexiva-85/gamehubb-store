'use client';

import { useEffect, useState } from 'react';

interface BuildInfo {
  buildTime: string;
  nodeVersion: string;
  envName: string;
  gitSha: string | null;
}

export default function DebugClient() {
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : 'N/A';
  const hasTelegramInitData =
    typeof window !== 'undefined' &&
    window.Telegram?.WebApp?.initData !== undefined &&
    window.Telegram.WebApp.initData !== '';

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
        <p className="text-sm">
          Status: {hasTelegramInitData ? 'present' : 'absent'}
        </p>
      </div>
    </div>
  );
}

