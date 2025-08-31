import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;