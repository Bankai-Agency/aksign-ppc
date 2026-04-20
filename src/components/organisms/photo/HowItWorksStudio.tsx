"use client";

import Image from "next/image";
import type { SharedContent } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { useLocale } from "@/lib/i18n";

type HowItWorksStudioProps = {
  data: SharedContent["howItWorks"];
};

const stepIcons: IconName[] = [
  "FileEdit",
  "Lightbulb",
  "PencilRuler",
  "Factory",
  "FileCheck",
  "Wrench",
];

/**
 * How-it-works — giant heading on top, two-column body below: numbered
 * steps (with pictogram per step) on the left, a sticky process photo
 * on the right.
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
          className="font-semibold tracking-[-0.04em] block text-balance max-w-[16ch]"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 0.92,
          }}
          stagger={0.04}
        />

        <div className="mt-6 md:mt-6 grid gap-10 md:gap-16 lg:grid-cols-12 items-start">
          <StaggerGroup
            as="ul"
            className="lg:col-span-6 flex flex-col gap-4 md:gap-6"
            stagger={0.08}
          >
            {data.steps.map((step, i) => (
              <StaggerItem
                key={step.number}
                as="li"
                className="flex flex-col gap-5 md:grid md:grid-cols-[auto_auto_1fr] md:gap-4 md:items-start py-4 md:py-5"
              >
                <div className="flex items-start md:contents">
                  <span className="order-2 md:order-none ml-auto md:ml-0 shrink-0 text-xs uppercase tracking-[0.22em] text-gray-10 font-medium tabular-nums md:self-start md:pt-2">
                    {String(step.number).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden
                    className="order-1 md:order-none shrink-0 inline-flex items-center justify-center w-12 h-12 md:w-11 md:h-11 rounded-full bg-gray-12 text-gray-1 md:self-start"
                  >
                    <Icon
                      name={stepIcons[i] ?? "Sparkles"}
                      size={20}
                      stroke={1.75}
                    />
                  </span>
                </div>

                <div className="flex flex-col gap-1 md:self-start">
                  <h3
                    className="font-semibold tracking-[-0.035em]"
                    style={{
                      fontSize: "clamp(1.25rem, 1rem + 1vw, 1.875rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {t(`process.step${step.number}.title` as never) || step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
                    {t(`process.step${step.number}.desc` as never) || step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Right-side process photo — desktop only, sticky */}
          <div className="hidden lg:block lg:col-span-6 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-2">
              <Image
                src="/images/services/fabrication.png"
                alt="AK Sign fabrication floor — channel letter construction"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
