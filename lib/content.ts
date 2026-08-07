import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked } from "marked";
import type { Metadata } from "next";
import { PHONE_DISPLAY, PHONE_HREF, SITE_NAME, SITE_URL } from "./site";
import { isSearchIndexable } from "./seo-policy";

export type Faq = { q: string; a: string };

export type PageContent = {
  slug: string; // "/" or "/about"
  index?: boolean;
  title: string;
  metaDescription: string;
  h1: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  faqs?: Faq[];
  leadHtml: string; // everything before the first "##" — rendered in the hero
  bodyHtml: string; // the rest of the page
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const marked = new Marked({ gfm: true });

// GitHub-style heading slugs so in-page anchors (nav dropdown deep-links like
// /dumpster-sizes#40-yard-construction-and-demolition) actually land. marked
// emits bare <h2> tags by default — no id, dead anchors (found live 2026-07-22).
// Slug rule matches GitHub: strip tags, lowercase, drop punctuation, spaces→hyphens.
export function headingSlug(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")        // strip inline HTML (linked H2s on service-areas)
    .toLowerCase()
    .replace(/&#?[a-z0-9]+;/gi, "") // entities (&amp; &#39; etc.)
    .replace(/[^a-z0-9\s-]/g, "")   // punctuation out (colons, commas, apostrophes)
    .trim()
    .replace(/\s+/g, "-");
}

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const inner = this.parser.parseInline(tokens);
      return `<h${depth} id="${headingSlug(inner)}">${inner}</h${depth}>\n`;
    },
  },
});

// The markdown keeps the phone as plain text; make every rendered occurrence a
// tel: link (copy is never linked in source, so no risk of nesting anchors).
function linkPhone(html: string): string {
  return html.replaceAll(
    PHONE_DISPLAY,
    `<a href="${PHONE_HREF}">${PHONE_DISPLAY}</a>`
  );
}

function render(md: string): string {
  return linkPhone(marked.parse(md) as string);
}

// FAQ answers render through inline markdown (so answers can carry links) in
// BOTH the visible FaqSection and the FAQPage JSON-LD, via this one function —
// visible HTML ≡ JSON-LD HTML by construction (DECISIONS #19). parseInline
// emits no <p> wrapper; linkPhone makes phone mentions tel: links here too.
export function renderFaqAnswerHtml(answer: string): string {
  return linkPhone(marked.parseInline(answer) as string);
}

function parseFile(filename: string): PageContent {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  // The real QuoteForm renders on every page; drop the copy placeholder.
  const body = content.replace(/^\[QUOTE FORM COMPONENT.*$\n?/m, "").trim();

  // Split at the first H2: hero lead above, main body below.
  const firstH2 = body.search(/^## /m);
  const leadMd = firstH2 === -1 ? body : body.slice(0, firstH2).trim();
  const bodyMd = firstH2 === -1 ? "" : body.slice(firstH2).trim();

  return {
    slug: data.slug,
    index: data.index !== false,
    title: data.title,
    metaDescription: data.metaDescription,
    h1: data.h1,
    primaryKeyword: data.primaryKeyword,
    secondaryKeywords: data.secondaryKeywords,
    faqs: data.faqs,
    leadHtml: render(leadMd),
    bodyHtml: bodyMd ? render(bodyMd) : "",
  };
}

let cache: PageContent[] | null = null;

export function getAllPages(): PageContent[] {
  if (!cache) {
    cache = fs
      .readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith(".md"))
      .map(parseFile);
  }
  return cache;
}

export function getPageBySlug(slug: string): PageContent {
  const page = getAllPages().find((p) => p.slug === slug);
  if (!page) throw new Error(`No content file for slug: ${slug}`);
  return page;
}

// Next.js normalizes the rendered canonical for "/" to the bare origin, so the
// sitemap uses the same form to keep canonical and sitemap URLs identical.
export function canonicalUrl(slug: string): string {
  return slug === "/" ? SITE_URL : `${SITE_URL}${slug}`;
}

export function pageMetadata(page: PageContent): Metadata {
  const url = canonicalUrl(page.slug);
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: url },
    robots: isSearchIndexable(page) ? undefined : { index: false, follow: true },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      type: "website",
      url,
      siteName: SITE_NAME,
    },
  };
}
