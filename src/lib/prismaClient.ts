// Unified Prisma Client source for app, seed, and tests.
// Uses standard @prisma/client which resolves to generated location.

import { PrismaClient as GeneratedPrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: GeneratedPrismaClient | undefined;
}

// Lazy initialization function to avoid Prisma Client creation during build
function getPrismaClient(): GeneratedPrismaClient {
  if (globalThis.__prisma) {
    return globalThis.__prisma;
  }

  // Prisma 7 automatically reads DATABASE_URL from environment variables
  // No need to pass it explicitly - it's configured in prisma.config.ts
  const client = new GeneratedPrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    globalThis.__prisma = client;
  }

  return client;
}

// Export a getter that initializes Prisma Client only when accessed
export const prisma = new Proxy({} as GeneratedPrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

