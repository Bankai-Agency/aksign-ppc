"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ThankYouAnalytics() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    track("lead_submit", {
      form_id: params.get("form_id") ?? "unknown",
    });
  }, []);
  return null;
}
