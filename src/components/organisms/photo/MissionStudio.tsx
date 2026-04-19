import type { SharedContent } from "@/types/lp";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";

type MissionStudioProps = {
  howItWorks: SharedContent["howItWorks"];
};

/**
 * Studio-size mission statement equivalent — lower-case editorial
 * paragraph with numbered steps revealed progressively.
 */
export function MissionStudio({ howItWorks }: MissionStudioProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="mission-heading"
      className="bg-white border-t border-gray-3"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-semibold">
                How we work
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="mission-heading"
                className="mt-4 md:sticky md:top-28 font-extrabold tracking-[-0.05em] text-gray-12"
                style={{
                  fontSize: "clamp(2rem, 1rem + 4vw, 4.5rem)",
                  lineHeight: 0.95,
                }}
              >
                A sign built to outlast the next three lease renewals.
              </h2>
            </Reveal>
          </div>

          <StaggerGroup
            as="ul"
            className="md:col-span-7 flex flex-col border-t border-gray-3"
            stagger={0.06}
          >
            {howItWorks.steps.map((step) => (
              <StaggerItem
                key={step.number}
                as="li"
                className="grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-gray-3"
              >
                <span className="col-span-2 md:col-span-1 text-xs uppercase tracking-[0.22em] text-gray-8 font-semibold tabular-nums pt-1">
                  {String(step.number).padStart(2, "0")}
                </span>
                <div className="col-span-10 md:col-span-11 flex flex-col gap-2">
                  <h3
                    className="font-extrabold tracking-[-0.035em] text-gray-12"
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
        </div>
      </div>
    </section>
  );
}
