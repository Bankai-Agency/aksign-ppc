import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

export type MessengerChannel = "whatsapp" | "telegram" | "instagram";

const channels: Record<
  MessengerChannel,
  { label: string; iconName: IconName; bg: string }
> = {
  whatsapp: {
    label: "WhatsApp",
    iconName: "MessageCircle",
    bg: "bg-success-9 text-white hover:bg-success-10",
  },
  telegram: {
    label: "Telegram",
    iconName: "Send",
    bg: "bg-gray-12 text-white hover:bg-gray-11",
  },
  instagram: {
    label: "Instagram",
    iconName: "Camera",
    bg: "bg-brand-9 text-white hover:bg-brand-10",
  },
};

type MessengerChipProps = {
  channel: MessengerChannel;
  href: string;
  variant?: "solid" | "outline";
  className?: string;
};

export function MessengerChip({
  channel,
  href,
  variant = "solid",
  className,
}: MessengerChipProps) {
  const { label, iconName, bg } = channels[channel];

  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      rel={isExternal ? "noopener noreferrer" : undefined}
      target={isExternal ? "_blank" : undefined}
      aria-label={`Contact us on ${label}`}
      data-messenger-channel={channel}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-9 focus-visible:ring-offset-2",
        variant === "solid"
          ? bg
          : "bg-transparent border border-gray-4 text-gray-12 hover:bg-gray-1",
        className,
      )}
    >
      <Icon name={iconName} size={18} aria-hidden />
      {label}
    </a>
  );
}
