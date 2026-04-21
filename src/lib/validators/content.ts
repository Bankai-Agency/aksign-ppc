/**
 * Zod schemas mirroring src/types/lp.ts.
 * Parsed at module load in src/lib/content.ts so invalid data fails the build.
 */

import { z } from "zod";

// ─── Shared ────────────────────────────────────────────────────────────────

export const AddressPartsSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  zip: z.string().min(5),
  country: z.string().min(2),
});

export const SocialsSchema = z.object({
  instagram: z.string().url(),
  telegram: z.string().url(),
  whatsapp: z.string().url(),
});

export const NAPSchema = z.object({
  name: z.string().min(1),
  address: AddressPartsSchema,
  addressDisplay: z.string().min(1),
  phone: z.string().regex(/^\+\d{11,15}$/, "phone must be E.164"),
  phoneDisplay: z.string().min(1),
  email: z.string().email(),
  mapCid: z.string().min(1),
  mapEmbedUrl: z.string().url(),
  hours: z.string().optional(),
  socials: SocialsSchema,
});

export const NavLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const TrustUSPSchema = z
  .object({
    icon: z.string().min(1),
    title: z.string().min(1),
    subcopy: z.string().min(1),
  })
  .passthrough();

export const StepSchema = z.object({
  number: z.number().int().min(1).max(6),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const CityTierSchema = z.enum(["P0", "P1", "P2"]);
export const CitySchema = z.object({
  name: z.string().min(1),
  tier: CityTierSchema,
});

export const PortfolioCategorySchema = z.enum([
  "channel-letters",
  "lightbox",
  "vehicle-wrap",
  "window-graphics",
]);

export const PortfolioPlaceholderSchema = z.object({
  title: z.string().min(1),
  category: PortfolioCategorySchema,
  illustrationSrc: z.string().min(1),
  imageSrc: z.string().optional(),
  aspect: z.enum(["portrait", "landscape", "square"]).optional(),
});

export const SharedContentSchema = z.object({
  nap: NAPSchema,
  header: z.object({
    navLinks: z.array(NavLinkSchema).min(3).max(7),
    ctaLabel: z.string().min(1),
  }),
  trustBar: z.array(TrustUSPSchema).length(6),
  howItWorks: z.object({
    heading: z.string().min(1),
    steps: z.array(StepSchema).length(6),
  }),
  portfolio: z.object({
    heading: z.string().min(1),
    note: z.string().min(1),
    mode: z.enum(["placeholder", "photos"]),
    placeholders: z.array(PortfolioPlaceholderSchema).min(4),
  }),
  serviceArea: z.object({
    heading: z.string().min(1),
    cities: z.array(CitySchema).min(5),
  }),
  contact: z.object({
    heading: z.string().min(1),
    intro: z.string().min(1),
    formCtaLabel: z.string().min(1),
  }),
  footer: z.object({
    disclaimer: z.string().min(1),
    copyrightTemplate: z.string().min(1),
    legalLinks: z.array(NavLinkSchema),
  }),
  stickyMobileCta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),
});

// ─── Variant (per-LP) ─────────────────────────────────────────────────────

export const ServiceTagSchema = z.enum([
  "channel-letters",
  "lightboxes",
  "vehicle-wraps",
  "window-graphics",
  "other",
]);

export const ServiceCardSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(2).max(5),
  tag: ServiceTagSchema.optional(),
});

export const TierSchema = z
  .object({
    name: z.string().min(1),
    rangeLow: z.number().int().positive(),
    rangeHigh: z.number().int().positive(),
    rangeHighIsMin: z.boolean().optional(),
    perUnit: z.string().optional(),
    scope: z.string().min(1),
    bullets: z.array(z.string().min(1)).min(3).max(5),
  })
  .passthrough();

export const FAQItemSchema = z
  .object({
    q: z.string().min(1),
    a: z.string().min(1),
  })
  .passthrough();

export const MetaSchema = z
  .object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(300),
    ogTitle: z.string().min(1).max(120),
    ogDescription: z.string().min(1).max(300),
  })
  .passthrough();

export const LPSlugSchema = z.enum([
  "home",
  "channel-letter-signs",
  "illuminated-signs",
  "vehicle-wraps",
]);

export const AccentSchema = z.enum(["red", "white", "shine"]);

export const LPVariantSchema = z
  .object({
    slug: LPSlugSchema,
    accent: AccentSchema,
    ctaLabel: z.string().min(1),
    serviceTag: ServiceTagSchema,
    meta: MetaSchema,
    hero: z
      .object({
        eyebrow: z.string().min(1),
        h1: z.string().min(1),
        h1Accent: z.string().min(1),
        subcopy: z.string().min(1),
        trustItems: z.array(z.string().min(1)).min(3).max(6),
        phoneHint: z.string().min(1),
        formHeading: z.string().min(1),
      })
      .passthrough(),
    services: z.object({
      focus: ServiceCardSchema,
      secondary: z.tuple([ServiceCardSchema, ServiceCardSchema]),
    }),
    pricing: z
      .object({
        heading: z.string().min(1),
        intro: z.string().min(1),
        tiers: z.tuple([TierSchema, TierSchema, TierSchema]),
        disclaimer: z.string().min(1),
      })
      .passthrough(),
    faq: z
      .object({
        heading: z.string().min(1),
        items: z.array(FAQItemSchema).length(12),
      })
      .passthrough(),
    trustBar: z.array(TrustUSPSchema).length(6).optional(),
  })
  .passthrough();
