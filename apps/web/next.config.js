/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sdx24/config"],

  // Build optimizations
  swcMinify: true, // Use faster SWC minifier
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console logs in production
  },

  // Reduce bundle size
  experimental: {
    optimizePackageImports: ["@t3-oss/env-nextjs"], // Optimize imports
  },
};

module.exports = nextConfig;
