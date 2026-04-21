"use client";

import type { SharedContent } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { SocialIcon } from "@/components/atoms/SocialIcon";
import { useLocale } from "@/lib/i18n";

type StudioFooterProps = {
  shared: SharedContent;
};

// Nav columns — labels pulled from i18n dict for EN/ES localization.
const columnDefs: { labelKey: string; href: string }[][] = [
  [
    { labelKey: "footer.nav.home", href: "/" },
    { labelKey: "footer.nav.work", href: "#work" },
    { labelKey: "footer.nav.about", href: "#about" },
  ],
  [
    { labelKey: "footer.nav.channelLetters", href: "#services" },
    { labelKey: "footer.nav.illuminated", href: "#services" },
    { labelKey: "footer.nav.vehicleWraps", href: "#services" },
  ],
  [
    { labelKey: "footer.nav.services", href: "#services" },
    { labelKey: "footer.nav.pricing", href: "#pricing" },
    { labelKey: "footer.nav.process", href: "#how-it-works" },
    { labelKey: "footer.nav.faq", href: "#faq" },
  ],
  [
    { labelKey: "footer.nav.contact", href: "#contact" },
    { labelKey: "footer.nav.privacy", href: "#privacy" },
    { labelKey: "footer.nav.terms", href: "#terms" },
  ],
];

/**
 * Footer — full-bleed background image with overlaid nav columns,
 * giant brand mark centered, copyright strip at the bottom. Inspired
 * by studio-lumio.com / props layout.
 */
export function StudioFooter({ shared }: StudioFooterProps) {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const socials = [
    {
      name: "instagram" as const,
      label: "Instagram",
      href: shared.nap.socials.instagram,
    },
    {
      name: "telegram" as const,
      label: "Telegram",
      href: shared.nap.socials.telegram,
    },
    {
      name: "whatsapp" as const,
      label: "WhatsApp",
      href: shared.nap.socials.whatsapp,
    },
  ];

  return (
    <footer
      id="page-footer"
      className="relative bg-gray-12 text-gray-1 overflow-hidden"
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <ImagePlaceholder
          slot="footer-bg"
          src="/images/footer-bg.png"
          aspect="wide"
          alt=""
          icon="Image"
          label="FOOTER · BACKGROUND"
          sizes="100vw"
          className="!rounded-none h-full w-full"
        />
      </div>

      {/* Dark scrim for text contrast */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/65"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-16 md:pt-20 pb-8 md:pb-10 min-h-[80svh] flex flex-col">
        {/* Top — 4 columns of nav + right-aligned socials */}
        <div className="grid gap-8 md:gap-6 grid-cols-2 md:grid-cols-6 text-xs md:text-[13px] tracking-[0.12em] font-medium">
          {columnDefs.map((col, i) => (
            <ul key={i} className="flex flex-col gap-2.5">
              {col.map((item) => (
                <li key={item.labelKey}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="inline-block hover:opacity-60 transition-opacity"
                  >
                    {t(item.labelKey as never)}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          {/* Desktop socials — inside nav grid, right-aligned */}
          <ul className="hidden md:flex col-span-2 flex-wrap gap-3 justify-end items-start content-start">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  data-cursor="link"
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors"
                >
                  <SocialIcon name={s.name} size={24} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1" aria-hidden />

        {/* Mobile socials — pinned above copyright */}
        <ul className="md:hidden flex gap-3 mb-8">
          {socials.map((s) => (
            <li key={`mb-${s.name}`}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                aria-label={s.label}
                data-cursor="link"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors"
              >
                <SocialIcon name={s.name} size={22} />
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom — copyright strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] md:text-xs uppercase tracking-[0.18em] text-gray-3">
          <span className="tabular-nums">©{year} AK SIGN</span>
          <a
            href="https://bankai.agency/en"
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            data-cursor-label="Bankai"
            className="bankai-link group relative inline-flex items-center gap-2.5 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 overflow-hidden transition-colors duration-500 hover:bg-white/15"
          >
            {/* sweeping red wash behind content */}
            <span
              aria-hidden
              className="absolute inset-0 bg-brand-9 translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            />

            <span className="relative z-10 transition-colors duration-500 group-hover:text-gray-1">
              {t("footer.bankaiPrefix")}
            </span>
            <span
              aria-hidden
              className="relative z-10 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/0 group-hover:bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[360deg]"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 502 499"
                className="transition-colors duration-500 text-current group-hover:text-brand-9"
                fill="currentColor"
                aria-hidden
              >
                <path d="M57.2409 126L398.379 21.3331C460.341 2.32193 491.322 -7.18365 499.482 6.38052C507.641 19.9447 484.726 42.8596 438.896 88.6895L327.031 200.555C305.4 222.186 294.584 233.002 297.495 242.35C297.787 243.287 298.163 244.196 298.62 245.065C303.171 253.733 318.467 253.733 349.058 253.733C387.565 253.733 406.819 253.733 412.497 264.617C413.066 265.707 413.535 266.847 413.897 268.022C417.51 279.754 403.818 293.29 376.434 320.363L235.803 459.396C206.417 488.448 191.724 502.974 179.277 497.777C166.83 492.579 166.83 471.918 166.83 430.595V396.304C166.83 381.03 166.83 373.394 162.085 368.649C157.34 363.904 149.703 363.904 134.43 363.904H81C42.8162 363.904 23.7243 363.904 11.8622 352.042C0 340.18 0 321.088 0 282.904V203.438C0 174.584 0 160.157 7.93182 149.426C15.8636 138.696 29.6561 134.464 57.2409 126Z" />
              </svg>
            </span>
            <span className="relative z-10 inline-flex overflow-hidden leading-none">
              <span className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
                Bankai Agency
              </span>
              <span
                aria-hidden
                className="absolute left-0 top-full inline-block text-gray-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              >
                Bankai Agency
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
