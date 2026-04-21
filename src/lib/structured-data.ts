/**
 * JSON-LD builders for the brand homepage. Rendered as
 * <script type="application/ld+json"> blocks by src/app/page.tsx.
 *
 * NOTE: only the homepage is indexable (/). The three PPC LP slugs
 * are noindex,nofollow and must NOT receive LocalBusiness / FAQPage
 * schemas — conflicting signals for Google.
 */

import sharedJson from "@/data/shared.json";
import homeJson from "@/data/home.json";
import { SITE_URL } from "@/app/layout";

type SharedShape = typeof sharedJson;
type HomeShape = typeof homeJson;

const shared = sharedJson as SharedShape;
const home = homeJson as HomeShape;

export function localBusinessSchema() {
  const nap = shared.nap;
  const addr = nap.address;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: nap.name,
    alternateName: "AK Sign Commercial Signs",
    description:
      "Full-service commercial signage shop serving Chicago and NW suburbs — channel letters, lightboxes, vehicle wraps, and window graphics. Design, UL-listed fabrication, permit filing, and professional install, all in-house.",
    url: `${SITE_URL}/`,
    telephone: nap.phone,
    email: nap.email,
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/opengraph-image`,
    priceRange: "$$-$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: addr.street,
      addressLocality: addr.city,
      addressRegion: addr.state,
      postalCode: addr.zip,
      addressCountry: addr.country,
    },
    // Approximate centroid of Arlington Heights, IL — used by Google
    // Maps for distance ranking. Replace with surveyed coordinates
    // once the client supplies them.
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.0884,
      longitude: -87.9806,
    },
    areaServed: [
      "Arlington Heights",
      "Palatine",
      "Schaumburg",
      "Chicago",
      "Mount Prospect",
      "Des Plaines",
      "Rolling Meadows",
      "Elk Grove Village",
      "Buffalo Grove",
      "Hoffman Estates",
      "Wheeling",
      "Prospect Heights",
    ].map((name) => ({ "@type": "City", name })),
    sameAs: [nap.socials.instagram, nap.socials.telegram, nap.socials.whatsapp].filter(
      Boolean,
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Commercial Signage Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Channel Letter Signs",
            description:
              "Custom illuminated 3D channel letter signs with UL-listed LEDs — front-lit or halo-lit, Pantone-match faces, structural and electrical permits handled.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lightboxes & Cabinet Signs",
            description:
              "Backlit aluminum cabinet signs with printed or acrylic faces — single or double-sided, pylon-mount compatible, energy-efficient LED illumination.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Wraps & Fleet Graphics",
            description:
              "Partial to full commercial vehicle wraps in premium 3M and Avery cast vinyl. Fleet-volume discount from 3+ vehicles, batch install scheduling.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Window Graphics",
            description:
              "Premium vinyl window graphics, lettering, and promotional decals for storefronts — UV-stable, weather-rated cast vinyl.",
          },
        },
      ],
    },
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: home.faq.items
      .filter((it) => !it.a.startsWith("{{PLACEHOLDER"))
      .map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: it.a,
        },
      })),
  };
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#breadcrumbs`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
    ],
  };
}

export function homepageSchemas() {
  return [localBusinessSchema(), faqPageSchema(), breadcrumbSchema()];
}
