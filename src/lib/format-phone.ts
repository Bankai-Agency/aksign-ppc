/**
 * Formats a raw phone input into a fixed US mask with +1 prefix.
 *   ""               → ""
 *   "3"              → "+1 (3"
 *   "312"            → "+1 (312)"
 *   "3128984"        → "+1 (312) 898-4"
 *   "3128984581"     → "+1 (312) 898-4581"
 *   "13128984581"    → "+1 (312) 898-4581"   (leading 1 is dropped)
 * Non-digits are stripped.
 */
export function formatPhoneMask(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("1")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length === 0) return "";

  const area = digits.slice(0, 3);
  const mid = digits.slice(3, 6);
  const last = digits.slice(6, 10);

  let out = "+1";
  if (area) out += ` (${area}`;
  if (area.length === 3) out += ")";
  if (mid) out += ` ${mid}`;
  if (last) out += `-${last}`;
  return out;
}
