import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  active?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, active, href, children, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        aria-current={active ? "location" : undefined}
        className={cn(
          "inline-flex items-center text-sm font-medium transition-colors rounded-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2",
          active ? "text-brand-11" : "text-gray-11 hover:text-gray-12",
          className,
        )}
        {...rest}
      >
        {children}
      </a>
    );
  },
);
NavLink.displayName = "NavLink";
