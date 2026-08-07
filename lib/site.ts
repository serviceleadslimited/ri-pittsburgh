// Single source of truth for site identity. Future niche-city sites: edit this file.

export const SITE_NAME = "Roof Inspection Pittsburgh";
export const SITE_URL = "https://roofinspectionpittsburgh.com";

export const PHONE_DISPLAY = "(412) 797-5703";
export const PHONE_E164 = "+14127975703";
export const PHONE_HREF = `tel:${PHONE_E164}`;

export const HOURS = "Monday–Saturday, 7am–6pm";

// Short "City, ST" form used in hero eyebrow text, footer copy, and any other
// place that needs "the surrounding X area" phrasing without hardcoding a
// city name into a component. Update alongside CITIES/SITE_NAME per site.
export const AREA_NAME = "Pittsburgh, PA";

// Brand primary for browser chrome (theme-color / msapplication-TileColor).
// Deliberately duplicates the dominant token in app/globals.css @theme — CSS
// tokens aren't readable from the metadata API at build time. If the palette
// ever changes, change BOTH (DECISIONS #19 precedent, mr-chattanooga).
export const THEME_COLOR = "#334155";

// Google Analytics 4. Measurement IDs are public (shipped in client JS by
// design), unlike API keys — safe to hardcode alongside other site config.
// Loaded on first interaction, not at page load (see Analytics.tsx).
// Empty string = analytics fully disabled.
export const GA_MEASUREMENT_ID = "G-1CWY3MC8NM";

// Ahrefs Web Analytics. This public, domain-bound key belongs to the Ahrefs
// Rank Tracker project for roofinspectionpittsburgh.com and is loaded after
// first scroll by Analytics.tsx rather than on initial page load.
export const AHREFS_ANALYTICS_KEY = "+/ZL1VvRgz+UhUi3KKfKpw";

// Chrome WebMCP origin-trial token (developer.chrome.com/origintrials).
// Origin-trial tokens are public by design but bound to one origin. Verified
// Origin-bound token supplied for roofinspectionpittsburgh.com.
export const WEBMCP_ORIGIN_TRIAL_TOKEN =
  "AkbSCYM/SI5sMmJbPQwXzU6GhWG9D2UpMjE0x97FaQz/Vk5cqCTB5vgHUiMw34d8qiSsekT4PBYUmLCLAlBPhQAAAABceyJvcmlnaW4iOiJodHRwczovL3Jvb2ZpbnNwZWN0aW9ucGl0dHNidXJnaC5jb206NDQzIiwiZmVhdHVyZSI6IldlYk1DUCIsImV4cGlyZSI6MTc5NDg3MzYwMH0=";

// Deliberately says "insured" only — this site is a referral service, not a
// contractor, and makes no direct licensing claim.
export const DISCLOSURE =
  "Pittsburgh Roof Inspection is a free referral service that connects customers with an independent local roofing professional. We are not the contractor and do not perform roof inspections or roofing work ourselves. Contractors we refer are insured. Pennsylvania does not issue a single statewide roofing license; contractors must meet applicable registration, insurance, and local requirements. We make no direct licensing claims of our own; see our Terms page for how to verify a contractor's credentials.";

// Metro city list with per-city state — Pittsburgh area for this site.
export const CITIES: { name: string; state: "PA" }[] = [
  { name: "Pittsburgh", state: "PA" },
  { name: "Mt. Lebanon", state: "PA" },
  { name: "Bethel Park", state: "PA" },
  { name: "Monroeville", state: "PA" },
];

export const SERVICES = [
  { label: "Roof Leak Inspection", href: "/roof-leak-inspection" },
  { label: "Storm Damage Inspection", href: "/storm-damage-roof-inspection" },
];

// Service Areas dropdown — no dedicated suburb pages exist for this site
// (none of the suburb keyword candidates — Carlsbad, Poway, Encinitas —
// cleared the ≥40/mo dedicated-page threshold per the manual Ahrefs pull).
export const AREA_NAV = [
  { label: "All Service Areas", href: "/service-areas" },
];

// Flat items shown after the "Services" dropdown in the header, and appended
// after SERVICES in the mobile menu.
export const SECONDARY_NAV = [
  { label: "Cost Guide", href: "/roof-inspection-cost" },
  { label: "Directory", href: "/directory" },
  { label: "Contact", href: "/contact" },
];
