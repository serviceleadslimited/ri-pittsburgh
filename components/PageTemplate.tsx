import type { PageContent } from "@/lib/content";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/schema";
import { PHONE_DISPLAY, PHONE_HREF, AREA_NAME } from "@/lib/site";

import AnchorOpener from "./AnchorOpener";
import CostCalculator from "./CostCalculator";
import FaqSection from "./FaqSection";
import HowItWorks from "./HowItWorks";
import JsonLd from "./JsonLd";
import QuoteForm from "./QuoteForm";
import ServicesGrid from "./ServicesGrid";
import TrustBadges from "./TrustBadges";
import { IconCalendar, IconCheck, IconShieldCheck } from "./icons";

// Pure compliance pages — no trust badges, hero CTAs, quote form, or closing
// CTA band. Just the title, the policy text, and the footer disclosure.
const LEGAL_SLUGS = ["/privacy", "/terms"];

// Pill badges in the hero, above the CTA buttons (every non-legal page).
// Same claims as the TrustBadges strip — no licensed/certification wording.
const HERO_TRUST = [
  { icon: IconCalendar, label: "Free roof inspection" },
  { icon: IconShieldCheck, label: "Insured local pro" },
  { icon: IconCheck, label: "No obligation" },
];

export default function PageTemplate({ page }: { page: PageContent }) {
  const isHome = page.slug === "/";
  const isLegal = LEGAL_SLUGS.includes(page.slug);
  const service = serviceSchema(page);

  return (
    <article>
      {service && <JsonLd data={service} />}
      {page.faqs && page.faqs.length > 0 && <JsonLd data={faqSchema(page.faqs)} />}
      {!isHome && <JsonLd data={breadcrumbSchema(page)} />}

      <section className="bg-slate-900 text-white">
        <div
          className={
            isLegal
              ? "mx-auto max-w-3xl px-4 py-12 md:py-16"
              : "mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:items-start"
          }
        >
          <div className="min-w-0">
            {!isLegal && (
              <p className="text-xs font-extrabold uppercase tracking-widest text-teal-300">
                {AREA_NAME} &amp; the surrounding area
              </p>
            )}
            <h1
              className={
                isLegal
                  ? "text-3xl font-extrabold tracking-tight md:text-4xl"
                  : "mt-2 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
              }
            >
              {page.h1}
            </h1>
            <div
              className="hero-lead mt-4 text-lg text-slate-200 md:text-xl"
              dangerouslySetInnerHTML={{ __html: page.leadHtml }}
            />
            {!isLegal && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {HERO_TRUST.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 rounded-full border border-slate-500 px-4 py-1.5 text-sm font-bold text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </li>
                ))}
              </ul>
            )}
            {!isLegal && (
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PHONE_HREF}
                  className="rounded-md bg-amber-500 px-6 py-3.5 text-base font-extrabold text-slate-900 hover:bg-amber-600"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href="#quote"
                  className="rounded-md border-2 border-white px-6 py-3 text-base font-extrabold text-white hover:bg-white hover:text-slate-900"
                >
                  Get Free Inspection
                </a>
              </div>
            )}
          </div>

          {!isLegal && (
            <div id="quote" className="min-w-0 scroll-mt-24">
              <QuoteForm />
            </div>
          )}
          {/* Legal pages carry no QuoteForm, but the site-wide header/mobile
              call-bar #quote link is unconditional — this keeps that anchor
              from dead-ending (found live 2026-08-02, pre-existing in the
              dumpsterrentalofchattanooga.com template this was cloned from). */}
          {isLegal && <span id="quote" aria-hidden="true" />}
        </div>
      </section>

      {!isLegal && <TrustBadges />}
      <AnchorOpener />

      {isHome && <ServicesGrid />}
      {isHome && <HowItWorks />}

      <div className="bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          {page.bodyHtml && (
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          )}
          {page.slug === "/roof-inspection-cost" && <CostCalculator />}

        </div>
      </div>

      {page.faqs && page.faqs.length > 0 && <FaqSection faqs={page.faqs} />}

      {!isLegal && (
        <section className="bg-slate-900 py-14 text-center text-white">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Ready to get started?
            </h2>
            <p className="mt-3 text-slate-300">
              Ready for a free inspection? Get connected with a local, insured
              roofing professional. Straight answers, clear scope, and no
              obligation to hire.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="#quote"
                className="rounded-md bg-amber-500 px-6 py-3.5 text-base font-extrabold text-slate-900 hover:bg-amber-600"
              >
                Get Free Inspection
              </a>
              <a
                href={PHONE_HREF}
                className="rounded-md border-2 border-white px-6 py-3 text-base font-extrabold text-white hover:bg-white hover:text-slate-900"
              >
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
