import type { SharedContent } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";

type ServiceAreaStudioProps = {
  data: SharedContent["serviceArea"];
};

/**
 * Service area — eyebrow + heading on top, intro paragraph below,
 * then a flowing row of monochrome pills aligned to the same left
 * edge as the heading.
 */
export function ServiceAreaStudio({ data }: ServiceAreaStudioProps) {
  return (
    <section
      id="service-area"
      aria-labelledby="area-heading"
      className="bg-gray-1 text-gray-12 border-t border-gray-12/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          (Areas)
        </p>
        <LetterReveal
          as="h2"
          id="area-heading"
          text={data.heading}
          className="font-semibold tracking-[-0.04em] block"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 1,
          }}
          stagger={0.04}
        />
        <p className="mt-6 md:mt-8 max-w-[60ch] text-base md:text-lg text-gray-10 leading-relaxed">
          Primary coverage across Chicago and the NW suburbs — signage
          fabricated, permitted and installed by one in-house team.
        </p>

        <StaggerGroup
          as="ul"
          className="mt-10 md:mt-14 flex flex-wrap gap-2.5 md:gap-3"
          stagger={0.02}
        >
          {data.cities.map((c) => (
            <StaggerItem
              key={c.name}
              as="li"
              className="inline-flex items-center px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-gray-2 text-gray-12 text-sm md:text-base font-medium tracking-[-0.01em]"
            >
              {c.name}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
