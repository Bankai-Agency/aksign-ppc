"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useCallback } from "react";
import type { LPSlug, LPVariant } from "@/types/lp";
import { FAQItem } from "@/components/molecules/FAQItem";

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
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="faq-heading" className="mb-10 md:mb-14">
          {data.heading}
        </h2>
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
      </div>
    </section>
  );
}
