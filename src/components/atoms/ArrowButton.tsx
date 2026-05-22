import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/**
 * ArrowButton — Sage-Kit-inspired solid pill with an arrow-circle
 * nested on the right. Single primary CTA pattern for the whole site
 * (header, sections, forms). The inner circle slides slightly right
 * on hover; pill flips to brand red.
 */
type Tone = "solid" | "ghost" | "light" | "brand";
type Size = "sm" | "md" | "lg";
type IconKind = "ArrowRight" | "ArrowUpRight";

type CommonProps = {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  icon?: IconKind;
  className?: string;
  /** Full-width + justify-between on mobile; returns to intrinsic on md+. */
  fullWidthMobile?: boolean;
};

type AnchorOnly = {
  as?: "a";
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;

type ButtonOnly = {
  as: "button";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps>;

export type ArrowButtonProps = CommonProps & (AnchorOnly | ButtonOnly);

const pad: Record<Size, string> = {
  sm: "h-12 md:h-10 pl-4 pr-1 text-[12px]",
  md: "h-14 md:h-12 pl-5 pr-1 text-[13px]",
  lg: "h-16 md:h-14 pl-6 pr-1 text-sm",
};

const square: Record<Size, string> = {
  sm: "w-10 h-10 md:w-8 md:h-8",
  md: "w-12 h-12 md:w-10 md:h-10",
  lg: "w-14 h-14 md:w-12 md:h-12",
};

const squareIcon: Record<Size, 14 | 16> = { sm: 14, md: 14, lg: 16 };

const toneClass: Record<Tone, string> = {
  solid:
    "bg-gray-12 text-gray-1 hover:bg-brand-9 [&_.ab-sq]:bg-brand-9 [&_.ab-sq]:text-gray-1 hover:[&_.ab-sq]:bg-gray-1 hover:[&_.ab-sq]:text-gray-12",
  ghost:
    "border border-gray-12/25 text-gray-12 hover:bg-gray-12 hover:text-gray-1 [&_.ab-sq]:bg-gray-12 [&_.ab-sq]:text-gray-1 hover:[&_.ab-sq]:bg-gray-1 hover:[&_.ab-sq]:text-gray-12",
  light:
    "bg-gray-1 text-gray-12 hover:bg-brand-9 hover:text-gray-1 [&_.ab-sq]:bg-gray-12 [&_.ab-sq]:text-gray-1 hover:[&_.ab-sq]:bg-gray-1 hover:[&_.ab-sq]:text-brand-9",
  brand:
    "bg-brand-9 text-gray-1 hover:bg-gray-1 hover:text-gray-12 [&_.ab-sq]:bg-gray-1 [&_.ab-sq]:text-brand-9 hover:[&_.ab-sq]:bg-gray-12 hover:[&_.ab-sq]:text-gray-1",
};

function Inner({
  children,
  size = "md",
  icon = "ArrowUpRight",
}: {
  children: ReactNode;
  size?: Size;
  icon?: IconKind;
}) {
  return (
    <>
      <span className="uppercase tracking-[-0.02em] font-semibold">{children}</span>
      <span
        aria-hidden
        className={cn(
          "ab-sq inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-300",
          square[size],
        )}
      >
        <Icon name={icon} size={squareIcon[size]} stroke={2} />
      </span>
    </>
  );
}

export const ArrowButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ArrowButtonProps
>(function ArrowButton(props, ref) {
  const {
    children,
    tone = "solid",
    size = "md",
    icon = "ArrowUpRight",
    className,
    fullWidthMobile,
  } = props;

  const base = cn(
    "group inline-flex items-center gap-2 rounded-full transition-colors duration-300",
    fullWidthMobile
      ? "w-full justify-between md:w-fit md:self-start md:justify-start"
      : "w-fit self-start",
    pad[size],
    toneClass[tone],
    className,
  );

  if (props.as === "button") {
    const {
      children: _c,
      tone: _t,
      size: _s,
      icon: _i,
      className: _cn,
      fullWidthMobile: _fwm,
      as: _a,
      ...btn
    } = props;
    void _c; void _t; void _s; void _i; void _cn; void _fwm; void _a;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={base}
        data-cursor="link"
        {...btn}
      >
        <Inner size={size} icon={icon}>
          {children}
        </Inner>
      </button>
    );
  }

  const {
    children: _c,
    tone: _t,
    size: _s,
    icon: _i,
    className: _cn,
    fullWidthMobile: _fwm,
    as: _a,
    ...anchor
  } = props;
  void _c; void _t; void _s; void _i; void _cn; void _fwm; void _a;
  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      className={base}
      data-cursor="link"
      {...anchor}
    >
      <Inner size={size} icon={icon}>
        {children}
      </Inner>
    </a>
  );
});
