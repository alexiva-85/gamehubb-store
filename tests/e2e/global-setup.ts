import type { FullConfig } from '@playwright/test';
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

async function globalSetup(_config: FullConfig) {
  const dbUrl = process.env.DATABASE_URL || 'file:./test.db';
  const env = { ...process.env, DATABASE_URL: dbUrl };

  console.log('🔧 Setting up test database...');
  console.log(`Database URL: ${dbUrl}`);

  // 1. Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('pnpm prisma generate', { stdio: 'inherit', env });

  // 2. Apply migrations or push schema
  console.log('🗄️  Applying database schema...');
  try {
    execSync('pnpm prisma migrate deploy', { stdio: 'inherit', env });
  } catch (error) {
    // Fallback to db push if migrations fail (e.g., in test environment)
    console.log('⚠️  Migrate deploy failed, trying db push...');
    execSync('pnpm prisma db push --skip-generate', { stdio: 'inherit', env });
  }

  // 3. Run seed script
  console.log('🌱 Seeding database...');
  execSync('pnpm seed:test', { stdio: 'inherit', env });

  // 4. Save seed metadata for tests (optional)
  const seedDataPath = join(__dirname, '.seed.json');
  try {
    const productIds = process.env.SEEDED_PRODUCT_IDS?.split(',').map(Number) || [];
    writeFileSync(
      seedDataPath,
      JSON.stringify({ productIds, timestamp: new Date().toISOString() }, null, 2),
    );
    console.log(`✅ Seed metadata saved to ${seedDataPath}`);
  } catch (error) {
    console.warn('⚠️  Could not save seed metadata:', error);
  }

  console.log('✅ Test database setup complete');
}

export default globalSetup;


