import type { Accent, LPVariant } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { ServiceCard } from "@/components/molecules/ServiceCard";

type ServicesPhotoProps = {
  accent: Accent;
  lp: LPVariant;
};

export function ServicesPhoto({ accent, lp }: ServicesPhotoProps) {
  const { focus, secondary } = lp.services;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="services-heading" className="mb-12 md:mb-16 max-w-3xl">
          What we build
        </h2>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-7">
            <ServiceCard
              service={focus}
              variant="focus"
              accent={accent}
              imageSlot={
                <ImagePlaceholder
                  slot={`service-focus-${lp.slug}`}
                  aspect="landscape"
                  alt={`${focus.title} — example installation`}
                  icon="Sparkles"
                  label={`FOCUS IMAGE — ${lp.slug}`}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="mb-2"
                />
              }
            />
          </div>
          <div className="lg:col-span-5 grid gap-6 md:gap-8">
            {secondary.map((s) => (
              <ServiceCard
                key={s.title}
                service={s}
                variant="secondary"
                accent={accent}
                imageSlot={
                  <ImagePlaceholder
                    slot={`service-${s.tag ?? "secondary"}`}
                    aspect="landscape"
                    alt={`${s.title} example`}
                    icon="Image"
                    label={s.tag ?? "SECONDARY"}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="mb-2"
                  />
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
