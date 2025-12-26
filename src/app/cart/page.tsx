'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Cell, List, Section } from '@telegram-apps/telegram-ui';

import { Link } from '@/components/Link/Link';
import { Page } from '@/components/Page';
import { AppShell } from '@/components/AppShell';
import { Banner } from '@/components/Banner';
import { Price } from '@/components/Price';
import { Skeleton } from '@/components/Skeleton';
import { apiGet } from '@/lib/api';
import { getCart } from '@/lib/cart';
import { useCart } from '@/lib/useCart';

type ProductDto = {
  id: number;
  title: string;
  priceKopeks: number;
  currency: string;
};

type ProductMap = Record<number, ProductDto>;

export default function CartPage() {
  const { cart: items, updateQty, remove } = useCart();
  const [products, setProducts] = useState<ProductMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = getCart();

    if (stored.length === 0) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const all = await apiGet<ProductDto[]>('/api/products');
        const map: ProductMap = {};
        for (const p of all) {
          map[p.id] = p;
        }
        setProducts(map);
        setError(null);
      } catch (e) {
        console.error(e);
        setError('Не удалось загрузить данные товаров');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const total = useMemo(() => {
    let sum = 0;
    for (const item of items) {
      const product = products[item.productId];
      if (!product) continue;
      sum += product.priceKopeks * item.qty;
    }
    return sum;
  }, [items, products]);

  const currency = useMemo(() => {
    const firstItem = items.find((i) => products[i.productId]);
    return firstItem ? products[firstItem.productId].currency : 'RUB';
  }, [items, products]);

  const handleChangeQty = (productId: number, delta: number) => {
    const current = items.find((i) => i.productId === productId);
    const currentQty = current?.qty ?? 0;

    if (delta < 0 && currentQty <= 1) {
      remove(productId);
      return;
    }

    const nextQty = currentQty + delta;
    updateQty(productId, nextQty);
  };

  const handleRemove = (productId: number) => {
    remove(productId);
  };

  const hasItems = items.length > 0 && total > 0;

  const stickyBottom = hasItems ? (
    <div>
      <div style={{ marginBottom: 12, fontSize: 18, fontWeight: 600 }}>
        Итого: <Price amountKopeks={total} currency={currency} />
      </div>
      <Link href="/checkout">
        <Button size="m" mode="filled" stretched>
          Перейти к оплате
        </Button>
      </Link>
    </div>
  ) : null;

  return (
    <Page>
      <AppShell title="Корзина" showBottomNav stickyBottom={stickyBottom}>
        <List>
          <Section header="Товары в корзине">
            {loading && (
              <>
                <Skeleton variant="card" />
                <Skeleton variant="card" />
              </>
            )}

            {!loading && error && (
              <Banner type="error">{error}</Banner>
            )}

            {!loading && !error && !hasItems && (
              <Banner type="info">
                Корзина пуста.{' '}
                <Link href="/catalog">Перейти в каталог</Link>
              </Banner>
            )}

            {!loading && !error && hasItems &&
              items.map((item) => {
                const product = products[item.productId];
                if (!product) {
                  return null;
                }
                const subtotal = product.priceKopeks * item.qty;

                return (
                  <Cell
                    key={item.productId}
                    subtitle={<Price amountKopeks={subtotal} currency={product.currency} />}
                    after={
                      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                        <Button
                          size="s"
                          mode="bezeled"
                          onClick={() => handleChangeQty(item.productId, -1)}
                        >
                          -
                        </Button>
                        <span style={{ minWidth: '24px', textAlign: 'center' }}>{item.qty}</span>
                        <Button
                          size="s"
                          mode="bezeled"
                          onClick={() => handleChangeQty(item.productId, 1)}
                        >
                          +
                        </Button>
                        <Button
                          size="s"
                          mode="bezeled"
                          onClick={() => handleRemove(item.productId)}
                          style={{ color: 'var(--tg-theme-destructive-text-color, #ff3b30)' }}
                        >
                          ✕
                        </Button>
                      </div>
                    }
                  >
                    {product.title}
                  </Cell>
                );
              })}
          </Section>
        </List>
      </AppShell>
    </Page>
  );
}


