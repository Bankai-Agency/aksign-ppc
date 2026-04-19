import type { NAP } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { LetterReveal } from "@/components/atoms/LetterReveal";

type BackgroundVideoCTAProps = {
  nap: NAP;
};

/**
 * studio-size.com "background_video_cta_variation" — full-bleed block
 * with background image/video + overlaid H2 + contact CTA.
 */
export function BackgroundVideoCTA({ nap }: BackgroundVideoCTAProps) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative bg-gray-12 text-gray-1 overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 opacity-40">
        <ImagePlaceholder
          slot="cta-bg"
          aspect="wide"
          alt=""
          icon="Image"
          label="BG"
          sizes="100vw"
          className="!rounded-none h-full"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-gray-12 via-gray-12/70 to-gray-12/40"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-32 md:py-56 min-h-[80svh] flex flex-col justify-between gap-24">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-4 font-medium">
          (Contact)
        </p>

        <div className="grid gap-12 md:grid-cols-12 items-end">
          <LetterReveal
            as="h2"
            id="contact-heading"
            text="Let's build your next storefront."
            className="md:col-span-9 font-semibold tracking-[-0.04em] text-balance block"
            style={{
              fontSize: "clamp(2.5rem, 1rem + 7vw, 9rem)",
              lineHeight: 0.95,
            }}
            stagger={0.045}
          />

          <div className="md:col-span-3 flex flex-col gap-4">
            <a
              href={`tel:${nap.phone}`}
              className="text-lg md:text-xl font-medium tabular-nums hover:text-brand-5 transition-colors"
            >
              {nap.phoneDisplay}
            </a>
            <a
              href={`mailto:${nap.email}`}
              className="text-base text-gray-3 hover:text-gray-1 transition-colors"
            >
              {nap.email}
            </a>
            <a
              href={`mailto:${nap.email}`}
              data-cursor="link"
              data-cursor-label="Send"
              className="mt-4 inline-flex items-center justify-center h-11 px-6 rounded-full bg-gray-1 text-gray-12 text-sm font-medium hover:bg-brand-9 hover:text-gray-1 transition-colors"
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
