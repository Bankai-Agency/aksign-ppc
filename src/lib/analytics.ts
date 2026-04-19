"use client";

type AnyObj = Record<string, unknown>;

export function track(event: string, params: AnyObj = {}): void {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
