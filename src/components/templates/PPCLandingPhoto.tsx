import type { LPVariant, SharedContent } from "@/types/lp";
import { LocaleProvider } from "@/lib/i18n";
import { LeadFormProvider } from "@/lib/lead-form";
import {
  CustomerCareCTA,
  FAQStudio,
  FeaturedWorkSliderStudio,
  HeroPhoto,
  HowItWorksStudio,
  LeadFormModal,
  MouseFollower,
  PreloaderStudio,
  PricingStudio,
  ServiceAreaStudio,
  ServicesScrollModule,
  ShowreelFullscreen,
  SimpleTextStatement,
  StudioFooter,
  StudioHeader,
  TrustBarStudio,
} from "@/components/organisms/photo";

type Props = { lp: LPVariant; shared: SharedContent };

/**
 * studio-size.com 1:1 design language with AK Sign PPC content.
 * Structure: Preloader → Header → Hero → Work → Statement → Showreel
 * → Services → Pricing → Process → FAQ → Areas → CTA → Footer. All
 * "Get a quote" CTAs trigger the LeadFormModal (popup) instead of
 * anchoring to #contact.
 */
export default function PPCLandingPhoto({ lp, shared }: Props) {
  return (
    <LocaleProvider>
      <LeadFormProvider>
        <PreloaderStudio />
        <MouseFollower />
        <StudioHeader nap={shared.nap} />
        <HeroPhoto slug={lp.slug} lp={lp} />
        <TrustBarStudio items={shared.trustBar} />
        <FeaturedWorkSliderStudio portfolio={shared.portfolio} />
        <SimpleTextStatement />
        <ShowreelFullscreen />
        <ServicesScrollModule />
        <PricingStudio pricing={lp.pricing} />
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
