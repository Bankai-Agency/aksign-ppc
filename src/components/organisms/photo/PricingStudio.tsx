"use client";

import type { LPVariant } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { formatMoneyRange } from "@/lib/format-money";
import { useLeadForm } from "@/lib/lead-form";
import { useLocale } from "@/lib/i18n";

type PricingStudioProps = {
  pricing: LPVariant["pricing"];
};

/**
 * Pricing in studio-size design language — warm off-white bg, tight
 * editorial bands, giant tier numerals in brand-red, LetterReveal
 * heading.
 */
export function PricingStudio({ pricing }: PricingStudioProps) {
  const { openModal } = useLeadForm();
  const { t, locale } = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const p: any = pricing;
  const pickStr = (en: string | undefined, es: string | undefined) =>
    (locale === "es" && es ? es : en) ?? "";
  const headingSrc = pickStr(p.heading, p.heading_es);
  const introSrc = pickStr(p.intro, p.intro_es);
  const disclaimerSrc = pickStr(p.disclaimer, p.disclaimer_es);
  // Split heading on em-dash so the second clause drops to line 2.
  const [headingMain, headingSub] = headingSrc.split(/\s—\s/);
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-14 md:py-24">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          {t("eyebrow.pricing")}
        </p>

        <h2
          id="pricing-heading"
          className="font-semibold tracking-[-0.04em] text-balance"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 0.95,
          }}
        >
          <LetterReveal as="span" text={headingMain} className="block" stagger={0.04} />
          {headingSub ? (
            <LetterReveal
              as="span"
              text={headingSub}
              className="block text-gray-10"
              delay={0.15}
              stagger={0.035}
            />
          ) : null}
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-4 md:mt-5 max-w-[60ch] text-lg md:text-xl text-gray-10 leading-relaxed">
            {introSrc}
          </p>
        </Reveal>

        <StaggerGroup
          className="mt-8 md:mt-16 grid gap-5 md:gap-6 md:grid-cols-3"
          stagger={0.1}
        >
          {pricing.tiers.map((tier, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tr: any = tier;
            const name = pickStr(tr.name, tr.name_es);
            const scope = pickStr(tr.scope, tr.scope_es);
            const bullets: string[] =
              locale === "es" && Array.isArray(tr.bullets_es)
                ? tr.bullets_es
                : tr.bullets;
            const range = formatMoneyRange(
              tier.rangeLow,
              tier.rangeHigh,
              tier.rangeHighIsMin,
            );
            return (
              <StaggerItem key={tier.name} y={40}>
                <button
                  type="button"
                  onClick={openModal}
                  aria-labelledby={`pricing-tier-${i}`}
                  className="group h-full w-full text-left flex flex-col gap-6 rounded-2xl bg-gray-2 p-7 md:p-8 cursor-pointer transition-colors duration-300 ease-out hover:bg-brand-9 hover:text-gray-1"
                >
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gray-10 font-medium tabular-nums group-hover:text-gray-1/70 transition-colors">
                    Tier {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    id={`pricing-tier-${i}`}
                    className="font-semibold tracking-[-0.025em]"
                    style={{
                      fontSize: "clamp(1.25rem, 1rem + 0.8vw, 1.75rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {name}
                  </h3>

                  <p
                    className="font-semibold tabular-nums tracking-[-0.035em] text-brand-9 group-hover:text-gray-1 transition-colors"
                    style={{
                      fontSize: "clamp(2rem, 1rem + 2.25vw, 3.25rem)",
                      lineHeight: 1.05,
                    }}
                    aria-label={`Range ${tier.rangeLow.toLocaleString()} to ${tier.rangeHigh.toLocaleString()} dollars${tier.rangeHighIsMin ? " or more" : ""}`}
                  >
                    {(() => {
                      const [lo, hi] = range.split(" \u2013 ");
                      return (
                        <>
                          <span className="block">{lo}</span>
                          <span className="block">{"\u2013"} {hi}</span>
                        </>
                      );
                    })()}
                  </p>

                  <p className="text-sm md:text-base text-gray-10 leading-relaxed group-hover:text-gray-1/85 transition-colors">
                    {scope}
                  </p>

                  <ul className="flex flex-col gap-2 text-sm md:text-base text-gray-12 group-hover:text-gray-1 transition-colors mt-auto">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="mt-2 w-1 h-1 rounded-full bg-gray-12 group-hover:bg-gray-1 shrink-0 transition-colors"
                        />
                        <span className="leading-snug">{b}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal delay={0.25}>
          <p className="mt-10 md:mt-24 max-w-3xl text-sm md:text-base text-gray-10 leading-relaxed border-l-2 border-brand-9 pl-5">
            {disclaimerSrc}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
