import type { SharedContent } from "@/types/lp";
import { Button } from "@/components/atoms/Button";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";

type WorkGridStudioProps = {
  portfolio: SharedContent["portfolio"];
};

/**
 * Studio-size Featured Work grid — 3-col portfolio with title overlay
 * on hover. Placeholder images until real photos arrive.
 */
export function WorkGridStudio({ portfolio }: WorkGridStudioProps) {
  return (
    <section
      id="portfolio"
      aria-labelledby="work-heading"
      className="bg-white border-t border-gray-3"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-semibold">
                Selected work / 2023 — 2025
              </p>
              <h2
                id="work-heading"
                className="mt-4 font-extrabold tracking-[-0.05em] text-gray-12"
                style={{
                  fontSize: "clamp(2.25rem, 1rem + 4.5vw, 5rem)",
                  lineHeight: 0.95,
                }}
              >
                {portfolio.heading}
              </h2>
            </div>
          </div>
        </Reveal>

        <StaggerGroup
          as="ul"
          className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.1}
        >
          {portfolio.placeholders.map((p, i) => (
            <StaggerItem
              key={`${p.title}-${i}`}
              as="li"
              y={50}
              className="group"
            >
              <figure className="flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-xl">
                  <ImagePlaceholder
                    slot={`work-${p.category}-${i}`}
                    aspect={p.aspect === "portrait" ? "portrait" : "landscape"}
                    src={p.illustrationSrc}
                    alt={p.title}
                    icon="Image"
                    label={p.category.toUpperCase()}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="!rounded-xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                  />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 pt-1">
                  <span className="text-base md:text-lg font-semibold text-gray-12 tracking-tight">
                    {p.title}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-8 font-semibold">
                    {p.category.replace(/-/g, " ")}
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15}>
          <div className="mt-14 md:mt-20 flex justify-start">
            <Button asChild intent="secondary" size="lg">
              <a href="#quote">Request more examples →</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
