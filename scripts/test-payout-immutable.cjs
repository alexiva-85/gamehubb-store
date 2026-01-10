#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Test script to verify payout snapshot immutability after PAID status
 * 
 * Usage:
 *   node scripts/test-payout-immutable.cjs
 * 
 * Requirements:
 *   - .env.local or .env with DATABASE_URL and ADMIN_KEY (optional for dev)
 *   - At least one PENDING withdrawal request in the database
 */

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            process.env[key.trim()] = valueParts.join('=').trim();
          }
        }
      }
    }
  }
}

loadEnv();

const ADMIN_KEY = process.env.ADMIN_KEY || '';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

console.log('🧪 Testing payout snapshot immutability...\n');

// Step 1: Find a PENDING withdrawal request
console.log('1️⃣ Finding a PENDING withdrawal request...');
const findPending = spawnSync('node', [
  '-e',
  `
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    (async () => {
      try {
        const req = await prisma.withdrawalRequest.findFirst({
          where: { status: 'PENDING' },
          select: { id: true, amountRub: true }
        });
        if (req) {
          console.log(JSON.stringify(req));
        } else {
          console.log('NO_PENDING');
        }
      } catch (e) {
        console.error('ERROR:', e.message);
        process.exit(1);
      } finally {
        await prisma.$disconnect();
      }
    })();
  `
], {
  cwd: process.cwd(),
  encoding: 'utf-8',
  env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
});

if (findPending.status !== 0 || findPending.stdout.trim() === 'NO_PENDING') {
  console.error('❌ No PENDING withdrawal requests found. Please create one first.');
  process.exit(1);
}

const pendingReq = JSON.parse(findPending.stdout.trim());
console.log(`   Found: ${pendingReq.id} (amount: ${pendingReq.amountRub / 100} RUB)\n`);

// Step 2: Mark as PAID with payout snapshot
console.log('2️⃣ Marking request as PAID with payout snapshot...');
const markPaid = spawnSync('curl', [
  '-sS',
  '-X', 'PATCH',
  '-H', 'Content-Type: application/json',
  '-d', JSON.stringify({
    key: ADMIN_KEY,
    status: 'PAID',
    payout: {
      asset: 'RUB',
      amount: String(pendingReq.amountRub / 100),
      baseRub: String(pendingReq.amountRub / 100),
      feeRub: '0',
      notes: 'Test payout snapshot'
    }
  }),
  `${BASE_URL}/api/admin/withdrawals/${pendingReq.id}${ADMIN_KEY ? `?key=${encodeURIComponent(ADMIN_KEY)}` : ''}`
], {
  encoding: 'utf-8'
});

if (markPaid.status !== 0) {
  console.error('❌ Failed to mark request as PAID');
  console.error(markPaid.stderr);
  process.exit(1);
}

const paidResponse = JSON.parse(markPaid.stdout);
if (paidResponse.error) {
  console.error(`❌ Error: ${paidResponse.error}`);
  process.exit(1);
}

console.log(`   ✅ Request marked as PAID`);
console.log(`   Payout asset: ${paidResponse.payoutAsset}`);
console.log(`   Payout amount: ${paidResponse.payoutAmount}`);
console.log(`   Payout base RUB: ${paidResponse.payoutBaseRub}\n`);

// Step 3: Try to modify payout snapshot (should fail)
console.log('3️⃣ Attempting to modify payout snapshot (should fail)...');
const tryModify = spawnSync('curl', [
  '-sS',
  '-X', 'PATCH',
  '-H', 'Content-Type: application/json',
  '-d', JSON.stringify({
    key: ADMIN_KEY,
    status: 'PAID',
    payout: {
      asset: 'USDT',
      amount: '999.99',
      baseRub: '99999',
      rate: '100.00',
      rateSource: 'MANUAL'
    }
  }),
  `${BASE_URL}/api/admin/withdrawals/${pendingReq.id}${ADMIN_KEY ? `?key=${encodeURIComponent(ADMIN_KEY)}` : ''}`
], {
  encoding: 'utf-8'
});

const modifyResponse = JSON.parse(tryModify.stdout);
if (modifyResponse.error && modifyResponse.code === 'IMMUTABLE_PAYOUT') {
  console.log(`   ✅ Correctly rejected: ${modifyResponse.error}\n`);
} else {
  console.error(`   ❌ Expected IMMUTABLE_PAYOUT error, got: ${JSON.stringify(modifyResponse)}`);
  process.exit(1);
}

// Step 4: Verify payout snapshot is unchanged
console.log('4️⃣ Verifying payout snapshot is unchanged...');
const verify = spawnSync('curl', [
  '-sS',
  `${BASE_URL}/api/admin/withdrawals${ADMIN_KEY ? `?key=${encodeURIComponent(ADMIN_KEY)}` : ''}`
], {
  encoding: 'utf-8'
});

const verifyResponse = JSON.parse(verify.stdout);
const request = verifyResponse.requests.find((r) => r.id === pendingReq.id);

if (!request) {
  console.error('❌ Request not found in list');
  process.exit(1);
}

if (request.payoutAsset === 'RUB' && 
    Number(request.payoutAmount) === pendingReq.amountRub / 100 &&
    Number(request.payoutBaseRub) === pendingReq.amountRub / 100) {
  console.log(`   ✅ Payout snapshot unchanged:`);
  console.log(`      Asset: ${request.payoutAsset}`);
  console.log(`      Amount: ${request.payoutAmount}`);
  console.log(`      Base RUB: ${request.payoutBaseRub}\n`);
} else {
  console.error(`   ❌ Payout snapshot was modified!`);
  console.error(`      Expected: RUB, ${pendingReq.amountRub / 100}, ${pendingReq.amountRub / 100}`);
  console.error(`      Got: ${request.payoutAsset}, ${request.payoutAmount}, ${request.payoutBaseRub}`);
  process.exit(1);
}

console.log('✅ All tests passed! Payout snapshot is immutable after PAID status.\n');
