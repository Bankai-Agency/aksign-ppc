import type { LPVariant } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { formatMoneyRange } from "@/lib/format-money";

type PricingStudioProps = {
  pricing: LPVariant["pricing"];
};

/**
 * Pricing in studio-size design language — warm off-white bg, tight
 * editorial bands, giant tier numerals in brand-red, LetterReveal
 * heading.
 */
export function PricingStudio({ pricing }: PricingStudioProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-gray-1 text-gray-12 border-t border-gray-12/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          (Pricing)
        </p>

        <LetterReveal
          as="h2"
          id="pricing-heading"
          text={pricing.heading}
          className="max-w-5xl font-semibold tracking-[-0.04em] block"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 1.02,
          }}
          stagger={0.04}
        />

        <Reveal delay={0.2}>
          <p className="mt-6 md:mt-8 max-w-[60ch] text-lg md:text-xl text-gray-10 leading-relaxed">
            {pricing.intro}
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-16 md:mt-24 flex flex-col gap-12 md:gap-16"
          stagger={0.1}
        >
          {pricing.tiers.map((t, i) => {
            const range = formatMoneyRange(
              t.rangeLow,
              t.rangeHigh,
              t.rangeHighIsMin,
            );
            return (
              <StaggerItem key={t.name} y={40}>
                <article
                  aria-labelledby={`pricing-tier-${i}`}
                  className="grid gap-6 md:gap-10 md:grid-cols-12 md:items-start border-t border-gray-12/15 pt-8 md:pt-12"
                >
                  <div className="md:col-span-3 flex flex-col gap-3">
                    <span className="text-xs uppercase tracking-[0.22em] text-gray-10 font-medium tabular-nums">
                      Tier {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      id={`pricing-tier-${i}`}
                      className="font-semibold tracking-[-0.03em]"
                      style={{
                        fontSize: "clamp(1.5rem, 1rem + 1.25vw, 2.25rem)",
                        lineHeight: 1.05,
                      }}
                    >
                      {t.name}
                    </h3>
                  </div>

                  <div className="md:col-span-5">
                    <p
                      className="font-semibold tabular-nums tracking-[-0.05em] text-brand-9 text-balance"
                      style={{
                        fontSize: "clamp(2.5rem, 1rem + 5vw, 6.25rem)",
                        lineHeight: 0.98,
                      }}
                      aria-label={`Range ${t.rangeLow.toLocaleString()} to ${t.rangeHigh.toLocaleString()} dollars${t.rangeHighIsMin ? " or more" : ""}`}
                    >
                      {range}
                    </p>
                    <p className="mt-4 text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
                      {t.scope}
                    </p>
                  </div>

                  <ul className="md:col-span-4 flex flex-col gap-2.5 text-base text-gray-12">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-2 w-1 h-1 rounded-full bg-gray-12 shrink-0"
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.25}>
          <p className="mt-16 md:mt-24 max-w-3xl text-sm md:text-base text-gray-10 leading-relaxed border-l-2 border-brand-9 pl-5">
            {pricing.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
