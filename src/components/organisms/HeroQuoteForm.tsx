"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Textarea } from "@/components/atoms/Textarea";
import { FormField } from "@/components/molecules/FormField";
import type { LPSlug, ServiceTag } from "@/types/lp";
import { LeadSchema, type LeadData } from "@/lib/validators/lead";
import { cn } from "@/lib/utils";

type HeroQuoteFormProps = {
  lpSlug: LPSlug;
  serviceTag: ServiceTag;
  ctaLabel: string;
  formHeading: string;
  phoneHint: string;
  phone: string;
  phoneDisplay: string;
  id?: string;
  variant?: "light" | "dark";
};

type Stage = "step1" | "step2" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  phone: string;
  email: string;
  message: string;
  website: string; // honeypot
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
  website: "",
};

export function HeroQuoteForm({
  lpSlug,
  serviceTag,
  ctaLabel,
  formHeading,
  phoneHint,
  phone,
  phoneDisplay,
  id = "quote-form",
  variant = "light",
}: HeroQuoteFormProps) {
  const [stage, setStage] = useState<Stage>("step1");
  const [state, setState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});
  const [attribution, setAttribution] = useState<{
    gclid: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_term: string;
    utm_content: string;
    referrer: string;
  }>({
    gclid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    referrer: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // One-shot capture on mount — PPC attribution is immutable after page load.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAttribution({
      gclid: params.get("gclid") ?? "",
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      utm_term: params.get("utm_term") ?? "",
      utm_content: params.get("utm_content") ?? "",
      referrer: document.referrer || "",
    });
  }, []);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep1() {
    const nameOk = state.name.trim().length >= 2;
    const phoneOk = /^\+?1?[\s.-]*\(?([0-9]{3})\)?[\s.-]*([0-9]{3})[\s.-]*([0-9]{4})$/.test(state.phone);
    const nextErrors: typeof errors = {};
    if (!nameOk) nextErrors.name = "Name is too short";
    if (!phoneOk) nextErrors.phone = "Phone looks incomplete — include area code";
    setErrors(nextErrors);
    return nameOk && phoneOk;
  }

  function advance() {
    if (!validateStep1()) return;
    setStage("step2");
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer = (window as any).dataLayer || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).dataLayer.push({
        event: "form_step_complete",
        step_from: 1,
        step_to: 2,
        lp_slug: lpSlug,
      });
    }
  }

  async function submit() {
    const payload: LeadData = {
      name: state.name,
      phone: state.phone,
      service: serviceTag,
      email: state.email,
      message: state.message,
      website: state.website,
      formId: `hero-${lpSlug}`,
      lpSlug,
      ...attribution,
    };
    const parsed = LeadSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0] as keyof LeadData;
        fieldErrors[key] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStage("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      setStage("success");
      if (typeof window !== "undefined") {
        window.location.href = `/thank-you?form_id=hero-${lpSlug}`;
      }
    } catch {
      setStage("error");
    }
  }

  const isDark = variant === "dark";

  return (
    <form
      id={id}
      aria-label="Get a quote"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (stage === "step1") advance();
        else if (stage === "step2") void submit();
      }}
      className={cn(
        "rounded-2xl p-6 md:p-8 relative overflow-hidden",
        isDark
          ? "bg-gray-12 text-white border border-gray-11"
          : "bg-white text-gray-12 border border-gray-3 shadow-sm",
      )}
    >
      <h2 className={cn("text-xl md:text-2xl mb-5", isDark ? "text-white" : "text-gray-12")}>
        {formHeading}
      </h2>

      {/* Honeypot — off-screen, not display:none so bots still try to fill it */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={state.website}
            onChange={(e) => setField("website", e.target.value)}
          />
        </label>
      </div>

      <AnimatePresence mode="wait">
        {stage === "step1" && (
          <motion.fieldset
            key="step1"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4 border-0 p-0 m-0"
          >
            <legend className="sr-only">Step 1 of 2 — Contact info</legend>
            <FormField id={`${id}-name`} label="Name" required error={errors.name}>
              <Input
                id={`${id}-name`}
                name="name"
                value={state.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Alex Johnson"
                autoComplete="name"
                invalid={!!errors.name}
              />
            </FormField>
            <FormField
              id={`${id}-phone`}
              label="Phone"
              required
              hint={errors.phone ? undefined : "Include area code"}
              error={errors.phone}
            >
              <Input
                id={`${id}-phone`}
                name="phone"
                type="tel"
                value={state.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="(312) 555-1234"
                autoComplete="tel"
                invalid={!!errors.phone}
              />
            </FormField>
            <Button type="submit" size="lg" fullWidth>
              Continue
              <Icon name="ArrowRight" size={18} />
            </Button>
            <p className={cn("text-sm text-center", isDark ? "text-gray-4" : "text-gray-10")}>
              {phoneHint.replace("(312) 898-4581", phoneDisplay)}{" "}
              <a href={`tel:${phone}`} className="underline tabular-nums font-medium">
                {phoneDisplay}
              </a>
            </p>
          </motion.fieldset>
        )}
        {stage === "step2" && (
          <motion.fieldset
            key="step2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4 border-0 p-0 m-0"
          >
            <legend className="sr-only">Step 2 of 2 — Project details</legend>
            <FormField id={`${id}-email`} label="Email" required error={errors.email}>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                value={state.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                invalid={!!errors.email}
              />
            </FormField>
            <FormField id={`${id}-message`} label="Anything we should know?" hint="Optional">
              <Textarea
                id={`${id}-message`}
                name="message"
                rows={3}
                value={state.message}
                onChange={(e) => setField("message", e.target.value)}
                placeholder="Size, timeline, colors, references…"
              />
            </FormField>
            <div className="flex gap-3">
              <Button
                type="button"
                intent="secondary"
                size="lg"
                onClick={() => setStage("step1")}
              >
                <Icon name="ArrowLeft" size={18} />
                Back
              </Button>
              <Button type="submit" size="lg" fullWidth>
                {ctaLabel}
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>
          </motion.fieldset>
        )}
        {stage === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center text-sm text-gray-10"
          >
            Sending your request…
          </motion.div>
        )}
        {stage === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
            className="py-6 text-center"
          >
            <p className="text-base text-destructive-11 font-semibold">
              Something went wrong.
            </p>
            <p className="text-sm text-gray-10 mt-1">
              Please try again or call{" "}
              <a href={`tel:${phone}`} className="underline text-brand-11 tabular-nums">
                {phoneDisplay}
              </a>
              .
            </p>
            <Button
              type="button"
              intent="secondary"
              size="md"
              className="mt-4"
              onClick={() => setStage("step2")}
            >
              Try again
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
