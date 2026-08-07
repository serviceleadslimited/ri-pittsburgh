"use client";

import { useState } from "react";

const RANGES = {
  contractor: "$0",
  standard: "$150–$400",
  report: "$250–$600",
  transaction: "$300–$750",
} as const;

const PURPOSES = [
  { value: "contractor", label: "Free contractor inspection" },
  { value: "standard", label: "Independent condition check" },
  { value: "report", label: "Inspection with written report" },
  { value: "transaction", label: "Purchase, sale, or claim documentation" },
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
  const [purpose, setPurpose] = useState<Purpose>("contractor");
  const [access, setAccess] = useState<Access>("easy");

  const range = RANGES[purpose];
  const accessNote =
    access === "complex"
      ? "Steep pitches, multiple roof sections, height, attic access, or safety equipment can move a quote above the planning range."
      : "Easy access usually keeps the inspection closer to the lower end of its planning range."

  return (
    <section
      aria-label="Roof inspection cost estimator"
      className="mt-10 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        Quick Roof Inspection Cost Estimator
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Choose the type of inspection you need. These are planning ranges from
        the table above, not a quote.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="calc-purpose" className="text-sm font-semibold text-slate-800">
            What is the inspection for?
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
        <p className="text-lg font-extrabold text-slate-900">Typical planning range: {range}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{accessNote}</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          A contractor may waive the inspection fee when preparing a repair or replacement estimate. Independent or transaction-related documentation is more likely to carry a separate fee.
        </p>
        <a href="#quote" className="mt-3 inline-block rounded-md bg-amber-500 px-5 py-3 text-base font-extrabold text-slate-900 hover:bg-amber-600">
          Get My Free Inspection
        </a>
      </div>
    </section>
  );
}
