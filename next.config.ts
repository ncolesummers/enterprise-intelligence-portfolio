import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The retired ADLC case study folded into Loopworks, which carries its
      // substance as lineage. Destination retargeted from `/` by ADR 0002, once
      // the successor route ADR 0001 conditioned its choice on existed.
      {
        source: "/projects/agent-development-lifecycle",
        destination: "/projects/loopworks",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compress: true,
};

export default nextConfig;
