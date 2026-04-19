import Image from "next/image";
import type { SharedContent } from "@/types/lp";
import { cn } from "@/lib/utils";

type PortfolioProps = {
  data: SharedContent["portfolio"];
  variant?: "gallery" | "grid";
};

const aspectToClass: Record<string, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

/**
 * Two layouts:
 * - `gallery`: asymmetric masonry-ish, photo-first (studio-size reference)
 * - `grid`: uniform 4-column, minimal (Ramp / Daniyar reference)
 */
export function Portfolio({ data, variant = "gallery" }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <h2 id="portfolio-heading" className="max-w-2xl">
            {data.heading}
          </h2>
          <p className="text-sm md:text-base text-gray-10 max-w-md md:text-right">
            {data.note}
          </p>
        </div>

        {variant === "gallery" ? (
          <ul
            role="list"
            className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 md:gap-4"
          >
            {data.placeholders.slice(0, 8).map((p, i) => (
              <li
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-lg bg-gray-2",
                  // asymmetric layout — cells of different widths/heights
                  i === 0 && "col-span-2 md:col-span-3 lg:col-span-5 row-span-2",
                  i === 1 && "col-span-2 md:col-span-3 lg:col-span-4",
                  i === 2 && "col-span-1 md:col-span-2 lg:col-span-3",
                  i === 3 && "col-span-1 md:col-span-2 lg:col-span-3",
                  i === 4 && "col-span-2 md:col-span-2 lg:col-span-4",
                  i === 5 && "col-span-2 md:col-span-3 lg:col-span-4",
                  i === 6 && "col-span-2 md:col-span-3 lg:col-span-4",
                  i === 7 && "col-span-2 md:col-span-6 lg:col-span-4",
                )}
              >
                <PortfolioTile placeholder={p} priority={i < 2} />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                />
                <figcaption className="absolute bottom-3 left-4 right-4 text-xs md:text-sm text-white font-semibold">
                  {p.title}
                </figcaption>
              </li>
            ))}
          </ul>
        ) : (
          <ul role="list" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.placeholders.slice(0, 4).map((p, i) => (
              <li
                key={i}
                className="relative overflow-hidden rounded-lg border border-gray-3 bg-gray-2"
              >
                <PortfolioTile placeholder={p} />
                <figcaption className="px-4 py-3 bg-white text-sm font-medium text-gray-12 border-t border-gray-3">
                  {p.title}
                </figcaption>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function PortfolioTile({
  placeholder,
  priority,
}: {
  placeholder: SharedContent["portfolio"]["placeholders"][number];
  priority?: boolean;
}) {
  const aspect = aspectToClass[placeholder.aspect ?? "landscape"];
  const src = placeholder.imageSrc ?? placeholder.illustrationSrc;

  return (
    <figure className={cn("relative w-full bg-gray-3", aspect)}>
      <Image
        src={src}
        alt={placeholder.title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover"
      />
    </figure>
  );
}
