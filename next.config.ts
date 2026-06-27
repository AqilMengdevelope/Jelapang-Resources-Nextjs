import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (stray lockfiles exist in the
  // user's home directory which otherwise confuse Turbopack's root inference).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
