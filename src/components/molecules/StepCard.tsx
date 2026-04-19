import type { Accent, Step } from "@/types/lp";
import { cn } from "@/lib/utils";

type StepCardProps = {
  step: Step;
  accent: Accent;
};

const accentNumber: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

export function StepCard({ step, accent }: StepCardProps) {
  return (
    <li className="flex flex-col gap-3">
      <div className="flex items-baseline gap-4">
        <span
          className={cn(
            "text-4xl md:text-5xl font-bold tracking-tight tabular-nums",
            accentNumber[accent],
          )}
          aria-hidden="true"
        >
          {String(step.number).padStart(2, "0")}
        </span>
        <h3 className="text-xl md:text-2xl">{step.title}</h3>
      </div>
      <p className="text-base text-gray-10 leading-relaxed max-w-[38ch]">
        {step.description}
      </p>
    </li>
  );
}
