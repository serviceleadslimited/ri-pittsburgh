import Link from "next/link";
import {
  IconCalculator,
  IconCheck,
  IconShieldCheck,
  IconWrench,
} from "./icons";
import SectionHeading from "./SectionHeading";

const TILES = [
  { label: "Roof Inspection", href: "/roof-inspection", icon: IconShieldCheck },
  {
    label: "Cost Guide",
    href: "/roof-inspection-cost",
    icon: IconCalculator,
  },
  {
    label: "Local Directory",
    href: "/directory",
    icon: IconCheck,
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    icon: IconWrench,
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="What We Help With"
          heading="Roof inspection help in Pittsburgh"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TILES.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-bold text-slate-900">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
