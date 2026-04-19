import type { Metadata } from "next";
import { Button } from "@/components/atoms/Button";

export const metadata: Metadata = {
  title: "AK Sign — Variant comparison (internal)",
  robots: { index: false, follow: false },
};

export default function ComparisonIndex() {
  return (
    <main className="mx-auto max-w-4xl px-6 md:px-10 py-20 md:py-28">
      <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-brand-11 font-semibold">
        Internal · design direction comparison
      </p>
      <h1 className="mt-3 mb-6">Pick a direction for AK Sign LP-01</h1>
      <p className="text-lg md:text-xl text-gray-10 max-w-prose leading-relaxed">
        Same content (channel-letter-signs), two visual directions. Open both
        side-by-side and decide which one clones onto LP-02 and LP-03.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-gray-3 bg-white p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-brand-11 font-semibold mb-2">
            Variant A · Photo-first
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">Editorial gallery</h2>
          <ul className="text-sm text-gray-10 space-y-1.5 list-disc pl-5 mb-6">
            <li>studio-size.com / daydreamplayer.com vibe</li>
            <li>Hero with flagship photo</li>
            <li>Asymmetric masonry portfolio</li>
            <li>Photo-wrapped service cards</li>
          </ul>
          <Button asChild intent="primary" size="lg" fullWidth>
            <a href="/v-photo/channel-letter-signs">Open Photo variant →</a>
          </Button>
        </article>

        <article className="rounded-2xl border border-gray-3 bg-white p-6 md:p-8">
          <p className="text-xs uppercase tracking-widest text-brand-11 font-semibold mb-2">
            Variant B · Numeric-first
          </p>
          <h2 className="text-2xl md:text-3xl mb-4">Ramp-minimal</h2>
          <ul className="text-sm text-gray-10 space-y-1.5 list-disc pl-5 mb-6">
            <li>Ramp.com / Mercury vibe (Daniyar brief)</li>
            <li>Dark hero, typographic peak</li>
            <li>Signature Honest-Ranges pricing</li>
            <li>Uniform 4-tile portfolio, text-led</li>
          </ul>
          <Button asChild intent="dark" size="lg" fullWidth>
            <a href="/v-numeric/channel-letter-signs">Open Numeric variant →</a>
          </Button>
        </article>
      </div>

      <p className="mt-10 text-sm text-gray-10">
        Dev pages:{" "}
        <a href="/dev/atoms" className="text-brand-11 underline">/dev/atoms</a>
        {" · "}
        <a href="/dev/shared" className="text-brand-11 underline">/dev/shared</a>
      </p>
    </main>
  );
}
