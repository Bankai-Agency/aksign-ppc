import type { LPVariant, SharedContent } from "@/types/lp";
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
import {
  FAQNumeric,
  HeroNumeric,
  PricingNumeric,
  ServicesNumeric,
} from "@/components/organisms/numeric";

type Props = { lp: LPVariant; shared: SharedContent };

/**
 * Numeric-first minimal template — Ramp.com / Daniyar brief reference.
 * All 12 sections assembled, signature on PricingNumeric.
 */
export default function PPCLandingNumeric({ lp, shared }: Props) {
  return (
    <>
      <Header accent={lp.accent} shared={shared} ctaLabel={lp.ctaLabel} />
      <HeroNumeric lp={lp} nap={shared.nap} />
      <TrustBar accent={lp.accent} items={shared.trustBar} />
      <ServicesNumeric accent={lp.accent} lp={lp} />
      <PricingNumeric accent={lp.accent} pricing={lp.pricing} />
      <HowItWorks accent={lp.accent} data={shared.howItWorks} />
      <Portfolio data={shared.portfolio} variant="grid" />
      <ServiceArea accent={lp.accent} data={shared.serviceArea} />
      <FAQNumeric lpSlug={lp.slug} data={lp.faq} />
      <Contact accent={lp.accent} shared={shared} />
      <Footer accent={lp.accent} shared={shared} />
      <StickyMobileCTA
        accent={lp.accent}
        data={shared.stickyMobileCta}
        ctaLabel={lp.ctaLabel}
      />
    </>
  );
}
