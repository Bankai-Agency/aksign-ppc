import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, rows = 4, ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex w-full rounded-md border bg-white px-3 py-2 text-base text-gray-12 resize-y",
          "placeholder:text-gray-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:border-brand-9",
          "disabled:cursor-not-allowed disabled:bg-gray-2 disabled:text-gray-8",
          "transition-colors",
          invalid
            ? "border-destructive-9 focus-visible:ring-destructive-9"
            : "border-gray-4 hover:border-gray-6",
          className,
        )}
        {...rest}
      />
    );
  },
);
Textarea.displayName = "Textarea";
