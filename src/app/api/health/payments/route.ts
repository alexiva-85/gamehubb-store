import { NextResponse } from 'next/server';

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

  const optionalEnvVars = [
    'ROBOKASSA_TEST_MODE',
    'ROBOKASSA_API_BASE_URL',
  ] as const;

  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingRequired.push(envVar);
    }
  }

  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar]) {
      missingOptional.push(envVar);
    }
  }

  const status = missingRequired.length === 0 ? 'ok' : 'error';

  return NextResponse.json({
    status,
    timestamp: new Date().toISOString(),
    missingEnv: {
      required: missingRequired,
      optional: missingOptional,
    },
    // Don't expose actual values, just indicate presence
    env: {
      required: requiredEnvVars.map((name) => ({
        name,
        present: !!process.env[name],
      })),
      optional: optionalEnvVars.map((name) => ({
        name,
        present: !!process.env[name],
      })),
    },
  });
}

