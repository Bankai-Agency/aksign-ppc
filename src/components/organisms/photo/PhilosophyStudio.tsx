import { Button } from "@/components/atoms/Button";
import { Reveal } from "@/components/atoms/Reveal";

/**
 * Studio-size "When Art and Function Collide…" statement equivalent.
 * Giant editorial headline + supporting paragraph + CTA.
 */
export function PhilosophyStudio() {
  return (
    <section
      aria-labelledby="philosophy-heading"
      className="bg-gray-12 text-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-32 md:py-48">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8 lg:col-span-9">
            <Reveal>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-brand-5 font-semibold">
                Why AK Sign
              </p>
            </Reveal>

            <Reveal delay={0.08} y={60}>
              <h2
                id="philosophy-heading"
                className="mt-6 md:mt-8 text-balance font-extrabold tracking-[-0.055em] text-white"
                style={{
                  fontSize: "clamp(2.5rem, 1rem + 6.5vw, 8rem)",
                  lineHeight: 0.9,
                }}
              >
                When craft and clean install meet{" "}
                <span className="text-brand-5">a sign that actually sells.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-4 lg:col-span-3 md:pt-4 flex flex-col gap-6">
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-gray-3 leading-relaxed">
                One in-house team handles design, UL-listed fabrication, and
                install. Permits go through our trusted licensed partners
                (billed separately). No subs on the build, no finger-pointing,
                no surprise line items — just a sign your storefront keeps
                earning from.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div>
                <Button asChild intent="primary" size="lg">
                  <a href="#quote">Get in touch →</a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
