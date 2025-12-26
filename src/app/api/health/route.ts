import { NextResponse } from 'next/server';

/**
 * Core health check endpoint that returns environment variable status.
 * Checks: Database (DATABASE_URL, DIRECT_URL), APP_BASE_URL, and TG_BOT_TOKEN.
 * Useful for diagnosing missing env vars on Vercel.
 */
export async function GET() {
  const requiredEnvVars = [
    'TG_BOT_TOKEN',
    'DATABASE_URL',
    'DIRECT_URL',
    'APP_BASE_URL',
  ] as const;

  const optionalEnvVars = [
    'ROBOKASSA_MERCHANT_LOGIN',
    'ROBOKASSA_PASSWORD1',
    'ROBOKASSA_PASSWORD2',
    'ADMIN_KEY',
    'ROBOKASSA_TEST_MODE',
    'ROBOKASSA_API_BASE_URL',
    'FULFILLMENT_PROVIDER',
    'DIGIFLAZZ_API_KEY',
    'DIGIFLAZZ_USERNAME',
    'DIGIFLAZZ_BASE_URL',
    'NEXT_PUBLIC_TG_BOT_URL',
    'NEXT_PUBLIC_ALLOW_TG_MOCK',
    'NEXT_PUBLIC_SUPPORT_BOT_USERNAME',
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

