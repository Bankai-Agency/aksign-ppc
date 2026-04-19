import type { LPVariant, NAP } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "@/components/atoms/Reveal";
import { HeroQuoteForm } from "@/components/organisms/HeroQuoteForm";

type QuoteSectionPhotoProps = {
  lp: LPVariant;
  nap: NAP;
};

export function QuoteSectionPhoto({ lp, nap }: QuoteSectionPhotoProps) {
  return (
    <section
      id="quote"
      aria-labelledby="quote-heading"
      className="bg-gray-12 text-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12 items-start">
          <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-8">
            <Reveal>
              <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-5 font-semibold">
                Ready when you are
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="quote-heading"
                className="text-white tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(2.5rem, 1rem + 6vw, 7rem)",
                  lineHeight: 0.92,
                }}
              >
                Quote in one business day.
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-3 leading-snug max-w-[48ch] text-pretty">
                Two fields now, details later. Or call us direct — most storefront
                projects are quoted the same day.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a
                  href={`tel:${nap.phone}`}
                  className="inline-flex items-center gap-2 text-xl md:text-2xl font-semibold text-white hover:text-brand-5 tabular-nums transition-colors"
                >
                  <Icon name="Phone" size={22} />
                  {nap.phoneDisplay}
                </a>
                <a
                  href={`mailto:${nap.email}`}
                  className="inline-flex items-center gap-2 text-base text-gray-3 hover:text-white transition-colors"
                >
                  <Icon name="Mail" size={18} />
                  {nap.email}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-6 lg:col-span-5">
            <Reveal delay={0.1} y={60}>
              <HeroQuoteForm
                lpSlug={lp.slug}
                serviceTag={lp.serviceTag}
                ctaLabel={lp.ctaLabel}
                formHeading={lp.hero.formHeading}
                phoneHint={lp.hero.phoneHint}
                phone={nap.phone}
                phoneDisplay={nap.phoneDisplay}
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
