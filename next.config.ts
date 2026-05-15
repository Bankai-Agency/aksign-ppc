import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "static.tildacdn.one" },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      // Singular → plural canonical service slugs. Users type/share the
      // singular form often enough that it hit prod as a 404 in the wild.
      {
        source: "/channel-letter-sign",
        destination: "/channel-letter-signs",
        permanent: true,
      },
      {
        source: "/illuminated-sign",
        destination: "/illuminated-signs",
        permanent: true,
      },
      {
        source: "/vehicle-wrap",
        destination: "/vehicle-wraps",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
