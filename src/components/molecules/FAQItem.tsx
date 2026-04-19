"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Icon } from "@/components/atoms/Icon";
import { MaybePlaceholder } from "@/components/atoms/Placeholder";
import { cn } from "@/lib/utils";

type FAQItemProps = {
  index: number;
  id: string;
  q: string;
  a: string;
  onExpand?: (index: number) => void;
};

export function FAQItem({ index, id, q, a, onExpand }: FAQItemProps) {
  return (
    <Accordion.Item
      value={id}
      className="border-b border-gray-3 last:border-b-0"
    >
      <Accordion.Header asChild>
        <h3>
          <Accordion.Trigger
            onClick={() => onExpand?.(index)}
            className={cn(
              "group flex w-full items-center justify-between gap-4 py-5 text-left",
              "text-base md:text-lg font-semibold text-gray-12",
              "hover:text-brand-11 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2 rounded-sm",
            )}
          >
            <span>{q}</span>
            <Icon
              name="Plus"
              size={20}
              className="shrink-0 text-gray-10 transition-transform duration-200 group-data-[state=open]:rotate-45"
            />
          </Accordion.Trigger>
        </h3>
      </Accordion.Header>
      <Accordion.Content
        className={cn(
          "overflow-hidden text-base text-gray-10 leading-relaxed tabular-nums",
          "data-[state=open]:animate-[accordion-down_220ms_ease-out]",
          "data-[state=closed]:animate-[accordion-up_180ms_ease-in]",
        )}
      >
        <div className="pb-5 pr-8">
          <MaybePlaceholder
            value={a}
            fallback="Warranty terms are provided in every quote — contact us for specifics."
          />
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
}
