"use client";

import { useEffect, useRef, useState } from "react";
import type { Accent, SharedContent } from "@/types/lp";
import { MessengerChip } from "@/components/molecules/MessengerChip";
import { NAPBlock } from "@/components/molecules/NAPBlock";
import { cn } from "@/lib/utils";

type ContactProps = {
  accent: Accent;
  shared: SharedContent;
};

export function Contact({ shared }: ContactProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShowMap(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-20 md:py-28">
        <h2 id="contact-heading" className="mb-3 max-w-3xl">
          {shared.contact.heading}
        </h2>
        <p className="text-lg md:text-xl text-gray-10 max-w-prose mb-12">
          {shared.contact.intro}
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            <NAPBlock nap={shared.nap} variant="contact" />
            <div className="flex flex-wrap gap-3">
              <MessengerChip channel="whatsapp" href={shared.nap.socials.whatsapp} />
              <MessengerChip channel="telegram" href={shared.nap.socials.telegram} />
              <MessengerChip channel="instagram" href={shared.nap.socials.instagram} />
            </div>
          </div>

          <div
            ref={mapRef}
            className={cn(
              "relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-3 bg-gray-2",
            )}
          >
            {showMap ? (
              <iframe
                src={shared.nap.mapEmbedUrl}
                title="AK Sign location on Google Maps — 220 W Campus Dr Unit D, Arlington Heights IL"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-10">
                Map loads on scroll
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
