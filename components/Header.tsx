"use client";

import Link from "next/link";
import {
  AREA_NAV,
  PHONE_DISPLAY,
  PHONE_HREF,
  SECONDARY_NAV,
  SERVICES,
  SITE_NAME,
} from "@/lib/site";
import { IconChevronDown, IconShield } from "./icons";
import MobileNav from "./MobileNav";

function UtilityBar() {
  return (
    <div className="hidden bg-slate-900 text-slate-300 lg:block">
      <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-4 text-xs font-semibold">
        <div className="flex items-center gap-5">
          <span>Free roof inspections</span>
          <span>One local pro — not a call list</span>
          <span>Insured professionals</span>
        </div>
        <a href={PHONE_HREF} className="text-white hover:text-teal-300">
          {PHONE_DISPLAY}
        </a>
      </div>
    </div>
  );
}

export default function Header() {
  const closeDropdowns = () => {
    document
      .querySelectorAll<HTMLDetailsElement>('details[name="site-nav-dropdown"]')
      .forEach((dropdown) => {
        dropdown.open = false;
      });
  };

  return (
    <>
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-700 text-white">
              <IconShield className="h-5 w-5" />
            </span>
            <span className="whitespace-nowrap text-base font-extrabold tracking-tight text-slate-900 lg:text-lg">
              {SITE_NAME}
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-5 text-sm font-semibold text-slate-700 lg:flex"
          >
            <details className="group relative" name="site-nav-dropdown">
              <summary className="flex cursor-pointer items-center gap-1 py-2 hover:text-teal-700">
                Services
                <IconChevronDown className="chevron h-3.5 w-3.5" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                {SERVICES.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={closeDropdowns}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </details>
            <details className="group relative" name="site-nav-dropdown">
              <summary className="flex cursor-pointer items-center gap-1 py-2 hover:text-teal-700">
                Service Areas
                <IconChevronDown className="chevron h-3.5 w-3.5" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                {AREA_NAV.map((area) => (
                  <Link
                    key={area.href}
                    href={area.href}
                    onClick={closeDropdowns}
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                  >
                    {area.label}
                  </Link>
                ))}
              </div>
            </details>
            {SECONDARY_NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-teal-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="hidden whitespace-nowrap text-sm font-extrabold text-teal-700 sm:block md:text-base"
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href="#quote"
              className="hidden whitespace-nowrap rounded-md bg-amber-500 px-4 py-2 text-sm font-bold text-slate-900 hover:bg-amber-600 md:block"
            >
              Get Free Inspection
            </a>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
