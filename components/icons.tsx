// Hand-rolled inline icons — no icon library/dependency, matches the
// performance budget (CLAUDE.md: no third-party scripts). 24x24, stroke-based,
// currentColor so size/color are controlled entirely via className.

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export function IconHome({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V16a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V10" />
    </svg>
  );
}

// Logo mark: simple roll-off container silhouette (the service, not the problem).
export function IconShield({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 9.5 6 7.5h12l2.5 2V17a.8.8 0 0 1-.8.8H4.3a.8.8 0 0 1-.8-.8Z" />
      <path d="M3.5 9.5h17M8.5 9.5v8.3M12 9.5v8.3M15.5 9.5v8.3" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 5 6v6c0 5 3.2 7.7 7 8.5 3.8-.8 7-3.5 7-8.5V6l-7-2.5Z" />
      <path d="M9 12l2 2 4-4.5" />
    </svg>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
      <path d="M7.5 13.5h2.5M7.5 17h2.5M13.5 13.5h3M13.5 17h3" />
    </svg>
  );
}

export function IconCheck({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.3 11 15l4.5-6" />
    </svg>
  );
}

export function IconDroplet({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5s6.5 7.1 6.5 11.3a6.5 6.5 0 0 1-13 0C5.5 10.6 12 3.5 12 3.5Z" />
    </svg>
  );
}

export function IconWrench({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-.7-.7-2 2.3-2.9Z" />
    </svg>
  );
}

export function IconBuilding({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="3.5" width="10" height="17" rx="1" />
      <path d="M15 9.5h4v11h-4M8 7.5h.01M11.5 7.5h.01M8 11h.01M11.5 11h.01M8 14.5h.01M11.5 14.5h.01M8 18h3.5" />
    </svg>
  );
}

export function IconAlertCircle({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5" />
      <path d="M12 16.2h.01" />
    </svg>
  );
}

export function IconCalculator({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8 7.5h8" />
      <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01M8 15h.01M12 15h.01M16 15v3.5M8 18.5h.01M12 18.5h.01" />
    </svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconMapPin({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
