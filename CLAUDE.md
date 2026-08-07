# CLAUDE.md — roofcleaningsandiegoca.com

## 1. What This Is

Site #12 in the rank-and-rent portfolio, cloned from the hydrojettingchulavista.com codebase (site #11 — cross-family clone; no prior roof-cleaning or pressure-washing site exists in the portfolio, so the most-recently-launched repo overall was used per the fallback rule). A local lead-generation site for roof cleaning, gutter cleaning, and solar panel cleaning in San Diego, California, positioned as an honest contractor matching/referral service — we connect customers with one independent local exterior-cleaning contractor, we are not the contractor.

Success metric: page-1 rankings + phone calls + form leads. Nothing else matters.

## 2. Site Identity

- **Brand:** Roof Cleaning San Diego
- **Domain:** roofcleaningsandiegoca.com — apex is canonical everywhere; www 301s to apex. Vercel: apex set as PRIMARY. Defensive-301 domain roofcleaningsd.com purchased 2026-08-04 (colloquial "SD" abbreviation) — 301 redirects to this apex at deploy, is NOT a second site, carries zero independent content.
- **Phone:** the CallRail tracking number provisioned 2026-08-05 (area code 619, native San Diego; destination Chevy's line). Display format `(619) 430-4964`, tel: links E.164 `+16194304964`.
- **Metro cities (areaServed + footer):** San Diego, Carlsbad, Poway, Encinitas
- **Primary keyword:** `roof cleaning san diego` (150/mo, $12.00 CPC, KD 0) — verified top word-order string; homepage H1 and title lead with it verbatim. Reversed order `san diego roof cleaning` (40/mo) confirmed weaker — no reorder needed. This is the highest CPC of any combo evaluated in this portfolio's 2026-08-04 discovery batch.
- **Cluster (from Chevy's manual Ahrefs single-keyword Overview exports, 2026-08-04 — Ahrefs API workspace exhausted; batch-mode exports were unreliable and abandoned, single-keyword-at-a-time was the working method):**
  - `gutter cleaning san diego` (300/mo, $9.00 CPC) — tracked, dedicated page
  - `solar panel cleaning san diego` (200/mo, $3.00 CPC) — tracked, dedicated page
  - `tile roof cleaning san diego` cluster (~130/mo combined across word-order variants, $8.00 CPC) — tracked but **intent + ranking-format check showed near-identical SERP to plain "roof cleaning san diego"** (same top domains: Yelp, socalroofmasters.com, washedoutpressurewashing.com, thumbtack) — folded into the homepage as a dedicated H2 section rather than a separate URL, per the cannibalization rule (two of our own pages competing for one search result set is a self-inflicted wound).
  - `roof cleaning cost san diego`, `soft wash roof cleaning san diego`, `roof algae removal san diego`, `commercial roof cleaning san diego` — all returned **zero tracked search volume** (real "No data" responses, not failed pulls) — folded into existing pages as supporting language, no dedicated URLs.
  - Suburb check (2026-08-04): Carlsbad, Poway, and Encinitas as bare city names returned large but irrelevant volume (city-name searches, not niche-qualified) — the correctly-qualified strings (`roof cleaning carlsbad ca`, etc.) all returned zero tracked volume. None cleared the ≥40/mo dedicated-page threshold — folded into service-areas.md as H2s with genuinely distinct local content (each city's real coastal/inland marine-layer exposure profile), not dedicated pages.
- **GA4:** `G-4VP1C4YNLB` (real ID, created 2026-08-04; do not print/hardcode a stale value into this file)
- **WebMCP origin-trial token:** supplied by Chevy 2026-08-04, origin-bound to `https://roofcleaningsandiegoca.com:443`, expiry 2026-11-17 (decoded and verified against the correct origin before use). Full token value lives in `lib/site.ts` only.
- Never inherit any predecessor's GA4 ID, WebMCP token, or phone number — hydrojettingchulavista.com's (`G-BWJ3WVWY8C`, its 619 tracking number `(619) 604-6280`, its token) is the nearest carryover risk given the direct clone lineage, despite this being a cross-niche-family clone. Domain-bound values never carry between sites.

## 3. Non-Negotiables

1. **Phone everywhere:** header, hero, mobile sticky bar, every CTA band, footer. Display format `(619) 430-4964`; anchor `tel:` + E.164 `+16194304964`. Sole exception: verified third-party phones in the directory page body, plain text only, formatted with dashes, never `tel:` links (one-number rule, mr-chattanooga DECISIONS precedent, carried forward via hj-chula-vista).
2. **Primary CTA: "Free Estimate"** — visible-problem niche (homeowners can see the algae staining, dirty panels, or clogged gutters and want a number, not a diagnosis). "Free Estimate" phrasing appears in header button, hero, mobile bar, form heading, submit button, CTA bands.
3. **Transparent-but-honest pricing:** the cost guide's price table is the site's centerpiece; the homepage answers the cost question in its first relevant section with a real range, never a single invented number. Never hide numbers behind the form.
4. **Quote form on every page** with honeypot field. Form heading and submit button carry the CTA phrase ("Get Your Free Estimate").
5. **Footer disclosure, verbatim on every page:**
   > Roof Cleaning San Diego is a free referral service that connects customers with an independent local exterior-cleaning contractor. We are not the contractor and do not perform roof cleaning, gutter cleaning, or solar panel cleaning ourselves. Contractors we refer are insured. California's Contractors State License Board (CSLB) issues a specific limited-specialty license (Classification C-61/D-38, Sand and Water Blasting) required for pressure-washing and soft-wash jobs over $500 — we make no direct licensing claims of our own; see our Terms page for how to verify a contractor's credentials.

   NOTE: The word "licensed" is deliberately absent as a claim about THIS SITE. California's CSLB C-61/D-38 classification is a real, specific, checkable license requirement for jobs over $500 — most multi-service visits on this site (roof + gutter + solar) will likely cross that threshold. Do NOT claim "licensed" on this site's own behalf regardless of that threshold — this is a claim about the site, not about whether a licensing requirement exists. The terms page names the CSLB C-61/D-38 classification and links CSLB's free license lookup tool as something to verify when checking a specific contractor.
6. **Trust badges (3, all honest and checkable):** "Insured Local Contractor" · "Transparent Pricing" · "One Local Pro, Not a Call List". No licensed badges, no invented review counts, no tenure claims.
7. **Static generation only.** Every route SSG'd. Lighthouse mobile ≥95 performance / 100 SEO.
8. **No tenant business name anywhere on the site.** No fake trust signals, ever.

## 4. Stack

- Next.js static export — component architecture unchanged from the hydrojettingchulavista.com template (cross-niche-family clone; only identity, copy, and niche-specific logic swapped). Do not rewrite components; swap identity and content only.
- **Do not rewrite the copy — it is keyword-mapped** from Chevy's manual Ahrefs single-keyword Overview exports (2026-08-04) in place of a live API batch (Ahrefs workspace units exhausted). Note for future sessions: Ahrefs' batch/multi-keyword search mode is unreliable for location-qualified phrases (returns unrelated bare national terms via its keyword-ideas expansion, or drops the city qualifier entirely) — the working method confirmed this session is one exact keyword typed and submitted at a time via the single-keyword Overview screen, verifying the page header echoes the typed phrase word-for-word before exporting.
- All identity values live in `lib/site.ts` only. No hardcoded brand/phone/domain strings in components.
- **Palette:** dominant fresh-water teal `#0E7490` (derived dark `#0C5A6E` for hovers/footer), CTA accent orange `#EA580C` (hover `#C2410C`, same accent used across other portfolio sites), everything else neutral slate/white. First roof-cleaning/pressure-washing site in the portfolio — no same-family collision risk, entered into gates.yaml `palette.registry`. Verify AA contrast at used sizes. **Stale-artifact note:** the inherited `app/globals.css` comment block referenced a "site #8 cerulean / blue-*" aliasing scheme from two clone-generations back that no longer matched the actual `teal-*` Tailwind classes used by every component (Header, HowItWorks, TrustBadges, MobileCallBar, QuoteForm, CostCalculator) — this was stale residue predating hj-chula-vista itself. Corrected in this build: `teal-*` tokens are now the ones actually aliased to the real hex values. Flagged for a source-repo cleanup recommendation (see MIGRATION_PLAN.md).
- **Logo/favicon:** simple rooflines-with-water-droplet-accent mark, white on dominant teal. The mark represents the trade (a clean roof, a drop of water for the wash), not the problem — no algae/stain/grime imagery. Favicon: white glyph on `#0E7490` rounded square. `app/favicon.ico` regenerated from the new `app/icon.svg` per the portfolio-wide 2026-08-04 favicon retrofit standard (sharp-generated 16x16+32x32 PNG-in-ICO).
- **CostCalculator.tsx** carried from the mr-chattanooga reference implementation via the hj-chula-vista clone lineage: client-side only, rendered slug-conditionally on `/roof-cleaning-cost` only. Logic rewritten for this niche: job type (roof/tile/gutter/solar/commercial) + severity selects, RANGES updated to this site's own published price table ($300-500 standard roof / $400-800 tile or two-story / $150-350 gutter / $150-400 solar / on-site-quoted commercial) — never invent, blend, or adjust a number not published on this site's own cost page.

## 5. Pages

| Route | Content file | Primary keyword |
| --- | --- | --- |
| `/` | home.md | roof cleaning san diego (150/mo) — **signature page**, exact top_string verbatim; includes dedicated tile-roof-cleaning H2 section (folded per cannibalization check, not a separate URL) |
| `/gutter-cleaning` | gutter-cleaning.md | gutter cleaning san diego (300/mo, $9.00 CPC — tracked, genuinely distinct SERP from roof cleaning) |
| `/solar-panel-cleaning` | solar-panel-cleaning.md | solar panel cleaning san diego (200/mo, $3.00 CPC — tracked, genuinely distinct SERP) |
| `/roof-cleaning-cost` | roof-cleaning-cost.md | roof cleaning cost (untracked as an exact San Diego phrase, but real buyer-intent content every site needs; covers all three services' pricing) |
| `/service-areas` | service-areas.md | Carlsbad, Poway, Encinitas as H2s (none cleared the 40/mo dedicated-page threshold as correctly-qualified strings) |
| `/directory` | directory.md | local directory (3 directly-verified independents with real phone/website confirmed against their own sites; one-number rule) |
| `/about` | about.md | — |
| `/contact` | contact.md | — |
| `/privacy` | privacy.md | — |
| `/terms` | terms.md | — |

10 content/structural URLs — comfortably inside the zero-RD-SERP page-count cap (~6-7 core content URLs; this counts 5 core + 5 template/legal pages against that cap correctly, since about/contact/privacy/terms/service-areas/directory are template scaffolding, not the core content set).

## 6. SEO / Structured Data / AEO-GEO

- **Organization schema, never LocalBusiness** (no physical premises). Never aggregateRating, never Review, never address, never medical schema, never ItemList (directory page stays schema-plain per mr-chattanooga DECISIONS precedent, carried via hj-chula-vista). Single Organization block emitted from the root layout, with `makesOffer` enumerating all three real service pages (roof cleaning, gutter cleaning, solar panel cleaning) per the 2026-08-03 service-enumeration standard.
- `SERVICE_TYPES` map in `lib/schema.ts`: `/` → "Roof cleaning", `/roof-cleaning-cost` → "Roof cleaning", `/gutter-cleaning` → "Gutter cleaning", `/solar-panel-cleaning` → "Solar panel cleaning".
- **FAQPage JSON-LD generated from frontmatter `faqs`** — rendered FAQ text and JSON-LD must be identical. This is an AI-readable semantic layer only; Google retired FAQ rich results in May 2026 — never claim a Google ranking/rich-result benefit.
- **llms.txt in Markdown link format** (`- [Page Name](https://roofcleaningsandiegoca.com/route): description`) — never bare URLs.
- **robots.txt allows the standing 14 AI crawlers** (carry the allow list from the template repo verbatim).
- **Answer-first structure everywhere:** question-shaped H2s with direct answers in the first sentence; cost page opens with the number range in sentence one.
- Canonical + og:url on apex for every route. One H1 per page. Titles ≤60 chars, keyword-first. Meta descriptions ≤155 with keyword + phone token.

## 7. Analytics

- GA4 ID `G-4VP1C4YNLB` from `sites/rc-sandiego/state.json` via the template's Analytics component. Keep the Analytics guard (no-op in development, loads only in production builds).
- WebMCP origin-trial meta tag with the real token (see §2). Token is origin-bound to this domain and port (`:443`).

## 8. Do NOT

- Do not use LocalBusiness schema, aggregateRating, Review, address properties, or ItemList.
- Do not claim "licensed" on this site's own behalf in copy, badges, schema, or meta — see §3.5 for the CSLB-specific reasoning.
- Do not add tenant business names, testimonials, review counts, star ratings, or "years in business" claims.
- Do not carry over any predecessor identity value (see §2) — hydrojettingchulavista.com's values are the highest-risk carryover given the direct clone lineage, even though this is a cross-niche-family clone.
- Do not write MIGRATION_PLAN.md or any migration/planning document into this repo.
- **Residue-trap vocabulary — never use these words in copy** (they belong to the predecessor site and will trip the residue grep):
  - `hydro jetting`, `hydrojetting`, `drain jetting`, `drain cleaning`, `sewer line`, `Chula Vista`, `Bonita`, `National City`, `Imperial Beach`, `plumber`, `plumbing`, `clog`, `snake` (mechanical drain snake, not general usage), `pipe`
  - `C-36` (Chula Vista's plumbing license classification — this site uses C-61/D-38 instead)
  - Predecessor GA4 `G-BWJ3WVWY8C` (hydrojettingchulavista.com), phone `(619) 604-6280` / `+16196046280`, and any predecessor's WebMCP token
  - Any dumpster-rental or mold-remediation residue terms from further back in the clone lineage (`dumpster`, `roll-off`, `hauler`, `mold`, `remediation`, `spore`, `crawl space`, `encapsulation`) — carried forward as a standing check per the multi-generation clone-residue precedent
  - Word-boundary case-sensitive forms for short tokens: `\bCA\b` is this site's OWN state (do not flag), but watch for stray `\bFL\b`, `\bTN\b`, `\bGA\b`, `\bOK\b` from earlier lineage generations

## 9. Context for Future Sessions

Log every architectural or copy-standard decision made during this migration into `docs/DECISIONS.md` with date and rationale — including the licensing-verdict research (California's CSLB C-61/D-38 classification is new to this niche/state combination, distinct from the C-36 plumbing classification used by the Chula Vista predecessor), the palette entry (first roof-cleaning site in the portfolio, no collision risk), the stale-globals.css-comment correction (found during this build, predates hj-chula-vista), the page-count rationale (10 total, only 5 of which are core content — comfortably under cap), and the tile-roof-cleaning cannibalization finding (folded into the homepage rather than a dedicated page, based on a live SERP intent + ranking-format check showing near-identical results to the main term). Generic improvements to the template line flow back through DECISIONS.md. Add this site's row to `SITES.md` at launch. Launch date must be logged — the page-1 gate is month 3 from launch.
