import { z } from "zod";

export const LeadSchema = z.object({
  // Step 1 — required
  name: z.string().min(2, "Name is too short").max(100),
  phone: z
    .string()
    .regex(
      /^\+?1?[\s.-]*\(?([0-9]{3})\)?[\s.-]*([0-9]{3})[\s.-]*([0-9]{4})$/,
      "Phone looks incomplete — include area code",
    ),

  // Step 2 — required/optional
  service: z.enum([
    "channel-letters",
    "lightboxes",
    "vehicle-wraps",
    "window-graphics",
    "other",
  ]),
  email: z.string().email("Email looks incomplete"),
  message: z.string().max(1000).optional().or(z.literal("")),

  // PPC attribution (hidden, best-effort)
  gclid: z.string().optional().or(z.literal("")),
  utm_source: z.string().optional().or(z.literal("")),
  utm_medium: z.string().optional().or(z.literal("")),
  utm_campaign: z.string().optional().or(z.literal("")),
  utm_term: z.string().optional().or(z.literal("")),
  utm_content: z.string().optional().or(z.literal("")),
  referrer: z.string().optional().or(z.literal("")),

  // Honeypot — must be empty
  website: z.string().max(0, "bot").optional().or(z.literal("")),

  // Form context
  formId: z.string().min(1),
  lpSlug: z.string().min(1),
});

export type LeadData = z.infer<typeof LeadSchema>;

export const LeadStep1Schema = LeadSchema.pick({ name: true, phone: true });
export type LeadStep1 = z.infer<typeof LeadStep1Schema>;
