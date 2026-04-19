/**
 * Type-guarded content loader.
 *
 * JSON files are parsed through the Zod schemas mirroring src/types/lp.ts —
 * any drift between the two fails the build. Downstream components receive
 * fully-typed `SharedContent` and `LPVariant` values; no runtime casts.
 */

import sharedJson from "@/data/shared.json";
import lp01Json from "@/data/lp-01.json";
import lp02Json from "@/data/lp-02.json";
import lp03Json from "@/data/lp-03.json";

import {
  LPVariantSchema,
  SharedContentSchema,
} from "@/lib/validators/content";
import type { LPSlug, LPVariant, SharedContent } from "@/types/lp";

const shared: SharedContent = SharedContentSchema.parse(sharedJson);
const lp01: LPVariant = LPVariantSchema.parse(lp01Json);
const lp02: LPVariant = LPVariantSchema.parse(lp02Json);
const lp03: LPVariant = LPVariantSchema.parse(lp03Json);

const variants: Record<LPSlug, LPVariant> = {
  "channel-letter-signs": lp01,
  "illuminated-signs": lp02,
  "vehicle-wraps": lp03,
};

export function getSharedContent(): SharedContent {
  return shared;
}

export function getLPVariant(slug: LPSlug): LPVariant {
  return variants[slug];
}

export function getAllLPSlugs(): LPSlug[] {
  return Object.keys(variants) as LPSlug[];
}
