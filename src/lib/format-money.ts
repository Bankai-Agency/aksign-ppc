/**
 * Formats a price range with typographically correct en-dash and thousands
 * separators. Appends `+` when the high value is a "starts-from" minimum,
 * and an optional per-unit suffix ("per vehicle", "per sign").
 *
 * formatMoneyRange(3000, 6000)                      -> "$3,000 – $6,000"
 * formatMoneyRange(12000, 25000, true)              -> "$12,000 – $25,000+"
 * formatMoneyRange(5000, 15000, true, "per vehicle")-> "$5,000 – $15,000+ per vehicle"
 */
export function formatMoneyRange(
  low: number,
  high: number,
  rangeHighIsMin = false,
  perUnit?: string,
): string {
  const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;
  const base = `${fmt(low)} \u2013 ${fmt(high)}${rangeHighIsMin ? "+" : ""}`;
  return perUnit ? `${base} ${perUnit}` : base;
}

export function formatSingleAmount(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}
