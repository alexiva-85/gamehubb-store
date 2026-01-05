import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma singleton for Next.js
// Prevents "prepared statement already exists" error with pgbouncer
// DATABASE_URL should have: pgbouncer=true&statement_cache_size=0&connection_limit=1
// DIRECT_URL should be direct Postgres connection (port 5432) without pgbouncer params
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
