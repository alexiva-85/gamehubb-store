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

/**
 * Generate unique Digiflazz ref_id from orderId with timestamp
 * Format: "ORDER_" + sanitized(orderId) + "_" + tsShort
 * 
 * Rules:
 * - Only alphanumeric, underscore, hyphen allowed
 * - Max length: 50 characters
 * - Includes timestamp for uniqueness
 */
export function generateDigiflazzRefId(orderId: string): string {
  // Sanitize orderId: keep only [A-Za-z0-9_-], replace rest with empty string
  const sanitizedOrderId = orderId.replace(/[^A-Za-z0-9_-]/g, '');
  
  // Generate short timestamp (base36, uppercase)
  const tsShort = Date.now().toString(36).toUpperCase();
  
  // Build ref_id: "ORDER_" + orderId + "_" + tsShort
  const refId = `ORDER_${sanitizedOrderId}_${tsShort}`;
  
  // Sanitize entire ref_id again (in case timestamp had invalid chars, though it shouldn't)
  const sanitized = refId.replace(/[^A-Za-z0-9_-]/g, '');
  
  // Limit to 50 characters
  if (sanitized.length > 50) {
    return sanitized.substring(0, 50);
  }
  
  return sanitized;
}
