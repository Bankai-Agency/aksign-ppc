import type { Accent, SharedContent } from "@/types/lp";
import { MessengerChip } from "@/components/molecules/MessengerChip";
import { NAPBlock } from "@/components/molecules/NAPBlock";
import { cn } from "@/lib/utils";

type FooterProps = {
  accent: Accent;
  shared: SharedContent;
};

const accentBorder: Record<Accent, string> = {
  red: "border-t-brand-9",
  white: "border-t-gray-1",
  shine: "border-t-brand-9",
};

export function Footer({ accent, shared }: FooterProps) {
  const year = new Date().getFullYear();
  const copyright = shared.footer.copyrightTemplate.replace("{year}", String(year));

  return (
    <footer
      role="contentinfo"
      className={cn(
        "bg-gray-12 text-gray-3 border-t-4",
        accentBorder[accent],
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3 md:gap-12">
          <div>
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white mb-6 select-none">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-md text-white text-sm font-bold",
                  accent === "white" ? "bg-gray-1 text-gray-12" : "bg-brand-9",
                )}
                aria-hidden="true"
              >
                AK
              </span>
              AK Sign
            </div>
            <NAPBlock nap={shared.nap} variant="footer" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-5 mb-4 font-semibold">
              Message us
            </p>
            <div className="flex flex-col gap-3 items-start">
              <MessengerChip channel="whatsapp" href={shared.nap.socials.whatsapp} variant="outline" className="border-gray-9 text-white hover:bg-gray-11" />
              <MessengerChip channel="telegram" href={shared.nap.socials.telegram} variant="outline" className="border-gray-9 text-white hover:bg-gray-11" />
              <MessengerChip channel="instagram" href={shared.nap.socials.instagram} variant="outline" className="border-gray-9 text-white hover:bg-gray-11" />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-gray-5 mb-4 font-semibold">
              About this page
            </p>
            <p className="text-sm leading-relaxed text-gray-4">
              {shared.footer.disclaimer}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-10 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm text-gray-5">
          <p>{copyright}</p>
          <p className="tabular-nums">{shared.nap.addressDisplay}</p>
        </div>
      </div>
    </footer>
  );
}
