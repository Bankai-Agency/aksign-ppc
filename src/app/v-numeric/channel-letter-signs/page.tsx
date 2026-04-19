import type { Metadata } from "next";
import PPCLandingNumeric from "@/components/templates/PPCLandingNumeric";
import { getLPVariant, getSharedContent } from "@/lib/content";

const SLUG = "channel-letter-signs" as const;

export async function generateMetadata(): Promise<Metadata> {
  const lp = getLPVariant(SLUG);
  return {
    title: `${lp.meta.title} · Numeric`,
    description: lp.meta.description,
    openGraph: {
      title: lp.meta.ogTitle,
      description: lp.meta.ogDescription,
      siteName: "AK Sign",
      type: "website",
    },
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false },
    },
  };
}

export default function Page() {
  const lp = getLPVariant(SLUG);
  const shared = getSharedContent();
  return <PPCLandingNumeric lp={lp} shared={shared} />;
}
