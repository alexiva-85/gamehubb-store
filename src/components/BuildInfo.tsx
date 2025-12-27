'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useEffect, useState } from 'react';

type BuildInfoData = {
  sha: string | null;
  ref: string | null;
  env: string | null;
  timestamp: string;
};

/**
 * Компонент для отображения информации о билде и текущем пути.
 * Показывается в правом нижнем углу мелким текстом.
 */
export function BuildInfo() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [buildInfo, setBuildInfo] = useState<BuildInfoData | null>(null);
  
  useEffect(() => {
    // Загружаем build info из API
    fetch('/api/build-info')
      .then(res => res.ok ? res.json() : null)
      .then(data => data && setBuildInfo(data))
      .catch(() => {
        // Игнорируем ошибки
      });
  }, []);
  
  const displayInfo = useMemo(() => {
    const search = searchParams.toString();
    const path = pathname + (search ? `?${search}` : '');
    
    const parts: string[] = [];
    if (buildInfo?.sha) parts.push(buildInfo.sha.substring(0, 7));
    if (buildInfo?.ref) parts.push(buildInfo.ref);
    if (buildInfo?.env) parts.push(buildInfo.env);
    const build = parts.length > 0 ? parts.join(' / ') : '(unknown)';
    
    return { build, path };
  }, [pathname, searchParams, buildInfo]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '8px',
      right: '8px',
      padding: '4px 8px',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '4px',
      fontSize: '10px',
      fontFamily: 'monospace',
      color: '#666',
      zIndex: 9999,
      pointerEvents: 'none',
      userSelect: 'text',
    }}>
      <div>Build: {displayInfo.build}</div>
      <div>Path: {displayInfo.path}</div>
    </div>
  );
}

