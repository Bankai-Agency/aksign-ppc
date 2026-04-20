"use client";

import type { SharedContent } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { useLocale } from "@/lib/i18n";

type ServiceAreaStudioProps = {
  data: SharedContent["serviceArea"];
  nap?: SharedContent["nap"];
};

/**
 * Service area — two-column: left column carries the eyebrow, heading,
 * intro copy and flowing city pills; right column is the full-height
 * dark office map that stretches to match the left column, so eyebrow
 * top and city-list bottom align with map top/bottom.
 */
export function ServiceAreaStudio({ data, nap }: ServiceAreaStudioProps) {
  const { t, locale } = useLocale();
  const mapSrc =
    nap?.mapEmbedUrl ??
    "https://www.google.com/maps?q=220+W+Campus+Dr+Unit+D+Arlington+Heights+IL+60004&output=embed";
  const addressDisplay =
    nap?.addressDisplay ??
    "220 W Campus Dr, Unit D, Arlington Heights, IL 60004";

  return (
    <section
      id="service-area"
      aria-labelledby="area-heading"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-14 md:py-24">
        <div className="grid gap-8 md:gap-16 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-6 flex flex-col">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
              {t("eyebrow.areas")}
            </p>
            <LetterReveal
              key={`area-h-${locale}`}
              as="h2"
              id="area-heading"
              text={t("areas.heading")}
              className="font-semibold tracking-[-0.04em] block text-balance"
              style={{
                fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
                lineHeight: 0.92,
              }}
              stagger={0.04}
            />
            <p className="mt-4 md:mt-5 max-w-[60ch] text-base md:text-lg text-gray-10 leading-relaxed">
              {t("areas.intro")}
            </p>

            <StaggerGroup
              as="ul"
              className="mt-8 md:mt-10 flex flex-wrap gap-2.5 md:gap-3 content-start"
              stagger={0.02}
            >
              {data.cities.map((c) => (
                <StaggerItem
                  key={c.name}
                  as="li"
                  className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gray-2 text-gray-12 text-sm md:text-base font-medium tracking-[-0.01em]"
                >
                  {c.name}
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="lg:col-span-6 relative min-h-[420px] md:min-h-[520px] lg:min-h-0 rounded-2xl overflow-hidden bg-gray-12 border border-gray-12/20">
            <iframe
              src={mapSrc}
              title="AK Sign office — Arlington Heights, IL"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              style={{
                filter:
                  "invert(0.92) hue-rotate(180deg) saturate(0.85) brightness(0.95) contrast(0.95)",
              }}
            />
            <p className="pointer-events-none absolute left-4 bottom-4 md:left-5 md:bottom-5 inline-flex rounded-full bg-gray-12/80 backdrop-blur-md px-3.5 py-2 text-[11px] uppercase tracking-[0.18em] text-gray-1 font-medium">
              Office — {addressDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
