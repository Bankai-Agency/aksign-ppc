"use client";

import { useRouter } from "next/navigation";

/**
 * "Back to page" CTA — returns the visitor to the page they came from.
 * Falls back to home if there's no history (direct navigation / refresh).
 */
export function BackButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-gray-1/25 text-gray-1 uppercase tracking-[-0.01em] font-semibold text-sm hover:bg-gray-1 hover:text-gray-12 transition-colors duration-300"
    >
      {children}
    </button>
  );
}
