import type { LPVariant, SharedContent } from "@/types/lp";
import { LocaleProvider } from "@/lib/i18n";
import {
  CustomerCareCTA,
  FAQStudio,
  FeaturedWorkSliderStudio,
  HeroPhoto,
  HowItWorksStudio,
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
 * → Services → Pricing → Process → FAQ → Areas → CTA → Footer.
 */
export default function PPCLandingPhoto({ lp, shared }: Props) {
  return (
    <LocaleProvider>
      <PreloaderStudio />
      <MouseFollower />
      <StudioHeader nap={shared.nap} />
      <HeroPhoto slug={lp.slug} />
      <TrustBarStudio items={shared.trustBar} />
      <FeaturedWorkSliderStudio portfolio={shared.portfolio} />
      <SimpleTextStatement />
      <ShowreelFullscreen />
      <ServicesScrollModule />
      <PricingStudio pricing={lp.pricing} />
      <HowItWorksStudio data={shared.howItWorks} />
      <FAQStudio lpSlug={lp.slug} data={lp.faq} />
      <ServiceAreaStudio data={shared.serviceArea} />
      <CustomerCareCTA />
      <StudioFooter shared={shared} />
    </LocaleProvider>
  );
}
