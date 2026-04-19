"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const services = [
  "Channel letters",
  "Illuminated signs",
  "Lightboxes",
  "Monument signs",
  "Window graphics",
  "Vehicle wraps",
  "Permits + install",
  "Fabrication",
];

const serviceImages: Record<string, string> = {
  "Channel letters": "/images/services/channel-letters.png",
  "Illuminated signs": "/images/services/illuminated-signs.png",
  Lightboxes: "/images/services/lightboxes.png",
  "Monument signs": "/images/services/monument-signs.png",
  "Window graphics": "/images/services/window-graphics.png",
  "Vehicle wraps": "/images/services/vehicle-wraps.png",
  "Permits + install": "/images/services/permits-install.png",
  Fabrication: "/images/services/fabrication.png",
};

// Pin distance — ~40vh per service keeps the scroll snappy without
// making items flash past. Tune if too slow/fast.
const PIN_VH = services.length * 40;

/**
 * Services — pinned-scroll module. On md+ the section is tall
 * (services * 75vh) with a sticky inner panel; scrolling the page
 * advances the active item and the image while the panel stays put.
 * Once the last item is active the page resumes normal scrolling. On
 * mobile the section falls back to natural flow.
 */
export function ServicesScrollModule() {
  const wrap = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoveredRef = useRef<number | null>(null);
  hoveredRef.current = hovered;

  useEffect(() => {
    // rAF polling — works reliably with Lenis smooth scroll (which may
    // swallow native scroll events). Fall back to getElementById when
    // the ref isn't populated (shouldn't happen in practice).
    let rafId = 0;
    const tick = () => {
      const el =
        wrap.current ?? (document.getElementById("services") as HTMLElement | null);
      if (el && hoveredRef.current === null) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        if (total > 0) {
          const scrolled = Math.max(0, -rect.top);
          const progress = Math.min(1, scrolled / total);
          const idx = Math.round(progress * (services.length - 1));
          setActive((prev) => (prev === idx ? prev : idx));
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const current = hovered ?? active;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      ref={wrap}
      className="bg-gray-1 text-gray-12 relative"
      style={{
        // Inline so Tailwind JIT doesn't have to generate this one‑off
        // arbitrary height. Value is ignored on mobile via the
        // <div className="md:h-full"> wrapper.
      }}
    >
      <div className="relative">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto max-w-[1600px] w-full px-6 md:px-10 lg:px-16">
            <p
              id="services-heading"
              className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4"
            >
              (Services)
            </p>

            <div
              className="grid md:grid-cols-2 gap-5 md:gap-12 items-center"
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left — media card (shorter on mobile to fit viewport) */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-3 aspect-[16/10] md:aspect-square"
              >
                {services.map((s, i) => {
                  const src = serviceImages[s];
                  if (!src) return null;
                  const isActive = i === current;
                  return (
                    <div
                      key={s}
                      aria-hidden={!isActive}
                      className={cn(
                        "absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Image
                        src={src}
                        alt={s}
                        fill
                        loading="eager"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Right — services list */}
              <ul className="flex flex-col">
                {services.map((s, i) => {
                  const isActive = i === current;
                  return (
                    <li
                      key={s}
                      onMouseEnter={() => setHovered(i)}
                      className="relative"
                    >
                      <button
                        type="button"
                        onClick={() => setHovered(i)}
                        data-cursor="link"
                        className="w-full block text-left"
                        style={{
                          fontSize: "clamp(2rem, 1rem + 3.5vw, 4.75rem)",
                          lineHeight: 1,
                          letterSpacing: "-0.04em",
                          fontWeight: 600,
                          color: isActive
                            ? "var(--color-gray-12)"
                            : "var(--color-gray-4)",
                          transition: "color 300ms ease",
                        }}
                      >
                        {s}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Spacer — creates pin distance for all viewports */}
        <div
          aria-hidden
          style={{ height: `${PIN_VH}vh` }}
        />
      </div>
    </section>
  );
}
