import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "metal-mantra.com" },
      { protocol: "https", hostname: "**.wp.com" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
