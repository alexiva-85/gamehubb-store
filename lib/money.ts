/**
 * Money utilities for GameHubb Store
 * All amounts in database are stored in kopecks (integer)
 * UI displays and accepts amounts in rubles (without kopecks)
 */

/**
 * Format kopecks to rubles string (without decimal part)
 * @param kopeks - amount in kopecks (integer)
 * @returns formatted string like "500₽" (no .00)
 */
export function formatRubFromKopeks(kopeks: number): string {
  const rubles = Math.floor(kopeks / 100);
  return `${rubles}₽`;
}

/**
 * Convert rubles (number or string) to kopecks
 * @param rub - amount in rubles (can be string like "500" or number 500)
 * @returns amount in kopecks (integer)
 */
export function rubToKopeks(rub: number | string): number {
  const rubNum = typeof rub === 'string' ? parseFloat(rub) : rub;
  return Math.round(rubNum * 100);
}

/**
 * Minimum withdrawal amount in rubles
 */
export const MIN_WITHDRAW_RUB = 500;

/**
 * Minimum withdrawal amount in kopecks
 */
export const MIN_WITHDRAW_KOPEKS = MIN_WITHDRAW_RUB * 100;

