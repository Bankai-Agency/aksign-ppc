"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useCallback } from "react";
import type { LPSlug, LPVariant } from "@/types/lp";
import { FAQItem } from "@/components/molecules/FAQItem";

type FAQNumericProps = {
  lpSlug: LPSlug;
  data: LPVariant["faq"];
};

export function FAQNumeric({ lpSlug, data }: FAQNumericProps) {
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
    <section id="faq" aria-labelledby="faq-heading" className="bg-gray-1">
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="faq-heading" className="mb-10 md:mb-14">
          {data.heading}
        </h2>
        <div className="rounded-xl bg-white px-6 md:px-8 border border-gray-3">
          <Accordion.Root type="single" collapsible>
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
      </div>
    </section>
  );
}
