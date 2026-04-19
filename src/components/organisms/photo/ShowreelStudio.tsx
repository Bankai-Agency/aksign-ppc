import type { LPVariant } from "@/types/lp";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal } from "@/components/atoms/Reveal";

type ShowreelStudioProps = {
  lp: LPVariant;
};

/**
 * Studio-size Showreel equivalent — single full-bleed 16:9 flagship
 * image with an eyebrow label. Placeholder until real photo arrives.
 */
export function ShowreelStudio({ lp }: ShowreelStudioProps) {
  return (
    <section aria-label="Featured project" className="bg-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
        <Reveal>
          <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-gray-3">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-semibold">
              Featured work / Chicago storefront
            </p>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-8 font-semibold tabular-nums">
              2024 — 03
            </p>
          </div>
        </Reveal>

        <Reveal y={60}>
          <ImagePlaceholder
            slot={`showreel-${lp.slug}`}
            aspect="wide"
            alt={`Flagship ${lp.services.focus.title} installation`}
            icon="Image"
            label={`SHOWREEL · ${lp.slug}`}
            priority
            sizes="(max-width: 1600px) 100vw, 1600px"
            className="!rounded-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
