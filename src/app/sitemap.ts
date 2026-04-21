import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Only the brand homepage is indexable; the three PPC slugs
 * (/channel-letter-signs, /illuminated-signs, /vehicle-wraps) are
 * paid-traffic destinations marked noindex,nofollow. Including them
 * in the sitemap would give Google conflicting signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
