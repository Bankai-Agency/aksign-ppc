import type { SharedContent } from "@/types/lp";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";

type TrustBarStudioProps = {
  items: SharedContent["trustBar"];
};

/**
 * Trust bar — benefits band right after hero. Each USP is its own
 * card that flips to brand-red on hover (icon circle inverts to
 * cream). Eyebrow + H2 match the rhythm of the rest of the page.
 */
export function TrustBarStudio({ items }: TrustBarStudioProps) {
  return (
    <section
      aria-labelledby="trust-bar-heading"
      className="bg-gray-1 text-gray-12 border-t border-gray-12/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
          (Benefits)
        </p>
        <LetterReveal
          as="h2"
          id="trust-bar-heading"
          text="Why AK Sign"
          className="font-semibold tracking-[-0.04em] block max-w-[14ch]"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 1,
          }}
          stagger={0.04}
        />

        <StaggerGroup
          as="ul"
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          stagger={0.05}
        >
          {items.map((it) => (
            <StaggerItem
              as="li"
              key={it.title}
              className="group"
            >
              <div
                className="h-full min-h-[210px] md:min-h-[290px] flex flex-col justify-between rounded-2xl bg-gray-2 p-6 md:p-7 transition-colors duration-300 ease-out group-hover:bg-brand-9 group-hover:text-gray-1"
              >
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-9 text-gray-1 transition-colors duration-300 ease-out group-hover:bg-gray-1 group-hover:text-brand-9"
                >
                  <Icon
                    name={it.icon as IconName}
                    size={24}
                    stroke={1.75}
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-semibold tracking-[-0.025em]"
                    style={{
                      fontSize: "clamp(1.25rem, 1rem + 1vw, 1.75rem)",
                      lineHeight: 1.15,
                    }}
                  >
                    {it.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-[36ch] transition-colors duration-300 ease-out group-hover:text-gray-1/90">
                    {it.subcopy}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
