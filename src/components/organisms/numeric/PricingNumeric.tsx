import type { Accent, LPVariant } from "@/types/lp";
import { PricingTier } from "@/components/molecules/PricingTier";
import { cn } from "@/lib/utils";

type PricingNumericProps = {
  accent: Accent;
  pricing: LPVariant["pricing"];
};

const disclaimerBorder: Record<Accent, string> = {
  red: "border-l-brand-9",
  white: "border-l-gray-12",
  shine: "border-l-gray-10",
};

/**
 * Pricing in numeric-first variant — the signature element. Extra
 * breathing room (py-24 md:py-32) and generous intro to make this the
 * typographic peak of the page.
 */
export function PricingNumeric({ accent, pricing }: PricingNumericProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-white border-y border-gray-3"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl mb-14 md:mb-20">
          <h2 id="pricing-heading" className="mb-5">
            {pricing.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-10 leading-relaxed">
            {pricing.intro}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
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
            "mt-14 md:mt-20 border-l-4 bg-gray-1 p-6",
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
