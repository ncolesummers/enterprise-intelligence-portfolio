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
      // Short links to the AI Symposium companion artifact. Temporary (307) so
      // the target can move later. Trailing-slash variants reach
      // these via Next's built-in 308 to the slashless path.
      {
        source: "/symposium",
        destination: "https://claude.ai/artifact/7gmuhExTHzYgXrMZuVp1KR",
        permanent: false,
      },
      {
        source: "/symposium/delegate",
        destination:
          "https://claude.ai/artifact/7gmuhExTHzYgXrMZuVp1KR#delegate",
        permanent: false,
      },
      {
        source: "/symposium/evaluate",
        destination:
          "https://claude.ai/artifact/7gmuhExTHzYgXrMZuVp1KR#evaluate",
        permanent: false,
      },
      // Short links to the two symposium decks, linked from the index sheet's
      // talks schedule. Temporary for the same reason as above: a deck may
      // later move to a hosted PDF without changing the published link. See
      // ADR 0005.
      {
        source: "/symposium/evaluate/slides",
        destination: "https://claude.ai/artifact/4KPbXSGoGRzU6gneb8guMm",
        permanent: false,
      },
      {
        source: "/symposium/delegate/slides",
        destination: "https://claude.ai/artifact/GTmfzxdw7PemGBBF3B7usF",
        permanent: false,
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
