# CLAUDE.md — roofinspectionpittsburgh.com

## What this site is

Pittsburgh Roof Inspection is a Pittsburgh, Pennsylvania rank-and-rent referral site. It connects homeowners with one independent insured local roofing professional for a **free roof inspection**. It is not the contractor, inspector, insurer, licensing body, or repair provider.

**Revenue path:** free roof inspection → qualified call/form lead → roofing-contractor tenant converts appropriate work. The site is not ready for tenant outreach until it reliably produces 3–5 combined call and form leads weekly.

## Identity and offer

- **Brand/domain:** Pittsburgh Roof Inspection / `roofinspectionpittsburgh.com`; apex canonical.
- **Phone:** use `PHONE_DISPLAY` and `PHONE_HREF` from `lib/site.ts` only. Never copy a predecessor number.
- **Primary keyword:** `roof inspection pittsburgh`; retain keyword mapping unless fresh SERP research justifies a change.
- **Primary CTA, exact wording:** `Get Free Inspection`.
- **Form language:** `Get Your Free Inspection` and `Request My Free Inspection` are acceptable supporting variants.
- **Never use price-led CTA wording for this offer.** The inspection is free. If repair or replacement work is warranted, the referred roofing professional may provide an estimate afterward.

## Content and compliance rules

1. Every non-legal page has the phone, a form anchor CTA, and the free-inspection offer.
2. The cost page distinguishes the $0 free contractor inspection offered through this referral service from paid independent, transaction, claim, or formal-report inspections. It is never a price quote.
3. The service-area page is one useful Pittsburgh-area resource, not thin doorway pages. Each locality section must relate the community to a legitimate roof-inspection need; do not lead with availability caveats.
4. Pittsburgh’s weather, hills, mature trees, roof age, flashing, drainage, leaks, storm damage, and freeze-thaw conditions are valid context when factually presented. Do not fabricate local statistics, contractor coverage, reviews, insurance, licensing, availability, or endorsements.
5. Preserve referral disclosure: Pittsburgh Roof Inspection is a free referral service; it does not perform inspections or roofing work. Referred professionals are insured; homeowners should verify applicable Pennsylvania registration, insurance, scope, and references before hiring.
6. Do not claim “#1,” “best,” licensed status, ratings, testimonials, tenure, or a tenant business name without proof and approval.

## Lead security and launch requirements

- QuoteForm must retain a honeypot and Cloudflare Turnstile.
- `/api/lead` must reject missing or invalid Turnstile tokens before any email is sent.
- New-site launch requires `turnstile_provision.py` to create the domain-bound widget and Vercel secret, followed by a deployment and live widget/script check. Do not consider a form secure only because its component imports Turnstile.
- Keep GA4, CallRail, llms.txt, FAQPage JSON-LD, AI-crawler access, sitemap, canonical URLs, and privacy/terms noindex behavior intact.

## Quality gate

Before release: source residue scan, `npm run lint`, clean `npm run build`, schema check, standard-modules check, technical audit, and production CTA/form/Turnstile verification. The authoritative migration decisions are in `docs/DECISIONS.md`.
