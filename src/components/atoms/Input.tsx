import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, type = "text", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex h-11 w-full rounded-md border bg-white px-3 py-2 text-base text-gray-12",
          "placeholder:text-gray-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:border-brand-9",
          "disabled:cursor-not-allowed disabled:bg-gray-2 disabled:text-gray-8",
          "transition-colors",
          type === "tel" || type === "number" ? "tabular-nums" : "",
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
Input.displayName = "Input";
