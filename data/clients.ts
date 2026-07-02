export type TrustedClient = {
  slug: string;
  name: string;
  logo?: string;
  type: "logo" | "badge";
  badgeText?: string;
};

export const clientLogo = (slug: string) => `/clients/${slug}.png`;

export const clientsSectionHeading =
  "Trusted by Malaysia's defence & enforcement community";

export const fallbackClients: TrustedClient[] = [
  { slug: "army", name: "Malaysian Army", type: "logo" },
  { slug: "navy", name: "Royal Malaysian Navy", type: "logo" },
  { slug: "airforce", name: "Royal Malaysian Air Force", type: "logo" },
  { slug: "police", name: "Royal Malaysia Police", type: "logo" },
  { slug: "mmea", name: "Maritime Enforcement Agency", type: "logo" },
  { slug: "esscom", name: "Eastern Sabah Security Command", type: "logo" },
];
