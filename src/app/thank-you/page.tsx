import type { Metadata } from "next";
import { Icon } from "@/components/atoms/Icon";
import { BackButton } from "./BackButton";
import { ThankYouAnalytics } from "./ThankYouAnalytics";

export const metadata: Metadata = {
  title: "Thank you — AK Sign",
  description:
    "Thanks for reaching out. The AK Sign team is reviewing your request and will be in touch within one business day with a detailed quote and a design preview.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

/**
 * Full-page confirmation shown after a successful /api/lead submit.
 * Pure centered layout on the brand-dark surface: check badge →
 * REQUEST RECEIVED eyebrow → display H1 → body → call + back CTAs.
 *
 * No header/footer on purpose — the submit is the successful end of
 * the session and the only actions left are (a) call us or (b) go
 * back to where they were.
 */
export default function ThankYou() {
  return (
    <>
      <main
        id="main"
        className="min-h-[100svh] bg-gray-12 text-gray-1 flex items-center justify-center px-6 py-16 md:py-24"
      >
        <div className="w-full max-w-[960px] mx-auto flex flex-col items-center text-center gap-8 md:gap-10">
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-[72px] h-[72px] rounded-full bg-brand-9 text-gray-1"
          >
            <Icon name="Check" size={32} stroke={2.25} />
          </span>

          <p className="text-xs md:text-sm uppercase tracking-[0.32em] text-brand-9 font-semibold">
            Request received
          </p>

          <h1
            className="font-semibold uppercase tracking-[-0.04em] text-balance"
            style={{
              fontSize: "clamp(2.75rem, 1rem + 7vw, 7.5rem)",
              lineHeight: 0.94,
            }}
          >
            Thank you.
            <br />
            We&rsquo;ll be in touch.
          </h1>

          <p className="max-w-[52ch] text-base md:text-xl text-gray-1/70 leading-relaxed">
            Our team is reviewing your request and will contact you within one
            business day with a detailed quote and a design preview.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 pt-2 w-full md:w-auto">
            <a
              href="tel:+13128984581"
              className="w-full md:w-auto inline-flex items-center justify-center h-14 px-8 rounded-full bg-brand-9 text-gray-1 uppercase tracking-[-0.01em] font-semibold text-sm hover:bg-brand-10 transition-colors duration-300 tabular-nums"
            >
              Call (312) 898-4581
            </a>
            <div className="w-full md:w-auto">
              <BackButton>Back to page</BackButton>
            </div>
          </div>
        </div>
      </main>
      <ThankYouAnalytics />
    </>
  );
}
