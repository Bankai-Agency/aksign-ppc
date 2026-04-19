import Image from "next/image";
import { Icon, type IconName } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** File slot name. If /public/images/<slot>.(jpg|webp) exists, renders as photo. */
  slot: string;
  aspect?: "portrait" | "landscape" | "square" | "wide";
  /** Optional pre-resolved file path (bypasses slot lookup). */
  src?: string;
  alt: string;
  icon?: IconName;
  label?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const aspectClass: Record<NonNullable<ImagePlaceholderProps["aspect"]>, string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
};

/**
 * Photo slot. Shows a stylized "image placeholder" panel (Lucide icon +
 * slot label) on a gray-3 surface. When the user drops a real image at
 * `/public/images/<slot>.jpg` and sets `src` (or the loader detects it)
 * Next/Image takes over.
 *
 * Currently we assume a provided `src` wins; otherwise we render the
 * placeholder panel. The handoff of real images happens via Dmitriy.
 */
export function ImagePlaceholder({
  slot,
  aspect = "landscape",
  src,
  alt,
  icon = "ImageIcon",
  label,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImagePlaceholderProps) {
  return (
    <figure
      data-slot={slot}
      className={cn("relative overflow-hidden rounded-lg bg-gray-3", aspectClass[aspect], className)}
    >
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-9">
          <Icon name={icon} size={40} stroke={1.5} aria-hidden />
          <p className="text-xs font-mono uppercase tracking-widest">{label ?? slot}</p>
          <p className="text-[10px] font-mono text-gray-8">{aspect}</p>
        </div>
      )}
    </figure>
  );
}
