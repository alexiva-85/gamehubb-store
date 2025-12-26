import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 60_000,
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    env: {
      NODE_ENV: 'test',
      TG_INITDATA_BYPASS_FOR_E2E: 'true',
      // Client-side initData override for tests.
      NEXT_PUBLIC_E2E_TG_INIT_DATA: 'user=1&auth_date=1700000000&hash=test',
      DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
    },
  },
  globalSetup: require.resolve('./tests/e2e/global-setup'),
};

export default config;



