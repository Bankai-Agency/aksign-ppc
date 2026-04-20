"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLocale, type Locale } from "@/lib/i18n";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { Icon } from "@/components/atoms/Icon";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { cn } from "@/lib/utils";

type SharedNap = {
  phone: string;
  phoneDisplay: string;
  socials: { instagram: string; telegram: string; whatsapp: string };
};

type StudioHeaderProps = {
  nap?: SharedNap;
};

/**
 * Header — one unified floating плашка: logo on the left, all nav
 * controls and CTA pushed to the right edge. Darkens on scroll.
 */
export function StudioHeader({ nap }: StudioHeaderProps) {
  const { locale, setLocale, t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.work"), href: "#work" },
    { label: t("nav.about"), href: "#how-it-works" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const socials = nap
    ? ([
        { name: "instagram", href: nap.socials.instagram, title: "Instagram" },
        { name: "telegram", href: nap.socials.telegram, title: "Telegram" },
        { name: "whatsapp", href: nap.socials.whatsapp, title: "WhatsApp" },
      ] as const)
    : [];

  const filled = scrolled || open;

  return (
    <>
      <header
        id="page-header"
        className="fixed inset-x-0 top-0 z-50 px-4 md:px-6 pt-4 md:pt-5"
      >
        <div
          className={cn(
            "mx-auto max-w-[1600px] flex items-center gap-2 pl-3 pr-2 md:pl-4 md:pr-3 h-14 md:h-[68px] rounded-full backdrop-blur-md transition-colors duration-300",
            filled ? "bg-gray-12" : "bg-gray-12/55",
          )}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="AK Sign — back to homepage"
            className="shrink-0 inline-flex items-center h-10 px-1 text-gray-1"
          >
            <Image
              src="/brand/ak-sign-logo.png"
              alt="AK Sign"
              width={64}
              height={64}
              priority
              className="h-9 md:h-11 w-auto [filter:brightness(0)_invert(1)]"
            />
          </a>

          {/* Push everything else to the right */}
          <div className="flex-1" />

          {/* Nav */}
          <nav className="hidden md:flex items-center text-gray-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-cursor="link"
                className="group relative inline-flex items-center gap-2 px-3 lg:px-4 h-10 rounded-full text-[15px] transition-colors text-gray-1/70 hover:text-gray-1"
              >
                <span
                  aria-hidden
                  className="w-1.5 h-1.5 rounded-full bg-brand-9 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Divider */}
          {socials.length > 0 ? (
            <span className="hidden lg:block w-px h-6 bg-gray-1/15 mx-1" />
          ) : null}

          {/* Socials */}
          {socials.length > 0 ? (
            <div className="hidden lg:flex items-center text-gray-1">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.title}
                  aria-label={s.title}
                  data-cursor="link"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-1/10 text-gray-1 transition-colors"
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              ))}
            </div>
          ) : null}

          {/* Locale */}
          <div className="hidden md:block">
            <LocaleDropdown locale={locale} setLocale={setLocale} />
          </div>

          {/* CTA */}
          <div className="hidden md:block ml-1">
            <ArrowButton href="#contact" size="sm" tone="light">
              {t("cta.getInTouch")}
            </ArrowButton>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-1"
          >
            <span className="relative w-5 h-4 flex flex-col justify-between">
              <span
                className={cn(
                  "block h-[2px] bg-gray-1 origin-center transition-all duration-300",
                  open ? "translate-y-[7px] rotate-45" : "",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] bg-gray-1 transition-all duration-300",
                  open ? "opacity-0" : "w-3.5 self-end",
                )}
              />
              <span
                className={cn(
                  "block h-[2px] bg-gray-1 origin-center transition-all duration-300",
                  open ? "-translate-y-[7px] -rotate-45" : "",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-40 bg-gray-1 flex flex-col pt-24 pb-10 overflow-y-auto"
          >
            <nav className="mt-auto px-6 flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-semibold tracking-[-0.04em] text-gray-12 py-3 border-b border-gray-12/10"
                  style={{ fontSize: "clamp(2rem, 1rem + 6vw, 3.5rem)", lineHeight: 1 }}
                >
                  {item.label}
                </motion.a>
              ))}

              {socials.length > 0 ? (
                <div className="mt-8 flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.title}
                      aria-label={s.title}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-2 border border-gray-12 text-gray-12 hover:bg-gray-12 hover:text-gray-1 transition-colors"
                    >
                      <SocialIcon name={s.name} size={22} />
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex items-center gap-2 text-sm font-medium">
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLocale(l)}
                    aria-pressed={locale === l}
                    className={cn(
                      "uppercase tracking-[0.08em] px-3 py-1.5 rounded-full border transition-colors",
                      locale === l
                        ? "bg-gray-12 text-gray-1 border-gray-12"
                        : "border-gray-12/20 text-gray-12 hover:bg-gray-12/5",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <ArrowButton
                  href="#contact"
                  tone="solid"
                  size="lg"
                  className="w-full justify-between"
                  onClick={() => setOpen(false)}
                >
                  {t("cta.getInTouch")}
                </ArrowButton>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

type LocaleDropdownProps = {
  locale: Locale;
  setLocale: (l: Locale) => void;
};

function LocaleDropdown({ locale, setLocale }: LocaleDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options: Locale[] = ["en", "es"];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-cursor="link"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-3 h-9 rounded-full text-[12px] font-medium tracking-[0.08em] uppercase hover:bg-gray-1/10 text-gray-1 transition-colors"
      >
        <span>{locale}</span>
        <Icon
          name="ChevronDown"
          size={14}
          className={cn(
            "transition-transform duration-200",
            open ? "rotate-180" : "",
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            key="locale-menu"
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-3 min-w-[108px] py-1 rounded-xl shadow-lg overflow-hidden z-20 bg-gray-12 text-gray-1 border border-gray-1/10"
          >
            {options.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  data-cursor="link"
                  onClick={() => {
                    setLocale(l);
                    setOpen(false);
                  }}
                  role="option"
                  aria-selected={locale === l}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-[12px] font-medium uppercase tracking-[0.08em] transition-colors",
                    locale === l ? "bg-gray-1/10" : "hover:bg-gray-1/10",
                  )}
                >
                  <span>{l === "en" ? "English" : "Español"}</span>
                  <span className="text-[10px] opacity-60">{l}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
