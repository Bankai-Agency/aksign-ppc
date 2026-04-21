import type { Metadata } from "next";
import PPCLandingPhoto from "@/components/templates/PPCLandingPhoto";
import { getLPVariant, getSharedContent } from "@/lib/content";

const SLUG = "illuminated-signs" as const;

export async function generateMetadata(): Promise<Metadata> {
  const lp = getLPVariant(SLUG);
  return {
    title: lp.meta.title,
    description: lp.meta.description,
    alternates: {
      canonical: `/${SLUG}`,
    },
    openGraph: {
      title: lp.meta.ogTitle,
      description: lp.meta.ogDescription,
      siteName: "AK Sign",
      type: "website",
      url: `/${SLUG}`,
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "AK Sign — Commercial Signs, Wraps & Installation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: lp.meta.ogTitle,
      description: lp.meta.ogDescription,
      images: ["/opengraph-image"],
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
  return <PPCLandingPhoto lp={lp} shared={shared} />;
}
