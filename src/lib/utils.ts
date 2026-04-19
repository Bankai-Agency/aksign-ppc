import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware class merger — `cn(base, cond && 'bg-red-500', 'p-4')`. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
