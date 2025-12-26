import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/i18n.ts');

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude Prisma Client from server-side bundle during build
      config.externals = config.externals || [];
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Redirect root path to catalog
  // This works at CDN level on Vercel and is more reliable than redirect() in page.tsx
  async redirects() {
    return [
      {
        source: '/',
        destination: '/catalog',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
