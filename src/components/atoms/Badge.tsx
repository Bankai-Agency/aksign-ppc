import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-medium uppercase tracking-wider",
  {
    variants: {
      intent: {
        accent: "bg-brand-3 text-brand-12",
        neutral: "bg-gray-2 text-gray-11",
        dark: "bg-gray-12 text-white",
        success: "bg-success-3 text-success-11",
        warning: "bg-warning-3 text-warning-11",
      },
    },
    defaultVariants: {
      intent: "neutral",
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, intent, ...rest }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ intent }), className)} {...rest} />
  );
}
