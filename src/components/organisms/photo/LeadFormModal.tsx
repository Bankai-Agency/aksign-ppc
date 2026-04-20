"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/atoms/Icon";
import { ArrowButton } from "@/components/atoms/ArrowButton";
import { useLeadForm } from "@/lib/lead-form";
import { formatPhoneMask } from "@/lib/format-phone";
import { useLocale } from "@/lib/i18n";

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
 * Lead-form modal — opened from any "Get a quote" / "Get in touch" CTA.
 * Renders a full-screen black overlay with the AK Sign contact form
 * inside. Close via ESC, backdrop click, or the X-button.
 */
export function LeadFormModal() {
  const { open, closeModal } = useLeadForm();
  const { t } = useLocale();
  const [topic, setTopic] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[${topic || "Lead"}] ${name || "Lead"}`,
    );
    const body = encodeURIComponent(
      `Topic: ${topic}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nQuestion:\n${question}`,
    );
    window.location.href = `mailto:info@aksign.us?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Get a free quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={closeModal}
        >
          <motion.form
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] bg-gray-12 text-gray-1 rounded-3xl p-6 md:p-10 flex flex-col gap-3 max-h-[92svh] overflow-y-auto"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-1/10 hover:bg-gray-1/20 text-gray-1 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={18} />
            </button>

            <div className="mb-2 pr-10">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-1/70 font-medium mb-2">
                {t("eyebrow.contact")}
              </p>
              <h2
                className="font-semibold tracking-[-0.04em] text-balance"
                style={{
                  fontSize: "clamp(1.5rem, 0.5rem + 2vw, 2.25rem)",
                  lineHeight: 1,
                }}
              >
                {t("modal.heading")}
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-1/70 leading-relaxed">
                {t("modal.body")}
              </p>
            </div>

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
              rows={4}
              className={`${pill} resize-none`}
              aria-label="Your question"
              placeholder={t("form.message")}
              style={{ letterSpacing: "-0.01em" }}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-3">
              <p className="text-xs md:text-sm text-gray-1/55 leading-relaxed">
                {t("modal.legal")}
              </p>
              <ArrowButton as="button" type="submit" tone="light" size="lg" fullWidthMobile>
                {t("cta.sendRequest")}
              </ArrowButton>
            </div>
          </motion.form>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
