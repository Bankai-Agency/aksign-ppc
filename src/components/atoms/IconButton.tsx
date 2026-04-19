import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Required — icon-only buttons must describe their action. */
  "aria-label": string;
  icon: IconName;
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "secondary" | "ghost" | "dark";
};

const sizeMap = {
  sm: { btn: "h-8 w-8", icon: 16 },
  md: { btn: "h-10 w-10", icon: 20 },
  lg: { btn: "h-12 w-12", icon: 24 },
} as const;

const intentMap = {
  primary: "bg-brand-9 text-white hover:bg-brand-10",
  secondary: "bg-gray-2 text-gray-12 hover:bg-gray-3",
  ghost: "bg-transparent text-gray-11 hover:bg-gray-2 hover:text-gray-12",
  dark: "bg-gray-12 text-white hover:bg-gray-11",
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, size = "md", intent = "ghost", type, ...rest }, ref) => {
    const { btn, icon: iconSize } = sizeMap[size];
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={cn(
          "inline-flex items-center justify-center rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          btn,
          intentMap[intent],
          className,
        )}
        {...rest}
      >
        <Icon name={icon} size={iconSize as 16 | 20 | 24} />
      </button>
    );
  },
);
IconButton.displayName = "IconButton";
