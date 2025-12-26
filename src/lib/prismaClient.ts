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

  // Prisma 7: DATABASE_URL and DIRECT_URL are read from environment variables
  // DATABASE_URL is for runtime (Transaction pooler)
  // DIRECT_URL is for migrations/DDL (Session pooler)
  // Prisma Client automatically uses these env vars if they're set
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  // Prisma 7 automatically reads DATABASE_URL and DIRECT_URL from environment
  // No need to pass them explicitly - they're configured via env vars
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

// Type helper for transaction callback parameter
// Based on Prisma's internal TransactionClient type: Omit<PrismaClient, ITXClientDenyList>
// We use Omit to exclude methods that shouldn't be available in transactions
export type PrismaTransactionClient = Omit<
  GeneratedPrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

