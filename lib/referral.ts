import { prisma } from './prisma';

/**
 * Generate a unique referral code
 * Format: 8-10 characters, A-Z0-9 (base36 uppercase)
 */
export async function generateReferralCode(): Promise<string> {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 8;
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let code = '';
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Check uniqueness in database
    const existing = await prisma.user.findUnique({
      where: { referralCode: code },
    });

    if (!existing) {
      return code;
    }
  }

  // Fallback: add timestamp to ensure uniqueness
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code + timestamp;
}

/**
 * Parse referral code from Telegram start parameter
 * Supports formats:
 * - startapp=r<code> (primary)
 * - startapp=ref_<code> (legacy)
 * @param startParam - Start parameter from Telegram
 * @returns Referral code or null
 */
export function parseReferralFromStartParam(startParam: string | null | undefined): string | null {
  if (!startParam) {
    return null;
  }

  // Format: r<code>
  if (startParam.startsWith('r') && startParam.length > 1) {
    return startParam.slice(1);
  }

  // Format: ref_<code>
  if (startParam.startsWith('ref_') && startParam.length > 4) {
    return startParam.slice(4);
  }

  return null;
}

