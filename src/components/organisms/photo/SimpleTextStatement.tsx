"use client";

import { ArrowButton } from "@/components/atoms/ArrowButton";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal } from "@/components/atoms/Reveal";
import { useLeadForm } from "@/lib/lead-form";
import { useLocale } from "@/lib/i18n";

/**
 * studio-size.com "simple_text" section — large editorial statement
 * with "(STUDIO)" eyebrow + word-by-word reveal + Get-in-touch link.
 */
export function SimpleTextStatement() {
  const { openModal } = useLeadForm();
  const { t, locale } = useLocale();
  return (
    <section id="about" aria-labelledby="statement" className="bg-gray-1 text-gray-12">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-14 md:pt-24 pb-10 md:pb-16">
        <Reveal>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium">
            {t("eyebrow.studio")}
          </p>
        </Reveal>

        <LetterReveal
          key={`statement-${locale}`}
          as="h2"
          id="statement"
          text={t("section.statement.heading")}
          className="mt-10 md:mt-14 font-semibold tracking-[-0.04em] max-w-[22ch] text-balance block"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 0.95,
          }}
          delay={0.1}
          stagger={0.035}
        />

        <Reveal delay={0.6}>
          <div className="mt-4 md:mt-5 max-w-[60ch] flex flex-col gap-8 md:gap-10">
            <p className="text-lg md:text-xl text-gray-11 leading-relaxed">
              {t("statement.body")}
            </p>
            <div>
              <ArrowButton as="button" onClick={openModal} tone="solid" size="lg" fullWidthMobile>
                {t("cta.getInTouch")}
              </ArrowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
