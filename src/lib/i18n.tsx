"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "es";

type Dict = Record<string, { en: string; es: string }>;

const dict: Dict = {
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.work": { en: "Work", es: "Proyectos" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "cta.getInTouch": { en: "Get in touch", es: "Contáctanos" },
  "cta.sayHi": { en: "Hi", es: "Hola" },
  "section.work": { en: "Work", es: "Proyectos" },
  "section.about": { en: "Studio", es: "Estudio" },
  "section.services": { en: "Services", es: "Servicios" },
  "section.pricing": { en: "Pricing", es: "Precios" },
  "section.process": { en: "Process", es: "Proceso" },
  "section.faq": { en: "FAQ", es: "Preguntas" },
  "section.areas": { en: "Areas", es: "Áreas" },
  "section.contact": { en: "Contact", es: "Contacto" },
  "footer.madeIn": {
    en: "Made in Arlington Heights, IL",
    es: "Hecho en Arlington Heights, IL",
  },
  "hero.line1": { en: "Commercial", es: "Señalización" },
  "hero.line2Prefix": { en: "Signage for", es: "comercial para" },
};

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: (key: keyof typeof dict) => string };

const LocaleContext = createContext<Ctx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("aksign-locale") as Locale | null;
    if (saved === "en" || saved === "es") setLocale(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("aksign-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const ctx = useMemo<Ctx>(
    () => ({
      locale,
      setLocale,
      t: (key) => dict[key]?.[locale] ?? key,
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={ctx}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
