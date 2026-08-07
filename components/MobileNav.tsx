"use client";

import { useState } from "react";
import Link from "next/link";
import { AREA_NAV, PHONE_DISPLAY, PHONE_HREF, SECONDARY_NAV, SERVICES } from "@/lib/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M5 5l10 10M15 5L5 15" />
          ) : (
            <path d="M3 5h14M3 10h14M3 15h14" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          aria-label="Main"
          className="absolute inset-x-0 top-16 border-b border-slate-200 bg-white shadow-lg"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2">
            <li className="pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
              Services
            </li>
            {SERVICES.map((link) => (
              <li key={link.href} className="border-b border-slate-100 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-semibold text-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 pb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
              Service Areas
            </li>
            {AREA_NAV.map((link) => (
              <li key={link.href} className="border-b border-slate-100 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-semibold text-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {SECONDARY_NAV.map((link) => (
              <li key={link.href} className="border-b border-slate-100 last:border-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-semibold text-slate-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={PHONE_HREF} className="block py-3 font-extrabold text-teal-700">
                Call {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
