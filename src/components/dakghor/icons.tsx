import type { SVGProps } from "react";

/**
 * A small, consistent postal-inspired icon set.
 * All icons share the same stroke weight and proportions.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconEnvelope(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M3 6.5 12 13l9-6.5" />
    </svg>
  );
}

export function IconEnvelopeOpen(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 9.5 12 3.5l9.5 6V19a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1Z" />
      <path d="m2.5 19 7-6" />
      <path d="m21.5 19-7-6" />
    </svg>
  );
}

export function IconSeal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2v9.6M8.3 9.2l7.4 5.6M15.7 9.2l-7.4 5.6" />
    </svg>
  );
}

export function IconFeather(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 3.5c-6 0-14 3-16 12.5" />
      <path d="M20.5 3.5c0 8-5 14-10 16-1.7.6-4 .5-5-.5-1-1-1.1-3.3-.5-5C7 9 13 4 20.5 3.5Z" />
      <path d="M4 20 9 15" />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="4.5" cy="6" r="1.8" />
      <circle cx="19.5" cy="18" r="1.8" />
      <path d="M6.3 6h6.2a4 4 0 0 1 4 4v0a4 4 0 0 0 4 4h.8" strokeDasharray="2.5 3.5" />
    </svg>
  );
}

export function IconMailbox(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11.5A5.5 5.5 0 0 1 9.5 6H16a5.5 5.5 0 0 1 0 11H4Z" />
      <path d="M4 11.5V17" />
      <path d="M9 6V3.5" />
      <circle cx="16.5" cy="11.3" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16" />
      <path d="M14 6l6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 6.5h17" />
      <path d="M3.5 12h17" />
      <path d="M3.5 17.5h17" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 5l14 14" />
      <path d="M19 5 5 19" />
    </svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="8.5" y="8.5" width="12" height="12" rx="1.5" />
      <path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 5v10A1.5 1.5 0 0 0 4 16.5h3.5" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 12.5 5.5 5.5L20 7" />
    </svg>
  );
}

export function IconArchive(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="5" rx="1" />
      <path d="M4.5 9v9a1.5 1.5 0 0 0 1.5 1.5h12A1.5 1.5 0 0 0 19.5 18V9" />
      <path d="M10 13h4" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-6.5-6-6.5-11.2A6.5 6.5 0 0 1 12 3a6.5 6.5 0 0 1 6.5 6.8C18.5 15 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.2" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2.5 12h3M18.5 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.3-4 4-6 7.5-6s6.2 2 7.5 6" />
    </svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10Z" />
      <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13 4h4a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 17 20h-4" />
      <path d="M3.5 12h11.5" />
      <path d="m11 8 4 4-4 4" />
    </svg>
  );
}
