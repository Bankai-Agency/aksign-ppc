"use client";

import type { ElementType, ReactNode } from "react";

type LetterRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  /** @deprecated no longer used — kept for API compat. */
  delay?: number;
  /** @deprecated no longer used — kept for API compat. */
  stagger?: number;
  children?: ReactNode;
  id?: string;
};

/**
 * Plain-text heading wrapper. Formerly split the text into words and
 * animated each from below (framer-motion + useInView). Dropped per
 * design direction — headings now render as a single text block with
 * no entry animation. Kept the {text, as, className, style, children}
 * API so existing call sites across the app don't need to change.
 *
 * {children} still renders after {text} — used by HeroPhoto to append
 * the inline accent pill after the main H1 line.
 */
export function LetterReveal({
  text,
  as: Tag = "span",
  className,
  style,
  children,
  id,
}: LetterRevealProps) {
  return (
    <Tag id={id} className={className} style={style}>
      {text}
      {children}
    </Tag>
  );
}
