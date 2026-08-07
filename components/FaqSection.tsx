import { renderFaqAnswerHtml, headingSlug, type Faq } from "@/lib/content";
import SectionHeading from "./SectionHeading";
import { IconChevronDown } from "./icons";

// Native <details>/<summary> — full text is always present in the initial
// HTML regardless of open/closed state, so crawlability and FAQPage JSON-LD
// parity are unaffected by the accordion interaction. No JS needed.
// Answers render through renderFaqAnswerHtml — the same function that feeds
// the FAQPage JSON-LD — so the two stay identical by construction.
// Each item carries a GitHub-style id (headingSlug of the question) so nav
// deep-links like /dumpster-sizes#do-i-need-a-bigger-dumpster-for-roofing-shingles
// land on — and auto-open — the right question.
export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading eyebrow="Questions" heading="Frequently Asked Questions" />
        <div className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              id={headingSlug(faq.q)}
              className="group scroll-mt-24 rounded-xl border border-slate-200 bg-white px-5 py-1 shadow-sm target:border-blue-400"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-bold text-slate-900">
                {faq.q}
                <IconChevronDown className="chevron h-5 w-5 shrink-0 text-blue-600" />
              </summary>
              <p
                className="pb-4 leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-blue-700 [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: renderFaqAnswerHtml(faq.a) }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
