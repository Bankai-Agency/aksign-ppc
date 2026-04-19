"use client";

import { useEffect, useState } from "react";
import type { Accent, SharedContent } from "@/types/lp";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { NavLink } from "@/components/molecules/NavLink";
import { cn } from "@/lib/utils";

type HeaderProps = {
  accent: Accent;
  shared: SharedContent;
  ctaLabel?: string;
  ctaHref?: string;
};

const ctaIntent: Record<Accent, "primary" | "dark"> = {
  red: "primary",
  white: "dark",
  shine: "primary",
};

export function Header({ accent, shared, ctaLabel, ctaHref = "#quote-form" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const label = ctaLabel ?? shared.header.ctaLabel;

  return (
    <>
      <a
        href="#main"
        className="skip-link focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:bg-brand-9 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          "border-b",
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-gray-3"
            : "bg-white border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Logo — div, NOT anchor (session-leak prevention) */}
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-12 select-none">
            <span
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-md text-white text-sm font-bold",
                accent === "white" ? "bg-gray-12" : "bg-brand-9",
              )}
              aria-hidden="true"
            >
              AK
            </span>
            <span>AK Sign</span>
          </div>

          <nav aria-label="Main" className="hidden md:flex items-center gap-7">
            {shared.header.navLinks.map((n) => (
              <NavLink key={n.href} href={n.href}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${shared.nap.phone}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-11 hover:text-gray-12 tabular-nums"
              data-analytics="phone_click"
              data-location="header"
            >
              <Icon name="Phone" size={16} />
              {shared.nap.phoneDisplay}
            </a>
            <Button asChild intent={ctaIntent[accent]} size="md">
              <a href={ctaHref}>{label}</a>
            </Button>
          </div>

          <IconButton
            icon={drawerOpen ? "X" : "Menu"}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
            onClick={() => setDrawerOpen((v) => !v)}
            className="md:hidden"
            intent="ghost"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          />
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div
            id="mobile-drawer"
            className="md:hidden border-t border-gray-3 bg-white"
            role="dialog"
            aria-label="Navigation"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4">
              {shared.header.navLinks.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setDrawerOpen(false)}
                  className="text-lg font-medium text-gray-12 py-2 border-b border-gray-2 last:border-b-0"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`tel:${shared.nap.phone}`}
                className="inline-flex items-center gap-2 text-base text-gray-11 py-2 tabular-nums"
              >
                <Icon name="Phone" size={18} />
                {shared.nap.phoneDisplay}
              </a>
              <Button asChild intent={ctaIntent[accent]} size="lg" fullWidth>
                <a href={ctaHref} onClick={() => setDrawerOpen(false)}>
                  {label}
                </a>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
