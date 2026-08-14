export type ClientSector = "Military" | "Railway";

export type TrustedClient = {
  slug: string;
  name: string;
  logo?: string;
  type: "logo" | "badge";
  badgeText?: string;
  field?: ClientSector | string;
  description?: string;
  website?: string;
  featured?: boolean;
  featuredLabel?: string;
};

export const clientLogo = (slug: string) => `/clients/${slug}.png`;

export const railwayClientLogo = (slug: string) =>
  `/railway-customers/${slug}.png`;

export const clientsSectionHeading =
  "Trusted by Malaysia's defence & enforcement community";

export const railwayClientsSectionHeading = "Current Customers";

export const fallbackClients: TrustedClient[] = [
  {
    slug: "army",
    name: "Malaysian Army",
    type: "logo",
    field: "Military",
    description: "Land forces of the Malaysian Armed Forces",
  },
  {
    slug: "navy",
    name: "Royal Malaysian Navy",
    type: "logo",
    field: "Military",
    description: "Naval forces of the Malaysian Armed Forces",
  },
  {
    slug: "airforce",
    name: "Royal Malaysian Air Force",
    type: "logo",
    field: "Military",
    description: "Air forces of the Malaysian Armed Forces",
  },
  {
    slug: "police",
    name: "Royal Malaysia Police",
    type: "logo",
    field: "Military",
    description: "National policing and public security",
  },
  {
    slug: "mmea",
    name: "Maritime Enforcement Agency",
    type: "logo",
    field: "Military",
    description: "Malaysia Maritime Enforcement Agency",
  },
  {
    slug: "esscom",
    name: "Eastern Sabah Security Command",
    type: "logo",
    field: "Military",
    description: "Eastern Sabah Security Command",
  },
  {
    slug: "atn",
    name: "Angkatan Tentera Malaysia",
    type: "logo",
    field: "Military",
    description: "Angkatan Tentera Malaysia",
  },
  {
    slug: "bomba",
    name: "Fire and Rescue Department of Malaysia",
    type: "logo",
    field: "Military",
    description: "Fire and Rescue Department of Malaysia",
  },
];

export const fallbackRailwayClients: TrustedClient[] = [
  {
    slug: "lrt3",
    name: "LRT 3",
    type: "logo",
    field: "Railway",
    description: "Light Rapid Transit Line 3",
    website: "https://lrt3.com.my",
    logo: "/railway-customers/lrt3.png",
  },
  {
    slug: "kl-monorail",
    name: "KL Monorail",
    type: "logo",
    field: "Railway",
    description: "Kuala Lumpur Urban Monorail",
    website: "https://myrapid.com.my",
    logo: "/railway-customers/kl-monorail.png",
  },
  {
    slug: "klia-ekspres",
    name: "KLIA Ekspres",
    type: "logo",
    field: "Railway",
    description: "Express Rail Link to KLIA",
    website: "https://kliaekspres.com",
    logo: "/railway-customers/klia-ekspres.png",
  },
  {
    slug: "rapid-rail",
    name: "Rapid Rail",
    type: "logo",
    field: "Railway",
    description: "Urban Rail Operations",
    website: "https://rapidrail.com.my",
    logo: "/railway-customers/rapid-rail.png",
  },
  {
    slug: "mrt-corp",
    name: "MRT Corp",
    type: "logo",
    field: "Railway",
    description: "Mass Rapid Transit Corp.",
    website: "https://mrt.com.my",
    logo: "/railway-customers/mrt-corp.png",
  },
  {
    slug: "prasarana",
    name: "Prasarana Malaysia Berhad",
    type: "logo",
    field: "Railway",
    description:
      "Malaysia's national integrated public transport corporation, operating urban rail and bus networks across the Klang Valley, including LRT, MRT, Monorail and BRT lines serving millions of daily commuters.",
    website: "https://www.prasarana.com.my",
    logo: "/railway-customers/prasarana.png",
  },
  {
    slug: "ktmb",
    name: "KTMB",
    type: "logo",
    field: "Railway",
    description: "Keretapi Tanah Melayu Berhad, Malaysia's national railway operator",
    website: "https://www.ktmb.com.my",
    logo: "/railway-customers/ktmb.png",
  },
];
