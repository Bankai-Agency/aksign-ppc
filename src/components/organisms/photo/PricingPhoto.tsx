import type { Accent, LPVariant } from "@/types/lp";
import { PricingTier } from "@/components/molecules/PricingTier";
import { cn } from "@/lib/utils";

type PricingPhotoProps = {
  accent: Accent;
  pricing: LPVariant["pricing"];
};

const disclaimerBorder: Record<Accent, string> = {
  red: "border-l-brand-9",
  white: "border-l-gray-12",
  shine: "border-l-gray-10",
};

/**
 * Pricing in photo-first variant — tight 3-up cards with keyline
 * dividers instead of heavy emphasis. Signature readability preserved.
 */
export function PricingPhoto({ accent, pricing }: PricingPhotoProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-gray-1 border-y border-gray-3"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 id="pricing-heading" className="mb-4">
            {pricing.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-10 leading-relaxed">
            {pricing.intro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricing.tiers.map((t, i) => (
            <PricingTier
              key={t.name}
              tier={t}
              accent={accent}
              emphasis={i === 1}
            />
          ))}
        </div>

        <aside
          role="note"
          className={cn(
            "mt-10 md:mt-14 border-l-4 bg-white p-5 md:p-6",
            disclaimerBorder[accent],
          )}
        >
          <p className="text-sm md:text-base text-gray-11 leading-relaxed">
            {pricing.disclaimer}
          </p>
        </aside>
      </div>
    </section>
  );
}
