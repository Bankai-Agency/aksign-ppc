import { Manrope } from "next/font/google";

/**
 * Manrope — variable grotesk sans with subtle roundness.
 * Single typeface for both display and body per user preference
 * (studio-size.com reference).
 */
export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});
