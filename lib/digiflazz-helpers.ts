/**
 * Normalize Digiflazz status response for user-facing API
 * Fills empty customer_no and buyer_sku_code from transaction data
 */
export function normalizeDigiflazzStatusResponse(
  response: any,
  txBuyerSkuCode: string,
  txCustomerNo: string
): any {
  // Deep clone to avoid mutating original
  const normalized = JSON.parse(JSON.stringify(response));

  // Fill empty customer_no from transaction
  if (normalized?.data?.customer_no === '' || normalized?.data?.customer_no === null || normalized?.data?.customer_no === undefined) {
    if (normalized.data) {
      normalized.data.customer_no = txCustomerNo;
    } else {
      normalized.data = { customer_no: txCustomerNo };
    }
  }

  // Fill empty buyer_sku_code from transaction
  if (normalized?.data?.buyer_sku_code === '' || normalized?.data?.buyer_sku_code === null || normalized?.data?.buyer_sku_code === undefined) {
    if (normalized.data) {
      normalized.data.buyer_sku_code = txBuyerSkuCode;
    } else {
      normalized.data = { buyer_sku_code: txBuyerSkuCode };
    }
  }

  return normalized;
}
