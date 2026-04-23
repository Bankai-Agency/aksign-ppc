import dynamic from "next/dynamic";
import type { LPVariant, SharedContent } from "@/types/lp";
import { LocaleProvider } from "@/lib/i18n";
import { LeadFormProvider } from "@/lib/lead-form";
import {
  HeroPhoto,
  MouseFollower,
  StudioHeader,
} from "@/components/organisms/photo";

// Below-fold organisms — each imported DIRECTLY from its own source
// file (not the barrel) so every dynamic chunk contains only that
// organism's code, not the entire module set. Previous attempt pulled
// the barrel re-export inside every dynamic() which duplicated work
// and tanked mobile LCP on Slow-4G. Keeping ssr on (default) so HTML
// still renders server-side; only the client JS chunks split.
const TrustBarStudio = dynamic(() =>
  import("@/components/organisms/photo/TrustBarStudio").then((m) => m.TrustBarStudio),
);
const FeaturedWorkSliderStudio = dynamic(() =>
  import("@/components/organisms/photo/FeaturedWorkSliderStudio").then(
    (m) => m.FeaturedWorkSliderStudio,
  ),
);
const SimpleTextStatement = dynamic(() =>
  import("@/components/organisms/photo/SimpleTextStatement").then(
    (m) => m.SimpleTextStatement,
  ),
);
const ShowreelFullscreen = dynamic(() =>
  import("@/components/organisms/photo/ShowreelFullscreen").then(
    (m) => m.ShowreelFullscreen,
  ),
);
const ServicesScrollModule = dynamic(() =>
  import("@/components/organisms/photo/ServicesScrollModule").then(
    (m) => m.ServicesScrollModule,
  ),
);
const PricingStudio = dynamic(() =>
  import("@/components/organisms/photo/PricingStudio").then(
    (m) => m.PricingStudio,
  ),
);
const HowItWorksStudio = dynamic(() =>
  import("@/components/organisms/photo/HowItWorksStudio").then(
    (m) => m.HowItWorksStudio,
  ),
);
const FAQStudio = dynamic(() =>
  import("@/components/organisms/photo/FAQStudio").then((m) => m.FAQStudio),
);
const ServiceAreaStudio = dynamic(() =>
  import("@/components/organisms/photo/ServiceAreaStudio").then(
    (m) => m.ServiceAreaStudio,
  ),
);
const CustomerCareCTA = dynamic(() =>
  import("@/components/organisms/photo/CustomerCareCTA").then(
    (m) => m.CustomerCareCTA,
  ),
);
const StudioFooter = dynamic(() =>
  import("@/components/organisms/photo/StudioFooter").then(
    (m) => m.StudioFooter,
  ),
);
const LeadFormModal = dynamic(() =>
  import("@/components/organisms/photo/LeadFormModal").then(
    (m) => m.LeadFormModal,
  ),
);

type Props = { lp: LPVariant; shared: SharedContent };

/**
 * studio-size.com 1:1 design language with AK Sign PPC content.
 * Structure: Header → Hero → Work → Statement → Showreel → Services
 * → Pricing → Process → FAQ → Areas → CTA → Footer. All "Get a quote"
 * CTAs trigger the LeadFormModal (popup) instead of anchoring to
 * #contact.
 */
export default function PPCLandingPhoto({ lp, shared }: Props) {
  return (
    <LocaleProvider>
      <LeadFormProvider>
        <MouseFollower />
        <StudioHeader nap={shared.nap} />
        <HeroPhoto slug={lp.slug} lp={lp} />
        <TrustBarStudio items={lp.trustBar ?? shared.trustBar} />
        <FeaturedWorkSliderStudio portfolio={shared.portfolio} />
        <SimpleTextStatement />
        <ShowreelFullscreen />
        <ServicesScrollModule />
        <PricingStudio pricing={lp.pricing} lpSlug={lp.slug} />
        <HowItWorksStudio data={shared.howItWorks} />
        <FAQStudio lpSlug={lp.slug} data={lp.faq} />
        <ServiceAreaStudio data={shared.serviceArea} nap={shared.nap} />
        <CustomerCareCTA />
        <StudioFooter shared={shared} />
        <LeadFormModal />
      </LeadFormProvider>
    </LocaleProvider>
  );
}
