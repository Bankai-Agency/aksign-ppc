import type { Metadata } from "next";
import {
  Contact,
  Footer,
  Header,
  HowItWorks,
  Portfolio,
  ServiceArea,
  StickyMobileCTA,
  TrustBar,
} from "@/components/organisms";
import { getSharedContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Shared organisms — Dev",
  robots: { index: false, follow: false },
};

const ACCENT = "red" as const;

export default function DevSharedPage() {
  const shared = getSharedContent();

  return (
    <>
      <Header accent={ACCENT} shared={shared} />
      <main id="main" className="min-h-screen">
        <TrustBar accent={ACCENT} items={shared.trustBar} />

        {/* Faux hero spacer so sticky CTA reveal logic has somewhere to reveal past */}
        <section className="bg-gray-1 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <p className="text-sm uppercase tracking-widest text-brand-11 mb-2">
              Dev · Track 03
            </p>
            <h1 className="max-w-4xl">Shared organisms demo</h1>
            <p className="mt-4 text-lg text-gray-10 max-w-prose">
              Scroll the page to exercise the sticky mobile CTA, lazy Contact
              map, and Header scroll state. Every organism reads from
              <code className="text-brand-11"> shared.json</code> only — LP-specific
              content is not touched here.
            </p>
          </div>
        </section>

        <HowItWorks accent={ACCENT} data={shared.howItWorks} />
        <Portfolio data={shared.portfolio} variant="gallery" />
        <ServiceArea accent={ACCENT} data={shared.serviceArea} />
        <Contact accent={ACCENT} shared={shared} />
      </main>
      <Footer accent={ACCENT} shared={shared} />
      <StickyMobileCTA accent={ACCENT} data={shared.stickyMobileCta} />
    </>
  );
}
