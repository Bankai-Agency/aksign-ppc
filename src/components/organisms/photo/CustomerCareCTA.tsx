"use client";

import { useState, type FormEvent } from "react";
import { LetterReveal } from "@/components/atoms/LetterReveal";
import { Icon } from "@/components/atoms/Icon";
import { ArrowButton } from "@/components/atoms/ArrowButton";

const topics = [
  "Channel letters",
  "Illuminated signs",
  "Lightboxes",
  "Vehicle wraps",
  "Other",
];

/**
 * Customer Care CTA — full-bleed warm-black band with heading left,
 * editorial body+form to the right. No image, no focus ring — each
 * field carries a static outline that reads as the input container.
 */
export function CustomerCareCTA() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${topic}] ${name || "Lead"}`);
    const body = encodeURIComponent(
      `Topic: ${topic}\nName: ${name}\nEmail: ${email}\n\nQuestion:\n${question}`,
    );
    window.location.href = `mailto:info@aksign.us?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="bg-black text-gray-1"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-1/70 font-medium mb-4">
              (Contact)
            </p>
            <LetterReveal
              as="h2"
              id="cta-heading"
              text="Customer care department"
              className="font-semibold tracking-[-0.04em] block text-balance max-w-[16ch]"
              style={{
                fontSize: "clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)",
                lineHeight: 1,
              }}
              stagger={0.04}
            />
            <p className="mt-6 md:mt-8 text-base md:text-lg text-gray-1/80 leading-relaxed max-w-[48ch]">
              Fill out the form and our team will get in touch within one
              business day — usually less. Tell us about the project:
              storefront, restaurant, dealership, showroom, fleet. We&apos;ll
              come back with a free detailed quote and a design preview before
              any fabrication starts.
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

          {/* Form card */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-7 flex flex-col gap-4 md:gap-5 bg-gray-1 text-gray-12 rounded-3xl p-6 md:p-10"
          >
            <Field label="Select a topic">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="cta-input w-full bg-transparent text-base md:text-lg text-gray-12 appearance-none pr-8"
                aria-label="Topic"
                style={{ letterSpacing: "-0.01em" }}
              >
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-10">
                <Icon name="ChevronDown" size={18} stroke={1.75} />
              </span>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <Field label="Your name">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="cta-input w-full bg-transparent text-base md:text-lg text-gray-12"
                  aria-label="Your name"
                  style={{ letterSpacing: "-0.01em" }}
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="cta-input w-full bg-transparent text-base md:text-lg text-gray-12"
                  aria-label="Email"
                  required
                  style={{ letterSpacing: "-0.01em" }}
                />
              </Field>
            </div>

            <Field label="Your question" block>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={6}
                className="cta-input w-full bg-transparent text-base md:text-lg text-gray-12 resize-none"
                aria-label="Your question"
                style={{ letterSpacing: "-0.01em" }}
              />
            </Field>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4">
              <p className="text-sm md:text-base text-gray-10">
                We reply within one business day.
              </p>
              <ArrowButton as="button" type="submit" tone="solid" size="lg">
                Send request
              </ArrowButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  block,
}: {
  label: string;
  children: React.ReactNode;
  block?: boolean;
}) {
  return (
    <label className="relative block rounded-xl bg-gray-1 border-2 border-gray-4 px-5 pt-5 pb-2.5 transition-colors duration-200 hover:border-brand-9 focus-within:border-brand-9">
      <span className="block text-[11px] uppercase tracking-[-0.02em] text-gray-10 font-semibold mb-1">
        {label}
      </span>
      <div className={block ? "" : "relative"}>{children}</div>
    </label>
  );
}
