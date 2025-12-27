'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Cell, List, Section } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';
import { AppShell } from '@/components/AppShell';
import { ProductCard } from '@/components/ProductCard';
import { Banner } from '@/components/Banner';
import { Skeleton } from '@/components/Skeleton';
import { BuildInfo } from '@/components/BuildInfo';
import { apiGet } from '@/lib/api';
import { addToCart } from '@/lib/cart';
import { getInitData } from '@/lib/tg';

type ProductDto = {
  id: number;
  title: string;
  description?: string | null;
  priceKopeks: number;
  currency: string;
  available: boolean;
  imageUrl?: string | null;
};

type BuildInfo = {
  sha: string | null;
  ref: string | null;
  env: string | null;
  timestamp: string;
};

const DEMO_PRODUCTS: ProductDto[] = [
  { id: 1001, title: 'Mobile Legends Diamonds 86', description: '86 Diamonds', priceKopeks: 9900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1002, title: 'Free Fire Diamonds 100', description: '100 Diamonds', priceKopeks: 9900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1003, title: 'PUBG UC 60', description: '60 UC', priceKopeks: 5900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1004, title: 'Roblox Robux 400', description: '400 Robux', priceKopeks: 4900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1005, title: 'Genshin Impact Welkin', description: 'Blessing of the Welkin Moon', priceKopeks: 3900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1006, title: 'Valorant VP 1000', description: '1000 VP', priceKopeks: 9900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1007, title: 'Call of Duty CP 500', description: '500 CP', priceKopeks: 4900, currency: 'RUB', available: true, imageUrl: null },
  { id: 1008, title: 'Fortnite V-Bucks 1000', description: '1000 V-Bucks', priceKopeks: 9900, currency: 'RUB', available: true, imageUrl: null },
];

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Build info state
  const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);

  // Debug state - всегда показываем при ошибке
  const [lastRequestUrl, setLastRequestUrl] = useState<string | null>(null);
  const [lastStatus, setLastStatus] = useState<number | 'network' | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);
  const [lastResponseText, setLastResponseText] = useState<string | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<string | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  // Load build info
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/build-info');
        if (res.ok) {
          const data = await res.json() as BuildInfo;
          setBuildInfo(data);
        }
      } catch {
        // Ignore build-info errors
      }
    })();
  }, []);

  const loadCatalog = useCallback(async () => {
    const apiPath = '/api/products';
    const fullUrl = typeof window !== 'undefined' 
      ? new URL(apiPath, window.location.origin).toString()
      : apiPath;

    // Всегда сохраняем URL для отображения при ошибке
    setLastRequestUrl(fullUrl);

    try {
      // Используем fetch напрямую для получения детальной информации об ошибках
      // Используем правильные заголовки как в apiGet
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      // Добавляем initData если доступен (как в apiGet)
      const initData = getInitData();
      if (initData) {
        (headers as Record<string, string>)['x-telegram-init-data'] = initData;
      }
      
      const res = await fetch(fullUrl, {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        // Получаем текст ответа для отладки
        let responseText = '';
        try {
          responseText = await res.text();
        } catch {
          responseText = 'Failed to read response';
        }

        // Всегда сохраняем информацию об ошибке для отображения
        setLastStatus(res.status);
        setLastError(`HTTP ${res.status}: ${res.statusText}`);
        setLastResponseText(responseText);
        setLastUpdatedAt(new Date().toISOString());

        // Логируем ошибку в консоль
        console.error('Catalog fetch failed:', {
          url: fullUrl,
          status: res.status,
          statusText: res.statusText,
          responseText: responseText.substring(0, 200),
        });

        // Создаем ошибку для обработки
        const error = new Error(`HTTP ${res.status}: ${res.statusText}`);
        (error as any).status = res.status;
        throw error;
      }
      
      // Успешный ответ - очищаем debug информацию
      setLastStatus(null);
      setLastError(null);
      setLastResponseText(null);

      const data = await res.json() as ProductDto[];
      
      // Check if data is empty or failed
      if (!data || data.length === 0) {
        // Use demo fallback
        setProducts(DEMO_PRODUCTS);
        setIsDemoMode(true);
        setError(null);
        
        // Empty response - не ошибка, просто используем demo
      } else {
        setProducts(data);
        setIsDemoMode(false);
        setError(null);
        
        // Success - очищаем debug информацию
        setLastStatus(null);
        setLastError(null);
        setLastResponseText(null);
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      const status = (e as any)?.status ?? 'network';
      
      // Логируем ошибку в консоль
      console.error('Catalog load error:', {
        url: fullUrl,
        status,
        error: errorMessage,
      });

      // Use demo fallback on error
      setProducts(DEMO_PRODUCTS);
      setIsDemoMode(true);
      
      // Показываем ошибку только если не 401/403 (для них показываем специальное сообщение)
      if (status === 401 || status === 403) {
        setError('No Telegram initData — open via bot (Open App button)');
      } else {
        setError(`Не удалось загрузить каталог: ${errorMessage}`);
      }
      
      // lastStatus, lastError, lastResponseText уже установлены в блоке if (!res.ok) выше
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  const hasProducts = useMemo(() => products.length > 0, [products]);

  const handleAdd = (productId: number) => {
    addToCart(productId, 1);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    loadCatalog();
  };

  const buildDisplay = useMemo(() => {
    if (!buildInfo) return 'unknown';
    const parts: string[] = [];
    if (buildInfo.sha) parts.push(buildInfo.sha.substring(0, 7));
    if (buildInfo.ref) parts.push(buildInfo.ref);
    if (buildInfo.env) parts.push(buildInfo.env);
    return parts.length > 0 ? parts.join(' / ') : 'unknown';
  }, [buildInfo]);

  // Показываем debug блок если есть ошибка
  const hasError = lastStatus !== null && lastStatus !== 200;

  return (
    <Page>
      <AppShell title="Каталог" showBottomNav>
        <List>
          {hasError && (
            <Section header="Catalog Error Debug">
              <Cell
                title="Endpoint URL"
                subtitle={lastRequestUrl || '—'}
                style={{ fontSize: '12px' }}
              />
              <Cell
                title="HTTP Status"
                subtitle={lastStatus !== null ? String(lastStatus) : '—'}
                style={{ fontSize: '12px', color: 'var(--tg-theme-destructive-text-color, #ff3b30)' }}
              />
              {lastError && (
                <Cell
                  title="Error Message"
                  subtitle={lastError}
                  style={{ fontSize: '12px', color: 'var(--tg-theme-destructive-text-color, #ff3b30)' }}
                />
              )}
              {lastResponseText && (
                <>
                  <Cell
                    title="Response (first 200-500 chars)"
                    subtitle={lastResponseText.substring(0, 200)}
                    style={{ fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => setShowErrorDetails(!showErrorDetails)}
                  />
                  {showErrorDetails && (
                    <div style={{
                      padding: '8px 16px',
                      backgroundColor: 'var(--tg-theme-secondary-bg-color, #f1f1f1)',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      maxHeight: '200px',
                      overflow: 'auto',
                    }}>
                      {lastResponseText.substring(0, 500)}
                    </div>
                  )}
                </>
              )}
              {(lastStatus === 401 || lastStatus === 403) && (
                <Banner type="warning">
                  Нет валидного initData / не передан заголовок / открой через кнопку Open в боте
                </Banner>
              )}
              <Cell
                title="Updated At"
                subtitle={lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleString() : '—'}
                style={{ fontSize: '12px' }}
              />
              <Button onClick={handleRetry} style={{ margin: '8px 16px' }}>
                Retry
              </Button>
            </Section>
          )}

          {isDemoMode && (
            <Banner type="warning">⚠️ Demo catalog (API unavailable)</Banner>
          )}

          <Section header="Товары">
            {loading && (
              <>
                <Skeleton variant="card" />
                <Skeleton variant="card" />
                <Skeleton variant="card" />
              </>
            )}

            {!loading && error && (
              <Banner type="error">{error}</Banner>
            )}

            {!loading && !error && !hasProducts && (
              <Banner type="info">Список товаров пуст.</Banner>
            )}

            {!loading && !error && hasProducts &&
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  description={p.description}
                  priceKopeks={p.priceKopeks}
                  currency={p.currency}
                  imageUrl={p.imageUrl}
                  available={p.available}
                  onAdd={handleAdd}
                />
              ))}
          </Section>
        </List>
      </AppShell>
      <BuildInfo />
    </Page>
  );
}


