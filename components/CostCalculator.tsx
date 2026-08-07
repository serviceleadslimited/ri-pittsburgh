"use client";

import { useState } from "react";

const PAID_RANGES = {
  independent: { easy: "$150–$300", complex: "$300–$400" },
  report: { easy: "$250–$450", complex: "$450–$600" },
  transaction: { easy: "$300–$500", complex: "$500–$750" },
} as const;

const PURPOSES = [
  { value: "free", label: "I need a free roof inspection for a concern" },
  { value: "independent", label: "I need an independent condition opinion" },
  { value: "report", label: "I need a detailed written report" },
  { value: "transaction", label: "I need documentation for a sale, purchase, or dispute" },
] as const;

const ACCESS = [
  { value: "easy", label: "Easy access / one-story" },
  { value: "complex", label: "Two-story, steep, or difficult access" },
] as const;

type Purpose = (typeof PURPOSES)[number]["value"];
type Access = (typeof ACCESS)[number]["value"];

const selectClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700/30";

export default function CostCalculator() {
  const [purpose, setPurpose] = useState<Purpose>("free");
  const [access, setAccess] = useState<Access>("easy");

  const paidPurpose = purpose === "free" ? "independent" : purpose;
  const range = PAID_RANGES[paidPurpose][access];
  const accessNote = access === "complex"
    ? "Steep pitches, multiple roof sections, height, attic access, or safety limits can change what an inspector can safely examine and what a paid report costs."
    : "Easy access can make it simpler for a professional to examine more of the roof, but the inspection scope should always be confirmed first.";

  const isFreeInspection = purpose === "free";

  return (
    <section
      aria-label="Roof inspection cost estimator"
      className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        Is a Free Roof Inspection the Right First Step?
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Start with why you need someone to look at the roof. We offer the
        no-cost contractor inspection path; the paid ranges below are for the
        separate cases where an independent or formal report may be necessary.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-purpose" className="text-sm font-semibold text-slate-800">
            What do you need from the inspection?
          </label>
          <select
            id="calc-purpose"
            className={selectClass}
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as Purpose)}
          >
            {PURPOSES.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="calc-access" className="text-sm font-semibold text-slate-800">
            Roof access and complexity
          </label>
          <select
            id="calc-access"
            className={selectClass}
            value={access}
            onChange={(e) => setAccess(e.target.value as Access)}
          >
            {ACCESS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-lg font-extrabold text-slate-900">
          {isFreeInspection ? "Your free inspection: $0" : `Typical paid planning range: ${range}`}
        </p>
        {isFreeInspection && (
          <p className="mt-2 text-sm font-bold text-slate-900">
            Comparable paid independent inspection: {range}
          </p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{accessNote}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          {isFreeInspection
            ? `For a leak, storm concern, visible damage, or an aging roof, start with the free inspection. ${access === "complex" ? "A steep, high, or difficult-to-access roof can push a separate paid independent inspection toward the upper end because safe access and documentation take more time." : "On an easy-access, one-story roof, a separate paid independent inspection is more likely to stay near the lower end of its range."} If work is needed, the roofing professional may explain repair or replacement options afterward; there is no obligation to hire.`
            : "Our referral offer is a free contractor inspection, not a paid independent report. If a neutral opinion or formal documentation matters, ask the professional what report type and fee are appropriate before scheduling."}
        </p>
        <a href="#quote" className="mt-3 inline-block rounded-md bg-amber-500 px-5 py-3 text-base font-extrabold text-slate-900 hover:bg-amber-600">
          Get Free Inspection
        </a>
      </div>
    </section>
  );
}
