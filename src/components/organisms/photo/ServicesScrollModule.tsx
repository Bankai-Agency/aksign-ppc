"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

const services = [
  "Channel letters",
  "Illuminated signs",
  "Lightboxes",
  "Monument signs",
  "Window graphics",
  "Vehicle wraps",
  "Install + permit coordination",
  "Fabrication",
] as const;

const serviceKeys = [
  "services.channel",
  "services.illuminated",
  "services.lightboxes",
  "services.monument",
  "services.window",
  "services.vehicle",
  "services.permits",
  "services.fabrication",
] as const;

const serviceImages: Record<string, string> = {
  "Channel letters": "/images/services/channel-letters.webp",
  "Illuminated signs": "/images/services/illuminated-signs.webp",
  Lightboxes: "/images/services/lightboxes.webp",
  "Monument signs": "/images/services/monument-signs.webp",
  "Window graphics": "/images/services/window-graphics.webp",
  "Vehicle wraps": "/images/services/vehicle-wraps.webp",
  "Install + permit coordination": "/images/services/permits-install.webp",
  Fabrication: "/images/services/fabrication.webp",
};

// Pin distance — ~25vh per service on mobile (lighter scroll effort).
const PIN_VH = services.length * 25;

/**
 * Services — pinned-scroll module. On md+ the section is tall
 * (services * 75vh) with a sticky inner panel; scrolling the page
 * advances the active item and the image while the panel stays put.
 * Once the last item is active the page resumes normal scrolling. On
 * mobile the section falls back to natural flow.
 */
export function ServicesScrollModule() {
  const { t } = useLocale();
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
        <div className="sticky md:static top-0 h-screen md:h-auto flex items-center md:items-stretch overflow-hidden md:overflow-visible">
          <div className="mx-auto max-w-[1600px] w-full px-6 md:px-10 lg:px-16 md:py-20 lg:py-32">
            <p
              id="services-heading"
              className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4"
            >
              {t("eyebrow.services")}
            </p>

            <div
              className="grid md:grid-cols-2 gap-6 md:gap-12 items-center"
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left — media card */}
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-3 aspect-[4/3] md:aspect-square"
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
              <ul className="flex flex-col gap-3 md:gap-2.5">
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
                        {t(serviceKeys[i])}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Spacer — creates pin distance on mobile only; desktop uses
            natural flow so the section doesn't take a giant 400vh slot. */}
        <div
          aria-hidden
          className="md:hidden"
          style={{ height: `${PIN_VH}vh` }}
        />
      </div>
    </section>
  );
}
