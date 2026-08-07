import {
  CITIES,
  DISCLOSURE,
  PHONE_E164,
  SERVICES,
  SITE_NAME,
  SITE_URL,
} from "./site";
import {
  canonicalUrl,
  getPageBySlug,
  renderFaqAnswerHtml,
  type Faq,
  type PageContent,
} from "./content";

const areaServed = CITIES.map(({ name, state }) => ({
  "@type": "City",
  name: `${name}, ${state}`,
}));

// Service-enumeration pattern (2026-08-03 competitive-teardown standard,
// Pittsburgh precedent): every real service page in lib/site.ts SERVICES
// becomes one schema.org Offer inside the single sitewide Organization
// block. Organization stays the @type — never LocalBusiness/HomeAndConstru
// ctionBusiness. Pulled from the real content files, not invented strings.
const makesOffer = SERVICES.map(({ href }) => {
  const page = getPageBySlug(href);
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: page.h1,
      url: canonicalUrl(page.slug),
      description: page.metaDescription,
    },
  };
});

// Site-wide. Organization, NOT LocalBusiness (no physical premises), and the
// description mirrors the footer disclosure. Never add aggregateRating,
// Review, or address — see CLAUDE.md.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PHONE_E164,
    description: DISCLOSURE,
    areaServed,
    makesOffer,
  };
}

const SERVICE_TYPES: Record<string, string> = {
  "/": "Roof inspection",
  "/roof-inspection": "Roof inspection",
  "/roof-leak-inspection": "Roof leak inspection",
  "/storm-damage-roof-inspection": "Storm damage roof inspection",
  "/roof-inspection-cost": "Roof inspection",
};

export function serviceSchema(page: PageContent) {
  const serviceType = SERVICE_TYPES[page.slug];
  if (!serviceType) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    description: page.metaDescription,
    areaServed,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_E164,
    },
  };
}

// Built from the same faqs array that renders the visible section, and the
// answer HTML comes from the same renderFaqAnswerHtml call FaqSection uses,
// so JSON-LD and on-page text match exactly by construction. Google's
// FAQPage docs permit <a> (and basic markup) inside acceptedAnswer.text.
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: renderFaqAnswerHtml(faq.a) },
    })),
  };
}

export function breadcrumbSchema(page: PageContent) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: `${SITE_URL}${page.slug}`,
      },
    ],
  };
}
