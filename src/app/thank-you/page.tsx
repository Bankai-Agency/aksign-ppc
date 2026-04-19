import type { Metadata } from "next";
import { Footer, Header } from "@/components/organisms";
import { getSharedContent } from "@/lib/content";
import { ThankYouAnalytics } from "./ThankYouAnalytics";

export const metadata: Metadata = {
  title: "Thank you — AK Sign",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function ThankYou() {
  const shared = getSharedContent();
  return (
    <>
      <Header accent="red" shared={shared} />
      <main id="main" className="min-h-[60vh] flex items-center justify-center bg-gray-1">
        <div className="max-w-2xl mx-auto text-center px-6 py-24">
          <p className="text-sm uppercase tracking-widest text-brand-11 font-semibold">
            Request received
          </p>
          <h1 className="mt-4 mb-6">We got your request.</h1>
          <p className="text-lg md:text-xl text-gray-10 leading-relaxed">
            We&apos;ll text or call you within <strong>one business day</strong>.
          </p>
          <p className="mt-6 text-base text-gray-10">
            Urgent?{" "}
            <a
              href={`tel:${shared.nap.phone}`}
              className="text-brand-11 underline tabular-nums font-medium"
            >
              {shared.nap.phoneDisplay}
            </a>
            {" · "}
            <a href={shared.nap.socials.whatsapp} className="text-brand-11 underline">
              WhatsApp
            </a>
            {" · "}
            <a href={shared.nap.socials.telegram} className="text-brand-11 underline">
              Telegram
            </a>
          </p>
        </div>
      </main>
      <Footer accent="red" shared={shared} />
      <ThankYouAnalytics />
    </>
  );
}
