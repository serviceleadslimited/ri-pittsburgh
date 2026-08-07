# roofcleaningsandiegoca.com

Site #12 in the rank-and-rent portfolio. Local lead-gen for roof cleaning,
gutter cleaning, and solar panel cleaning in San Diego, CA — an honest
referral service connecting customers with one insured local
exterior-cleaning contractor. Cloned from hydrojettingchulavista.com
(site #11) — cross-niche-family clone (no prior roof-cleaning/pressure-washing
site existed in the portfolio; most-recently-launched repo used per the
fallback rule).

Next.js static export. All identity values live in `lib/site.ts`; page copy in
`content/*.md` (keyword-mapped from Chevy's manual Ahrefs single-keyword
Overview exports — Ahrefs API workspace was exhausted at build time; do not
rewrite).
See `CLAUDE.md` for the full constitution and `docs/DECISIONS.md` for the
decision log.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # static export to out/
```

Deploys via Vercel from this repo; apex domain is PRIMARY.
Env vars: `RESEND_API_KEY`, `LEAD_EMAIL`.
