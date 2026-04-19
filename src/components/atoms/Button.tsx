import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-md",
  {
    variants: {
      intent: {
        primary:
          "bg-brand-9 text-white hover:bg-brand-10 active:bg-brand-11",
        secondary:
          "bg-gray-2 text-gray-12 hover:bg-gray-3 active:bg-gray-4",
        ghost:
          "bg-transparent text-brand-11 hover:bg-brand-1",
        outline:
          "bg-transparent border border-gray-4 text-gray-12 hover:bg-gray-1 hover:border-gray-6",
        dark:
          "bg-gray-12 text-white hover:bg-gray-11",
        link:
          "bg-transparent text-brand-11 underline-offset-4 hover:underline rounded-none",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, fullWidth, asChild = false, type, ...rest }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : (type ?? "button")}
        className={cn(buttonVariants({ intent, size, fullWidth }), className)}
        {...rest}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
