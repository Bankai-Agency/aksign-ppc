/**
 * Canonical production URL. Every absolute URL in metadata, JSON-LD,
 * sitemap, and OG goes through here. When/if the project gets a custom
 * domain, update this one constant.
 *
 * Kept outside of src/app/ on purpose — App Router layout files are
 * server components with their own compilation boundary, and importing
 * constants from them into non-page modules breaks Turbopack chunk
 * generation.
 */
export const SITE_URL = "https://aksign-ppc.vercel.app";
