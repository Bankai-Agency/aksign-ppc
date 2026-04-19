"use client";

import { useEffect, useState } from "react";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal } from "@/components/atoms/Reveal";
import type { LPSlug } from "@/types/lp";

const flipWords = [
  "storefronts",
  "cafés",
  "boutiques",
  "dealerships",
  "Chicago",
];

const heroStats: { value: string; label: string }[] = [
  { value: "10+", label: "Years in Chicago" },
  { value: "500+", label: "Signs installed" },
  { value: "3–7", label: "Day turnaround" },
];

const heroImage: Record<LPSlug, { src: string; alt: string }> = {
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
};

/**
 * Hero — full-bleed background photo with layered scrims (vertical
 * for bottom text + horizontal for left-side text contrast). Background
 * picture is picked per LP slug so LP-01 / LP-02 / LP-03 each get
 * their own shot; everything else is shared.
 */
export function HeroPhoto({ slug = "channel-letter-signs" }: HeroPhotoProps) {
  const bg = heroImage[slug] ?? heroImage["channel-letter-signs"];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tick = setInterval(() => {
      setVisible(false);
      const swap = setTimeout(() => {
        setIdx((p) => (p + 1) % flipWords.length);
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
            <LetterReveal
              as="span"
              text="Commercial Signage"
              className="block"
              delay={1.6}
              stagger={0.04}
            />
            <LetterReveal
              as="span"
              text="for "
              className="block whitespace-nowrap"
              delay={1.75}
              stagger={0.04}
            >
              <span
                className="italic text-brand-6 inline-block overflow-hidden align-baseline transition-opacity duration-200 ease-linear md:min-w-[11ch]"
                style={{
                  opacity: visible ? 1 : 0,
                  paddingBottom: "0.35em",
                  marginBottom: "-0.28em",
                }}
              >
                {flipWords[idx]}
              </span>
            </LetterReveal>
          </h1>

          {/* Subheading + CTA — directly under H1 */}
          <Reveal delay={1.4} className="mt-6 md:mt-8">
            <div className="flex flex-col gap-5 md:gap-6 max-w-[44ch]">
              <p
                className="text-base md:text-lg lg:text-xl text-gray-1/90 font-medium leading-relaxed"
                style={{ letterSpacing: "-0.005em" }}
              >
                Commercial-grade signage for Chicago-area storefronts —
                fabricated, permitted and installed in-house by one team.
              </p>
              <ArrowButton href="#contact" tone="light" size="lg">
                Get a free quote
              </ArrowButton>
            </div>
          </Reveal>

          {/* Mobile/tablet stats rail — in-flow below the CTA */}
          <Reveal delay={1.55} className="lg:hidden mt-10">
            <ul className="flex gap-5 sm:gap-8 text-left text-gray-1">
              {heroStats.map((s) => (
                <li key={s.label} className="flex flex-col gap-1.5">
                  <span
                    className="font-semibold tracking-[-0.03em] tabular-nums"
                    style={{
                      fontSize: "clamp(1.75rem, 1rem + 2vw, 2.5rem)",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-gray-1/70 leading-snug">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Desktop stats rail — absolute bottom-right */}
        <Reveal delay={1.6}>
          <ul className="hidden lg:flex absolute right-6 md:right-10 lg:right-16 bottom-10 md:bottom-14 items-start gap-10 xl:gap-14 text-left text-gray-1">
            {heroStats.map((s) => (
              <li
                key={s.label}
                className="flex flex-col gap-2 w-[140px] shrink-0"
              >
                <span
                  className="font-semibold tracking-[-0.03em] tabular-nums"
                  style={{ fontSize: "clamp(2.5rem, 1.25rem + 2.5vw, 3.5rem)" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-gray-1/70 leading-snug">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
