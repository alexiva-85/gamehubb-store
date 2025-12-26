'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, List, Section, Checkbox, Cell } from '@telegram-apps/telegram-ui';
import { useRouter } from 'next/navigation';

import { Page } from '@/components/Page';
import { AppShell } from '@/components/AppShell';
import { Banner } from '@/components/Banner';
import { Price } from '@/components/Price';
import { Link } from '@/components/Link/Link';
import { apiGet, apiPost } from '@/lib/api';
import { clear, getCart } from '@/lib/cart';
import { useCart } from '@/lib/useCart';
import { openExternal } from '@/lib/tg';

type ProductDto = {
  id: number;
  title: string;
  priceKopeks: number;
  currency: string;
};

type CreateOrderResponse = {
  orderId: number;
  paymentUrl: string;
  amountKopeks: number;
  currency: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState('RUB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdOrderId, setCreatedOrderId] = useState<number | null>(null);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState<string | null>(null);
  const [agreedToOferta, setAgreedToOferta] = useState(false);
  const openedRef = useRef(false);

  useEffect(() => {
    const stored = getCart();
    if (stored.length === 0) {
      router.replace('/cart');
      return;
    }

    (async () => {
      try {
        const all = await apiGet<ProductDto[]>('/api/products');
        let sum = 0;
        let cur = 'RUB';
        for (const item of stored) {
          const product = all.find((p) => p.id === item.productId);
          if (!product) continue;
          sum += product.priceKopeks * item.qty;
          cur = product.currency;
        }
        setTotal(sum);
        setCurrency(cur);
      } catch (e) {
        console.error(e);
        setSubmitError('Не удалось проверить корзину');
      }
    })();
  }, [router]);

  const handleCreateOrder = async () => {
    if (isSubmitting) {
      return;
    }

    if (!cart.length) {
      setSubmitError('Корзина пуста. Добавьте товары перед оформлением заказа.');
      return;
    }

    if (!agreedToOferta) {
      setSubmitError('Необходимо согласиться с условиями публичной оферты.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const idempotencyKey =
        (typeof window !== 'undefined' && window.crypto?.randomUUID
          ? window.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

      const response = await apiPost<CreateOrderResponse>(
        '/api/orders',
        {
          items: cart.map((item) => ({
            productId: item.productId,
            qty: item.qty,
          })),
        },
        { auth: true, idempotencyKey },
      );

      clear();

      setCreatedOrderId(response.orderId);
      setCreatedPaymentUrl(response.paymentUrl ?? null);

      if (response.paymentUrl && !openedRef.current) {
        openedRef.current = true;
        openExternal(response.paymentUrl);
      }

      router.push(`/orders/${response.orderId}`);
    } catch (e: any) {
      console.error(e);
      const status = e?.status as number | undefined;

      if (status === 401 || status === 403) {
        setSubmitError(
          'Не удалось подтвердить авторизацию в Telegram. Откройте мини‑приложение из Telegram и попробуйте ещё раз.',
        );
      } else if (status && status >= 500) {
        setSubmitError('Сервис временно недоступен. Попробуйте позже.');
      } else {
        setSubmitError(e?.message ?? 'Ошибка при создании заказа');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const stickyBottom = (
    <div>
      {total > 0 && (
        <div style={{ marginBottom: 12, fontSize: 18, fontWeight: 600 }}>
          Сумма к оплате: <Price amountKopeks={total} currency={currency} />
        </div>
      )}
      {createdOrderId ? (
        createdPaymentUrl ? (
          <Button
            size="m"
            mode="filled"
            stretched
            onClick={() => openExternal(createdPaymentUrl)}
          >
            Открыть оплату ещё раз
          </Button>
        ) : (
          <Banner type="info" className="app-shell__sticky-bottom-banner">
            Заказ создан. Если окно оплаты не открылось, проверьте статус заказа.
          </Banner>
        )
      ) : (
        <Button
          size="m"
          mode="filled"
          stretched
          loading={isSubmitting}
          disabled={isSubmitting || !agreedToOferta}
          onClick={handleCreateOrder}
        >
          {isSubmitting ? 'Создаём заказ…' : 'Создать заказ'}
        </Button>
      )}
    </div>
  );

  return (
    <Page>
      <AppShell title="Оформление заказа" stickyBottom={stickyBottom}>
        <List>
          <Section header="Детали заказа">
            {submitError && (
              <Banner type="error">{submitError}</Banner>
            )}

            {createdOrderId && !createdPaymentUrl && (
              <Banner type="success">
                Заказ №{createdOrderId} создан. Ожидайте открытия окна оплаты.
              </Banner>
            )}
          </Section>

          <Section>
            <Cell
              before={
                <Checkbox
                  checked={agreedToOferta}
                  onChange={(e) => {
                    const target = e.target as HTMLInputElement;
                    setAgreedToOferta(target.checked);
                  }}
                />
              }
              after={
                <Link href="/oferta" style={{ fontSize: '12px', color: 'var(--tg-theme-link-color, #2481cc)' }}>
                  Прочитать
                </Link>
              }
              onClick={() => setAgreedToOferta(!agreedToOferta)}
            >
              Я согласен с условиями{' '}
              <Link href="/oferta" style={{ color: 'var(--tg-theme-link-color, #2481cc)' }}>
                публичной оферты
              </Link>
            </Cell>
          </Section>
        </List>
      </AppShell>
    </Page>
  );
}


