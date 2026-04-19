import type { Accent, LPVariant } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { formatMoneyRange } from "@/lib/format-money";
import { cn } from "@/lib/utils";

type PricingPhotoProps = {
  accent: Accent;
  pricing: LPVariant["pricing"];
};

const accentText: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-10",
};

const disclaimerBorder: Record<Accent, string> = {
  red: "border-l-brand-9",
  white: "border-l-gray-12",
  shine: "border-l-gray-10",
};

/**
 * Pricing in photo-first variant — giant numerals, full-width editorial
 * rows instead of side-by-side cards. Each tier gets its own band.
 */
export function PricingPhoto({ accent, pricing }: PricingPhotoProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-gray-1 border-y border-gray-3"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <Reveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-11 font-semibold">
            Honest pricing
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="pricing-heading"
            className="mt-4 mb-8 md:mb-10 max-w-5xl tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2.25rem, 1rem + 5.5vw, 6.25rem)",
              lineHeight: 0.95,
            }}
          >
            {pricing.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-10 leading-snug max-w-[60ch] mb-20 md:mb-28">
            {pricing.intro}
          </p>
        </Reveal>

        <StaggerGroup className="flex flex-col gap-16 md:gap-24" stagger={0.12}>
          {pricing.tiers.map((t, i) => {
            const range = formatMoneyRange(
              t.rangeLow,
              t.rangeHigh,
              t.rangeHighIsMin,
            );
            return (
              <StaggerItem key={t.name} y={60}>
                <article
                  aria-labelledby={`pricing-tier-${i}`}
                  className="grid gap-6 md:gap-10 md:grid-cols-12 md:items-start border-t border-gray-3 pt-10 md:pt-14"
                >
                  <div className="md:col-span-4 flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.22em] text-gray-10 font-semibold">
                      Tier {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      id={`pricing-tier-${i}`}
                      className="tracking-[-0.02em]"
                      style={{
                        fontSize: "clamp(1.5rem, 1rem + 1.5vw, 2.5rem)",
                        lineHeight: 1,
                      }}
                    >
                      {t.name}
                    </h3>
                    <p className="mt-4 text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
                      {t.scope}
                    </p>
                  </div>

                  <div className="md:col-span-5 flex flex-col justify-start">
                    <p
                      className={cn(
                        "font-bold tabular-nums tracking-[-0.04em] text-balance",
                        accentText[accent],
                      )}
                      style={{
                        fontSize: "clamp(3rem, 1rem + 6.5vw, 7.5rem)",
                        lineHeight: 0.95,
                      }}
                      aria-label={`Range ${t.rangeLow.toLocaleString()} to ${t.rangeHigh.toLocaleString()} dollars${t.rangeHighIsMin ? " or more" : ""}${t.perUnit ? ` ${t.perUnit}` : ""}`}
                    >
                      {range}
                    </p>
                    {t.perUnit && (
                      <p className="mt-2 text-base md:text-lg text-gray-10">
                        {t.perUnit}
                      </p>
                    )}
                  </div>

                  <ul className="md:col-span-3 flex flex-col gap-3 text-base text-gray-12">
                    {t.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Icon
                          name="Check"
                          size={18}
                          stroke={2.25}
                          className={cn("mt-0.5 shrink-0", accentText[accent])}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.2}>
          <aside
            role="note"
            className={cn(
              "mt-16 md:mt-24 border-l-4 bg-white p-6 md:p-8",
              disclaimerBorder[accent],
            )}
          >
            <p className="text-sm md:text-base text-gray-11 leading-relaxed max-w-3xl">
              {pricing.disclaimer}
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
