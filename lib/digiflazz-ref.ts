/**
 * Generate deterministic Digiflazz ref_id from orderId
 * Format: "ORDER_" + sanitized(orderId)
 * 
 * Rules:
 * - Only alphanumeric, underscore, hyphen allowed
 * - Max length: 40 characters
 * - Deterministic: same orderId always produces same ref_id
 */
export function makeDigiflazzRefId(orderId: string): string {
  // Sanitize: keep only [A-Za-z0-9_-], replace rest with empty string
  const sanitized = orderId.replace(/[^A-Za-z0-9_-]/g, '');
  
  // Prefix with "ORDER_"
  const prefixed = `ORDER_${sanitized}`;
  
  // Limit to 40 characters
  if (prefixed.length > 40) {
    return prefixed.substring(0, 40);
  }
  
  return prefixed;
}

