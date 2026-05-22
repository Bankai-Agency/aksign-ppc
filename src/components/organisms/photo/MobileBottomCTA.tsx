"use client";

import { useLeadForm } from "@/lib/lead-form";
import { useLocale } from "@/lib/i18n";
import { Icon } from "@/components/atoms/Icon";

type Props = {
  phone?: string;
  phoneDisplay?: string;
};

/**
 * Mobile-only fixed bottom CTA bar — primary "Get a Quote" button +
 * optional phone tap-to-call. Visible only on screens < md breakpoint
 * (the desktop header already has these CTAs prominently). Mounted at
 * z-40 so it sits under the mobile menu overlay (z-50) but above page
 * content. Bottom safe-area inset respected for iPhone notch.
 */
export function MobileBottomCTA({ phone, phoneDisplay }: Props) {
  const { openModal } = useLeadForm();
  const { t } = useLocale();

  return (
    <>
      <div className="md:hidden h-[96px]" aria-hidden />
      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0)+12px)] bg-gray-12/95 backdrop-blur-md border-t border-gray-1/10"
      >
        <div className="flex items-center gap-2">
          {phone ? (
            <a
              href={`tel:${phone}`}
              aria-label={`Call ${phoneDisplay ?? phone}`}
              className="shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-1/10 text-gray-1 hover:bg-gray-1/20 transition-colors"
            >
              <Icon name="Phone" size={20} stroke={2} />
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => openModal()}
            className="flex-1 inline-flex items-center justify-center gap-2 h-14 rounded-full bg-gray-1 text-gray-12 text-[15px] font-semibold uppercase tracking-[0.02em] active:opacity-90"
          >
            {t("cta.getInTouch")}
            <Icon name="ArrowRight" size={18} stroke={2.25} />
          </button>
        </div>
      </div>
    </>
  );
}
