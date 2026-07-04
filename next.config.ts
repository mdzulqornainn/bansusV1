import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb", // atur sesuai kebutuhan, contoh: 5mb, 10mb, dst.
    },
  },
};

export default nextConfig;
