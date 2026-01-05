/**
 * Feature flags and configuration
 * All values read from environment variables
 */

/**
 * Check if referral program is enabled
 * @returns true if REFERRAL_PROGRAM_ENABLED is set to 'true'
 */
export function isReferralProgramEnabled(): boolean {
  return process.env.REFERRAL_PROGRAM_ENABLED === 'true';
}

/**
 * Get referral lock period in hours
 * @returns number of hours (default: 48)
 */
export function getReferralLockHours(): number {
  const hours = process.env.REFERRAL_LOCK_HOURS;
  if (hours) {
    const parsed = parseInt(hours, 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return 48; // default 48 hours
}

/**
 * Check if referral program is enabled for client-side
 * @returns true if NEXT_PUBLIC_REFERRAL_PROGRAM_ENABLED is set to 'true'
 */
export function isReferralProgramEnabledClient(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return process.env.NEXT_PUBLIC_REFERRAL_PROGRAM_ENABLED === 'true';
}

