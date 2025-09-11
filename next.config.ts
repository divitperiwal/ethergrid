import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["giphy.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
