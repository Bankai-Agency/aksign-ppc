import { cn } from "@/lib/utils";

/**
 * Dev-only visual marker for unresolved `{{PLACEHOLDER: ...}}` tokens.
 * In production, renders the provided fallback (or a short honest copy).
 * Source: common/orchestration/PLACEHOLDER-REGISTRY.md
 */

const PLACEHOLDER_RE = /^\{\{PLACEHOLDER:\s*(.+?)\}\}$/;

export function isPlaceholder(value: string | undefined | null): value is string {
  if (typeof value !== "string") return false;
  return PLACEHOLDER_RE.test(value);
}

export function extractPlaceholderToken(value: string): string | null {
  const match = value.match(PLACEHOLDER_RE);
  return match ? match[1].trim() : null;
}

type PlaceholderProps = {
  token: string;
  fallback?: string;
  className?: string;
};

export function Placeholder({ token, fallback = "", className }: PlaceholderProps) {
  if (process.env.NODE_ENV === "development") {
    return (
      <span
        data-placeholder={token}
        className={cn(
          "inline-block border-2 border-warning-9 bg-warning-2 text-warning-12 px-2 py-0.5 text-xs font-mono rounded-sm",
          className,
        )}
      >
        {`{{PLACEHOLDER: ${token}}}`}
      </span>
    );
  }
  return <>{fallback}</>;
}

/**
 * Helper: render a value that may or may not be a placeholder.
 */
export function MaybePlaceholder({
  value,
  fallback,
  className,
}: {
  value: string;
  fallback?: string;
  className?: string;
}) {
  const token = extractPlaceholderToken(value);
  if (token) return <Placeholder token={token} fallback={fallback} className={className} />;
  return <>{value}</>;
}
