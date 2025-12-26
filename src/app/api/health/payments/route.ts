import { NextResponse } from 'next/server';

import { envPresentMap, missing } from '@/lib/health/env';

/**
 * Payments feature health check endpoint.
 * Checks: Robokassa required credentials and optional settings.
 */
export async function GET() {
  const requiredEnvVars = [
    'ROBOKASSA_MERCHANT_LOGIN',
    'ROBOKASSA_PASSWORD1',
    'ROBOKASSA_PASSWORD2',
  ] as const;

  const allEnvVars = [
    ...requiredEnvVars,
    'ROBOKASSA_TEST_MODE',
    'ROBOKASSA_API_BASE_URL',
  ] as const;

  const missingRequired = missing([...requiredEnvVars]);
  const status = missingRequired.length === 0 ? 'ok' : 'warn';

  return NextResponse.json({
    status,
    feature: 'payments',
    env: envPresentMap([...allEnvVars]),
    missingRequired,
    timestamp: new Date().toISOString(),
  });
}

