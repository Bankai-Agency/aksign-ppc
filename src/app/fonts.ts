import { Fraunces, Geist } from "next/font/google";

/**
 * Fraunces — variable display serif (opsz axis).
 * `axes` and `weight` are mutually exclusive for variable fonts.
 */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

/**
 * Geist — variable grotesk body font.
 * No `weight` (variable font → all weights available via CSS).
 */
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});
