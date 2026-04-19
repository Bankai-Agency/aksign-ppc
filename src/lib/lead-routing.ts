import type { LeadData } from "@/lib/validators/lead";

const escape = (s: string) =>
  s.replace(/[<>&]/g, (c) =>
    c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
  );

function formatTelegramMessage(lead: LeadData): string {
  return [
    "<b>🔔 New lead — AK Sign</b>",
    `<b>LP:</b> /${escape(lead.lpSlug)}`,
    `<b>Name:</b> ${escape(lead.name)}`,
    `<b>Phone:</b> ${escape(lead.phone)}`,
    `<b>Email:</b> ${escape(lead.email)}`,
    `<b>Service:</b> ${escape(lead.service)}`,
    lead.message ? `<b>Message:</b> ${escape(lead.message)}` : "",
    "",
    `<i>Source:</i> ${escape(lead.utm_source || "direct")} / ${escape(lead.utm_medium || "-")} / ${escape(lead.utm_campaign || "-")}`,
    lead.gclid ? `<i>gclid:</i> <code>${escape(lead.gclid)}</code>` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendToTelegram(lead: LeadData): Promise<void> {
  const token = process.env.TG_BOT_TOKEN;
  const chatId = process.env.TG_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[telegram] TG_BOT_TOKEN/TG_CHAT_ID not set — skipping");
    return;
  }
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatTelegramMessage(lead),
      parse_mode: "HTML",
    }),
  });
  if (!res.ok) throw new Error(`telegram ${res.status}`);
}
