import type { Metadata } from "next";
import Link from "next/link";
import { PHONE_DISPLAY, PHONE_HREF, SERVICES, SITE_NAME, AREA_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page Not Found | ${SITE_NAME}`,
  description: `That page doesn't exist, but a free roof inspection connection in ${AREA_NAME} does. Call ${PHONE_DISPLAY}.`,
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        That page doesn&rsquo;t exist — but if you&rsquo;ve got a leak, storm
        concern, or an aging roof, we can still connect you with local help.
      </p>
      <a
        href={PHONE_HREF}
        className="mt-6 inline-block rounded-md bg-amber-500 px-6 py-3.5 text-base font-extrabold text-slate-900 hover:bg-amber-600"
      >
        Call {PHONE_DISPLAY}
      </a>
      <h2 className="mt-10 text-sm font-extrabold uppercase tracking-wide text-slate-500">
        Popular pages
      </h2>
      <ul className="mt-3 space-y-2 font-semibold text-teal-700">
        {SERVICES.map((service) => (
          <li key={service.href}>
            <Link href={service.href} className="underline">
              {service.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/roof-inspection-cost" className="underline">
            Roof Inspection Cost Guide
          </Link>
        </li>
        <li>
          <Link href="/contact" className="underline">
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
