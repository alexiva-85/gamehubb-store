/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');

function parseEnv(content) {
  const out = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
    out[key] = val;
  }
  return out;
}
function loadEnvFile(p) {
  if (!fs.existsSync(p)) return;
  const parsed = parseEnv(fs.readFileSync(p, 'utf8'));
  for (const [k, v] of Object.entries(parsed)) if (process.env[k] === undefined) process.env[k] = v;
}
loadEnvFile('.env.local');
loadEnvFile('.env');

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
const cronSecret = process.env.CRON_SECRET;

if (!dbUrl) { console.error('ERROR: DIRECT_URL/DATABASE_URL missing'); process.exit(1); }
if (!cronSecret) { console.error('ERROR: CRON_SECRET missing'); process.exit(1); }

(async () => {
  const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });

  const p = await prisma.product.findFirst({
    where: { provider: 'DIGIFLAZZ' },
    orderBy: { updatedAt: 'desc' }
  });

  if (!p) {
    console.error('ERROR: No DIGIFLAZZ products found (run sync-products first)');
    await prisma.$disconnect();
    process.exit(1);
  }

  const targetPrice = 12345;

  await prisma.product.update({
    where: { sku: p.sku },
    data: { priceMode: 'MANUAL', priceRub: targetPrice }
  });

  const before = await prisma.product.findUnique({ where: { sku: p.sku } });

  // Без бэктиков — простая сборка строки
  const curlCmd =
    'curl -sS -i -X POST "http://localhost:3000/api/admin/digiflazz/syrization: Bearer ' + cronSecret + '" ' +
    '-H "Content-Type: application/json" ' +
    '-H "Accept: application/json"';

  const resp = execSync(curlCmd, { stdio: 'pipe' }).toString('utf8');

  const after = await prisma.product.findUnique({ where: { sku: p.sku } });

  const ok = after && after.priceMode === 'MANUAL' && after.priceRub === targetPrice;

  console.log('TEST SKU:', p.sku);
  console.log('BEFORE:', { priceMode: before.priceMode, priceRub: before.priceRub });
  console.log('SYNC RAW (first 200 chars):', resp.slice(0, 200));
  console.log('AFTER :', { priceMode: after.priceMode, priceRub: after.priceRub });
  console.log(ok ? '✅ PASS: MANUAL price preserved' : '❌ FAIL: MANUAL price was changed');

  await prisma.$disconnect();
  process.exit(ok ? 0 : 2);
})().catch(e => {
  console.error('ERROR:', e);
  process.exit(1);
});

