"use client";

import { useEffect } from "react";

// CSS alone can't open a <details> from a URL hash — :target styles it but
// never sets the `open` attribute. This tiny effect opens the targeted
// accordion item on load and on hash navigation, so nav deep-links like
// /dumpster-sizes#do-i-need-a-bigger-dumpster-for-roofing-shingles land on an
// OPEN answer instead of a closed box. No-op when the hash targets a heading.
export default function AnchorOpener() {
  useEffect(() => {
    const openTarget = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "start" });
      }
    };
    openTarget();
    window.addEventListener("hashchange", openTarget);
    return () => window.removeEventListener("hashchange", openTarget);
  }, []);
  return null;
}
