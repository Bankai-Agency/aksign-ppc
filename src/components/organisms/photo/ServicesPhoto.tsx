import type { Accent, LPVariant } from "@/types/lp";
import { Badge } from "@/components/atoms/Badge";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { ImagePlaceholder } from "@/components/atoms/ImagePlaceholder";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/atoms/Reveal";
import { cn } from "@/lib/utils";

type ServicesPhotoProps = {
  accent: Accent;
  lp: LPVariant;
};

const accentBorder: Record<Accent, string> = {
  red: "border-t-brand-9",
  white: "border-t-gray-12",
  shine: "border-t-gray-10",
};

const iconColor: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

/**
 * Photo-first Services — one giant focus row (image left, content right)
 * then two full-bleed secondary cards. No small icon-tiles.
 */
export function ServicesPhoto({ accent, lp }: ServicesPhotoProps) {
  const { focus, secondary } = lp.services;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <Reveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-11 font-semibold">
            What we build
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            id="services-heading"
            className="mt-4 mb-16 md:mb-24 max-w-5xl text-balance tracking-[-0.03em]"
            style={{
              fontSize: "clamp(2.25rem, 1rem + 5.5vw, 6.25rem)",
              lineHeight: 0.95,
            }}
          >
            Signage that does the work of a{" "}
            <span className={cn(iconColor[accent])}>second storefront.</span>
          </h2>
        </Reveal>

        {/* Focus — gigantic side-by-side */}
        <Reveal y={60}>
          <article className="grid gap-8 md:gap-14 lg:grid-cols-12 mb-20 md:mb-28">
            <div className="lg:col-span-7">
              <ImagePlaceholder
                slot={`service-focus-${lp.slug}`}
                aspect="portrait"
                alt={`${focus.title} — featured installation`}
                icon="Sparkles"
                label={`FOCUS · ${focus.tag ?? lp.slug}`}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="!rounded-2xl"
              />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div>
                <div className={cn("flex items-center gap-3 pt-6 border-t-4", accentBorder[accent])}>
                  <Icon
                    name={focus.icon as IconName}
                    size={28}
                    className={iconColor[accent]}
                    aria-hidden
                  />
                  <span className="text-xs uppercase tracking-[0.18em] text-gray-10 font-semibold">
                    Primary service
                  </span>
                </div>

                <h3
                  className="mt-6 tracking-[-0.03em]"
                  style={{
                    fontSize: "clamp(1.75rem, 1rem + 3vw, 3.25rem)",
                    lineHeight: 1,
                  }}
                >
                  {focus.title}
                </h3>

                <p className="mt-6 text-lg md:text-xl text-gray-10 leading-relaxed text-pretty max-w-prose">
                  {focus.description}
                </p>
              </div>

              <StaggerGroup as="ul" className="flex flex-col gap-3 border-t border-gray-3 pt-6">
                {focus.bullets.map((b) => (
                  <StaggerItem
                    key={b}
                    as="li"
                    className="flex items-start gap-3 text-base md:text-lg text-gray-12 font-medium"
                  >
                    <Icon
                      name="Check"
                      size={18}
                      stroke={2.25}
                      className={cn("mt-1 shrink-0", iconColor[accent])}
                    />
                    <span>{b}</span>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <div className="flex flex-wrap gap-2">
                <Badge intent="accent">Free design included</Badge>
                <Badge intent="neutral">Permit handled</Badge>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Secondary — 2 huge cards with full-bleed image tops */}
        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          {secondary.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} y={50}>
              <article className="group flex flex-col gap-6 h-full">
                <ImagePlaceholder
                  slot={`service-${s.tag ?? "secondary"}`}
                  aspect="landscape"
                  alt={`${s.title} example`}
                  icon={s.icon as IconName}
                  label={s.tag ?? "SECONDARY"}
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="!rounded-2xl transition-transform duration-500 group-hover:scale-[1.015]"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <Icon
                      name={s.icon as IconName}
                      size={22}
                      className={iconColor[accent]}
                      aria-hidden
                    />
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-10 font-semibold">
                      Also available
                    </span>
                  </div>
                  <h4
                    className="tracking-[-0.02em]"
                    style={{
                      fontSize: "clamp(1.5rem, 1rem + 1.5vw, 2.5rem)",
                      lineHeight: 1.05,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
                    {s.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
