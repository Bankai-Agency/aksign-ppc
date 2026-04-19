export default function ScaffoldSmokeTest() {
  return (
    <main className="mx-auto max-w-4xl px-6 md:px-8 py-16 space-y-10">
      <section>
        <p className="text-fluid-small uppercase tracking-widest text-brand-11">
          Scaffold smoke-test · Track 00
        </p>
        <h1 className="mt-3">AK Sign PPC</h1>
        <p className="mt-4 text-lg text-gray-10 max-w-prose">
          Custom-minimal, numeric-first, single-accent. This page exists only
          to verify that Next 16, Tailwind v4 tokens, and the Fraunces/Geist
          font pair load correctly. It will be replaced by{" "}
          <code className="text-brand-11">/lp/channel-letter-signs</code> in
          Track 05.
        </p>
      </section>

      <section className="space-y-4">
        <h2>Typography</h2>
        <h1>Display H1 — Manrope bold, tight tracking</h1>
        <h2>Display H2 — section heading</h2>
        <h3>Display H3 — card heading</h3>
        <p className="text-lg">Body — Geist 400, 1.6 line-height.</p>
        <p className="tabular-nums font-semibold text-5xl tracking-tight text-gray-12">
          $3,000 – $6,000
        </p>
      </section>

      <section className="space-y-4">
        <h2>Brand tokens</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 6, 8, 9, 10, 11, 12].map((step) => (
            <div
              key={step}
              className={`px-3 py-2 rounded-sm text-xs font-mono bg-brand-${step} ${
                step >= 7 ? "text-white" : "text-gray-12"
              }`}
            >
              brand-{step}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 6, 9, 10, 11, 12].map((step) => (
            <div
              key={step}
              className={`px-3 py-2 rounded-sm text-xs font-mono bg-gray-${step} ${
                step >= 6 ? "text-white" : "text-gray-12"
              }`}
            >
              gray-{step}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2>Focus ring</h2>
        <button className="px-4 py-2 rounded-md bg-brand-9 text-white hover:bg-brand-10">
          Tab to me — should get a 2px brand-red outline
        </button>
      </section>
    </main>
  );
}
