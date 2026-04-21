# AK Sign PPC

3 PPC landing pages for AK Sign — commercial signage, Arlington Heights IL.

- `/lp/channel-letter-signs` (LP-01 · red accent)
- `/lp/illuminated-signs` (LP-02 · white monochrome)
- `/lp/vehicle-wraps` (LP-03 · shine accent, B2B fleet)
- `/thank-you` (noindex post-submit)

During design exploration:

- `/v-photo/channel-letter-signs` — photo-first editorial variant
- `/v-numeric/channel-letter-signs` — numeric-first Ramp-inspired variant

## Stack

Next.js 16 · React 19 · Tailwind v4 · Radix primitives · Fraunces + Geist · Framer Motion · Lucide · Zod · Resend

## Dev

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## Env

Copy `.env.example` → `.env.local` and fill values. Required before production:

- `RESEND_API_KEY` — email lead delivery
- `TG_BOT_TOKEN`, `TG_CHAT_ID` — Telegram delivery (optional)
- `NEXT_PUBLIC_GTM_ID=GTM-T7QS4KD6` — required for analytics & conversion tracking
- `NEXT_PUBLIC_ADS_CONV_LABEL=6SJ0CP-DhaAcENDbrcRA` — Lead Form Submit label (set 2026-04-21)

## Analytics & Conversion Tracking (state as of 2026-04-21)

All tracking is routed through Google Tag Manager container **`GTM-T7QS4KD6`**. The code only loads the GTM snippet when `NEXT_PUBLIC_GTM_ID` is set (see `src/app/layout.tsx`). Everything else — GA4, Ads Conversion, Remarketing — is configured **inside** GTM and does not require additional code or env vars to be read at runtime.

**GTM container (Google Tag Manager → Account "AK Sign" → Container `aksign.us`):**

| Tag | Type | Trigger | Notes |
|---|---|---|---|
| `GA4 — Config` | Google tag | Initialization - All Pages | Measurement ID `G-QT741W402E` |
| `GA4 Event - Lead` | GA4 event | Thank You Page View | fires on `/thank-you` |
| `GA4 Event - Phone Click` | GA4 event | Phone Click (Click URL starts with `tel:`) | |
| `Google Ads - Conversion` | Google Ads Conversion | Thank You Page View | Conv ID `17323224528`, Label `6SJ0CP-DhaAcENDbrcRA` |
| `Google Ads - Remarketing` | Google Ads Remarketing | All Pages | Conv ID `17323224528`, **Label empty (do not fill)** |

**Google Ads Conversion Actions (account `AK SIGN | Business Signs | Search`, CID `107-297-2697`):**

| Conversion | Label | Value | Count | Click-through window |
|---|---|---|---|---|
| `Lead Form Submit — AK Sign` | `6SJ0CP-DhaAcENDbrcRA` | $135 | One | 30 days |
| `Phone Click — AK Sign` | `iEd3CIKEhaAcENDbrcRA` | $135 | One | 30 days |

`Phone Click` label is **not** embedded anywhere in GTM yet — it is only reachable via GA4→Ads conversion import. If you want a dedicated GTM tag firing on `tel:` clicks for the Ads Conversion, add a new `Google Ads - Conversion` tag mirroring Tag 4 but with Label `iEd3CIKEhaAcENDbrcRA` and trigger `Phone Click`.

**Vercel env vars to set for tracking to work in production:**

```
NEXT_PUBLIC_GTM_ID=GTM-T7QS4KD6
NEXT_PUBLIC_GA4_ID=G-QT741W402E              # reference only, code does not read
NEXT_PUBLIC_ADS_CONV_ID=AW-17323224528        # reference only, code does not read
NEXT_PUBLIC_ADS_CONV_LABEL=6SJ0CP-DhaAcENDbrcRA  # reference only, code does not read
```

After setting env vars on Vercel, trigger a fresh deployment (any commit or Vercel dashboard redeploy) and verify GTM loads: `curl -sL https://aksign-ppc.vercel.app | grep -c googletagmanager` should return `> 0`, or in browser devtools check `window.google_tag_manager` is defined.

**Post-launch checklist (to be completed after Ads campaign is live):**

1. GTM → Preview on `/channel-letter-signs` → submit form → verify 4 tags fire on `/thank-you` (GA4 Config, GA4 Lead, Google Ads Conversion, Remarketing).
2. GTM → **Publish** container as "Launch v1 — Ads conversion + remarketing" (currently 8 changes sit unpublished in Default Workspace).
3. GA4 → Admin → Events → mark `lead` and `phone_click` as Conversions.
4. GA4 → Admin → Google Ads links → link `AK Sign (AW-17323224528)`, enable personalized advertising.
5. Google Ads → Tools → Measurement → Conversions → Import → GA4 → pick `lead` + `phone_click`.
6. For each imported conversion, set **Include in "Conversions" = OFF** to avoid double-counting.

## Content

All copy lives in `src/data/*.json` (`shared.json` + `lp-0{1,2,3}.json`), Zod-validated at build time via `src/lib/content.ts`. No hardcoded strings in JSX.

## Handoff reference

Full brief pack: `/Users/dmitriy/aksign/` (18 section specs + design brief + page spec + client source).
