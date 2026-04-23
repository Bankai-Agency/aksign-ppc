"use client";

import type { SharedContent } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { useLocale } from "@/lib/i18n";

type HowItWorksStudioProps = {
  data: SharedContent["howItWorks"];
};

/**
 * How-it-works — six process steps laid out as flat tiles on a light
 * section background. No shadows, no borders: tiles differ from the
 * section purely by a warmer off-white fill. Grid: 1 col mobile,
 * 2 cols md, 3 cols lg (two rows of three).
 */
export function HowItWorksStudio({ data }: HowItWorksStudioProps) {
  const { t, locale } = useLocale();
  return (
    <section
      id="how-it-works"
      aria-labelledby="process-heading"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-14 md:pt-24 pb-14 md:pb-24">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          {t("eyebrow.process")}
        </p>
        <LetterReveal
          key={`process-h-${locale}`}
          as="h2"
          id="process-heading"
          text={t("process.heading")}
          className="font-semibold tracking-[-0.04em] block text-balance max-w-[16ch] leading-[1.1] md:leading-[0.92]"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
          }}
          stagger={0.04}
        />

        <StaggerGroup
          as="ol"
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          stagger={0.06}
        >
          {data.steps.map((step) => {
            const title =
              t(`process.step${step.number}.title` as never) || step.title;
            const desc =
              t(`process.step${step.number}.desc` as never) ||
              step.description;
            return (
              <StaggerItem
                key={step.number}
                as="li"
                y={20}
                className="bg-gray-2 rounded-2xl px-7 py-9 md:px-9 md:py-12 flex flex-col gap-7 md:gap-8"
              >
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gray-12 text-gray-1 font-semibold tabular-nums text-sm tracking-[-0.02em]"
                >
                  {String(step.number).padStart(2, "0")}
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
                  <p className="text-sm md:text-base text-gray-10 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
