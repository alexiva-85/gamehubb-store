'use client';

type PriceProps = {
  amountKopeks: number;
  currency?: string;
  className?: string;
};

/**
 * Компонент для отображения цены.
 * Форматирует копейки в рубли с двумя знаками после запятой.
 */
export function Price({ amountKopeks, currency = 'RUB', className }: PriceProps) {
  const rub = amountKopeks / 100;
  const formatted = `${rub.toFixed(2)} ${currency}`;

  return <span className={className}>{formatted}</span>;
}



