import { Geist } from "next/font/google";

/**
 * Geist — variable neo-grotesk sans (Vercel OFL).
 * Single typeface for both display and body (Helvetica-family vibe).
 */
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});
