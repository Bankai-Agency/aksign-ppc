"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Page-load preloader — warm-black overlay with centered AK mark that
 * drops in, "AK SIGN" wordmark revealed letter-by-letter, and a hairline
 * progress bar along the bottom. Exits with a curtain-up slide.
 */
export function PreloaderStudio() {
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setMounted(false), 180);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const wordmark = "AK SIGN";

  return (
    <AnimatePresence>
      {mounted ? (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
          className="fixed inset-0 z-[100] bg-gray-12 text-gray-1 pointer-events-none flex flex-col items-center justify-center gap-10 md:gap-14"
        >
          {/* Wordmark — letter-by-letter slide up from mask */}
          <h1
            className="font-semibold tracking-[-0.03em] leading-none flex"
            style={{ fontSize: "clamp(2rem, 1rem + 3vw, 4rem)" }}
            aria-label="AK Sign"
          >
            {wordmark.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="inline-block overflow-hidden"
                style={{ paddingBottom: "0.18em", marginBottom: "-0.12em" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: "120%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.35 + i * 0.05,
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Progress counter — number + hairline bar */}
          <div className="w-[min(320px,68vw)] flex flex-col items-end gap-2">
            <span className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-4 font-medium tabular-nums">
              {String(Math.round(progress * 100)).padStart(3, "0")}
            </span>
            <div className="relative w-full h-[1px] bg-gray-1/15 overflow-hidden">
              <span
                className="absolute inset-y-0 left-0 bg-gray-1 transition-[width] duration-100 ease-linear"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
