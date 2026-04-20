"use client";

import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { useLocale } from "@/lib/i18n";

/**
 * Showreel — static full-width reel preview with rounded corners. Click
 * opens the full-screen modal with controls. No scroll-scale animation:
 * the tile always fills the container width.
 */
export function ShowreelFullscreen() {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  return (
    <section aria-label="Reel" className="bg-gray-1">
      <div className="mx-auto max-w-[1600px] px-2 md:px-10 lg:px-16 pt-4 md:pt-0 pb-16 md:pb-20">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play reel"
          data-cursor="play"
          data-cursor-label="Play"
          className="group relative block w-full overflow-hidden rounded-2xl"
        >
          <div className="relative w-full aspect-[4/5] md:aspect-[16/9] bg-gray-3">
            <video
              src="/videos/reel.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="relative flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-gray-12/80 backdrop-blur-sm text-gray-1 transition-transform duration-500 ease-out group-hover:scale-110">
              <Icon name="Play" size={32} className="translate-x-[2px]" />
            </span>
          </span>

          <span className="pointer-events-none absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-1 font-medium">
            {t("reel.label")}
          </span>
          <span className="pointer-events-none absolute bottom-6 right-6 md:bottom-10 md:right-10 text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-1 font-medium tabular-nums">
            2025
          </span>
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Reel video"
          className="fixed inset-0 z-[60] bg-gray-12/95 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 md:top-8 md:right-8 w-12 h-12 rounded-full bg-gray-1 text-gray-12 flex items-center justify-center hover:scale-105 transition-transform z-10"
          >
            <Icon name="X" size={20} />
          </button>
          <video
            src="/videos/reel.mp4"
            controls
            autoPlay
            playsInline
            className="max-h-[100svh] max-w-[100vw] md:max-h-[92vh] md:max-w-[92vw] h-auto w-auto bg-gray-12 rounded-none md:rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
