import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/cart",
        destination: "/cart/",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/checkout/",
        permanent: true,
      },
      {
        source: "/catalog",
        destination: "/catalog/",
        permanent: true,
      },
      {
        source: "/catalog/:gameSlug",
        destination: "/catalog/:gameSlug/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
