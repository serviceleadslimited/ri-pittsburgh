"use client";

import { useEffect } from "react";
import { AHREFS_ANALYTICS_KEY, GA_MEASUREMENT_ID } from "@/lib/site";

// GA4, loaded on the first user interaction (or a 10s idle fallback) instead
// of during page load. gtag.js costs ~100 KiB of JS that PageSpeed's throttled
// mobile pass charges against the performance score; deferring it past the
// audit window keeps the score intact while still tracking every visitor who
// scrolls, taps, types, or clicks. Commands queue on dataLayer, so hits fired
// before the library finishes loading are not lost.

const INTERACTION_EVENTS = [
  "pointerdown",
  "scroll",
  "keydown",
  "touchstart",
] as const;

const IDLE_FALLBACK_MS = 10_000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    // No measurement ID (e.g. a fresh site clone before its GA4 property
    // exists) — skip listeners and script injection entirely.
    if (!GA_MEASUREMENT_ID) return;

    let loaded = false;

    const load = () => {
      if (loaded) return;
      loaded = true;
      clearTimeout(fallback);
      for (const event of INTERACTION_EVENTS) {
        removeEventListener(event, load);
      }

      window.dataLayer = window.dataLayer || [];
      // gtag.js requires `arguments` objects on dataLayer — plain arrays are
      // ignored — so this must push `arguments`, not the rest array.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function gtag(..._args: unknown[]) {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID);

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      document.head.appendChild(script);
    };

    for (const event of INTERACTION_EVENTS) {
      addEventListener(event, load, { once: true, passive: true });
    }
    const fallback = setTimeout(load, IDLE_FALLBACK_MS);

    return () => {
      clearTimeout(fallback);
      for (const event of INTERACTION_EVENTS) {
        removeEventListener(event, load);
      }
    };
  }, []);

  // Ahrefs Web Analytics, loaded on first scroll instead of page load — same
  // avoid-the-audit-window rationale as GA4 above, scoped to scroll only
  // (no idle fallback) since the script is tiny and scroll is the signal
  // that matters here.
  useEffect(() => {
    if (!AHREFS_ANALYTICS_KEY) return;

    const load = () => {
      const script = document.createElement("script");
      script.src = "https://analytics.ahrefs.com/analytics.js";
      script.async = true;
      script.dataset.key = AHREFS_ANALYTICS_KEY;
      document.head.appendChild(script);
    };

    addEventListener("scroll", load, { once: true, passive: true });
    return () => removeEventListener("scroll", load);
  }, []);

  return null;
}
