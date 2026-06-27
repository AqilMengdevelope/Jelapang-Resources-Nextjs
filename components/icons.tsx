import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const ShieldIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8.4-7 10-4-1.6-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const RailIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6" y="3" width="12" height="13" rx="2.5" />
    <path d="M6 11h12M9 16l-2 4M15 16l2 4M9.5 20h5" />
    <circle cx="9" cy="7" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15" cy="7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

export const ChipIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3" />
  </svg>
);

export const BoltIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

export const StarIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l2.6 5.7 6.2.7-4.6 4.2 1.3 6.1L12 16.9 6.5 19.7l1.3-6.1L3.2 9.4l6.2-.7L12 3z" />
  </svg>
);

export const TargetIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

export const GlobeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
  </svg>
);

export const HandshakeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 8l4-2 5 2 5-2 4 2v7l-4 2-5-2-5 2-4-2V8z" />
    <path d="M12 8v9" />
  </svg>
);

export const LayersIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5M3 16l9 5 9-5" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base} {...p} width={16} height={16}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base} {...p} width={16} height={16}>
    <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base} {...p} width={16} height={16}>
    <path d="M5 4h4l1.5 5-2 1.5a12 12 0 005 5l1.5-2 5 1.5v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base} {...p} width={16} height={16}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const ChevronLeft = (p: IconProps) => (
  <svg {...base} {...p} width={22} height={22}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base} {...p} width={22} height={22}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const MenuIcon = (p: IconProps) => (
  <svg {...base} {...p} width={24} height={24}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base} {...p} width={24} height={24}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
