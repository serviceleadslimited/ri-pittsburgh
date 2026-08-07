import Link from "next/link";
import {
  CITIES,
  DISCLOSURE,
  HOURS,
  PHONE_DISPLAY,
  PHONE_HREF,
  SERVICES,
  SITE_NAME,
  AREA_NAME,
} from "@/lib/site";
import { IconShield } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-700 text-white">
              <IconShield className="h-5 w-5" />
            </span>
            <span className="text-sm font-extrabold uppercase tracking-wide text-white">
              {SITE_NAME}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed">
            We connect {AREA_NAME.split(",")[0]}-area homeowners with one
            independent, insured local roofing professional — clear scope,
            honest findings, no obligation.
          </p>
          <p className="mt-3">
            <a href={PHONE_HREF} className="text-lg font-extrabold text-white underline">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p className="mt-2 text-sm">{HOURS}</p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
            Services
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {SERVICES.map((service) => (
              <li key={service.href}>
                <Link href={service.href} className="hover:text-white hover:underline">
                  {service.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/roof-inspection-cost"
                className="hover:text-white hover:underline"
              >
                Roof Inspection Cost Guide
              </Link>
            </li>
            <li>
              <Link
                href="/directory"
                className="hover:text-white hover:underline"
              >
                Local Directory
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
            Service Areas
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            {CITIES.map((c) => c.name).join(", ")}, and the surrounding {AREA_NAME.split(",")[0]}
            area.
          </p>
          <p className="mt-2 text-sm">
            <Link href="/service-areas" className="font-semibold text-white underline">
              All service areas
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}.{" "}
            <Link href="/about" className="hover:text-white hover:underline">
              About
            </Link>{" "}
            &middot;{" "}
            <Link href="/contact" className="hover:text-white hover:underline">
              Contact
            </Link>{" "}
            &middot;{" "}
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy Policy
            </Link>{" "}
            &middot;{" "}
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms
            </Link>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">{DISCLOSURE}</p>
        </div>
      </div>
    </footer>
  );
}
