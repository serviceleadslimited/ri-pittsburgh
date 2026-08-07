import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";

export default function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 md:hidden">
      <a
        href={PHONE_HREF}
        className="bg-amber-500 py-3.5 text-center text-sm font-extrabold text-slate-900"
      >
        Call {PHONE_DISPLAY}
      </a>
      <a
        href="#quote"
        className="bg-slate-900 py-3.5 text-center text-sm font-extrabold text-white"
      >
        Get Free Inspection
      </a>
    </div>
  );
}
