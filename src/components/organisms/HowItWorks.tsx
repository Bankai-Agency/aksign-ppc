import type { Accent, SharedContent } from "@/types/lp";
import { StepCard } from "@/components/molecules/StepCard";

type HowItWorksProps = {
  accent: Accent;
  data: SharedContent["howItWorks"];
};

export function HowItWorks({ accent, data }: HowItWorksProps) {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-gray-1"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="how-it-works-heading" className="mb-12 md:mb-16 max-w-3xl">
          {data.heading}
        </h2>
        <ol className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {data.steps.map((step) => (
            <StepCard key={step.number} step={step} accent={accent} />
          ))}
        </ol>
      </div>
    </section>
  );
}
