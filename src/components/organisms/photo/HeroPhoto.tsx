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
 * Photo-first editorial hero — studio-size.com split layout.
 *
 * Left: eyebrow + gigantic H1 + subcopy + CTA + phone.
 * Right: full-height portrait image of the flagship product (sticky on
 * scroll within the hero band).
 *
 * Trust bullets sit below the split as a 4-col divider.
 */
export function HeroPhoto({ lp, nap }: HeroPhotoProps) {
  const accentColor =
    lp.accent === "red"
      ? "text-brand-9"
      : lp.accent === "white"
        ? "text-gray-12"
        : "text-gray-10";

  return (
    <section
      id="main"
      aria-labelledby="hero-h1"
      className="relative bg-gray-1"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-10 md:pt-16 pb-14 md:pb-24">
        <div className="grid gap-10 md:gap-12 lg:gap-16 lg:grid-cols-12 items-stretch">
          {/* ─── Left — text block ─── */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-10 md:gap-14">
            <Reveal>
              <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-11 font-semibold">
                {lp.hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.08} y={56}>
              <h1
                id="hero-h1"
                className="text-balance font-bold tracking-[-0.04em]"
                style={{
                  fontSize: "clamp(3rem, 1rem + 7.5vw, 9rem)",
                  lineHeight: 0.92,
                }}
              >
                <span className="text-gray-12">{lp.hero.h1}</span>
                <span className={cn(accentColor)}>{lp.hero.h1Accent}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-10 max-w-[52ch] text-pretty leading-snug">
                {lp.hero.subcopy}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild intent="primary" size="xl">
                  <a href="#quote">{lp.ctaLabel}</a>
                </Button>
                <a
                  href={`tel:${nap.phone}`}
                  className="inline-flex items-center gap-2 text-base md:text-lg font-semibold text-gray-12 hover:text-brand-11 tabular-nums"
                >
                  <Icon name="Phone" size={20} />
                  {nap.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          {/* ─── Right — flagship photo ─── */}
          <Reveal delay={0.1} y={60} className="lg:col-span-5" as="div">
            <ImagePlaceholder
              slot={`hero-${lp.slug}`}
              aspect="portrait"
              alt={`Flagship ${lp.services.focus.title} installation example`}
              icon="Image"
              label={`HERO · ${lp.slug}`}
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="!rounded-2xl min-h-[420px] md:min-h-[520px] lg:min-h-full h-full"
            />
          </Reveal>
        </div>
      </div>

      {/* ─── Trust bullets strip ─── */}
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
        <StaggerGroup
          as="ul"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-gray-3 pt-8 md:pt-12"
        >
          {lp.hero.trustItems.map((t) => (
            <StaggerItem
              key={t}
              as="li"
              className="flex items-start gap-3 text-base md:text-lg text-gray-12 font-medium leading-snug"
            >
              <Icon
                name="Check"
                size={22}
                stroke={2.25}
                className="mt-0.5 text-brand-9 shrink-0"
              />
              <span>{t}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
