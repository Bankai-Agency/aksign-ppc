"use client";

import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal } from "@/components/atoms/Reveal";
import { useLeadForm } from "@/lib/lead-form";
import { useLocale } from "@/lib/i18n";
import type { LPSlug, LPVariant } from "@/types/lp";

const flipKeys = [
  "hero.flip.storefronts",
  "hero.flip.cafes",
  "hero.flip.boutiques",
  "hero.flip.dealerships",
  "hero.flip.chicago",
] as const;

const heroStats = [
  { value: "10+", labelKey: "hero.stat.years" },
  { value: "500+", labelKey: "hero.stat.signs" },
  { value: "3–7", labelKey: "hero.stat.days" },
] as const;

const heroImage: Record<LPSlug, { src: string; alt: string }> = {
  home: {
    src: "/images/hero-channel-letter-signs.png",
    alt: "AK Sign flagship commercial signage installation",
  },
  "channel-letter-signs": {
    src: "/images/hero-channel-letter-signs.png",
    alt: "AK Sign flagship channel letter installation",
  },
  "illuminated-signs": {
    src: "/images/hero-illuminated-signs.png",
    alt: "AK Sign illuminated lightbox installation",
  },
  "vehicle-wraps": {
    src: "/images/hero-vehicle-wraps.png",
    alt: "AK Sign full-wrap vehicle installation",
  },
};

type HeroPhotoProps = {
  slug?: LPSlug;
  lp?: LPVariant;
};

/**
 * Hero — full-bleed background photo with layered scrims. Per-page H1
 * comes from lp.hero.{h1,h1Accent,subcopy} so each LP can lead with
 * its own service-specific headline (per handoff specs). The home slug
 * keeps the brand-level rotating "flip-pill" H1 driven by the i18n
 * dict because its job is to cover all four services at once.
 */
export function HeroPhoto({ slug = "channel-letter-signs", lp }: HeroPhotoProps) {
  const bg = heroImage[slug] ?? heroImage["channel-letter-signs"];
  const { openModal } = useLeadForm();
  const { t, locale } = useLocale();
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const isHome = slug === "home";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const h: any = lp?.hero ?? {};
  const pickStr = (en: string | undefined, es: string | undefined) =>
    (locale === "es" && es ? es : en) ?? "";
  const staticH1 = pickStr(h.h1, h.h1_es);
  const staticH1Accent = pickStr(h.h1Accent, h.h1Accent_es);
  const staticSubcopy = pickStr(h.subcopy, h.subcopy_es);
  const staticCtaLabel = pickStr(
    lp ? (lp as unknown as { ctaLabel?: string; ctaLabel_es?: string }).ctaLabel : undefined,
    lp ? (lp as unknown as { ctaLabel?: string; ctaLabel_es?: string }).ctaLabel_es : undefined,
  );

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIdx((p) => (p + 1) % flipKeys.length);
        setVisible(true);
      }, 220);
      return () => clearTimeout(swap);
    }, 2400);
    return () => clearInterval(tick);
  }, []);

  return (
    <section
      aria-labelledby="hero-h1"
      className="relative bg-gray-12 text-gray-1 overflow-hidden"
      data-method="textFlip"
    >
      <div className="absolute inset-0">
        <ImagePlaceholder
          slot={`hero-${slug}`}
          src={bg.src}
          aspect="wide"
          alt={bg.alt}
          icon="Image"
          label={`HERO · ${slug.toUpperCase()}`}
          priority
          sizes="100vw"
          className="!rounded-none h-full w-full"
        />
      </div>
      {/* Vertical scrim — top light, bottom heavy (for bottom text) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20"
      />
      {/* Horizontal scrim — darker on the left for left-column text */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent"
      />
      {/* Mobile-only flat dim — 20% for readability over busy photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/20 md:hidden"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-32 md:pt-40 pb-14 md:pb-40 min-h-[100svh] flex items-end md:items-center">
        <div className="w-full flex flex-col">
          <h1
            id="hero-h1"
            className="title font-semibold tracking-[-0.04em] text-gray-1"
            style={{
              fontSize: "clamp(3rem, 0.5rem + 6vw, 6.5rem)",
              lineHeight: 0.95,
            }}
          >
            {isHome ? (
              <>
                <LetterReveal
                  key={`line1-${locale}`}
                  as="span"
                  text={t("hero.line1")}
                  className="block"
                  delay={1.6}
                  stagger={0.04}
                />
                <LetterReveal
                  key={`line2-${locale}`}
                  as="span"
                  text={`${t("hero.line2Prefix")} `}
                  className="block whitespace-nowrap"
                  delay={1.75}
                  stagger={0.04}
                >
                  <span
                    className="italic text-gray-1 bg-brand-9 rounded-md inline-block overflow-hidden align-baseline transition-opacity duration-200 ease-linear"
                    style={{
                      opacity: visible ? 1 : 0,
                      paddingLeft: "0.18em",
                      paddingRight: "0.3em",
                      paddingTop: "0.18em",
                      paddingBottom: "0.18em",
                      marginBottom: "-0.08em",
                    }}
                  >
                    {t(flipKeys[idx])}
                  </span>
                </LetterReveal>
              </>
            ) : (
              <LetterReveal
                key={`staticH1-${slug}-${locale}`}
                as="span"
                text={staticH1}
                className="block text-balance"
                delay={1.6}
                stagger={0.03}
              >
                <span className="italic text-brand-9 whitespace-nowrap">
                  {staticH1Accent}
                </span>
              </LetterReveal>
            )}
          </h1>

          {/* Subheading + CTA — directly under H1 */}
          <Reveal delay={1.4} className="mt-6 md:mt-8">
            <div className="flex flex-col gap-5 md:gap-6 max-w-[44ch]">
              <p
                className="text-base md:text-lg lg:text-xl text-gray-1/90 font-medium leading-relaxed"
                style={{ letterSpacing: "-0.005em" }}
              >
                {isHome ? t("hero.subheading") : staticSubcopy}
              </p>
              <ArrowButton as="button" onClick={openModal} tone="light" size="lg" fullWidthMobile>
                {isHome || !staticCtaLabel ? t("cta.getFreeQuote") : staticCtaLabel}
              </ArrowButton>
            </div>
          </Reveal>

          {/* Mobile address chip — shown between CTA and stats */}
          <Reveal delay={1.5} className="lg:hidden mt-6">
            <a
              href="https://maps.google.com/?q=220+W+Campus+Dr+Unit+D+Arlington+Heights+IL"
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-1/10 backdrop-blur-md text-[11px] uppercase tracking-[0.14em] text-gray-1 font-semibold hover:bg-gray-1/20 transition-colors"
            >
              <span aria-hidden className="relative inline-flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-brand-9 animate-ping opacity-70" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-9" />
              </span>
              {t("areas.addressChip")}
            </a>
          </Reveal>

          {/* Mobile/tablet stats rail — in-flow below the CTA */}
          <Reveal delay={1.55} className="lg:hidden mt-10">
            <ul className="flex gap-5 sm:gap-8 text-left text-gray-1">
              {heroStats.map((s) => (
                <li key={s.labelKey} className="flex flex-col gap-1.5">
                  <span
                    className="font-semibold tracking-[-0.03em] tabular-nums"
                    style={{
                      fontSize: "clamp(1.75rem, 1rem + 2vw, 2.5rem)",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-gray-1/70 leading-snug">
                    {t(s.labelKey)}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Desktop address — bottom-left, same baseline as stats rail */}
        <Reveal delay={1.5}>
          <a
            href="https://maps.google.com/?q=220+W+Campus+Dr+Unit+D+Arlington+Heights+IL"
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            className="hidden lg:inline-flex absolute left-6 md:left-10 lg:left-16 bottom-10 md:bottom-14 items-center gap-3 px-5 py-3 rounded-full bg-gray-1/10 backdrop-blur-md text-sm uppercase tracking-[0.14em] text-gray-1 font-semibold hover:bg-gray-1/20 transition-colors"
          >
            <span
              aria-hidden
              className="relative inline-flex w-2 h-2"
            >
              <span className="absolute inset-0 rounded-full bg-brand-9 animate-ping opacity-70" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-9" />
            </span>
            {t("areas.addressChip")}
          </a>
        </Reveal>

        {/* Desktop stats rail — absolute bottom-right */}
        <Reveal delay={1.6}>
          <ul className="hidden lg:flex absolute right-6 md:right-10 lg:right-16 bottom-10 md:bottom-14 items-start gap-10 xl:gap-14 text-left text-gray-1">
            {heroStats.map((s) => (
              <li
                key={s.labelKey}
                className="flex flex-col gap-2 w-[140px] shrink-0"
              >
                <span
                  className="font-semibold tracking-[-0.03em] tabular-nums"
                  style={{ fontSize: "clamp(2.5rem, 1.25rem + 2.5vw, 3.5rem)" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-gray-1/70 leading-snug">
                  {t(s.labelKey)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
