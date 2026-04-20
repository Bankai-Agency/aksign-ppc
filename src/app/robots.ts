import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/channel-letter-signs",
          "/illuminated-signs",
          "/vehicle-wraps",
          "/thank-you",
          "/api/",
          "/dev/",
        ],
      },
    ],
  };
}
