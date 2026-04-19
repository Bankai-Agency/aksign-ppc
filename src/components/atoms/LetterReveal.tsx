"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

type LetterRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  children?: ReactNode;
  id?: string;
};

/**
 * studio-size.com split-type reveal — breaks text into words, each wrapped
 * in an overflow-hidden span; on viewport enter, each word translates up
 * from below with a small stagger.
 */
export function LetterReveal({
  text,
  as: Tag = "span",
  className,
  style,
  delay = 0,
  stagger = 0.04,
  children,
  id,
}: LetterRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const words = text.split(/(\s+)/);

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={style}
      aria-label={text}
    >
      {words.map((word, i) =>
        /^\s+$/.test(word) ? (
          <span key={i} aria-hidden>
            {word}
          </span>
        ) : (
          <span
            key={i}
            aria-hidden
            className="inline-block overflow-hidden align-baseline"
            style={{ paddingBottom: "0.35em", marginBottom: "-0.28em" }}
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: "150%" }}
              animate={inView ? { y: "0%" } : { y: "150%" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + i * stagger,
              }}
            >
              {word}
            </motion.span>
          </span>
        ),
      )}
      {children}
    </Tag>
  );
}
