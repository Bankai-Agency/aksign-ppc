import { NextRequest, NextResponse } from "next/server";
import { LeadSchema } from "@/lib/validators/lead";
import { sendLeadEmail } from "@/lib/lead-email";
import { sendToTelegram } from "@/lib/lead-routing";

export const runtime = "nodejs";

/** Simple in-memory IP rate-limit — 1 submit / 30s (best-effort, single-node) */
const recent = new Map<string, number>();
const WINDOW_MS = 30_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const last = recent.get(ip);
  // Garbage-collect old entries occasionally
  if (recent.size > 1000) {
    for (const [k, t] of recent) if (now - t > WINDOW_MS) recent.delete(k);
  }
  if (last && now - last < WINDOW_MS) return false;
  recent.set(ip, now);
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const lead = parsed.data;

  // Honeypot — silent 200
  if (lead.website && lead.website.length > 0) {
    console.warn("[honeypot] bot detected", { ip, lpSlug: lead.lpSlug });
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.allSettled([
    sendToTelegram(lead),
    sendLeadEmail(lead),
  ]);

  // Log the lead even if dispatch failed — never lose a lead
  console.info("[lead]", {
    ip,
    lpSlug: lead.lpSlug,
    formId: lead.formId,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    service: lead.service,
    gclid: lead.gclid,
    utm: {
      source: lead.utm_source,
      medium: lead.utm_medium,
      campaign: lead.utm_campaign,
    },
    telegramStatus: results[0].status,
    emailStatus: results[1].status,
  });

  return NextResponse.json({ ok: true });
}
