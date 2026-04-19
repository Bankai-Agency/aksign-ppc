"use client";

import type { SharedContent } from "@/types/lp";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { LetterReveal } from "@/components/atoms/LetterReveal";

type FeaturedWorkSliderStudioProps = {
  portfolio: SharedContent["portfolio"];
};

/**
 * studio-size.com "featured_work_slider" — unified with other studio
 * sections: small "Work" label + big LetterReveal H2, ribbon bleeds
 * to the right edge for drag-to-scrub with momentum.
 */
export function FeaturedWorkSliderStudio({
  portfolio,
}: FeaturedWorkSliderStudioProps) {
  const track = useRef<HTMLUListElement | null>(null);
  const [constraint, setConstraint] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const el = track.current;
      const overflow = el.scrollWidth - (el.parentElement?.offsetWidth ?? 0);
      setConstraint(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [portfolio.placeholders.length]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-20 md:pt-32">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          (Work)
        </p>

        <div className="mb-10 md:mb-14">
          <LetterReveal
            as="h2"
            id="work-heading"
            text="Recent projects"
            className="font-semibold tracking-[-0.04em] block max-w-4xl"
            style={{
              fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
              lineHeight: 1,
            }}
            stagger={0.04}
          />
        </div>
      </div>

      <div className="relative overflow-hidden pb-20 md:pb-32">
        <motion.ul
          ref={track}
          drag="x"
          dragConstraints={{ left: -constraint, right: 0 }}
          dragElastic={0.08}
          dragMomentum
          data-cursor="drag"
          data-cursor-label="Drag"
          className="flex gap-6 md:gap-8 pl-[max(24px,calc((100vw-1600px)/2+64px))] pr-6 md:pr-10 lg:pr-16 cursor-grab active:cursor-grabbing select-none"
          whileTap={{ cursor: "grabbing" }}
        >
          {portfolio.placeholders.map((p, i) => (
            <li
              key={`${p.title}-${i}`}
              className="flex-shrink-0 w-[88vw] sm:w-[55vw] md:w-[38vw] lg:w-[28vw]"
              data-cursor="link"
              data-cursor-label="View"
            >
              <figure className="flex flex-col gap-4 pointer-events-none">
                <div
                  className="relative bg-gray-3 overflow-hidden rounded-sm"
                  style={{ aspectRatio: "567 / 709" }}
                >
                  {p.illustrationSrc ? (
                    <Image
                      src={p.illustrationSrc}
                      alt={p.title}
                      fill
                      draggable={false}
                      className="object-cover"
                      sizes="(max-width: 768px) 78vw, 28vw"
                    />
                  ) : null}
                </div>
                <figcaption className="flex items-baseline justify-between gap-4">
                  <span className="text-base md:text-lg font-medium text-gray-12">
                    {p.title}
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-8 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
