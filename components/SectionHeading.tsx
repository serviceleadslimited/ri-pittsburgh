export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
}: {
  eyebrow: string;
  heading: string;
  subtext?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
        {heading}
      </h2>
      {subtext && <p className="mt-3 text-slate-600">{subtext}</p>}
    </div>
  );
}
