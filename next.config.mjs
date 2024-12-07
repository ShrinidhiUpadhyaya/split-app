const path = require("path");

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname),
      "@/components": path.resolve(__dirname, "components"),
      "@/hooks": path.resolve(__dirname, "hooks"),
    };

    return config;
  },
};

export default nextConfig;
