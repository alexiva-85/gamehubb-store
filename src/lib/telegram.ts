import type { NextRequest } from 'next/server';
import { parse, validate } from '@tma.js/init-data-node';

export type TelegramUser = {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
};

export async function requireTelegramUser(req: NextRequest): Promise<TelegramUser> {
  const initData = req.headers.get('x-telegram-init-data');

  if (!initData) {
    return Promise.reject(
      new Response(JSON.stringify({ error: 'Missing Telegram init data' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  const botToken = process.env.TG_BOT_TOKEN;

  if (!botToken) {
    // Misconfiguration on the server side.
    throw new Error('TG_BOT_TOKEN is not configured');
  }

  // Test-only bypass for E2E: allows using synthetic initData without valid signature.
  if (
    process.env.NODE_ENV === 'test' &&
    process.env.TG_INITDATA_BYPASS_FOR_E2E === 'true'
  ) {
    return {
      id: 'e2e-user',
      username: 'e2e',
      firstName: 'E2E',
      lastName: 'User',
    };
  }

  // Will throw if signature is invalid or initData is expired.
  await validate(initData, botToken);

  const data = parse(initData);

  const user = data.user;

  if (!user || typeof user.id === 'undefined') {
    return Promise.reject(
      new Response(JSON.stringify({ error: 'Telegram user not found in init data' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  }

  return {
    id: String(user.id),
    username: user.username ?? undefined,
    firstName: user.first_name ?? undefined,
    lastName: user.last_name ?? undefined,
  };
}


