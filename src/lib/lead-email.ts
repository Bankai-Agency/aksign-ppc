import { Resend } from "resend";
import type { LeadData } from "@/lib/validators/lead";

function formatLeadHtml(lead: LeadData): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0; color:#6e6e6e; font-size:13px">${k}</td><td style="padding:4px 0; font-size:13px; color:#0a0a0a">${escapeHtml(v)}</td></tr>`;
  return `
    <div style="font-family:system-ui,sans-serif; max-width:600px">
      <h2 style="color:#bb0000; margin-bottom:16px">New lead — AK Sign</h2>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
        ${row("LP", "/" + lead.lpSlug)}
        ${row("Form", lead.formId)}
        ${row("Name", lead.name)}
        ${row("Phone", lead.phone)}
        ${row("Email", lead.email)}
        ${row("Service", lead.service)}
        ${lead.message ? row("Message", lead.message) : ""}
        ${lead.gclid ? row("gclid", lead.gclid) : ""}
        ${lead.utm_source ? row("utm_source", lead.utm_source) : ""}
        ${lead.utm_medium ? row("utm_medium", lead.utm_medium) : ""}
        ${lead.utm_campaign ? row("utm_campaign", lead.utm_campaign) : ""}
        ${lead.utm_term ? row("utm_term", lead.utm_term) : ""}
        ${lead.referrer ? row("referrer", lead.referrer) : ""}
      </table>
    </div>
  `.trim();
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;",
  );

export async function sendLeadEmail(lead: LeadData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  const from = process.env.LEAD_EMAIL_FROM;
  if (!apiKey || !to || !from) {
    console.warn("[email] RESEND_API_KEY / LEAD_EMAIL_TO / FROM not set — skipping");
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from,
    to,
    subject: `New lead — ${lead.name} (/${lead.lpSlug})`,
    html: formatLeadHtml(lead),
  });
}
