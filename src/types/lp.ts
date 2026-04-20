/**
 * Domain types for AK Sign PPC landing pages.
 *
 * Source of truth: /Users/dmitriy/aksign/common/page-spec.md §3 + per-LP
 * CONTENT.md files. All copy lives in src/data/*.json and is validated
 * against mirroring Zod schemas in src/lib/validators/content.ts at build.
 */

export type LPSlug =
  | "home"
  | "channel-letter-signs"
  | "illuminated-signs"
  | "vehicle-wraps";

export type Accent = "red" | "white" | "shine";

export type ServiceTag =
  | "channel-letters"
  | "lightboxes"
  | "vehicle-wraps"
  | "window-graphics"
  | "other";

// ─── Shared blocks ─────────────────────────────────────────────────────────

export type AddressParts = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Socials = {
  instagram: string;
  telegram: string;
  whatsapp: string;
};

export type NAP = {
  name: string;
  address: AddressParts;
  addressDisplay: string;
  phone: string;        // E.164, e.g. "+13128984581"
  phoneDisplay: string; // "(312) 898-4581"
  email: string;
  mapCid: string;
  mapEmbedUrl: string;
  hours?: string;       // may be "{{PLACEHOLDER: hours}}"
  socials: Socials;
};

export type NavLink = { label: string; href: string };

export type TrustUSP = { icon: string; title: string; subcopy: string };

export type Step = { number: number; title: string; description: string };

export type CityTier = "P0" | "P1" | "P2";
export type City = { name: string; tier: CityTier };

export type PortfolioCategory =
  | "channel-letters"
  | "lightbox"
  | "vehicle-wrap"
  | "window-graphics";

export type PortfolioPlaceholder = {
  title: string;
  category: PortfolioCategory;
  illustrationSrc: string;
  imageSrc?: string;   // photo replacement when available
  aspect?: "portrait" | "landscape" | "square";
};

export type PortfolioMode = "placeholder" | "photos";

export type SharedContent = {
  nap: NAP;
  header: { navLinks: NavLink[]; ctaLabel: string };
  trustBar: TrustUSP[];
  howItWorks: { heading: string; steps: Step[] };
  portfolio: {
    heading: string;
    note: string;
    mode: PortfolioMode;
    placeholders: PortfolioPlaceholder[];
  };
  serviceArea: { heading: string; cities: City[] };
  contact: {
    heading: string;
    intro: string;
    formCtaLabel: string;
  };
  footer: {
    disclaimer: string;
    copyrightTemplate: string;
    legalLinks: NavLink[];
  };
  stickyMobileCta: { label: string; href: string };
};

// ─── Variant (per-LP) blocks ──────────────────────────────────────────────

export type ServiceCard = {
  icon: string;
  title: string;
  description: string;
  bullets: string[];
  tag?: ServiceTag;
};

export type Tier = {
  name: string;
  rangeLow: number;
  rangeHigh: number;
  rangeHighIsMin?: boolean;  // true -> "$25,000+"
  perUnit?: string;           // e.g. "per vehicle"
  scope: string;
  bullets: string[];
};

export type FAQItem = { q: string; a: string };

export type Meta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export type LPVariant = {
  slug: LPSlug;
  accent: Accent;
  ctaLabel: string;
  serviceTag: ServiceTag;  // pre-selected in form step 2
  meta: Meta;
  hero: {
    eyebrow: string;
    h1: string;
    h1Accent: string;
    subcopy: string;
    trustItems: string[];
    phoneHint: string;
    formHeading: string;
  };
  services: {
    focus: ServiceCard;
    secondary: [ServiceCard, ServiceCard];
  };
  pricing: {
    heading: string;
    intro: string;
    tiers: [Tier, Tier, Tier];
    disclaimer: string;
  };
  faq: {
    heading: string;
    items: FAQItem[];
  };
};
