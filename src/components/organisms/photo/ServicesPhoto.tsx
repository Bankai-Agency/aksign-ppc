"use client";

import type { Accent, LPVariant } from "@/types/lp";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal } from "@/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type ServicesPhotoProps = {
  accent: Accent;
  lp: LPVariant;
};

type ServiceRow = {
  title: string;
  tag: string;
  description: string;
};

const accentText: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

/**
 * Studio-size Services — numbered list on the left, auto-rotating imagery
 * on the right that follows the active row (hover overrides rotation).
 */
export function ServicesPhoto({ accent, lp }: ServicesPhotoProps) {
  const { focus, secondary } = lp.services;

  const rows: ServiceRow[] = [
    { title: focus.title, tag: focus.tag ?? lp.slug, description: focus.description },
    ...secondary.map((s) => ({
      title: s.title,
      tag: s.tag ?? "service",
      description: s.description,
    })),
    {
      title: "Permit handling",
      tag: "permits",
      description:
        "We file sign and electrical permits with the Village ourselves. Typical turnaround 2 to 4 weeks — in parallel with fabrication.",
    },
    {
      title: "Installation",
      tag: "install",
      description:
        "In-house install crew: lift trucks, electrical hookups, clean mount. No third-party scheduling, no finger-pointing.",
    },
    {
      title: "Fabrication",
      tag: "fabrication",
      description:
        "Aluminum returns, trim cap, UL-listed LEDs, premium vinyl. We build it all in our Arlington Heights shop — not outsourced.",
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % rows.length);
    }, 3200);
    return () => clearInterval(t);
  }, [paused, rows.length]);

  const current = rows[active];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white border-t border-gray-3"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <Reveal>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-semibold">
            Capabilities / 2025
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="services-heading"
            className="mt-4 mb-16 md:mb-24 max-w-5xl text-balance font-extrabold tracking-[-0.05em] text-gray-12"
            style={{
              fontSize: "clamp(2.25rem, 1rem + 5.5vw, 6.25rem)",
              lineHeight: 0.92,
            }}
          >
            Everything a storefront sign needs,{" "}
            <span className={cn(accentText[accent])}>under one roof.</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 md:gap-16 md:grid-cols-12 items-start">
          <ul
            className="md:col-span-7 flex flex-col border-t border-gray-3"
            onMouseLeave={() => setPaused(false)}
          >
            {rows.map((r, i) => {
              const isActive = i === active;
              return (
                <li
                  key={r.title}
                  className={cn(
                    "group relative border-b border-gray-3 transition-colors",
                    isActive ? "bg-gray-1" : "bg-transparent",
                  )}
                  onMouseEnter={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                >
                  <button
                    type="button"
                    className="w-full flex items-center gap-6 md:gap-10 py-6 md:py-8 text-left focus-visible:outline-2"
                    onClick={() => setActive(i)}
                  >
                    <span
                      className={cn(
                        "text-xs uppercase tracking-[0.22em] font-semibold tabular-nums transition-colors",
                        isActive ? accentText[accent] : "text-gray-8",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-extrabold tracking-[-0.035em] transition-colors",
                        isActive ? "text-gray-12" : "text-gray-10 group-hover:text-gray-12",
                      )}
                      style={{
                        fontSize: "clamp(1.5rem, 1rem + 1.75vw, 2.75rem)",
                        lineHeight: 1,
                      }}
                    >
                      {r.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="md:col-span-5 md:sticky md:top-28">
            <div className="relative overflow-hidden rounded-2xl bg-gray-3 aspect-[4/5]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.tag}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <ImagePlaceholder
                    slot={`service-${current.tag}`}
                    aspect="portrait"
                    alt={current.title}
                    icon="Image"
                    label={current.tag.toUpperCase()}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="!rounded-2xl h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={current.tag}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base md:text-lg text-gray-10 leading-relaxed max-w-prose"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
