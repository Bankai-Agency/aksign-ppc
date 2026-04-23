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
  // Navigation
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.work": { en: "Work", es: "Proyectos" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.contact": { en: "Contact", es: "Contacto" },

  // CTAs
  "cta.getInTouch": { en: "Get in touch", es: "Contáctanos" },
  "cta.getFreeQuote": { en: "Get a free quote", es: "Solicitar cotización" },
  "cta.sendRequest": { en: "Send request", es: "Enviar solicitud" },
  "cta.sayHi": { en: "Hi", es: "Hola" },

  // Eyebrow labels (sections)
  "eyebrow.benefits": { en: "(Benefits)", es: "(Beneficios)" },
  "eyebrow.work": { en: "(Work)", es: "(Proyectos)" },
  "eyebrow.studio": { en: "(Studio)", es: "(Estudio)" },
  "eyebrow.services": { en: "(Services)", es: "(Servicios)" },
  "eyebrow.pricing": { en: "(Pricing)", es: "(Precios)" },
  "eyebrow.process": { en: "(Process)", es: "(Proceso)" },
  "eyebrow.faq": { en: "(FAQ)", es: "(Preguntas)" },
  "eyebrow.areas": { en: "(Areas)", es: "(Zonas)" },
  "eyebrow.contact": { en: "(Contact)", es: "(Contacto)" },

  // Section H2s — static
  "section.trustBar.heading": { en: "Why AK\u00A0Sign", es: "Por qué AK\u00A0Sign" },
  "section.work.heading": { en: "Recent projects", es: "Proyectos recientes" },
  "section.statement.heading": {
    en: "When craft and permits collide, a storefront stops being a wall and starts being a magnet.",
    es: "Cuando el oficio y los permisos se unen, una fachada deja de ser un muro y se vuelve un imán.",
  },
  "section.contact.heading": {
    en: "Customer care department",
    es: "Atención al cliente",
  },

  // Hero
  "hero.line1": { en: "Commercial Signage", es: "Señalización comercial" },
  "hero.line2Prefix": { en: "for", es: "para" },
  "hero.subheading": {
    en: "Commercial-grade signage for Chicago-area storefronts — fabricated, permitted and installed in-house by one\u00A0team.",
    es: "Señalización de nivel comercial para locales del área de Chicago — fabricada, permitida e instalada internamente por un solo\u00A0equipo.",
  },
  "hero.flip.storefronts": { en: "storefronts", es: "fachadas" },
  "hero.flip.cafes": { en: "cafés", es: "cafeterías" },
  "hero.flip.boutiques": { en: "boutiques", es: "boutiques" },
  "hero.flip.dealerships": { en: "dealerships", es: "concesionarios" },
  "hero.flip.chicago": { en: "Chicago", es: "Chicago" },
  "hero.stat.years": { en: "Years in\u00A0Chicago", es: "Años en\u00A0Chicago" },
  "hero.stat.signs": { en: "Signs installed", es: "Letreros instalados" },
  "hero.stat.days": { en: "Day turnaround", es: "Días de\u00A0entrega" },

  // Statement body
  "statement.body": {
    en: "We are a small Arlington\u00A0Heights sign shop working end-to-end for Chicago businesses — design, UL-listed fabrication, Village permits, and install. No subs, no finger-pointing, no surprise line\u00A0items.",
    es: "Somos un taller pequeño en Arlington\u00A0Heights que trabaja de principio a fin para empresas de Chicago — diseño, fabricación con certificación\u00A0UL, permisos municipales e instalación. Sin subcontratistas, sin evasiones, sin cargos\u00A0sorpresa.",
  },

  // Process (HowItWorks)
  "process.heading": { en: "How it works", es: "Cómo funciona" },
  "process.step1.title": { en: "Brief", es: "Resumen" },
  "process.step1.desc": {
    en: "Send us your logo, goals, and references via form, WhatsApp, or Telegram.",
    es: "Envíanos tu logo, objetivos y referencias por formulario, WhatsApp o Telegram.",
  },
  "process.step2.title": { en: "Recommendation", es: "Recomendación" },
  "process.step2.desc": {
    en: "We review your brief and propose the sign type that fits your goal and budget.",
    es: "Revisamos tu brief y proponemos el tipo de letrero que se ajusta a tu objetivo y presupuesto.",
  },
  "process.step3.title": { en: "Design preview", es: "Vista previa del diseño" },
  "process.step3.desc": {
    en: "Custom design sent for your approval before any fabrication starts.",
    es: "Diseño personalizado enviado para tu aprobación antes de comenzar la fabricación.",
  },
  "process.step4.title": { en: "Fabrication", es: "Fabricación" },
  "process.step4.desc": {
    en: "In-house production: UL-listed LEDs, premium vinyl, aluminum. Typically 3–7 days.",
    es: "Producción interna: LEDs con certificación UL, vinilo premium, aluminio. Habitualmente 3–7 días.",
  },
  "process.step5.title": { en: "Permit", es: "Permiso" },
  "process.step5.desc": {
    en: "We file with the Village ourselves. Typical turnaround: 2–4 weeks, in parallel with fabrication.",
    es: "Tramitamos los permisos con el municipio. Tiempo típico: 2–4 semanas, en paralelo a la fabricación.",
  },
  "process.step6.title": { en: "Install", es: "Instalación" },
  "process.step6.desc": {
    en: "In-house install crew handles mounting and clean-up.",
    es: "Nuestro equipo interno de instalación se encarga del montaje y la limpieza.",
  },

  // Benefits (TrustBar)
  "benefits.0.title": { en: "Free custom design", es: "Diseño gratuito" },
  "benefits.0.subcopy": {
    en: "Design is included in every quote — no separate\u00A0fee.",
    es: "El diseño está incluido en cada cotización — sin costo\u00A0aparte.",
  },
  "benefits.1.title": { en: "3\u00A0to\u00A07 day turnaround", es: "Entrega en\u00A03–7\u00A0días" },
  "benefits.1.subcopy": {
    en: "Most signs ship within a week of\u00A0approval.",
    es: "La mayoría de letreros se envían en una semana tras la\u00A0aprobación.",
  },
  "benefits.2.title": {
    en: "Full-service install",
    es: "Instalación llave en\u00A0mano",
  },
  "benefits.2.subcopy": {
    en: "One team handles design, fabrication, and\u00A0mounting.",
    es: "Un solo equipo cubre diseño, fabricación e\u00A0instalación.",
  },
  "benefits.3.title": {
    en: "Local Arlington\u00A0Heights",
    es: "Local en Arlington\u00A0Heights",
  },
  "benefits.3.subcopy": {
    en: "We know Village permit filing inside\u00A0out.",
    es: "Conocemos a fondo los permisos municipales del\u00A0Village.",
  },
  "benefits.4.title": {
    en: "1-minute online\u00A0quote",
    es: "Cotización en 1\u00A0minuto",
  },
  "benefits.4.subcopy": {
    en: "Answer two fields, get a detailed quote by next business\u00A0day.",
    es: "Llena dos campos y recibe una cotización detallada al siguiente día\u00A0hábil.",
  },
  "benefits.5.title": {
    en: "High-quality materials",
    es: "Materiales de alta\u00A0calidad",
  },
  "benefits.5.subcopy": {
    en: "UL-listed\u00A0LEDs, 3M\u00A0/\u00A0Avery premium cast\u00A0vinyl.",
    es: "LEDs con certificación\u00A0UL, vinilos fundidos 3M\u00A0/\u00A0Avery\u00A0premium.",
  },

  // Service Area
  "areas.heading": { en: "Service area", es: "Zona de servicio" },
  "areas.intro": {
    en: "Primary coverage across Chicago and the NW\u00A0suburbs — signage fabricated, permitted and installed by one in-house\u00A0team.",
    es: "Cobertura principal en Chicago y los suburbios del\u00A0noroeste — señalización fabricada, permitida e instalada por un único equipo\u00A0interno.",
  },
  "areas.addressChip": {
    en: "220\u00A0W\u00A0Campus\u00A0Dr · Arlington\u00A0Heights",
    es: "220\u00A0W\u00A0Campus\u00A0Dr · Arlington\u00A0Heights",
  },
  "areas.mapCta": {
    en: "Open address in Google\u00A0Maps",
    es: "Abrir dirección en Google\u00A0Maps",
  },

  // CTA (contact section)
  "cta.body": {
    en: "Fill out the form and our team will get in touch within one business\u00A0day — usually less. Tell us about the project: storefront, restaurant, dealership, showroom, fleet. We'll come back with a free detailed quote and a design preview before any fabrication\u00A0starts.",
    es: "Completa el formulario y nuestro equipo te contactará en un día\u00A0hábil — normalmente menos. Cuéntanos sobre el proyecto: local, restaurante, concesionario, showroom, flota. Te enviaremos una cotización detallada gratuita y una vista previa del diseño antes de iniciar la\u00A0fabricación.",
  },
  "cta.legal": {
    en: "Free detailed quote in one business\u00A0day — with a design preview before any fabrication\u00A0starts. No obligation, no surprise line\u00A0items.",
    es: "Cotización detallada gratuita en un día\u00A0hábil — con vista previa del diseño antes de iniciar la\u00A0fabricación. Sin compromiso, sin cargos\u00A0sorpresa.",
  },
  "form.selectTopic": {
    en: "Select a sign type…",
    es: "Selecciona un tipo de letrero…",
  },
  "form.yourName": { en: "Your name", es: "Tu nombre" },
  "form.email": { en: "Email", es: "Correo electrónico" },
  "form.phone": {
    en: "+1 (312) 898-4581",
    es: "+1 (312) 898-4581",
  },
  "form.message": {
    en: "Describe the project, sizes, timeline…",
    es: "Describe el proyecto, tamaños, plazos…",
  },
  "form.topic.channel": { en: "Channel letters", es: "Letras canal" },
  "form.topic.illuminated": {
    en: "Illuminated signs",
    es: "Letreros iluminados",
  },
  "form.topic.lightboxes": { en: "Lightboxes", es: "Cajas de luz" },
  "form.topic.vehicle": { en: "Vehicle wraps", es: "Rotulación vehicular" },
  "form.topic.other": { en: "Other", es: "Otro" },

  // Modal
  "modal.heading": {
    en: "Tell us about your project",
    es: "Cuéntanos sobre tu proyecto",
  },
  "modal.body": {
    en: "Free detailed quote in one business\u00A0day — with a design preview before any fabrication\u00A0starts.",
    es: "Cotización detallada gratuita en un día\u00A0hábil — con vista previa del diseño antes de\u00A0fabricar.",
  },
  "modal.legal": {
    en: "One business\u00A0day · no obligation",
    es: "Un día\u00A0hábil · sin compromiso",
  },

  // Success (post-submit) modal
  "success.heading": {
    en: "Thanks — we got your request.",
    es: "¡Gracias! Recibimos tu solicitud.",
  },
  "success.body": {
    en: "Our team will be in touch within one business\u00A0day with your detailed quote and a design\u00A0preview.",
    es: "Nuestro equipo te contactará en un día\u00A0hábil con una cotización detallada y una vista previa del\u00A0diseño.",
  },
  "success.callCta": { en: "Call (312) 898-4581", es: "Llamar (312) 898-4581" },
  "success.close": { en: "Close", es: "Cerrar" },
  "cta.continue": { en: "Continue", es: "Continuar" },
  "cta.requestThisQuote": {
    en: "Request this quote",
    es: "Solicitar esta cotización",
  },

  // Submit states + errors
  "cta.sending": { en: "Sending…", es: "Enviando…" },
  "form.error.generic": {
    en: "Something went wrong — please try again or call us.",
    es: "Algo salió mal — intenta de nuevo o llámanos.",
  },
  "form.error.rateLimit": {
    en: "You just submitted a request — please wait a moment before trying again.",
    es: "Acabas de enviar una solicitud — espera un momento antes de intentar de nuevo.",
  },
  "form.error.validation": {
    en: "Please double-check the form fields and try again.",
    es: "Revisa los campos del formulario e inténtalo de nuevo.",
  },

  // FAQ
  "faq.heading": {
    en: "Frequently asked questions",
    es: "Preguntas frecuentes",
  },

  // Services (menu labels)
  "services.channel": { en: "Channel letters", es: "Letras canal" },
  "services.illuminated": { en: "Illuminated signs", es: "Letreros iluminados" },
  "services.lightboxes": { en: "Lightboxes", es: "Cajas de luz" },
  "services.monument": { en: "Monument signs", es: "Letreros monumentales" },
  "services.window": { en: "Window graphics", es: "Gráficos para ventanas" },
  "services.vehicle": { en: "Vehicle wraps", es: "Rotulación vehicular" },
  "services.permits": { en: "Permits + install", es: "Permisos + instalación" },
  "services.fabrication": { en: "Fabrication", es: "Fabricación" },

  // Reel / Showreel
  "reel.label": { en: "Reel / 10 sec", es: "Reel / 10 seg" },

  // Footer
  "footer.madeIn": {
    en: "Made in Arlington Heights, IL",
    es: "Hecho en Arlington Heights, IL",
  },
  "footer.bankaiPrefix": { en: "Made in", es: "Hecho en" },
  "footer.bankaiName": { en: "Bankai Agency", es: "Bankai Agency" },
  "footer.copyright": {
    en: "© {year} AK SIGN",
    es: "© {year} AK SIGN",
  },

  // Footer navigation columns (all-caps labels)
  "footer.nav.home": { en: "HOME", es: "INICIO" },
  "footer.nav.work": { en: "WORK", es: "PROYECTOS" },
  "footer.nav.about": { en: "ABOUT", es: "NOSOTROS" },
  "footer.nav.channelLetters": { en: "CHANNEL LETTERS", es: "LETRAS CANAL" },
  "footer.nav.illuminated": { en: "ILLUMINATED", es: "ILUMINADOS" },
  "footer.nav.vehicleWraps": { en: "VEHICLE WRAPS", es: "ROTULACIÓN" },
  "footer.nav.services": { en: "SERVICES", es: "SERVICIOS" },
  "footer.nav.pricing": { en: "PRICING", es: "PRECIOS" },
  "footer.nav.process": { en: "PROCESS", es: "PROCESO" },
  "footer.nav.faq": { en: "FAQ", es: "PREGUNTAS" },
  "footer.nav.contact": { en: "CONTACT", es: "CONTACTO" },
  "footer.nav.privacy": { en: "PRIVACY POLICY", es: "PRIVACIDAD" },
  "footer.nav.terms": { en: "TERMS & CONDITIONS", es: "TÉRMINOS" },
};

type DictKey = keyof typeof dict;

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictKey) => string;
  /** Pick localized value from an object with {en, es} pair or a string. */
  pick: <T extends string>(en: T, es?: T | null) => T;
};

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
      t: (key) => dict[key]?.[locale] ?? (key as unknown as string),
      pick: (en, es) => (locale === "es" && es ? es : en),
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
