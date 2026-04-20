"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useCallback } from "react";
import type { LPSlug, LPVariant } from "@/types/lp";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Icon } from "@/components/atoms/Icon";

type FAQStudioProps = {
  lpSlug: LPSlug;
  data: LPVariant["faq"];
};

/**
 * FAQ — narrow-heading, items-dominant layout. Each item is a
 * rounded tile (plashka) that expands in place rather than a bare
 * stroke accordion.
 */
export function FAQStudio({ lpSlug, data }: FAQStudioProps) {
  const onOpen = useCallback(
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
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-gray-1 text-gray-12 border-t border-gray-12/10"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
              (FAQ)
            </p>
            <LetterReveal
              as="h2"
              id="faq-heading"
              text={data.heading}
              className="font-semibold tracking-[-0.04em] block md:sticky md:top-28 max-w-[14ch]"
              style={{
                fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
                lineHeight: 1,
              }}
              stagger={0.04}
            />
          </div>

          <div className="md:col-span-6">
            <Accordion.Root
              type="single"
              collapsible
              className="flex flex-col gap-3 md:gap-4"
            >
              {data.items.map((item, i) => (
                <Accordion.Item
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-2xl bg-gray-2 data-[state=open]:bg-gray-3 transition-colors overflow-hidden"
                >
                  <Accordion.Header asChild>
                    <h3 className="m-0">
                      <Accordion.Trigger
                        data-cursor="link"
                        onClick={() => onOpen(i)}
                        className="group w-full flex items-center justify-between gap-6 px-6 md:px-8 py-5 md:py-7 text-left"
                      >
                        <span
                          className="font-semibold tracking-[-0.025em] pr-4"
                          style={{
                            fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
                            lineHeight: 1.25,
                          }}
                        >
                          {item.q}
                        </span>
                        <span
                          aria-hidden
                          className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-12 text-gray-1 transition-transform duration-300 group-data-[state=open]:rotate-45"
                        >
                          <Icon name="Plus" size={18} stroke={2} />
                        </span>
                      </Accordion.Trigger>
                    </h3>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.35s_cubic-bezier(0.22,1,0.36,1)] data-[state=closed]:animate-[accordion-up_0.25s_cubic-bezier(0.22,1,0.36,1)]">
                    <p className="px-6 md:px-8 pb-6 md:pb-8 pr-12 text-base md:text-lg text-gray-10 leading-relaxed max-w-[70ch]">
                      {item.a}
                    </p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
