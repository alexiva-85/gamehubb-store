#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse .env file
function parseEnvFile(filePath) {
  const env = {};
  if (!fs.existsSync(filePath)) {
    return env;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    // Parse key=value, support quoted values
    const match = trimmed.match(/^([^=]+)=(.*)$/);
    if (match) {
      let key = match[1].trim();
      let value = match[2].trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      env[key] = value;
    }
  }

  return env;
}

// Load environment variables
const envLocal = parseEnvFile(path.join(process.cwd(), '.env.local'));
const env = parseEnvFile(path.join(process.cwd(), '.env'));

// Merge: .env.local overrides .env
const config = { ...env, ...envLocal };

// Check required variables
const CRON_SECRET = config.CRON_SECRET;
const DATABASE_URL = config.DATABASE_URL || config.DIRECT_URL;

if (!CRON_SECRET) {
  console.error('❌ ERROR: CRON_SECRET not found in .env.local or .env');
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL or DIRECT_URL not found in .env.local or .env');
  process.exit(1);
}

// Create Prisma client with direct connection
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

async function testManualPrice() {
  try {
    // Find a DIGIFLAZZ product
    const product = await prisma.product.findFirst({
      where: {
        provider: 'DIGIFLAZZ',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    if (!product) {
      console.error('❌ ERROR: No DIGIFLAZZ products found in database');
      await prisma.$disconnect();
      process.exit(1);
    }

    const testSku = product.sku;
    const beforePriceRub = product.priceRub;
    const beforePriceMode = product.priceMode;

    console.log(`TEST SKU: ${testSku}`);
    console.log(`BEFORE: priceMode=${beforePriceMode}, priceRub=${beforePriceRub}`);

    // Update product to MANUAL mode with test price
    await prisma.product.update({
      where: { sku: testSku },
      data: {
        priceMode: 'MANUAL',
        priceRub: 12345,
      },
    });

    console.log(`Updated to: priceMode=MANUAL, priceRub=12345`);

    // Call sync endpoint via curl
    const curlArgs = [
      '-sS',
      '-i',
      '-X',
      'POST',
      'http://localhost:3000/api/admin/digiflazz/sync-products/',
      '-H',
      `Authorization: Bearer ${CRON_SECRET}`,
      '-H',
      'Content-Type: application/json',
      '-H',
      'Accept: application/json',
    ];

    console.log('Calling sync endpoint...');
    const curlResult = spawnSync('curl', curlArgs, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    const curlExitCode = curlResult.status;
    const curlStdout = curlResult.stdout || '';
    const curlStderr = curlResult.stderr || '';

    console.log(`CURL EXIT: ${curlExitCode}`);
    
    // Show first 200 characters of stdout
    const stdoutPreview = curlStdout.substring(0, 200);
    console.log(`STDOUT (first 200 chars): ${stdoutPreview}${curlStdout.length > 200 ? '...' : ''}`);

    if (curlStderr) {
      console.log(`STDERR: ${curlStderr}`);
    }

    // Read product after sync
    const afterProduct = await prisma.product.findUnique({
      where: { sku: testSku },
      select: {
        priceMode: true,
        priceRub: true,
      },
    });

    console.log(`AFTER: priceMode=${afterProduct.priceMode}, priceRub=${afterProduct.priceRub}`);

    // Check if price was preserved
    const pricePreserved = 
      afterProduct.priceMode === 'MANUAL' && 
      afterProduct.priceRub === 12345;

    if (pricePreserved) {
      console.log('✅ PASS: MANUAL price preserved');
      await prisma.$disconnect();
      process.exit(0);
    } else {
      console.log('❌ FAIL: MANUAL price was changed');
      console.log(`Expected: priceMode=MANUAL, priceRub=12345`);
      console.log(`Got: priceMode=${afterProduct.priceMode}, priceRub=${afterProduct.priceRub}`);
      await prisma.$disconnect();
      process.exit(2);
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Run test
testManualPrice();
