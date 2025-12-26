'use client';

import { Button, Cell } from '@telegram-apps/telegram-ui';

import { Price } from './Price';

type ProductCardProps = {
  id: number;
  title: string;
  description?: string | null;
  priceKopeks: number;
  currency?: string;
  imageUrl?: string | null;
  available?: boolean;
  onAdd?: (productId: number) => void;
  className?: string;
};

/**
 * Карточка товара в Telegram-native стиле.
 */
export function ProductCard({
  id,
  title,
  description,
  priceKopeks,
  currency = 'RUB',
  imageUrl,
  available = true,
  onAdd,
  className,
}: ProductCardProps) {
  return (
    <Cell
      className={className}
      subtitle={
        description ? (
          <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.7 }}>
            {description}
          </div>
        ) : undefined
      }
      after={
        onAdd ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <Price amountKopeks={priceKopeks} currency={currency} />
            <Button
              size="s"
              mode="bezeled"
              onClick={() => onAdd(id)}
              disabled={!available}
            >
              Добавить
            </Button>
          </div>
        ) : (
          <Price amountKopeks={priceKopeks} currency={currency} />
        )
      }
    >
      {title}
    </Cell>
  );
}
