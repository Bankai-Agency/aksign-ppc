import type { SharedContent } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { SocialIcon } from "@/components/atoms/SocialIcon";

type StudioFooterProps = {
  shared: SharedContent;
};

const columns: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "",
    items: [
      { label: "HOME", href: "/" },
      { label: "WORK", href: "#work" },
      { label: "ABOUT", href: "#about" },
    ],
  },
  {
    title: "",
    items: [
      { label: "CHANNEL LETTERS", href: "#services" },
      { label: "ILLUMINATED", href: "#services" },
      { label: "VEHICLE WRAPS", href: "#services" },
    ],
  },
  {
    title: "",
    items: [
      { label: "SERVICES", href: "#services" },
      { label: "PRICING", href: "#pricing" },
      { label: "PROCESS", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "",
    items: [
      { label: "CONTACT", href: "#contact" },
      { label: "PRIVACY POLICY", href: "#privacy" },
      { label: "TERMS & CONDITIONS", href: "#terms" },
    ],
  },
];

/**
 * Footer — full-bleed background image with overlaid nav columns,
 * giant brand mark centered, copyright strip at the bottom. Inspired
 * by studio-lumio.com / props layout.
 */
export function StudioFooter({ shared }: StudioFooterProps) {
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
          {columns.map((col, i) => (
            <ul key={i} className="flex flex-col gap-2.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    data-cursor="link"
                    className="inline-block hover:opacity-60 transition-opacity"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}

          <ul className="col-span-2 md:col-span-2 flex flex-wrap gap-3 md:justify-end md:items-start content-start">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.label}
                  aria-label={s.label}
                  data-cursor="link"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-1 border border-gray-1 text-gray-12 hover:bg-gray-12 hover:text-gray-1 hover:border-gray-1 transition-colors"
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1" aria-hidden />

        {/* Bottom — copyright strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] md:text-xs uppercase tracking-[0.18em] text-gray-3">
          <span className="tabular-nums">©{year} AK SIGN</span>
          <a
            href="https://bankai.agency/ru"
            target="_blank"
            rel="noreferrer"
            data-cursor="link"
            data-cursor-label="Bankai"
            className="hover:text-gray-1 transition-colors"
          >
            Made in Bankai Agency
          </a>
        </div>
      </div>
    </footer>
  );
}
