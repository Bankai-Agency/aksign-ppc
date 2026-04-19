import type { Accent, City } from "@/types/lp";
import { cn } from "@/lib/utils";

type CityChipProps = {
  city: City;
  accent: Accent;
};

const primaryByAccent: Record<Accent, string> = {
  red: "bg-brand-3 text-brand-12 border-transparent",
  white: "bg-gray-3 text-gray-12 border-transparent",
  shine: "bg-brand-3 text-brand-12 border-transparent",
};

const tierClasses = {
  P0: "",          // filled via accent
  P1: "bg-gray-2 text-gray-11 border-transparent",
  P2: "bg-transparent text-gray-10 border-dashed border-gray-6",
} as const;

export function CityChip({ city, accent }: CityChipProps) {
  const base = city.tier === "P0" ? primaryByAccent[accent] : tierClasses[city.tier];

  return (
    <li
      role="listitem"
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 text-sm font-medium",
        base,
      )}
    >
      {city.name}
    </li>
  );
}
