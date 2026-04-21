import type { Metadata } from "next";
import PPCLandingPhoto from "@/components/templates/PPCLandingPhoto";
import { getLPVariant, getSharedContent } from "@/lib/content";
import { homepageSchemas } from "@/lib/structured-data";

const SLUG = "home" as const;

export async function generateMetadata(): Promise<Metadata> {
  const lp = getLPVariant(SLUG);
  return {
    title: lp.meta.title,
    description: lp.meta.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: lp.meta.ogTitle,
      description: lp.meta.ogDescription,
      siteName: "AK Sign",
      type: "website",
      url: "/",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: lp.meta.ogTitle,
      description: lp.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default function Page() {
  const lp = getLPVariant(SLUG);
  const shared = getSharedContent();
  const schemas = homepageSchemas();
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          // eslint-disable-next-line react/no-danger
          key={`ld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PPCLandingPhoto lp={lp} shared={shared} />
    </>
  );
}
