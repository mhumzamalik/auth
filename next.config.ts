import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  reactCompiler: true,
  output: "standalone",
};

export default nextConfig;
