"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { PHONE_DISPLAY, PHONE_HREF, AREA_NAME } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

// Cloudflare Turnstile (gates.yaml build.form_spam_gate, added 2026-08-03):
// bot-protection layer beyond the honeypot. NEXT_PUBLIC_ prefix required for
// a client-visible env var to be inlined at build time — the sitekey is
// public by design (like the GA4 measurement ID), unlike the secret key
// which stays server-only in app/api/lead/route.ts.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => string;
      getResponse: (widgetId?: string) => string | undefined;
      reset: (widgetId?: string) => void;
    };
  }
}

// WebMCP (Chrome origin trial): when an agent invokes the form tool, the
// SubmitEvent carries agentInvoked + respondWith so we can hand the outcome
// back to the agent. Not yet in TS DOM types.
type AgentSubmitEvent = SubmitEvent & {
  agentInvoked?: boolean;
  respondWith?: (result: Promise<unknown>) => void;
};

// Declarative WebMCP annotations (see docs/DECISIONS.md). Nonstandard
// lowercase attributes: React passes them through to the DOM, but TSX types
// reject them inline — hence the spread objects.
const FORM_TOOL_ATTRS = {
  toolname: "requestRoofInspection",
  tooldescription: `Request a free roof inspection connection for an address in the ${AREA_NAME} area — a leak, storm damage, aging roof, or inspection question. Submitting shares the customer's contact details with one insured local roofing professional who will call or email. Only use this with the customer's consent to be contacted.`,
  toolautosubmit: "",
};

const PARAM_DESC = {
  phone: {
    toolparamdescription:
      "Customer's phone number (required) — the roofing professional calls this number.",
  },
  city: {
    toolparamdescription: `City or neighborhood in the ${AREA_NAME} area, e.g. Pittsburgh, Mt. Lebanon, or Bethel Park.`,
  },
  details: {
    toolparamdescription:
      "Short description of the concern, e.g. a ceiling stain, missing shingles after wind, or an aging roof.",
  },
  honeypot: {
    toolparamdescription: "Anti-spam field — always leave this blank.",
  },
};

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/30";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [turnstileScriptLoaded, setTurnstileScriptLoaded] = useState(false);

  // Render the widget once the Cloudflare script has loaded and the
  // container exists. Managed mode runs its risk check silently in the
  // background for the large majority of visitors — no click/checkbox
  // required — so this never adds a visible step to the normal flow.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !turnstileScriptLoaded || widgetIdRef.current) return;
    if (!window.turnstile || !turnstileContainerRef.current) return;
    widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "light",
    });
  }, [turnstileScriptLoaded]);

  // Cloudflare auto-injects a hidden `cf-turnstile-response` input into any
  // <form> ancestor of the rendered widget, so FormData picks the token up
  // for free in the common case. This just guards the race where a fast
  // submit (WebMCP's toolautosubmit fires immediately) beats the managed
  // check completing — poll getResponse() briefly rather than block forever.
  async function waitForTurnstileToken(timeoutMs = 2500): Promise<string> {
    if (!TURNSTILE_SITE_KEY) return "";
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      const token = window.turnstile?.getResponse(widgetIdRef.current);
      if (token) return token;
      await new Promise((r) => setTimeout(r, 100));
    }
    return "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Belt-and-suspenders: make sure a completed token rides along even if
    // the hidden-field DOM update hadn't landed yet when FormData read it.
    const turnstileToken = await waitForTurnstileToken();
    if (turnstileToken) data["cf-turnstile-response"] = turnstileToken;

    const send = (async () => {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
    })();

    // WebMCP: report the outcome back to the invoking agent. Must be wired up
    // synchronously (before the first await) while the event is being dispatched.
    const native = e.nativeEvent as AgentSubmitEvent;
    if (native.agentInvoked && typeof native.respondWith === "function") {
      native.respondWith(
        send.then(
          () =>
            `Inspection request received. An insured local roofing professional will contact ${data.name}.`,
          () =>
            `The request could not be sent. Ask the customer to call ${PHONE_DISPLAY} instead.`
        )
      );
    }

    try {
      await send;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-teal-200 bg-white p-6 text-center shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900">
          Request received — thank you!
        </h2>
        <p className="mt-2 text-slate-700">
          An insured local roofing professional will reach out shortly to
          arrange your free inspection. Need it sooner? Call{" "}
          <a href={PHONE_HREF} className="font-bold text-teal-700 underline">
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      {...FORM_TOOL_ATTRS}
    >
      <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
        Get Your Free Inspection
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Tell us what&rsquo;s going on — or call{" "}
        <a href={PHONE_HREF} className="font-bold text-teal-700 underline">
          {PHONE_DISPLAY}
        </a>
        .
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="text-sm font-semibold text-slate-800">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lead-phone" className="text-sm font-semibold text-slate-800">
            Phone
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={inputClass}
            {...PARAM_DESC.phone}
          />
        </div>
        <div>
          <label htmlFor="lead-email" className="text-sm font-semibold text-slate-800">
            Email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="lead-city" className="text-sm font-semibold text-slate-800">
            City / Neighborhood
          </label>
          <input
            id="lead-city"
            name="city"
            type="text"
            autoComplete="address-level2"
            className={inputClass}
            {...PARAM_DESC.city}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="lead-details" className="text-sm font-semibold text-slate-800">
            What&rsquo;s going on?
          </label>
          <textarea
            id="lead-details"
            name="details"
            rows={4}
            placeholder="Ceiling stain after rain, missing shingles after wind, or inspection for a home purchase."
            className={inputClass}
            {...PARAM_DESC.details}
          />
        </div>
      </div>

      {/* Honeypot — humans never see or fill this. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="lead-company-website">Company website</label>
        <input
          id="lead-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...PARAM_DESC.honeypot}
        />
      </div>

      {/* Cloudflare Turnstile — managed mode runs silently for the vast
          majority of visitors; no visible checkbox or challenge in the
          normal case. Absent entirely (container stays empty) if the site
          key isn't configured, so the form still works before provisioning. */}
      {TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
            onLoad={() => setTurnstileScriptLoaded(true)}
          />
          <div ref={turnstileContainerRef} className="mt-4" />
        </>
      )}

      {status === "error" && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-800">
          Something went wrong sending your request. Please call{" "}
          <a href={PHONE_HREF} className="underline">
            {PHONE_DISPLAY}
          </a>{" "}
          instead — the inspection is still free.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 w-full rounded-md bg-amber-500 px-6 py-3.5 text-base font-extrabold text-slate-900 hover:bg-amber-600 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Request My Free Inspection"}
      </button>
      <p className="mt-3 text-sm text-slate-600">
        Your details go to one local pro — no spam, no obligation.
      </p>
    </form>
  );
}
