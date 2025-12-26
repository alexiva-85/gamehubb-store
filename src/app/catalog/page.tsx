'use client';

import { useEffect, useMemo, useState } from 'react';
import { List, Section, Spinner } from '@telegram-apps/telegram-ui';

import { Page } from '@/components/Page';
import { AppShell } from '@/components/AppShell';
import { ProductCard } from '@/components/ProductCard';
import { Banner } from '@/components/Banner';
import { Skeleton } from '@/components/Skeleton';
import { apiGet } from '@/lib/api';
import { addToCart } from '@/lib/cart';

type ProductDto = {
  id: number;
  title: string;
  description?: string | null;
  priceKopeks: number;
  currency: string;
  available: boolean;
  imageUrl?: string | null;
};

export default function CatalogPage() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await apiGet<ProductDto[]>('/api/products');
        if (!cancelled) {
          setProducts(data);
          setError(null);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setError('Не удалось загрузить каталог');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const hasProducts = useMemo(() => products.length > 0, [products]);

  const handleAdd = (productId: number) => {
    addToCart(productId, 1);
  };

  return (
    <Page>
      <AppShell title="Каталог" showBottomNav>
        <List>
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
    </Page>
  );
}


