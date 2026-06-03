import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel function timeout for data-heavy routes
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
