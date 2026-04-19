import * as Accordion from "@radix-ui/react-accordion";
import type { Metadata } from "next";
import {
  Badge,
  Button,
  Icon,
  IconButton,
  Input,
  Label,
  Link,
  Placeholder,
  Textarea,
} from "@/components/atoms";
import {
  CityChip,
  FAQItem,
  FormField,
  MessengerChip,
  NAPBlock,
  NavLink,
  PricingTier,
  ServiceCard,
  StepCard,
  TrustUSP,
} from "@/components/molecules";
import { getLPVariant, getSharedContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Atoms & Molecules — Dev",
  robots: { index: false, follow: false },
};

const SECTION = "space-y-5";
const H2 = "text-2xl md:text-3xl mt-10 mb-5";
const SUBTITLE = "text-sm uppercase tracking-widest text-brand-11 mb-1";

export default function DevAtomsPage() {
  const shared = getSharedContent();
  const lp = getLPVariant("channel-letter-signs");

  return (
    <main className="mx-auto max-w-6xl px-6 md:px-10 py-16">
      <header className="mb-12 space-y-2">
        <p className={SUBTITLE}>Dev · Track 02</p>
        <h1>Atoms & Molecules</h1>
        <p className="text-lg text-gray-10 max-w-prose">
          Visual check for design-system primitives. Every element below reads
          real content from <code>src/data/*.json</code> via
          {" "}<code>getSharedContent()</code> / <code>getLPVariant()</code>.
        </p>
      </header>

      {/* ─── ATOMS ──────────────────────────────────────────────────── */}

      <h2 className={H2}>Buttons</h2>
      <div className={SECTION}>
        <div className="flex flex-wrap gap-3 items-center">
          <Button intent="primary">Primary</Button>
          <Button intent="secondary">Secondary</Button>
          <Button intent="outline">Outline</Button>
          <Button intent="ghost">Ghost</Button>
          <Button intent="dark">Dark</Button>
          <Button intent="link">Link style</Button>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <Button intent="primary" size="sm">Small</Button>
          <Button intent="primary" size="md">Medium</Button>
          <Button intent="primary" size="lg">Large</Button>
          <Button intent="primary" size="xl">Extra large</Button>
          <Button intent="primary" disabled>Disabled</Button>
        </div>
      </div>

      <h2 className={H2}>Icon buttons</h2>
      <div className="flex flex-wrap gap-3">
        <IconButton icon="Phone" aria-label="Call" intent="primary" />
        <IconButton icon="Mail" aria-label="Email" intent="secondary" />
        <IconButton icon="Camera" aria-label="Instagram" intent="ghost" />
        <IconButton icon="ArrowRight" aria-label="Next" intent="dark" />
        <IconButton icon="X" aria-label="Close" size="sm" />
        <IconButton icon="Menu" aria-label="Open menu" size="lg" />
      </div>

      <h2 className={H2}>Icons</h2>
      <div className="flex flex-wrap gap-6 items-end">
        {(["Sparkles", "Clock", "Wrench", "MapPin", "Calculator", "Award", "Truck", "Lightbulb", "Check", "Phone"] as const).map((n) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <Icon name={n} size={24} />
            <span className="text-xs text-gray-10 font-mono">{n}</span>
          </div>
        ))}
      </div>

      <h2 className={H2}>Badges</h2>
      <div className="flex flex-wrap gap-2">
        <Badge intent="accent">Accent</Badge>
        <Badge intent="neutral">Neutral</Badge>
        <Badge intent="dark">Dark</Badge>
        <Badge intent="success">Success</Badge>
        <Badge intent="warning">Warning</Badge>
      </div>

      <h2 className={H2}>Links</h2>
      <div className="flex flex-wrap gap-5">
        <Link href="#services">Internal anchor</Link>
        <Link href="https://ramp.com" intent="muted">External muted</Link>
        <Link href="tel:+13128984581" intent="cta">Call CTA →</Link>
      </div>

      <h2 className={H2}>Form inputs</h2>
      <div className="max-w-md space-y-5">
        <FormField id="name" label="Name" required>
          <Input id="name" placeholder="Alex Johnson" />
        </FormField>
        <FormField id="phone" label="Phone" hint="Include area code" required>
          <Input id="phone" type="tel" placeholder="(312) 555-1234" />
        </FormField>
        <FormField id="email" label="Email" error="Email looks incomplete">
          <Input id="email" type="email" defaultValue="incomplete" invalid />
        </FormField>
        <FormField id="message" label="Message" hint="Optional, max 1000 chars">
          <Textarea id="message" placeholder="Tell us about your project" />
        </FormField>
        <FormField id="disabled" label="Disabled">
          <Input id="disabled" defaultValue="locked" disabled />
        </FormField>
        <Label>Plain Label</Label>
      </div>

      <h2 className={H2}>Placeholder token</h2>
      <div className="flex flex-wrap gap-3 items-center">
        <Placeholder token="hours" />
        <Placeholder token="logo-svg" />
        <Placeholder token="warranty-lp01-q11" />
      </div>

      {/* ─── MOLECULES ───────────────────────────────────────────────── */}

      <h2 className={H2}>Nav links</h2>
      <nav aria-label="Sample nav" className="flex flex-wrap gap-6">
        {shared.header.navLinks.map((n, i) => (
          <NavLink key={n.href} href={n.href} active={i === 0}>
            {n.label}
          </NavLink>
        ))}
      </nav>

      <h2 className={H2}>City chips (P0 red accent)</h2>
      <ul className="flex flex-wrap gap-2" role="list">
        {shared.serviceArea.cities.map((c) => (
          <CityChip key={c.name} city={c} accent="red" />
        ))}
      </ul>

      <h2 className={H2}>Messenger chips</h2>
      <div className="flex flex-wrap gap-3">
        <MessengerChip channel="whatsapp" href={shared.nap.socials.whatsapp} />
        <MessengerChip channel="telegram" href={shared.nap.socials.telegram} />
        <MessengerChip channel="instagram" href={shared.nap.socials.instagram} />
        <MessengerChip channel="whatsapp" href={shared.nap.socials.whatsapp} variant="outline" />
      </div>

      <h2 className={H2}>NAP block — three variants</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-3 bg-white p-5">
          <p className={SUBTITLE}>hero</p>
          <NAPBlock nap={shared.nap} variant="hero" />
        </div>
        <div className="rounded-lg border border-gray-3 bg-gray-1 p-5">
          <p className={SUBTITLE}>contact</p>
          <NAPBlock nap={shared.nap} variant="contact" />
        </div>
        <div className="rounded-lg bg-gray-12 p-5">
          <p className="text-sm uppercase tracking-widest text-brand-6 mb-1">footer</p>
          <NAPBlock nap={shared.nap} variant="footer" />
        </div>
      </div>

      <h2 className={H2}>Trust USP grid (6 items)</h2>
      <ul
        className="grid gap-6 md:grid-cols-3 lg:grid-cols-6 rounded-lg border border-gray-3 bg-white p-6"
        role="list"
      >
        {shared.trustBar.map((u) => (
          <TrustUSP key={u.title} item={u} accent="red" />
        ))}
      </ul>

      <h2 className={H2}>Step cards (6 steps)</h2>
      <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shared.howItWorks.steps.map((s) => (
          <StepCard key={s.number} step={s} accent="red" />
        ))}
      </ol>

      <h2 className={H2}>Service cards (focus + secondary)</h2>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ServiceCard service={lp.services.focus} variant="focus" accent="red" />
        </div>
        <div className="lg:col-span-5 grid gap-4">
          {lp.services.secondary.map((s) => (
            <ServiceCard key={s.title} service={s} variant="secondary" accent="red" />
          ))}
        </div>
      </div>

      <h2 className={H2}>Pricing tiers — ⭐ signature</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {lp.pricing.tiers.map((t, i) => (
          <PricingTier
            key={t.name}
            tier={t}
            accent="red"
            emphasis={i === 1}
          />
        ))}
      </div>

      <h2 className={H2}>FAQ items (Radix accordion)</h2>
      <div className="rounded-lg border border-gray-3 bg-white px-6">
        <Accordion.Root type="single" collapsible>
          {lp.faq.items.slice(0, 4).map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              id={`faq-${i}`}
              q={item.q}
              a={item.a}
            />
          ))}
          <FAQItem
            index={10}
            id="faq-placeholder"
            q={lp.faq.items[10].q}
            a={lp.faq.items[10].a}
          />
        </Accordion.Root>
      </div>
    </main>
  );
}
