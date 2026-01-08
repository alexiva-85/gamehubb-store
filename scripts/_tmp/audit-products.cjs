const fs = require('fs');

function parseEnv(content) {
  const out = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    val = val.replace(/\\n/g, '\n');
    out[key] = val;
  }
  return out;
}

function loadEnvFile(p) {
  if (!fs.existsSync(p)) return;
  const parsed = parseEnv(fs.readFileSync(p, 'utf8'));
  for (const [k, v] of Object.entries(parsed)) {
    if (process.env[k] === undefined) process.env[k] = v;
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const { PrismaClient, Prisma } = require('@prisma/client');

const models = (Prisma && Prisma.dmmf && Prisma.dmmf.datamodel && Prisma.dmmf.datamodel.models) || [];
const productModel =
  models.find(m => m.name === 'Product') ||
  models.find(m => (m.name || '').toLowerCase() === 'product');

if (!productModel) {
  console.error('ERROR: Product model not found in Prisma schema');
  process.exit(1);
}

console.log('MODEL:', productModel.name);
console.log('FIELDS:');
console.table(productModel.fields.map(f => ({
  name: f.name,
  type: f.type,
  required: !!f.isRequired,
  unique: !!f.isUnique,
  kind: f.kind
})));

const dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!dbUrl) {
  console.error('ERROR: DIRECT_URL or DATABASE_URL not found in .env.local/.env');
  process.exit(1);
}

(async () => {
  const prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
  const total = await prisma.product.count();
  const hasIsActive = productModel.fields.some(f => f.name === 'is_active');
  const active = hasIsActive ? await prisma.product.count({ where: { is_active: true } }) : null;
  console.log('COUNTS:', { total, active });
  await prisma.$disconnect();
})().catch(e => {
  console.error('ERROR:', e);
  process.exit(1);
});
