/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@sdx24/config"],

  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Remove console logs in production
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"], // Modern formats for better compression
    deviceSizes: [640, 750, 828, 1080, 1200], // Responsive breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Icon sizes
  },

  // Reduce bundle size
  experimental: {
    optimizePackageImports: ["@t3-oss/env-nextjs"], // Optimize imports
  },
};

module.exports = nextConfig;
