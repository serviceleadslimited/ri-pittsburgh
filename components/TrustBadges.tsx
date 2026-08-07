import { IconCalendar, IconCheck, IconShieldCheck } from "./icons";

const STATS = [
  {
    icon: IconShieldCheck,
    title: "Insured Local Contractor",
    subtext: "The pro we refer is an independent, insured local business",
  },
  {
    icon: IconCalendar,
    title: "Transparent Pricing",
    subtext: "Real ranges published up front, no guessing games",
  },
  {
    icon: IconCheck,
    title: "One Local Pro, Not a Call List",
    subtext: "Your details go to one pro, no spam",
  },
];

export default function TrustBadges() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-3">
        {STATS.map(({ icon: Icon, title, subtext }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <Icon className="h-6 w-6" />
            </span>
            <p className="mt-3 font-bold text-slate-900">{title}</p>
            <p className="mt-1 text-sm text-slate-600">{subtext}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
