"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * Lenis smooth scroll — studio-size.com uses it for all scroll; gives
 * premium editorial feel. ease-out curve, disables on reduced-motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip Lenis on touch devices — native iOS/Android momentum scroll
    // is faster and cheaper; smoothing the wheel is a desktop nicety.
    if (window.matchMedia("(hover: none)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
