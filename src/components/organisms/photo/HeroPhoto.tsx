import type { LPVariant, NAP } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Icon } from "@/components/atoms/Icon";
import { HeroQuoteForm } from "@/components/organisms/HeroQuoteForm";
import { cn } from "@/lib/utils";

type HeroPhotoProps = {
  lp: LPVariant;
  nap: NAP;
};

/**
 * Photo-first hero — studio-size.com editorial reference.
 *
 * Layout: eyebrow + huge H1 anchored left; full-bleed flagship photo
 * rising to the right. Form anchors below H1 on mobile / inline on md+.
 */
export function HeroPhoto({ lp, nap }: HeroPhotoProps) {
  return (
    <section
      id="main"
      aria-labelledby="hero-h1"
      className="relative bg-gray-1"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-brand-11 font-semibold">
              {lp.hero.eyebrow}
            </p>

            <h1
              id="hero-h1"
              className="text-balance"
              style={{ lineHeight: 1.02 }}
            >
              <span className="text-gray-12">{lp.hero.h1}</span>
              <span
                className={cn(
                  lp.accent === "red" && "text-brand-9",
                  lp.accent === "white" && "text-gray-12",
                  lp.accent === "shine" && "text-gray-10",
                )}
              >
                {lp.hero.h1Accent}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-10 max-w-[56ch] text-pretty leading-relaxed">
              {lp.hero.subcopy}
            </p>

            <ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 max-w-xl"
              role="list"
            >
              {lp.hero.trustItems.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-gray-11">
                  <Icon
                    name="Check"
                    size={18}
                    stroke={2.25}
                    className="mt-0.5 text-brand-9 shrink-0"
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {/* Large hero image fills under the text, photo-first */}
            <ImagePlaceholder
              slot={`hero-${lp.slug}`}
              aspect="wide"
              alt={`Flagship ${lp.services.focus.title} installation example`}
              icon="Image"
              label={`HERO IMAGE — ${lp.slug}`}
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="mt-4"
            />
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <HeroQuoteForm
                lpSlug={lp.slug}
                serviceTag={lp.serviceTag}
                ctaLabel={lp.ctaLabel}
                formHeading={lp.hero.formHeading}
                phoneHint={lp.hero.phoneHint}
                phone={nap.phone}
                phoneDisplay={nap.phoneDisplay}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
