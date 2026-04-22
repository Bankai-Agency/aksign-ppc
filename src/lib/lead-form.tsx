"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type LeadFormCtx = {
  /** Form dialog visibility (hero-CTA, header CTA, pricing tiles, etc.). */
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const LeadFormContext = createContext<LeadFormCtx>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  return (
    <LeadFormContext.Provider value={{ open, openModal, closeModal }}>
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
