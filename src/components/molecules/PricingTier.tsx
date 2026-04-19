import type { Accent, Tier } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { formatMoneyRange } from "@/lib/format-money";
import { cn } from "@/lib/utils";

type PricingTierProps = {
  tier: Tier;
  accent: Accent;
  emphasis?: boolean;
};

const accentBorder: Record<Accent, string> = {
  red: "border-brand-9",
  white: "border-gray-12",
  shine: "border-gray-10",
};

const accentCheck: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

export function PricingTier({ tier, accent, emphasis = false }: PricingTierProps) {
  const range = formatMoneyRange(
    tier.rangeLow,
    tier.rangeHigh,
    tier.rangeHighIsMin,
  );

  return (
    <article
      aria-labelledby={`tier-${slugify(tier.name)}`}
      className={cn(
        "flex flex-col rounded-xl bg-white p-6 md:p-8 transition-colors",
        "border border-gray-3 hover:border-gray-6",
        emphasis && `border-2 ${accentBorder[accent]} hover:${accentBorder[accent]}`,
      )}
    >
      <p
        id={`tier-${slugify(tier.name)}`}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-11"
      >
        {tier.name}
      </p>

      <p
        className={cn(
          "mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-12 tabular-nums",
        )}
        aria-label={`Range ${tier.rangeLow.toLocaleString()} to ${tier.rangeHigh.toLocaleString()} dollars${tier.rangeHighIsMin ? " or more" : ""}${tier.perUnit ? ` ${tier.perUnit}` : ""}`}
      >
        {range}
      </p>
      {tier.perUnit && (
        <p className="mt-1 text-sm text-gray-10">{tier.perUnit}</p>
      )}

      <p className="mt-3 text-base text-gray-10 leading-relaxed">
        {tier.scope}
      </p>

      <hr className="my-6 border-gray-3" aria-hidden="true" />

      <ul className="flex flex-col gap-3 text-sm text-gray-11">
        {tier.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Icon
              name="Check"
              size={18}
              stroke={2}
              className={cn("mt-0.5 shrink-0", accentCheck[accent])}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
