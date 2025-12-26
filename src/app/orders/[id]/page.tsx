'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Cell, List, Section, Spinner } from '@telegram-apps/telegram-ui';
import { useParams, useRouter } from 'next/navigation';

import { Page } from '@/components/Page';
import { AppShell } from '@/components/AppShell';
import { Banner } from '@/components/Banner';
import { Price } from '@/components/Price';
import { Skeleton } from '@/components/Skeleton';
import { apiGet } from '@/lib/api';
import { copyToClipboard, openSupport } from '@/lib/tg';

type OrderStatus = 'NEW' | 'PAYMENT_CREATED' | 'AUTHORIZED' | 'PAID' | 'FULFILLED' | 'CANCELED';

type OrderItemDto = {
  id: number;
  productId: number;
  title: string;
  qty: number;
  priceKopeks: number;
  imageUrl?: string | null;
};

type FulfillmentStatus = 'NOT_STARTED' | 'PENDING' | 'SUCCESS' | 'FAILED';

type OrderDto = {
  id: number;
  status: OrderStatus;
  totalAmountKopeks: number;
  currency: string;
  fulfillmentStatus?: FulfillmentStatus;
  fulfillmentAttemptCount?: number;
  fulfillmentLastError?: string | null;
  items: OrderItemDto[];
};

function getStatusText(status: OrderStatus): string {
  switch (status) {
    case 'NEW':
      return 'Заказ создан, ожидание оплаты';
    case 'PAYMENT_CREATED':
      return 'Ожидание оплаты в банке';
    case 'AUTHORIZED':
      return 'Оплата авторизована, ожидается подтверждение';
    case 'PAID':
    case 'FULFILLED':
      return 'Оплата получена';
    case 'CANCELED':
      return 'Заказ отменён';
    default:
      return status;
  }
}

function getStatusBannerType(status: OrderStatus): 'error' | 'info' | 'success' | 'warning' {
  switch (status) {
    case 'PAID':
    case 'FULFILLED':
      return 'success';
    case 'CANCELED':
      return 'error';
    case 'AUTHORIZED':
      return 'warning';
    default:
      return 'info';
  }
}

function getFulfillmentStatusText(status: FulfillmentStatus): string {
  switch (status) {
    case 'NOT_STARTED':
      return 'Ожидание выполнения';
    case 'PENDING':
      return 'Выполняется...';
    case 'SUCCESS':
      return 'Выполнено успешно';
    case 'FAILED':
      return 'Ошибка выполнения';
    default:
      return status;
  }
}

function getFulfillmentBannerType(status: FulfillmentStatus): 'error' | 'info' | 'success' | 'warning' {
  switch (status) {
    case 'SUCCESS':
      return 'success';
    case 'FAILED':
      return 'error';
    case 'PENDING':
      return 'warning';
    default:
      return 'info';
  }
}

export default function OrderStatusPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);

  const [order, setOrder] = useState<OrderDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFinished = useMemo(
    () => order && (order.status === 'PAID' || order.status === 'FULFILLED' || order.status === 'CANCELED'),
    [order],
  );

  useEffect(() => {
    if (!Number.isFinite(orderId) || orderId <= 0) {
      setError('Некорректный идентификатор заказа');
      setLoading(false);
      return;
    }

    let cancelled = false;
    let timer: number | undefined;

    const fetchStatus = async () => {
      try {
        const data = await apiGet<OrderDto>(`/api/orders/${orderId}`, { auth: true });
        if (cancelled) return;
        setOrder(data);
        setError(null);

        const finished =
          data.status === 'PAID' || data.status === 'FULFILLED' || data.status === 'CANCELED';

        if (!finished) {
          timer = window.setTimeout(fetchStatus, 1500);
        }
      } catch (e: any) {
        if (cancelled) return;
        console.error(e);
        const status = e?.status as number | undefined;
        if (status === 401 || status === 403) {
          setError(
            'Недостаточно прав для просмотра заказа. Убедитесь, что вы открыли мини‑приложение тем же пользователем Telegram.',
          );
        } else if (status === 404) {
          setError('Заказ не найден.');
        } else {
          setError('Не удалось загрузить статус заказа. Попробуйте позже.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStatus();

    return () => {
      cancelled = true;
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
    };
  }, [orderId]);

  const isPaid = order && (order.status === 'PAID' || order.status === 'FULFILLED');

  const stickyBottom = isPaid ? (
    <Button
      size="m"
      mode="filled"
      stretched
      onClick={() => router.replace('/catalog')}
    >
      Вернуться в каталог
    </Button>
  ) : isFinished ? (
    <Button
      size="m"
      mode="bezeled"
      stretched
      onClick={() => router.replace('/catalog')}
    >
      Вернуться в каталог
    </Button>
  ) : null;

  return (
    <Page>
      <AppShell title={`Заказ №${orderId}`} stickyBottom={stickyBottom}>
        <List>
          {loading && (
            <Section>
              <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
                <Spinner size="m" />
              </div>
              <Skeleton variant="card" />
              <Skeleton variant="card" />
            </Section>
          )}

          {!loading && error && (
            <Section>
              <Banner type="error">{error}</Banner>
            </Section>
          )}

          {!loading && !error && order && (
            <>
              <Section header="Информация о заказе">
                <Banner type={getStatusBannerType(order.status)}>
                  <strong>{getStatusText(order.status)}</strong>
                </Banner>
                <div style={{ padding: '8px 16px', fontSize: 14 }}>
                  <div style={{ marginBottom: 8 }}>
                    <strong>Сумма:</strong>{' '}
                    <Price amountKopeks={order.totalAmountKopeks} currency={order.currency} />
                  </div>
                  {order.fulfillmentStatus && order.status === 'PAID' && (
                    <div style={{ marginTop: 12 }}>
                      <div style={{ marginBottom: 4 }}>
                        <strong>Статус выполнения:</strong>{' '}
                        {getFulfillmentStatusText(order.fulfillmentStatus)}
                      </div>
                      {order.fulfillmentAttemptCount !== undefined && order.fulfillmentAttemptCount > 0 && (
                        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>
                          Попыток: {order.fulfillmentAttemptCount}
                        </div>
                      )}
                      {order.fulfillmentLastError && (
                        <div style={{ marginTop: 8 }}>
                          <Banner type={getFulfillmentBannerType(order.fulfillmentStatus)}>
                            <strong>Ошибка:</strong> {order.fulfillmentLastError}
                          </Banner>
                        </div>
                      )}
                      {(order.fulfillmentAttemptCount !== undefined && order.fulfillmentAttemptCount >= 3) && (
                        <div style={{ marginTop: 8 }}>
                          <Banner type="warning">
                            Превышено максимальное количество попыток ({order.fulfillmentAttemptCount}). Обратитесь в поддержку.
                          </Banner>
                        </div>
                      )}
                      {(order.fulfillmentStatus === 'FAILED' ||
                        (order.fulfillmentAttemptCount !== undefined && order.fulfillmentAttemptCount >= 3)) && (
                        <div style={{ marginTop: 12 }}>
                          <Button
                            size="m"
                            mode="bezeled"
                            stretched
                            onClick={async () => {
                              const supportText = `Заказ #${order.id}\nСтатус: ${order.status}\nСтатус выполнения: ${order.fulfillmentStatus || 'N/A'}\nПопыток: ${order.fulfillmentAttemptCount || 0}${order.fulfillmentLastError ? `\nОшибка: ${order.fulfillmentLastError}` : ''}`;
                              await copyToClipboard(supportText);
                              openSupport(supportText);
                            }}
                          >
                            Написать в поддержку
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Section>

              {order.items.length > 0 && (
                <Section header="Товары">
                  {order.items.map((item) => (
                    <Cell
                      key={item.id}
                      subtitle={
                        <span>
                          {item.qty} × <Price amountKopeks={item.priceKopeks} currency={order.currency} />
                        </span>
                      }
                    >
                      {item.title}
                    </Cell>
                  ))}
                </Section>
              )}

              {isPaid && (
                <Section>
                  <Banner type="success">Оплата получена. Спасибо за покупку!</Banner>
                </Section>
              )}
            </>
          )}
        </List>
      </AppShell>
    </Page>
  );
}


