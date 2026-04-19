import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/lp/", "/v-photo/", "/v-numeric/", "/thank-you", "/api/", "/dev/"],
      },
    ],
  };
}
