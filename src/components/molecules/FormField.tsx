import type { ReactNode } from "react";
import { Label } from "@/components/atoms/Label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  /** Either pass a pre-built input via children, or leave it and render separately */
  children: ReactNode;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  hint,
  error,
  required,
  className,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive-11" aria-hidden="true">*</span>}
      </Label>
      <div
        // Radix Slot pattern: we can't know the input shape here, so we
        // expect the caller to forward id/aria-describedby/aria-invalid.
        data-form-field-id={id}
        data-described-by={describedBy}
      >
        {children}
      </div>
      {hint && !error && (
        <p id={hintId} className="text-sm text-gray-10">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          aria-live="polite"
          className="text-sm text-destructive-11"
        >
          {error}
        </p>
      )}
    </div>
  );
}
