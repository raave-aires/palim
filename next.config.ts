import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    serverComponentsExternalPackages: ['@react-pdf/renderer']
  },
};

export default nextConfig;