"use client";

import { useEffect, useState } from "react";
import type { Accent, SharedContent } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type StickyMobileCTAProps = {
  accent: Accent;
  data: SharedContent["stickyMobileCta"];
  ctaLabel?: string;
  ctaHref?: string;
};

const phoneBg: Record<Accent, string> = {
  red: "bg-brand-9 hover:bg-brand-10",
  white: "bg-gray-12 hover:bg-gray-11",
  shine: "bg-brand-9 hover:bg-brand-10",
};

export function StickyMobileCTA({
  accent,
  data,
  ctaLabel = "Get Quote",
  ctaHref = "#quote-form",
}: StickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show once user has scrolled past ~1 viewport height
    const onScroll = () => {
      const v = window.scrollY > window.innerHeight * 0.6;
      setVisible(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Mobile quick actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden h-14",
        "grid grid-cols-2",
        "border-t border-gray-3",
        "transition-transform duration-200",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={data.href}
        data-analytics="phone_click"
        data-location="sticky"
        aria-label={data.label}
        className={cn(
          "flex items-center justify-center gap-2 text-sm font-semibold text-white transition-colors",
          phoneBg[accent],
        )}
      >
        <Icon name="Phone" size={18} />
        <span className="tabular-nums">Call</span>
      </a>
      <a
        href={ctaHref}
        className="flex items-center justify-center gap-2 bg-white text-sm font-semibold text-brand-11 hover:text-brand-9"
      >
        {ctaLabel}
        <Icon name="ArrowRight" size={18} />
      </a>
    </nav>
  );
}
