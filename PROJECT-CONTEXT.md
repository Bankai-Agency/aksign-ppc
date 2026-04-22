# AK Sign PPC — Project Context

Last updated: 2026-04-22

PPC landing pages for **AK Sign** — commercial signage shop in Arlington
Heights, IL. Single codebase serving 3 paid-search landing pages with a
shared visual system and per-LP content (different hero photo, pricing,
FAQ). All URLs are `noindex` — these are PPC-only pages, not SEO assets.

---

## Stack

- **Next.js 16** (App Router, src-dir, TypeScript strict)
- **React 19**
- **Tailwind CSS v4** — tokens in `src/app/globals.css` (`@theme`)
- **Framer Motion** — LetterReveal, stagger, modal, scroll-follower
- **Radix UI** — Accordion (FAQ), Label
- **Inter** (variable font via `next/font/google`)
- **pnpm** — standalone install at `~/Library/pnpm/pnpm`
- **Zod + react-hook-form + resend** — lead form POSTs to `/api/lead`
  (Resend + Telegram dispatchers wired via `Promise.allSettled`).

## Repo

- **GitHub:** https://github.com/Bankai-Agency/aksign-ppc (private)
- **Vercel domain:** https://aksign-ppc.vercel.app/
- **Branch:** `main`
- **Owner:** Bankai-Agency (was transferred from DesignerBankai)

## Local

- **Dev:** `pnpm dev` (port 3000) — launched via Claude Preview
  `aksign-dev` config in `.claude/launch.json`
- **Typecheck:** `pnpm typecheck` → `tsc --noEmit`
- **Build:** `pnpm build`

---

## Routes (flat slug architecture)

| URL | LP | Hero photo |
|---|---|---|
| `/` | LP-01 default | `/public/images/hero-channel-letter-signs.png` |
| `/channel-letter-signs` | LP-01 | same |
| `/illuminated-signs` | LP-02 | `/public/images/hero-illuminated-signs.png` |
| `/vehicle-wraps` | LP-03 | `/public/images/hero-vehicle-wraps.png` |

`/v-photo/*` and `/v-numeric/*` routes were removed (were legacy variant
selector for internal A/B). Only the "photo" variant is live now.

All routes use the same template: [`PPCLandingPhoto.tsx`](src/components/templates/PPCLandingPhoto.tsx).
`robots.ts` disallows all LP slugs.

---

## Page structure (12 sections, top → bottom)

1. **StudioHeader** — floating unified плашка, logo left, nav right,
   EN/ES locale dropdown, CTA "Get in touch". Auto-hides on scroll-down
   past hero, shows on scroll-up.
2. **HeroPhoto** — full-bleed BG photo + 3-layer scrim (vertical + horizontal
   for text contrast + mobile flat dim). H1 "Commercial Signage for
   <flip>" with rotating italic brand-red pill. Stats rail (10+ years /
   500+ signs / 3–7 days), address chip (Arlington Heights), CTA button.
3. **TrustBarStudio** — 6 benefits in cards (red icon, flat bg)
4. **FeaturedWorkSliderStudio** — drag-to-scrub portfolio slider
5. **SimpleTextStatement** — "When craft and permits collide…" editorial
6. **ShowreelFullscreen** — static reel tile, clicks open full-screen
   modal with natural portrait aspect
7. **ServicesScrollModule** — pinned scroll (hero image + services list,
   scroll advances active item)
8. **PricingStudio** — 3 tier cards (click → modal)
9. **HowItWorksStudio** — 6 process steps with icons
10. **FAQStudio** — Radix accordion in rounded tiles
11. **ServiceAreaStudio** — city pills + full-height dark office map
12. **CustomerCareCTA** — black band with dark form (Topic, Name, Email,
    Phone w/ US mask, Message)

Plus: **LeadFormModal** — popup triggered by all "Get a quote" CTAs.

---

## Design system

**Palette** (`src/app/globals.css`):
- `brand-1…12` — red scale (`--color-brand-9: #bb0000`)
- `gray-1…12` — warm off-white (`#f8f7f4`) → warm black (`#1a1a17`)

**Typography:** Inter (semibold / bold). All H2s use
`clamp(2.25rem, 0.875rem + 3.5vw, 4.5rem)` with `line-height: 0.92`.
Hero H1 is `clamp(3rem, 0.5rem + 6vw, 6.5rem)`.

**Grid:** `max-w-[1600px]` with `px-6 md:px-10 lg:px-16`.
Two-column blocks use **6/6 split** on desktop (HowItWorks, FAQ,
ServiceArea, CTA) — same vertical power line at col 6/7 boundary.

**Section padding:** `py-14 md:py-24` unified (was 32, reduced per
"расстояние слишком большое").

**Eyebrows:** all use `text-[11px] md:text-xs uppercase tracking-[0.22em]
text-gray-10 font-medium mb-4` with `(Parens)` format.

**Borders:** section-to-section — **no borders** (was `border-t border-gray-12/10`,
removed globally).

---

## Atoms

- **ArrowButton** (`src/components/atoms/ArrowButton.tsx`) — Sage-Kit
  pill with inner arrow circle. Tones: `solid` (warm-black), `ghost`,
  `light` (cream). Sizes: `sm` / `md` / `lg`. Prop `fullWidthMobile`
  stretches button to full width on mobile, intrinsic on md+.
- **LetterReveal** — splits text on whitespace, each word in inline-block
  overflow-hidden, motion translateY from `150%` → `0%`. `paddingBottom
  0.35em + marginBottom -0.28em` for descender safety + baseline match.
- **SocialIcon** — Instagram/Telegram/WhatsApp SVGs (Figma Sage Kit).
  WhatsApp uses a custom phone-chat glyph (32×32 viewBox).
- **Icon** — Lucide wrapper with controlled sizes/strokes.
- **ImagePlaceholder** — dev placeholder tile that upgrades to real img
  when file exists.
- **Reveal / StaggerGroup / StaggerItem** — framer-motion enter anims.

---

## Key components

### StudioHeader
- Single unified плашка (`rounded-full bg-gray-12 backdrop-blur-md`)
- Desktop: logo + nav + socials + locale dropdown + CTA (right-aligned)
- Mobile: logo + burger. Burger sheet pushed to bottom via `mt-auto` on
  nav. Locale switcher is the **first element** in burger.
- **Auto-hide behavior**: past 50% of hero height, `setHidden(true)` on
  scroll-down (delta > 6), `setHidden(false)` on scroll-up (delta < -6).
  `translate-y-[120%]` when hidden.

### LeadFormModal
- `src/lib/lead-form.tsx` provides `LeadFormProvider` + `useLeadForm()`
  context
- All CTA buttons (Hero, Header, Statement, Pricing tiers) call
  `openModal()` instead of anchoring to `#contact`
- Fields: Topic (select), Name, Email, Phone (US mask via
  `formatPhoneMask` in `src/lib/format-phone.ts`), Message
- Closes on ESC / backdrop click / X button
- Body `overflow: hidden` when open

### Phone mask
- Always prepends `+1`, formats as `+1 (XXX) XXX-XXXX`
- Strips non-digits, drops leading "1" if present
- Applied to CTA form and LeadFormModal

### Services pinned scroll
- Tall section (`services.length * 25vh` pin distance, was 75 then 40)
- Sticky inner at `top-0 h-screen`
- rAF polling updates active index (framer-motion `useScroll` broke with
  Lenis, polling works regardless)
- Mobile: enabled pin + bigger image (`aspect-[4/3]` vs `aspect-square`
  on desktop) + bigger gap between list items
- Lenis smooth scroll was REMOVED — caused issues with scroll tracking

### Pricing cards
- 3 cards in a grid, each `<button>` that opens modal on click
- Hover: whole card flips to `brand-9` red + cream text
- Price rendered on 2 lines (`$X,XXX` / `– $Y,YYY`)

---

## i18n (EN / ES)

### Locale context
- `src/lib/i18n.tsx` — `LocaleProvider` with `useState<Locale>("en")`
- Persisted in localStorage as `aksign-locale`, sets `<html lang>`
- `t(key)` returns localized string from `dict`
- Header dropdown + burger menu switch locale
- `pick(en, es)` helper included but not widely used

### Dictionary coverage (UI chrome)
All hardcoded strings in organisms are now driven by `t()`:
- 9 eyebrows `(Benefits) (Work) (Studio) (Services) (Pricing) (Process) (FAQ) (Areas) (Contact)`
- Section H2s: "Why AK Sign", "Recent projects", Statement text, CTA heading
- Hero: line1/line2, subheading, 5 flip words, 3 stats labels, CTA,
  address chip
- Process: 6 step titles + descriptions (from dict, fallback to
  shared.json)
- Benefits: 6 title+subcopy pairs
- ServiceArea: heading + intro
- FAQ heading, Services list (8 items), Reel label
- Modal: heading, body, placeholders, legal, submit
- CTA form: placeholders, legal, submit, topic options (5)
- Footer: bankai prefix

### Per-LP data (`lp-01/02/03.json`) — also translated via `_es` fields
- `pricing.heading_es` / `intro_es` / `disclaimer_es`
- `pricing.tiers[].name_es` / `scope_es` / `bullets_es[]`
- `faq.heading_es`
- `faq.items[].q_es` / `a_es`
- Meta tags translated in lp-01.json (`title_es`, `description_es`,
  `ogTitle_es`, `ogDescription_es`) — not yet wired to `<Metadata>`
- Hero section in JSON (h1, subcopy, etc.) currently unused — HeroPhoto
  ignores it in favor of `t("hero.line1")` etc.

### Component locale picking
`PricingStudio` and `FAQStudio` use inline pickers:
```ts
const p: any = pricing;
const pickStr = (en, es) => (locale === "es" && es ? es : en) ?? "";
```
This keeps TypeScript happy without updating Zod schema types.

---

## Lead form capture

**Current state:** forms POST to `/api/lead` via the shared
`src/lib/submit-lead.ts` helper. The route logs every lead and fans
out to Resend + Telegram with `Promise.allSettled` — neither is
required for a 200 (both dispatchers silently skip if env vars are
missing). On success: `SuccessModal` opens; on failure: inline alert
(rate-limit / validation / generic).

Env vars used by the route: `RESEND_API_KEY`, `TG_BOT_TOKEN`,
`TG_CHAT_ID`, `LEAD_EMAIL_DESTINATION`.

---

## File layout (relevant)

```
src/
  app/
    layout.tsx             — fonts + providers
    page.tsx               — root → PPCLandingPhoto(LP-01)
    channel-letter-signs/page.tsx
    illuminated-signs/page.tsx
    vehicle-wraps/page.tsx
    thank-you/page.tsx
    robots.ts              — all LP slugs disallowed
    globals.css            — palette, typography, cta-input reset,
                             [data-cursor="play|drag"] custom cursor

  components/
    atoms/
      ArrowButton.tsx
      Icon.tsx
      ImagePlaceholder.tsx
      LetterReveal.tsx
      Reveal.tsx
      SocialIcon.tsx
      Button.tsx            — legacy, used by variant comparison page
    organisms/
      photo/                — ACTIVE set, rendered by template
        StudioHeader.tsx
        HeroPhoto.tsx
        TrustBarStudio.tsx
        FeaturedWorkSliderStudio.tsx
        SimpleTextStatement.tsx
        ShowreelFullscreen.tsx
        ServicesScrollModule.tsx
        PricingStudio.tsx
        HowItWorksStudio.tsx
        FAQStudio.tsx
        ServiceAreaStudio.tsx
        CustomerCareCTA.tsx
        StudioFooter.tsx
        LeadFormModal.tsx
        MouseFollower.tsx      — custom cursor (drag + play only)
        PreloaderStudio.tsx    — wordmark reveal on first load
        (plus legacy BackgroundVideoCTA, FAQPhoto, etc. — not mounted)
      (root folder: Contact, Footer, Header, Portfolio, ServiceArea,
        TrustBar — all legacy shared organisms, used by /dev/shared
        if at all)
    templates/
      PPCLandingPhoto.tsx

  data/
    shared.json             — nap, socials, trustBar items, process
                              steps, portfolio entries (7 photos, /public/
                              images/portfolio/1-8.png excl. 4), areas
                              cities, footer columns, sticky mobile CTA
    lp-01.json              — channel-letter-signs (hero copy, services,
                              pricing, FAQ, meta) + `_es` fields for all
    lp-02.json              — illuminated-signs + ES
    lp-03.json              — vehicle-wraps + ES

  lib/
    i18n.tsx                — LocaleProvider + dict
    lead-form.tsx           — modal context
    format-money.ts         — "$X,XXX – $Y,YYY" formatter (en-dash)
    format-phone.ts         — US phone mask, always +1 prefix
    content.ts              — Zod loaders for lp-*.json & shared.json
    utils.ts                — cn helper (clsx + tailwind-merge)
```

---

## Known TODOs / open items

- **Meta tags EN/ES** — `lp-01.json` has `meta.title_es` etc. but
  `generateMetadata` in `app/*/page.tsx` always reads `.title`. Needs
  wiring (requires locale at server-render — cookie or URL-based).
- **lp-02.json / lp-03.json meta** — ES translations not written yet
  (only lp-01 has them).
- **/api/lead** — stub; Resend/Telegram integration pending.
- **Placeholder warranty text** — `lp-01.json` FAQ q11 answer is
  `{{PLACEHOLDER: warranty-lp01-q11}}`, waiting on client.
- **QA pipeline** — `scripts/qa.sh`, axe-core runner, Lighthouse CI
  (from original plan Track 08) not implemented.
- **Real portfolio content** — `shared.json` portfolio currently points
  to placeholder photos `/images/portfolio/{1,2,3,5,6,7,8}.png`. Client
  to supply final photography.
- **Pricing heading on desktop** — renders in 2 lines by splitting on
  em-dash (`—`). If client provides ES heading without the em-dash,
  both lines collapse into one. Current lp-*.json ES versions include
  em-dashes so it works.

---

## Visual conventions / lessons learned

- **Baseline alignment** between LetterReveal words and side-by-side
  inline-block spans (like the hero flip pill) requires **identical
  padding-bottom / margin-bottom values** when both use `overflow-hidden`.
  The pill uses `paddingBottom: 0.18em` / `marginBottom: -0.08em` (was
  0.35 / -0.28 but we tightened for user's request; baseline stays
  aligned because "for" wrap uses the same rules inside LetterReveal).
- **Lenis smooth scroll** broke `useScroll` tracking in Services — rAF
  polling is the workaround. Lenis was removed from the template
  (`LenisProvider` still in codebase but not mounted).
- **Tailwind v4 opacity scale** — `/15` and `/40` are valid default
  values; `/12` is not. When HMR doesn't pick up a new class, full
  reload is needed (preview `.next` cache occasionally went stale).
- **Framer-motion `mode="popLayout"`** — with `overflow-hidden`
  containers and absolute positioning during exit, baseline can shift.
  The hero flip uses `mode="wait"` via a simple `opacity: visible` /
  `setTimeout` swap (220ms fade, 2400ms interval).
- **Preview screenshot quirk** — `preview_screenshot` tool sometimes
  captures a stale frame of `/` even when the inspected target is on a
  different URL. DOM inspection via `preview_eval` is the reliable
  verification path.

---

## Recent session highlights (what's live now)

- Full UI chrome translated to ES (EN/ES toggle in header and burger)
- Per-LP pricing + FAQ translated to ES (3 LPs × 12 Q&A + 3 tiers each)
- Hero: flip-word pill with cream bg + white italic text + red bg
- Pin-scroll Services on both desktop and mobile (less effort on mobile)
- Single unified Bankai agency chip in footer with elaborate hover:
  rotating icon + red wash sweep + text roll-up to red
- Modal-based lead capture (replaces anchor navigation)
- Desktop auto-hide header on scroll
- Mobile address chip shown below CTA in hero
- Portfolio images zoomed 1.08× to crop source white borders
- ServiceArea full-height dark map (CSS `invert + hue-rotate` filter)
  aligned to city-pill column via grid items-stretch + flex-1
- FAQ uses rounded tiles without open-state recolor; native cursor pointer
- Pricing tiers are clickable cards (open modal on click)
- Section-to-section borders removed, padding unified to `py-14 md:py-24`
