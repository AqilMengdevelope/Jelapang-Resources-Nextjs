import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local WordPress (Docker) serves media from localhost:8080
    dangerouslyAllowLocalIP: true,
    // Next 16 only allows listed qualities (default [75]). 75 = sharp enough for photo sites, ~3-10x smaller than originals.
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days — optimized images stay cached
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.jelapangresources.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
