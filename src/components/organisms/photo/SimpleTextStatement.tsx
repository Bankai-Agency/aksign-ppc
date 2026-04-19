import { ArrowButton } from "@/components/atoms/ArrowButton";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Reveal } from "@/components/atoms/Reveal";

/**
 * studio-size.com "simple_text" section — large editorial statement
 * with "(STUDIO)" eyebrow + word-by-word reveal + Get-in-touch link.
 */
export function SimpleTextStatement() {
  return (
    <section id="about" aria-labelledby="statement" className="bg-gray-1 text-gray-12">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 pt-32 md:pt-56 pb-10 md:pb-16">
        <Reveal>
          <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium">
            (Studio)
          </p>
        </Reveal>

        <LetterReveal
          as="h2"
          id="statement"
          text="When craft and permits collide, a storefront stops being a wall and starts being a magnet."
          className="mt-10 md:mt-14 font-semibold tracking-[-0.04em] max-w-[22ch] text-balance block"
          style={{
            fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
            lineHeight: 1.02,
          }}
          delay={0.1}
          stagger={0.035}
        />

        <Reveal delay={0.6}>
          <div className="mt-6 md:mt-8 max-w-[60ch] flex flex-col gap-6">
            <p className="text-lg md:text-xl text-gray-11 leading-relaxed">
              We are a small Arlington Heights sign shop working end-to-end for
              Chicago businesses — design, UL-listed fabrication, Village
              permits, and install. No subs, no finger-pointing, no surprise
              line items.
            </p>
            <div>
              <ArrowButton href="#contact" tone="solid" size="lg">
                Get in touch
              </ArrowButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
