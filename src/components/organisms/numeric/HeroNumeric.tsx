import type { LPVariant, NAP } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { HeroQuoteForm } from "@/components/organisms/HeroQuoteForm";
import { cn } from "@/lib/utils";

type HeroNumericProps = {
  lp: LPVariant;
  nap: NAP;
};

const accentText: Record<LPVariant["accent"], string> = {
  red: "text-brand-6",
  white: "text-white",
  shine:
    "bg-clip-text text-transparent bg-[linear-gradient(115deg,#C8C8CC_0%,#F5F5F5_50%,#C8C8CC_100%)]",
};

const shineStrip = (
  <div
    aria-hidden="true"
    className="absolute inset-0 pointer-events-none hidden md:block opacity-10 bg-[linear-gradient(115deg,#C8C8CC,#E4E4E7,#C8C8CC)]"
  />
);

/**
 * Numeric-first hero — Ramp.com / Daniyar-brief reference.
 *
 * Layout: dark surface, big Manrope H1 with single-word colored accent,
 * form card on the right. No hero photo — pure typography peak.
 */
export function HeroNumeric({ lp, nap }: HeroNumericProps) {
  return (
    <section
      id="main"
      aria-labelledby="hero-h1"
      className="relative bg-gray-12 text-white overflow-hidden"
    >
      {lp.accent === "shine" && shineStrip}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-6 font-semibold">
              {lp.hero.eyebrow}
            </p>

            <h1
              id="hero-h1"
              className="text-white text-balance"
              style={{ fontSize: "clamp(2.75rem, 2rem + 4vw, 5.5rem)", lineHeight: 1.02 }}
            >
              {lp.hero.h1}
              <span className={cn(accentText[lp.accent])}>
                {lp.hero.h1Accent}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-3 max-w-[56ch] text-pretty leading-relaxed">
              {lp.hero.subcopy}
            </p>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-xl"
              role="list"
            >
              {lp.hero.trustItems.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-3">
                  <Icon
                    name="Check"
                    size={18}
                    stroke={2.25}
                    className="mt-0.5 text-brand-6 shrink-0"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-gray-5">
              Prefer to talk?{" "}
              <a
                href={`tel:${nap.phone}`}
                className="underline tabular-nums font-medium text-white hover:text-brand-5"
              >
                {nap.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <HeroQuoteForm
                lpSlug={lp.slug}
                serviceTag={lp.serviceTag}
                ctaLabel={lp.ctaLabel}
                formHeading={lp.hero.formHeading}
                phoneHint={lp.hero.phoneHint}
                phone={nap.phone}
                phoneDisplay={nap.phoneDisplay}
                variant="light"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
