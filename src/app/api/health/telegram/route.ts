import { NextResponse } from 'next/server';

/**
 * Telegram feature health check endpoint.
 * Checks: TG_BOT_TOKEN and optional Telegram-related env vars.
 */
export async function GET() {
  const requiredEnvVars = [
    'TG_BOT_TOKEN',
  ] as const;

  const optionalEnvVars = [
    'NEXT_PUBLIC_TG_BOT_URL',
    'NEXT_PUBLIC_SUPPORT_BOT_USERNAME',
    'NEXT_PUBLIC_ALLOW_TG_MOCK',
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

