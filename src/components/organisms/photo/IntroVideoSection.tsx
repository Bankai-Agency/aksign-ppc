"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { useLocale } from "@/lib/i18n";

/**
 * IntroVideoSection — vertical hero video for trust building. Sits
 * directly under HeroPhoto. Autoplay muted (browser-friendly) + click
 * anywhere on the frame to unmute. Lazy-mounts the <video> element
 * only after the section enters the viewport so unrelated visitors
 * don't pay the network cost.
 */
export function IntroVideoSection() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);

  // Mount video only when the section scrolls into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mounted) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    // Some browsers pause autoplay when audio enables — keep playing.
    if (!next && v.paused) v.play().catch(() => undefined);
  };

  return (
    <section
      aria-label="Meet AK Sign"
      className="bg-gray-1 text-gray-12"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10 lg:px-16 py-14 md:py-24">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-12 items-center">
          {/* Left — text */}
          <div className="lg:col-span-5">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-gray-10 font-medium mb-4">
              {t("eyebrow.intro")}
            </p>
            <h2
              className="font-semibold tracking-[-0.04em] text-balance max-w-[18ch] leading-[1.05]"
              style={{
                fontSize: "clamp(2rem, 0.75rem + 3vw, 3.75rem)",
              }}
            >
              {t("section.intro.heading")}
            </h2>
            <p className="mt-5 md:mt-6 text-base md:text-lg text-gray-10 leading-relaxed max-w-[44ch]">
              {t("section.intro.body")}
            </p>
          </div>

          {/* Right — vertical video frame */}
          <div className="lg:col-span-7 flex justify-center">
            <div
              ref={containerRef}
              className="relative w-full max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden bg-gray-12 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]"
            >
              {mounted ? (
                <video
                  ref={videoRef}
                  poster="/video/intro-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/video/intro.webm" type="video/webm" />
                  <source src="/video/intro.mp4" type="video/mp4" />
                </video>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/video/intro-poster.jpg"
                  alt="AK Sign team and shop in Arlington Heights"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Unmute overlay — tap anywhere on the frame */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="absolute inset-0 flex items-end justify-end p-4 md:p-5 group focus:outline-none"
              >
                <span
                  className={`pointer-events-none inline-flex items-center gap-2 h-11 px-4 rounded-full backdrop-blur-md text-[12px] uppercase tracking-[0.06em] font-semibold transition-all duration-300 ${
                    muted
                      ? "bg-gray-1/90 text-gray-12 opacity-100"
                      : "bg-gray-12/70 text-gray-1 opacity-70 group-hover:opacity-100"
                  }`}
                >
                  <Icon
                    name={muted ? "VolumeX" : "Volume2"}
                    size={16}
                    stroke={2}
                  />
                  {muted ? t("intro.unmuteHint") : ""}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
