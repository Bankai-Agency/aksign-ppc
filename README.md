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
- `NEXT_PUBLIC_ADS_CONV_LABEL` — Google Ads conversion label (blocker, supplied by client)

## Content

All copy lives in `src/data/*.json` (`shared.json` + `lp-0{1,2,3}.json`), Zod-validated at build time via `src/lib/content.ts`. No hardcoded strings in JSX.

## Handoff reference

Full brief pack: `/Users/dmitriy/aksign/` (18 section specs + design brief + page spec + client source).
