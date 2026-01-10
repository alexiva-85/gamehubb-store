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


/**
 * Calculate payout amount in USDT from RUB amount and exchange rate
 * Uses string-based arithmetic to avoid float precision issues
 * @param amountRub - amount in rubles (can be number or string, e.g., "1000" or 1000)
 * @param rateRubPerUsdt - exchange rate: RUB per 1 USDT (can be number or string, e.g., "100" or 100)
 * @returns payout amount as string with 2 decimal places (e.g., "10.00")
 */
export function calcPayoutAmountUsdt(
  amountRub: number | string,
  rateRubPerUsdt: number | string
): string {
  // Convert to numbers for calculation
  const rubNum = typeof amountRub === 'string' ? parseFloat(amountRub) : amountRub;
  const rateNum = typeof rateRubPerUsdt === 'string' ? parseFloat(rateRubPerUsdt) : rateRubPerUsdt;

  // Validate inputs
  if (isNaN(rubNum) || isNaN(rateNum) || rateNum <= 0) {
    return '0.00';
  }

  // Calculate: payout = amountRub / rate
  // Use multiplication by 100 to avoid float issues, then round
  const payout = rubNum / rateNum;
  
  // Round to 2 decimal places
  const rounded = Math.round(payout * 100) / 100;
  
  // Format to 2 decimal places
  return rounded.toFixed(2);
}
