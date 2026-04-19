import type { Accent, ServiceCard as ServiceCardType } from "@/types/lp";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  service: ServiceCardType;
  variant: "focus" | "secondary";
  accent: Accent;
  imageSlot?: React.ReactNode;
};

const accentBorder: Record<Accent, string> = {
  red: "border-l-brand-9",
  white: "border-l-gray-12",
  shine: "border-l-gray-10",
};

const accentIconColor: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

export function ServiceCard({
  service,
  variant,
  accent,
  imageSlot,
}: ServiceCardProps) {
  if (variant === "focus") {
    return (
      <article
        className={cn(
          "flex flex-col gap-5 rounded-xl bg-white p-6 md:p-8",
          "border border-gray-3 border-l-4",
          accentBorder[accent],
        )}
      >
        {imageSlot}
        <div className="flex items-center gap-3">
          <Icon
            name={service.icon as IconName}
            size={28}
            className={accentIconColor[accent]}
            aria-hidden
          />
          <h3 className="text-2xl md:text-3xl">{service.title}</h3>
        </div>
        <p className="text-base md:text-lg text-gray-10 leading-relaxed max-w-prose">
          {service.description}
        </p>
        <ul className="flex flex-col gap-2 text-sm text-gray-11">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <Icon
                name="Check"
                size={16}
                stroke={2}
                className={cn("mt-0.5 shrink-0", accentIconColor[accent])}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-2">
          <Badge intent="accent">Free design included</Badge>
          <Badge intent="neutral">Permit handled</Badge>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-gray-1 p-5",
        "border border-gray-3",
      )}
    >
      {imageSlot}
      <div className="flex items-center gap-2">
        <Icon
          name={service.icon as IconName}
          size={22}
          className={accentIconColor[accent]}
          aria-hidden
        />
        <h4 className="text-lg md:text-xl">{service.title}</h4>
      </div>
      <p className="text-sm text-gray-10 leading-relaxed">
        {service.description}
      </p>
    </article>
  );
}
