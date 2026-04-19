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
 * Photo-first editorial hero — studio-size.com reference.
 *
 * Typographic peak: H1 is gigantic (~clamp 56→160px), single statement.
 * No form on fold — CTA scrolls to dedicated QuoteSection. Photo of the
 * signature product sits as a full-bleed band directly below the H1
 * block, with two supporting rail bars (keyword chips + phone) around it.
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
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-10 md:pt-20 pb-14 md:pb-20">
        <Reveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-11 font-semibold">
            {lp.hero.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.08} y={56}>
          <h1
            id="hero-h1"
            className="mt-8 md:mt-12 text-balance font-bold tracking-[-0.04em]"
            style={{
              fontSize: "clamp(3rem, 1.25rem + 8vw, 10rem)",
              lineHeight: 0.92,
            }}
          >
            <span className="text-gray-12">{lp.hero.h1}</span>
            <span className={cn(accentColor)}>{lp.hero.h1Accent}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="md:col-span-7 lg:col-span-6 text-lg md:text-xl lg:text-2xl text-gray-10 max-w-[56ch] text-pretty leading-snug">
              {lp.hero.subcopy}
            </p>

            <div className="md:col-span-5 lg:col-span-6 flex flex-wrap items-center gap-3 md:justify-end">
              <Button asChild intent="primary" size="xl">
                <a href="#quote">{lp.ctaLabel}</a>
              </Button>
              <a
                href={`tel:${nap.phone}`}
                className="inline-flex items-center gap-2 text-base font-semibold text-gray-12 hover:text-brand-11 tabular-nums"
              >
                <Icon name="Phone" size={18} />
                {nap.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1} y={80}>
        <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16">
          <ImagePlaceholder
            slot={`hero-${lp.slug}`}
            aspect="wide"
            alt={`Flagship ${lp.services.focus.title} installation example`}
            icon="Image"
            label={`HERO IMAGE — ${lp.slug}`}
            priority
            sizes="100vw"
            className="!rounded-2xl aspect-[16/9] md:aspect-[21/9]"
          />
        </div>
      </Reveal>

      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-8 md:pt-12 pb-16 md:pb-28">
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
