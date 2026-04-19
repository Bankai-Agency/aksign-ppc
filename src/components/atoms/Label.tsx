import * as LabelPrimitive from "@radix-ui/react-label";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export type LabelProps = ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...rest }, ref) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          "text-sm font-medium text-gray-12 leading-none select-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        {...rest}
      />
    );
  },
);
Label.displayName = "Label";
