import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/projtrack",
        destination: "/work/relay",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
