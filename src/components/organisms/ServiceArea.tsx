import type { Accent, SharedContent } from "@/types/lp";
import { CityChip } from "@/components/molecules/CityChip";

type ServiceAreaProps = {
  accent: Accent;
  data: SharedContent["serviceArea"];
};

const tierLabels = {
  P0: "Primary",
  P1: "Also serving",
  P2: "On request",
} as const;

export function ServiceArea({ accent, data }: ServiceAreaProps) {
  const grouped = (["P0", "P1", "P2"] as const).map((tier) => ({
    tier,
    label: tierLabels[tier],
    cities: data.cities.filter((c) => c.tier === tier),
  }));

  return (
    <section
      id="service-area"
      aria-labelledby="service-area-heading"
      className="bg-gray-1"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="service-area-heading" className="mb-10 md:mb-14 max-w-3xl">
          {data.heading}
        </h2>
        <dl className="flex flex-col gap-8 md:gap-10">
          {grouped.map(({ tier, label, cities }) =>
            cities.length === 0 ? null : (
              <div key={tier} className="grid md:grid-cols-[180px_1fr] gap-3 md:gap-8 md:items-start">
                <dt className="text-xs md:text-sm uppercase tracking-widest text-gray-10 font-semibold">
                  {label}
                </dt>
                <dd>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {cities.map((c) => (
                      <CityChip key={c.name} city={c} accent={accent} />
                    ))}
                  </ul>
                </dd>
              </div>
            ),
          )}
        </dl>
      </div>
    </section>
  );
}
