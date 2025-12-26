import { NextResponse } from 'next/server';

import { envPresentMap, missing } from '@/lib/health/env';

/**
 * Telegram feature health check endpoint.
 * Checks: TG_BOT_TOKEN, APP_BASE_URL and optional Telegram-related env vars.
 */
export async function GET() {
  const requiredEnvVars = [
    'TG_BOT_TOKEN',
    'APP_BASE_URL',
  ] as const;

  const allEnvVars = [
    ...requiredEnvVars,
    'NEXT_PUBLIC_TG_BOT_URL',
    'NEXT_PUBLIC_ALLOW_TG_MOCK',
    'NEXT_PUBLIC_SUPPORT_BOT_USERNAME',
  ] as const;

  const missingRequired = missing([...requiredEnvVars]);
  const status = missingRequired.length === 0 ? 'ok' : 'warn';

  return NextResponse.json({
    status,
    feature: 'telegram',
    env: envPresentMap([...allEnvVars]),
    missingRequired,
    timestamp: new Date().toISOString(),
  });
}

