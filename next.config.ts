import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // The old payments-app page. Temporary, so the address can be reused later.
    return [{ source: "/individuals", destination: "/", permanent: false }];
  },
};

export default nextConfig;
