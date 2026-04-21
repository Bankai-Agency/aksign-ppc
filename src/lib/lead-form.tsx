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
  /** Thank-you dialog visibility — shown after a successful submit. */
  successOpen: boolean;
  showSuccess: () => void;
  hideSuccess: () => void;
};

const LeadFormContext = createContext<LeadFormCtx>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
  successOpen: false,
  showSuccess: () => {},
  hideSuccess: () => {},
});

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const showSuccess = useCallback(() => setSuccessOpen(true), []);
  const hideSuccess = useCallback(() => setSuccessOpen(false), []);
  return (
    <LeadFormContext.Provider
      value={{
        open,
        openModal,
        closeModal,
        successOpen,
        showSuccess,
        hideSuccess,
      }}
    >
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  return useContext(LeadFormContext);
}
