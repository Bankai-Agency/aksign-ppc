"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useCallback } from "react";
import type { LPSlug, LPVariant } from "@/types/lp";
import { FAQItem } from "@/components/molecules/FAQItem";
import { Reveal } from "@/components/atoms/Reveal";

type FAQPhotoProps = {
  lpSlug: LPSlug;
  data: LPVariant["faq"];
};

export function FAQPhoto({ lpSlug, data }: FAQPhotoProps) {
  const onExpand = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "faq_expand",
        question_index: index,
        lp_slug: lpSlug,
      });
    },
    [lpSlug],
  );

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-white">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-24 md:py-40">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="text-xs md:text-sm uppercase tracking-[0.22em] text-brand-11 font-semibold">
                FAQ
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="faq-heading"
                className="mt-4 tracking-[-0.03em] sticky top-28"
                style={{
                  fontSize: "clamp(2.25rem, 1rem + 5vw, 5.5rem)",
                  lineHeight: 0.95,
                }}
              >
                {data.heading}
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <Accordion.Root
                type="single"
                collapsible
                className="border-t border-gray-3"
              >
                {data.items.map((item, i) => (
                  <FAQItem
                    key={i}
                    index={i}
                    id={`faq-${i}`}
                    q={item.q}
                    a={item.a}
                    onExpand={onExpand}
                  />
                ))}
              </Accordion.Root>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
