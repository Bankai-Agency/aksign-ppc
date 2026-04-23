"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type LeadFormPrefill = {
  /** UI label from the <select> options (EN side). */
  topic?: string;
  /** Seeds the textarea so the visitor doesn't start from a blank slate. */
  message?: string;
};

type LeadFormCtx = {
  open: boolean;
  prefill: LeadFormPrefill;
  openModal: (prefill?: LeadFormPrefill) => void;
  closeModal: () => void;
};

const LeadFormContext = createContext<LeadFormCtx>({
  open: false,
  prefill: {},
  openModal: () => {},
  closeModal: () => {},
});

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<LeadFormPrefill>({});
  const openModal = useCallback((next?: LeadFormPrefill) => {
    // Only accept a plain {topic?, message?} object. Anything else (a
    // MouseEvent from onClick={openModal} etc.) is ignored so bare
    // callers keep working.
    if (next && typeof next === "object" && !("nativeEvent" in next)) {
      setPrefill(next);
    } else {
      setPrefill({});
    }
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <LeadFormContext.Provider value={{ open, prefill, openModal, closeModal }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
