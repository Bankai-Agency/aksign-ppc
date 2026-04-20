import Image from "next/image";
import type { SharedContent } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { Icon, type IconName } from "@/components/atoms/Icon";

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
  return (
    <section
      id="how-it-works"
      aria-labelledby="process-heading"
      className="bg-gray-1 text-gray-12 border-t border-gray-12/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-24 md:pt-40 pb-20 md:pb-32">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          (Process)
        </p>
        <LetterReveal
          as="h2"
          id="process-heading"
          text={data.heading}
          className="font-semibold tracking-[-0.04em] block max-w-[16ch]"
          style={{
            fontSize: "clamp(3rem, 1rem + 7vw, 9rem)",
            lineHeight: 0.95,
          }}
          stagger={0.035}
        />

        <div className="mt-16 md:mt-24 grid gap-10 md:gap-16 lg:grid-cols-12 items-start">
          <StaggerGroup
            as="ul"
            className="lg:col-span-6 flex flex-col border-t border-gray-12/15"
            stagger={0.08}
          >
            {data.steps.map((step, i) => (
              <StaggerItem
                key={step.number}
                as="li"
                className="flex flex-col gap-5 md:grid md:grid-cols-12 md:gap-8 md:items-start py-6 md:py-8 border-b border-gray-12/15"
              >
                <div className="flex items-start md:contents">
                  <span className="order-2 md:order-none ml-auto md:ml-0 shrink-0 md:col-span-1 text-xs uppercase tracking-[0.22em] text-gray-10 font-medium tabular-nums md:pt-3">
                    {String(step.number).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden
                    className="order-1 md:order-none shrink-0 inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 md:col-span-2 md:mt-2 rounded-full bg-gray-12 text-gray-1"
                  >
                    <Icon
                      name={stepIcons[i] ?? "Sparkles"}
                      size={22}
                      stroke={1.75}
                    />
                  </span>
                </div>

                <div className="md:col-span-9 flex flex-col gap-2">
                  <h3
                    className="font-semibold tracking-[-0.035em]"
                    style={{
                      fontSize: "clamp(1.25rem, 1rem + 1vw, 1.875rem)",
                      lineHeight: 1.1,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Right-side process photo — sticky on desktop */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
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
