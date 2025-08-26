import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://backend-api.oksasatya.dev/api";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: apiBase.replace(/\/+$/, "") + "/:path*",
      },
    ];
  },
};

export default nextConfig;
