"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

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

/**
 * Render-time "is this a touch device" check. Returns false on the
 * server and during the first client render, then flips to true on
 * hydration for touch devices. That hop lets the server + initial
 * client render produce the static (no-framer) tree, which is what
 * mobile needs for TBT / Speed Index — the motion runtime never
 * attaches IntersectionObservers on touch hardware.
 */
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches
    ) {
      setIsTouch(true);
    }
  }, []);
  return isTouch;
}

export function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 0.7,
  amount = 0.25,
  className,
  as = "div",
}: RevealProps) {
  const isTouch = useIsTouch();
  if (isTouch) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
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
  const isTouch = useIsTouch();
  if (isTouch) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
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
  const isTouch = useIsTouch();
  if (isTouch) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
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
