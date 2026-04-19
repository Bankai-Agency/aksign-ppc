import NextLink from "next/link";
import { forwardRef, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Intent = "default" | "muted" | "cta";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  intent?: Intent;
};

const intentMap: Record<Intent, string> = {
  default:
    "text-brand-11 underline-offset-4 hover:underline",
  muted:
    "text-gray-10 underline-offset-4 hover:text-gray-12 hover:underline",
  cta:
    "inline-flex items-center gap-1 font-medium text-brand-11 underline-offset-4 hover:underline",
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, intent = "default", href, rel, target, ...rest }, ref) => {
    const isExternal = /^https?:\/\//.test(href);
    const finalRel = isExternal ? rel ?? "noopener noreferrer" : rel;
    const finalTarget = isExternal ? target ?? "_blank" : target;

    const classes = cn(
      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2 rounded-sm",
      intentMap[intent],
      className,
    );

    if (isExternal || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          ref={ref}
          href={href}
          className={classes}
          rel={finalRel}
          target={finalTarget}
          {...rest}
        />
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  },
);
Link.displayName = "Link";
