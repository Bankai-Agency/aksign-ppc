"use client";

import type { SharedContent } from "@/types/lp";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { useLocale } from "@/lib/i18n";

type TrustBarStudioProps = {
  items: SharedContent["trustBar"];
};

/**
 * Trust bar — benefits band right after hero. Chrome text pulled from
 * i18n dict; item copy keyed by index (benefits.N.title / .subcopy).
 */
export function TrustBarStudio({ items }: TrustBarStudioProps) {
  const { t, locale } = useLocale();

  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-14 md:py-24">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          {t("eyebrow.benefits")}
        </p>
        <LetterReveal
          key={`trust-h-${locale}`}
          as="h2"
          id="trust-bar-heading"
          text={t("section.trustBar.heading")}
          className="font-semibold tracking-[-0.04em] block text-balance max-w-[14ch]"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 0.92,
          }}
          stagger={0.04}
        />

        <StaggerGroup
          as="ul"
          className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          stagger={0.05}
        >
          {items.map((it, i) => {
            // Items that carry their own _es fields (per-LP overrides)
            // localize via embedded fields; otherwise fall back to the
            // brand-level dict keys used by shared.trustBar (home).
            const src = it as typeof it & {
              title_es?: string;
              subcopy_es?: string;
            };
            const hasLocalizedItem = !!(src.title_es || src.subcopy_es);
            const title = hasLocalizedItem
              ? (locale === "es" && src.title_es ? src.title_es : src.title)
              : t(`benefits.${i}.title` as never) || src.title;
            const subcopy = hasLocalizedItem
              ? (locale === "es" && src.subcopy_es ? src.subcopy_es : src.subcopy)
              : t(`benefits.${i}.subcopy` as never) || src.subcopy;
            return (
              <StaggerItem as="li" key={it.title}>
                <div className="h-full flex flex-col gap-6 md:gap-7 rounded-2xl bg-gray-2 p-6 md:p-7">
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-9 text-gray-1"
                  >
                    <Icon
                      name={it.icon as IconName}
                      size={24}
                      stroke={1.75}
                    />
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3
                      className="font-semibold tracking-[-0.025em]"
                      style={{
                        fontSize: "clamp(1.25rem, 1rem + 1vw, 1.75rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-[36ch]">
                      {subcopy}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
