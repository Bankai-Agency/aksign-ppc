"use client";

import { useState, type FormEvent } from "react";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Icon } from "@/components/atoms/Icon";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { formatPhoneMask } from "@/lib/format-phone";
import { useLocale } from "@/lib/i18n";
import { submitLead } from "@/lib/submit-lead";

const topics = [
  "Channel letters",
  "Illuminated signs",
  "Lightboxes",
  "Vehicle wraps",
  "Other",
];

const pill =
  "cta-input w-full rounded-2xl bg-gray-1/10 hover:bg-gray-1/15 focus:bg-gray-1/20 px-5 py-4 text-base md:text-lg text-gray-1 placeholder:text-gray-1/45 transition-colors duration-200";

/**
 * Customer Care CTA — black band. Left: eyebrow, heading, copy, direct
 * contacts. Right: clean placeholder-only form (no eyebrow labels) with
 * design-system pills.
 */
export function CustomerCareCTA() {
  const { t, locale } = useLocale();
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErrorKey(null);
    const result = await submitLead({
      topic,
      name,
      email,
      phone,
      message: question,
      formId: "contact-cta",
    });
    setSending(false);
    if (result.ok) {
      // Full-page navigation (not router.push) so GTM Page View triggers
      // re-initialize on /thank-you — required for Ads conversion + GA4
      // generate_lead events to fire. Preserves gclid + utm_* via existing
      // query string.
      setTopic("");
      setName("");
      setEmail("");
      setPhone("");
      setQuestion("");
      const params = new URLSearchParams(window.location.search);
      params.set("form_id", "contact-cta");
      window.location.href = `/thank-you?${params.toString()}`;
      return;
    }
    if (result.error === "rate_limit") setErrorKey("form.error.rateLimit");
    else if (result.error === "validation_failed") setErrorKey("form.error.validation");
    else setErrorKey("form.error.generic");
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="bg-black text-gray-1"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-14 md:py-24">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-6">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-1/70 font-medium mb-4">
              {t("eyebrow.contact")}
            </p>
            <LetterReveal
              key={`cta-h-${locale}`}
              as="h2"
              id="cta-heading"
              text={t("section.contact.heading")}
              className="font-semibold tracking-[-0.04em] block text-balance max-w-[16ch] leading-[1.1] md:leading-[0.92]"
              style={{
                fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
              }}
              stagger={0.04}
            />
            <p className="mt-4 md:mt-5 text-base md:text-lg text-gray-1/80 leading-relaxed max-w-[48ch]">
              {t("cta.body")}
            </p>
            <div className="mt-8 md:mt-10 flex flex-col gap-3 text-sm md:text-base text-gray-1/70">
              <a
                href="tel:+13128984581"
                className="inline-flex items-center gap-3 hover:text-gray-1 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-1/10">
                  <Icon name="Phone" size={14} stroke={1.75} />
                </span>
                (312) 898-4581
              </a>
              <a
                href="mailto:info@aksign.us"
                className="inline-flex items-center gap-3 hover:text-gray-1 transition-colors"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-1/10">
                  <Icon name="Mail" size={14} stroke={1.75} />
                </span>
                info@aksign.us
              </a>
            </div>
          </div>

          {/* Dark form — placeholder-only pills */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-6 flex flex-col gap-3"
          >
            <div className="relative">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className={`${pill} appearance-none pr-11 ${topic ? "" : "text-gray-1/45"}`}
                aria-label="Topic"
                required
                style={{ letterSpacing: "-0.01em" }}
              >
                <option value="" disabled className="bg-gray-12 text-gray-1">
                  {t("form.selectTopic")}
                </option>
                {topics.map((topicValue, ti) => {
                  const keys = [
                    "form.topic.channel",
                    "form.topic.illuminated",
                    "form.topic.lightboxes",
                    "form.topic.vehicle",
                    "form.topic.other",
                  ] as const;
                  return (
                    <option key={topicValue} value={topicValue} className="bg-gray-12 text-gray-1">
                      {t(keys[ti])}
                    </option>
                  );
                })}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-1/60">
                <Icon name="ChevronDown" size={18} stroke={1.75} />
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={pill}
                aria-label="Your name"
                placeholder={t("form.yourName")}
                required
                minLength={2}
                style={{ letterSpacing: "-0.01em" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={pill}
                aria-label="Email"
                placeholder={t("form.email")}
                required
                pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                title="Enter a valid email, e.g. you@company.com"
                style={{ letterSpacing: "-0.01em" }}
              />
            </div>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
              className={pill}
              aria-label="Phone"
              placeholder="+1 (312) 898-4581"
              required
              pattern="^\+?[0-9\s\-()]{10,20}$"
              title="Enter a valid phone, e.g. +1 (312) 898-4581"
              inputMode="tel"
              style={{ letterSpacing: "-0.01em" }}
            />

            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={5}
              className={`${pill} resize-none`}
              aria-label="Your question"
              placeholder={t("form.message")}
              style={{ letterSpacing: "-0.01em" }}
            />

            {errorKey ? (
              <p
                role="alert"
                className="text-sm text-brand-9 bg-brand-9/10 rounded-xl px-4 py-3 leading-relaxed"
              >
                {t(errorKey as never)}
              </p>
            ) : null}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
              <p className="text-sm text-gray-1/60 leading-relaxed max-w-[42ch]">
                {t("cta.legal")}
              </p>
              <ArrowButton
                as="button"
                type="submit"
                tone="light"
                size="lg"
                fullWidthMobile
                disabled={sending}
              >
                {sending ? t("cta.sending") : t("cta.sendRequest")}
              </ArrowButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
