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
  FAQPhoto,
  HeroPhoto,
  PricingPhoto,
  QuoteSectionPhoto,
  ServicesPhoto,
} from "@/components/organisms/photo";

type Props = { lp: LPVariant; shared: SharedContent };

/**
 * Photo-first editorial template — studio-size.com reference.
 * Hero has no form (editorial typographic peak); the form lives in a
 * dedicated dark QuoteSection between Portfolio and Contact.
 */
export default function PPCLandingPhoto({ lp, shared }: Props) {
  return (
    <>
      <Header accent={lp.accent} shared={shared} ctaLabel={lp.ctaLabel} ctaHref="#quote" />
      <HeroPhoto lp={lp} nap={shared.nap} />
      <TrustBar accent={lp.accent} items={shared.trustBar} />
      <ServicesPhoto accent={lp.accent} lp={lp} />
      <PricingPhoto accent={lp.accent} pricing={lp.pricing} />
      <HowItWorks accent={lp.accent} data={shared.howItWorks} />
      <Portfolio data={shared.portfolio} variant="gallery" />
      <QuoteSectionPhoto lp={lp} nap={shared.nap} />
      <FAQPhoto lpSlug={lp.slug} data={lp.faq} />
      <ServiceArea accent={lp.accent} data={shared.serviceArea} />
      <Contact accent={lp.accent} shared={shared} />
      <Footer accent={lp.accent} shared={shared} />
      <StickyMobileCTA
        accent={lp.accent}
        data={shared.stickyMobileCta}
        ctaLabel={lp.ctaLabel}
        ctaHref="#quote"
      />
    </>
  );
}
