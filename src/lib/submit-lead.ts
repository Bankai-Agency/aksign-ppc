/**
 * Client-side helper that POSTs the lead to /api/lead. Responsible for:
 *   - mapping UI topic labels to the ServiceTag enum
 *   - picking up gclid / utm_* / referrer from the current URL + document
 *   - normalizing the payload to match LeadSchema on the server
 *
 * Intentionally client-side only ("use client" not needed because
 * nothing from this file is a component). Returns { ok: true } or
 * { ok: false, error: string } — callers surface the error inline.
 */

export type LeadService =
  | "channel-letters"
  | "lightboxes"
  | "vehicle-wraps"
  | "window-graphics"
  | "other";

export const TOPIC_TO_SERVICE: Record<string, LeadService> = {
  "Channel letters": "channel-letters",
  "Illuminated signs": "lightboxes",
  Lightboxes: "lightboxes",
  "Vehicle wraps": "vehicle-wraps",
  "Window graphics": "window-graphics",
  Other: "other",
};

export type LeadSubmitInput = {
  /** UI topic label — from the <select>. Required. */
  topic: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  /** Identifies which surface submitted the form (hero-modal, contact-cta, etc.) */
  formId: string;
};

export type LeadSubmitResult = { ok: true } | { ok: false; error: string };

function readParams(): Partial<Record<string, string>> {
  if (typeof window === "undefined") return {};
  const usp = new URLSearchParams(window.location.search);
  const pick = (k: string) => usp.get(k) ?? "";
  return {
    gclid: pick("gclid"),
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_term: pick("utm_term"),
    utm_content: pick("utm_content"),
    referrer: typeof document !== "undefined" ? document.referrer : "",
  };
}

function currentLpSlug(): string {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return path || "home";
}

export async function submitLead(input: LeadSubmitInput): Promise<LeadSubmitResult> {
  const service = TOPIC_TO_SERVICE[input.topic] ?? "other";
  const attrib = readParams();
  const payload = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    service,
    message: (input.message ?? "").trim(),
    formId: input.formId,
    lpSlug: currentLpSlug(),
    ...attrib,
    website: "", // honeypot — always empty
  };
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 429) {
      return { ok: false, error: "rate_limit" };
    }
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      return { ok: false, error: data?.error ?? "server_error" };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error" };
  }
}
