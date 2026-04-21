"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Icon } from "@/components/atoms/Icon";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { useLeadForm } from "@/lib/lead-form";
import { useLocale } from "@/lib/i18n";

/**
 * Post-submit confirmation dialog. Triggered by LeadFormProvider
 * `showSuccess()` after /api/lead returns { ok: true }. Matches the
 * visual language of LeadFormModal (dark rounded card, subtle
 * spring-in, ESC + backdrop close).
 */
export function SuccessModal() {
  const { successOpen, hideSuccess } = useLeadForm();
  const { t } = useLocale();

  useEffect(() => {
    if (!successOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hideSuccess();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [successOpen, hideSuccess]);

  return (
    <AnimatePresence>
      {successOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Request sent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={hideSuccess}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] bg-gray-12 text-gray-1 rounded-3xl p-8 md:p-10 flex flex-col items-start gap-6"
          >
            <button
              type="button"
              aria-label={t("success.close")}
              onClick={hideSuccess}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-1/10 hover:bg-gray-1/20 text-gray-1 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            <span
              aria-hidden
              className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-9 text-gray-1"
            >
              <Icon name="Check" size={28} stroke={2.25} />
            </span>

            <h2
              className="font-semibold tracking-[-0.03em] text-balance"
              style={{
                fontSize: "clamp(1.5rem, 0.5rem + 2vw, 2.25rem)",
                lineHeight: 1.1,
              }}
            >
              {t("success.heading")}
            </h2>

            <p className="text-base md:text-lg text-gray-1/75 leading-relaxed">
              {t("success.body")}
            </p>

            <div className="flex flex-col md:flex-row md:items-center gap-3 w-full pt-2">
              <ArrowButton
                as="a"
                href="tel:+13128984581"
                tone="light"
                size="md"
                fullWidthMobile
              >
                {t("success.callCta")}
              </ArrowButton>
              <button
                type="button"
                onClick={hideSuccess}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm md:text-base font-medium text-gray-1/70 hover:text-gray-1 transition-colors"
              >
                {t("success.close")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
