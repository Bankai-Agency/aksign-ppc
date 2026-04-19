"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HoverState = "default" | "link" | "play" | "drag";

/**
 * studio-size.com mouse-follower — custom cursor with lag/smoothing.
 * On hover over elements with data-cursor attribute, adapts size and
 * label. Hidden by default cursor (CSS in globals).
 */
export function MouseFollower() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<HoverState>("default");
  const [label, setLabel] = useState("");
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    document.body.classList.add("studio-cursor");

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const kind = el.getAttribute("data-cursor") as HoverState;
        const customLabel = el.getAttribute("data-cursor-label") ?? "";
        setState(kind || "link");
        setLabel(customLabel);
      } else {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
      document.body.classList.remove("studio-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[90] hidden md:flex items-center justify-center rounded-full mix-blend-difference bg-gray-1 transition-[width,height,opacity] duration-300 ease-out",
        state === "play"
          ? "w-20 h-20 opacity-100"
          : "w-0 h-0 opacity-0",
      )}
    >
      {label ? (
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-12 mix-blend-normal">
          {label}
        </span>
      ) : null}
    </div>
  );
}
