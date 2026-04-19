import type { NAP } from "@/types/lp";
import { Icon } from "@/components/atoms/Icon";
import { MaybePlaceholder } from "@/components/atoms/Placeholder";
import { cn } from "@/lib/utils";

type Variant = "hero" | "contact" | "footer";

type NAPBlockProps = {
  nap: NAP;
  variant: Variant;
  className?: string;
};

export function NAPBlock({ nap, variant, className }: NAPBlockProps) {
  const textColor = variant === "footer" ? "text-gray-3" : "text-gray-11";
  const strongColor = variant === "footer" ? "text-white" : "text-gray-12";
  const iconColor = variant === "footer" ? "text-gray-5" : "text-gray-9";

  return (
    <address className={cn("not-italic flex flex-col gap-3", textColor, className)}>
      <a
        href={`tel:${nap.phone}`}
        className={cn(
          "inline-flex items-center gap-2 text-lg md:text-xl font-semibold tabular-nums",
          strongColor,
          "hover:text-brand-11 transition-colors rounded-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2",
        )}
      >
        <Icon name="Phone" size={20} className={iconColor} aria-hidden />
        {nap.phoneDisplay}
      </a>
      <a
        href={`mailto:${nap.email}`}
        className={cn(
          "inline-flex items-center gap-2 text-base",
          "hover:text-brand-11 transition-colors rounded-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2",
        )}
      >
        <Icon name="Mail" size={18} className={iconColor} aria-hidden />
        {nap.email}
      </a>
      <p className="flex items-start gap-2 text-sm leading-relaxed">
        <Icon name="MapPin" size={18} className={cn("mt-0.5 shrink-0", iconColor)} aria-hidden />
        <span>{nap.addressDisplay}</span>
      </p>
      {nap.hours && variant !== "hero" && (
        <p className="flex items-center gap-2 text-sm">
          <Icon name="Clock" size={18} className={iconColor} aria-hidden />
          <MaybePlaceholder value={nap.hours} fallback="Hours provided on request" />
        </p>
      )}
    </address>
  );
}
