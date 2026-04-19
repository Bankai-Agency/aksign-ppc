import type { Accent, TrustUSP as TrustUSPType } from "@/types/lp";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type TrustUSPProps = {
  item: TrustUSPType;
  accent: Accent;
};

const accentIcon: Record<Accent, string> = {
  red: "text-brand-9",
  white: "text-gray-12",
  shine: "text-gray-11",
};

export function TrustUSP({ item, accent }: TrustUSPProps) {
  return (
    <li className="flex flex-col gap-2" role="listitem">
      <Icon
        name={item.icon as IconName}
        size={24}
        stroke={1.75}
        className={cn("shrink-0", accentIcon[accent])}
        aria-hidden
      />
      <p className="text-sm md:text-base font-semibold text-gray-12 leading-tight">
        {item.title}
      </p>
      <p className="text-sm text-gray-10 leading-snug">
        {item.subcopy}
      </p>
    </li>
  );
}
