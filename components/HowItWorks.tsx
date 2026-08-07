import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    title: "Tell us what's going on",
    text: "Call or send the form — tell us the municipality, the roof concern, and how quickly you need help.",
  },
  {
    title: "We connect you with one insured local pro",
    text: "Your request goes to one independent roofing professional serving the Pittsburgh area — not a call list.",
  },
  {
    title: "A free inspection, no obligation",
    text: "The roofing professional inspects the concern, explains the findings, and outlines the next step. No obligation to hire.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="How It Works" heading="Three simple steps" />
        <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
