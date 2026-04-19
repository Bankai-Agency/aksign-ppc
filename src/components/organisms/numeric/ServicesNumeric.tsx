import type { Accent, LPVariant } from "@/types/lp";
import { ServiceCard } from "@/components/molecules/ServiceCard";

type ServicesNumericProps = {
  accent: Accent;
  lp: LPVariant;
};

export function ServicesNumeric({ accent, lp }: ServicesNumericProps) {
  const { focus, secondary } = lp.services;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="services-heading" className="mb-12 md:mb-16 max-w-3xl">
          Our services
        </h2>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-7">
            <ServiceCard service={focus} variant="focus" accent={accent} />
          </div>
          <div className="lg:col-span-5 grid gap-6 md:gap-8">
            {secondary.map((s) => (
              <ServiceCard
                key={s.title}
                service={s}
                variant="secondary"
                accent={accent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
