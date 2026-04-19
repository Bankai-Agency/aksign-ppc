"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure" | "header" | "footer";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  amount = 0.25,
  className,
  as = "div",
}: RevealProps) {
  const MotionCmp = motion[as];
  return (
    <MotionCmp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionCmp>
  );
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const MotionCmp = motion[as];
  return (
    <MotionCmp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </MotionCmp>
  );
}

export function StaggerItem({
  children,
  y = 32,
  className,
  as = "div",
}: {
  children: ReactNode;
  y?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const MotionCmp = motion[as];
  return (
    <MotionCmp
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionCmp>
  );
}

// Silence unused import (kept exported for consumers needing variants type)
export type { Variants };
export { variants as revealVariants };
