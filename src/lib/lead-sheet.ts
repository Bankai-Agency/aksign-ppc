import type { LeadData } from "@/lib/validators/lead";

/**
 * Append the lead to a Google Sheet via an Apps Script webhook.
 *
 * The webhook URL points at a deployed Apps Script web app that runs
 * `doPost(e)` and appends a row to its bound Sheet (configured in the
 * project — see SHEET_WEBHOOK_URL env var on Vercel).
 *
 * Quirk: Apps Script web-app POSTs return a 302 redirect to
 * `script.googleusercontent.com/macros/echo`. The `doPost` side effect
 * (the row append) happens on the original POST, BEFORE the redirect.
 * The final response after `-L` follow is HTML "Не удалось открыть файл"
 * with HTTP 405 — a known Google issue that does NOT indicate failure.
 *
 * We therefore treat any *completed* HTTP exchange as success, and only
 * surface errors when the request itself fails (network down, DNS, etc).
 */
export async function sendToSheet(
  lead: LeadData,
  ip: string,
): Promise<void> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn("[sheet] SHEET_WEBHOOK_URL not set — skipping");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lead, ip }),
      redirect: "manual",
      signal: controller.signal,
    });
    // Response code is intentionally not checked — see comment above.
  } finally {
    clearTimeout(timeout);
  }
}
