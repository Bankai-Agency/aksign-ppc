import * as Lucide from "lucide-react";
import type { ComponentType, SVGProps } from "react";

/**
 * Lucide wrapper — single entry point for all icons across the app.
 * Anti-pattern: `import { X } from "lucide-react"` in organisms/molecules.
 */

export type IconName = keyof typeof Lucide;

type LucideComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }
>;

export type IconProps = {
  name: IconName;
  size?: 14 | 16 | 18 | 20 | 22 | 24 | 28 | 32 | 40;
  stroke?: 1.5 | 1.75 | 2 | 2.25;
  className?: string;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
};

export function Icon({
  name,
  size = 20,
  stroke = 1.75,
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: IconProps) {
  const Cmp = Lucide[name] as LucideComponent | undefined;
  if (!Cmp) return null;

  // If no aria-label is supplied, default to hidden-from-SR.
  const hidden = ariaHidden ?? !ariaLabel;

  return (
    <Cmp
      width={size}
      height={size}
      strokeWidth={stroke}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={hidden ? true : undefined}
      role={ariaLabel ? "img" : undefined}
      focusable={false}
    />
  );
}
