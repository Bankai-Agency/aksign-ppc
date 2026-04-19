import type { LPVariant, NAP } from "@/types/lp";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type HeroPhotoProps = {
  lp: LPVariant;
  nap: NAP;
};

/**
 * Photo-first editorial hero — full-bleed flagship image as background,
 * headline + CTA overlaid at the bottom. Dark gradient ensures contrast
 * over any photo. studio-size.com / daydream hero reference.
 */
export function HeroPhoto({ lp, nap }: HeroPhotoProps) {
  const accentColor =
    lp.accent === "red"
      ? "text-brand-6"
      : lp.accent === "white"
        ? "text-white"
        : "text-gray-3";

  return (
    <section
      id="main"
      aria-labelledby="hero-h1"
      className="relative bg-gray-12 text-white overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          slot={`hero-${lp.slug}`}
          aspect="wide"
          alt={`Flagship ${lp.services.focus.title} installation example`}
          icon="Image"
          label={`HERO · ${lp.slug}`}
          priority
          sizes="100vw"
          className="!rounded-none h-full w-full"
        />
      </div>

      {/* Gradient scrim for text contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent"
      />

      {/* Content overlay */}
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 min-h-[calc(100svh-5rem)] flex flex-col justify-end pt-24 md:pt-32 pb-14 md:pb-20">
        <div className="max-w-[1280px]">
          <Reveal>
            <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-5 font-semibold">
              {lp.hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08} y={56}>
            <h1
              id="hero-h1"
              className="mt-6 md:mt-8 text-balance font-bold tracking-[-0.04em] text-white"
              style={{
                fontSize: "clamp(3rem, 1rem + 8vw, 9.5rem)",
                lineHeight: 0.9,
              }}
            >
              <span>{lp.hero.h1}</span>
              <span className={cn(accentColor)}>{lp.hero.h1Accent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 md:mt-10 grid gap-6 md:grid-cols-12 md:items-end">
              <p className="md:col-span-7 lg:col-span-6 text-lg md:text-xl lg:text-2xl text-gray-2 max-w-[56ch] text-pretty leading-snug">
                {lp.hero.subcopy}
              </p>

              <div className="md:col-span-5 lg:col-span-6 flex flex-wrap items-center gap-4 md:justify-end">
                <Button asChild intent="primary" size="xl">
                  <a href="#quote">{lp.ctaLabel}</a>
                </Button>
                <a
                  href={`tel:${nap.phone}`}
                  className="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-white hover:text-brand-5 tabular-nums"
                >
                  <Icon name="Phone" size={20} />
                  {nap.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Trust bullets — dark strip at the very bottom */}
      <div className="relative border-t border-white/15 bg-black/50 backdrop-blur-sm">
        <StaggerGroup
          as="ul"
          className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10"
        >
          {lp.hero.trustItems.map((t) => (
            <StaggerItem
              key={t}
              as="li"
              className="flex items-start gap-2.5 text-sm md:text-base text-white font-medium leading-snug"
            >
              <Icon
                name="Check"
                size={18}
                stroke={2.25}
                className="mt-0.5 text-brand-5 shrink-0"
              />
              <span>{t}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
