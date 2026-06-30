export type Field = "Military" | "Railway";

export type Principal = {
  slug: string;
  name: string;
  field: Field;
  origin: string;
  tagline: string;
  description: string;
  products: string[];
  website: string;
  logo?: string;
};

/** Logo path for a principal (stored in /public/principals). */
export const principalLogo = (slug: string) => `/principals/${slug}.png`;

export const principals: Principal[] = [
  /* ----------------------- MILITARY ----------------------- */
  {
    slug: "swiss-p",
    website: "https://swiss-p.com",
    name: "Swiss P",
    field: "Military",
    origin: "Switzerland",
    tagline: "Precision rifle & service ammunition",
    description:
      "Swiss P is a renowned Swiss manufacturer of premium small-calibre ammunition. Its match-grade sniper, armour-piercing and service rounds are trusted by armed forces and law-enforcement units worldwide for their consistency and accuracy.",
    products: [
      "Sniper & match-grade ammunition",
      "Armour-piercing rounds",
      "Ball & service ammunition",
      "Special-purpose calibres",
    ],
  },
  {
    slug: "mfs",
    website: "https://mfs-ammunition.com",
    name: "MFS",
    field: "Military",
    origin: "Hungary",
    tagline: "Small-calibre ammunition since 1952",
    description:
      "MFS is a long-established Hungarian ammunition manufacturer producing reliable small-calibre cartridges for military, police and sporting applications, with decades of proven manufacturing heritage.",
    products: [
      "5.56mm, 7.62mm & 9mm cartridges",
      "Training & ball ammunition",
      "Brass and steel-case rounds",
      "Law-enforcement calibres",
    ],
  },
  {
    slug: "mehler",
    website: "https://mehler-systems.com",
    name: "Mehler Protection",
    field: "Military",
    origin: "Germany",
    tagline: "Ballistic protection systems",
    description:
      "Mehler Protection is a leading European and global provider of high-quality ballistic protection systems. Its portfolio covers body armour, helmets, shields and platform protection for police, security, military and special forces.",
    products: [
      "Ballistic body armour",
      "Combat helmets",
      "Ballistic shields",
      "Vehicle & platform protection",
    ],
  },
  {
    slug: "eickhorn",
    website: "https://eickhorn-solingen.de",
    name: "Eickhorn-Solingen",
    field: "Military",
    origin: "Germany",
    tagline: "Military knives & bayonets",
    description:
      "Eickhorn-Solingen has manufactured professional edged weapons for more than 150 years. Military, police and rescue units around the world rely on its high-tech knives and bayonets produced in Solingen.",
    products: [
      "Combat & survival knives",
      "Bayonets",
      "Rescue tools",
      "Special-forces edged weapons",
    ],
  },
  {
    slug: "blucher",
    website: "https://www.bluecher.com",
    name: "Blücher · SARATOGA",
    field: "Military",
    origin: "Germany",
    tagline: "CBRN protective clothing",
    description:
      "Blücher develops SARATOGA CBRN protective clothing, protected by over 350 patents. Its garments are relied upon by military, civil-defence, fire and police forces, as well as international organisations including the OPCW.",
    products: [
      "SARATOGA CBRN protective suits",
      "Protective gloves & footwear",
      "Filtration garments",
      "Civil-defence protection",
    ],
  },
  {
    slug: "karcher-futuretech",
    website: "https://www.kaercher-futuretech.com",
    name: "Kärcher Futuretech",
    field: "Military",
    origin: "Germany",
    tagline: "CBRN decontamination & field systems",
    description:
      "Kärcher Futuretech develops and manufactures specialised systems for military, civil-defence and disaster-relief operations — providing mobile, efficient solutions for CBRN protection, water supply, catering and field-camp systems.",
    products: [
      "CBRN decontamination systems",
      "Mobile water treatment",
      "Field catering systems",
      "Deployable camp systems",
    ],
  },
  {
    slug: "saes",
    website: "https://www.electronica-submarina.com",
    name: "SAES",
    field: "Military",
    origin: "Spain",
    tagline: "Underwater & naval defence electronics",
    description:
      "SAES specialises in underwater acoustics and naval defence electronics, delivering sonar systems, acoustic measurement ranges and torpedo-defence solutions for navies and maritime forces.",
    products: [
      "Sonar systems",
      "Acoustic measurement ranges",
      "Torpedo countermeasures",
      "Naval signature management",
    ],
  },
  {
    slug: "bruker",
    website: "https://www.bruker.com",
    name: "Bruker",
    field: "Military",
    origin: "Germany",
    tagline: "CBRNE detection instrumentation",
    description:
      "Bruker invests heavily in research and development to deliver high-end CBRNE detection instrumentation, including mobile gas chromatography / mass spectrometry, ion-mobility spectrometry and radiological detection.",
    products: [
      "Mobile GC/MS",
      "Ion-mobility spectrometry (IMS)",
      "Passive FT-IR spectrometry",
      "Radiological detection",
    ],
  },
  {
    slug: "bruhn-newtech",
    website: "https://www.bruhn-newtech.com",
    name: "Bruhn NewTech",
    field: "Military",
    origin: "Denmark",
    tagline: "CBRN information management",
    description:
      "Bruhn NewTech is a global leader in CBRN information-management software, enabling armed forces to detect, warn, report and manage hazards across the battle-space and integrate the response into command-and-control systems.",
    products: [
      "CBRN management software",
      "Hazard warning & reporting",
      "Command & control integration",
      "Decision-support tools",
    ],
  },
  {
    slug: "hutchinson",
    website: "https://www.hutchinson.com",
    name: "Hutchinson",
    field: "Military",
    origin: "France",
    tagline: "Tactical runflat systems",
    description:
      "Hutchinson has provided runflat systems to the military and security markets since 1926. Its family of tactical runflats is relied upon worldwide to ensure mobility and safety in all-terrain and combat situations.",
    products: [
      "Lightweight runflats",
      "Heavy-duty tactical runflats",
      "Ballistic & impact-resistant wheels",
      "Mobility systems",
    ],
  },
  {
    slug: "argo",
    website: "https://argoxtv.com",
    name: "ARGO",
    field: "Military",
    origin: "Canada",
    tagline: "Amphibious extreme-terrain vehicles",
    description:
      "ARGO builds amphibious and extreme-terrain vehicles (ATVs / XTVs / UGVs) capable of travelling on land and water. Engineered for rugged terrain, swamp, snow and water, they serve rescue, utility, industrial and defence roles.",
    products: [
      "Amphibious XTVs",
      "Unmanned ground vehicles (UGV)",
      "Rescue & emergency platforms",
      "Utility & support vehicles",
    ],
  },
  {
    slug: "cts",
    website: "https://www.combinedsystems.com",
    name: "Combined Tactical Systems",
    field: "Military",
    origin: "USA",
    tagline: "Less-lethal munitions & launching systems",
    description:
      "Combined Tactical Systems (CTS) is a recognised leader in the design and manufacture of less-lethal munitions and launching systems for riot control, police tactical teams, corrections officers and military units.",
    products: [
      "Less-lethal munitions",
      "Launching systems",
      "Distraction devices",
      "Riot-control equipment",
    ],
  },
  {
    slug: "airboss-defense",
    website: "https://www.adg.com",
    name: "AirBoss Defense",
    field: "Military",
    origin: "Canada",
    tagline: "CBRN personal protection",
    description:
      "AirBoss Defense designs and manufactures CBRN personal-protective equipment and survivability solutions — including respirators, gloves, boots and protective systems for military forces and first responders.",
    products: [
      "CBRN respirators & masks",
      "Protective gloves & footwear",
      "Survivability systems",
      "Casualty management equipment",
    ],
  },
  {
    slug: "kent-periscopes",
    website: "https://www.kentperiscopes.co.uk",
    name: "Kent Periscopes",
    field: "Military",
    origin: "United Kingdom",
    tagline: "Electro-optical periscopes & sights",
    description:
      "Kent Periscopes designs and delivers electro-optical periscopes and sighting systems for new strategic-vehicle programmes, vehicle-upgrade programmes and urgent operational requirements, including repair and refurbishment.",
    products: [
      "Driver & commander periscopes",
      "Optical & electro-optical sights",
      "Vehicle-upgrade optics",
      "Repair & refurbishment",
    ],
  },

  /* ----------------------- RAILWAY ----------------------- */
  {
    slug: "nencki",
    website: "https://www.nencki-railway.ch",
    name: "Nencki",
    field: "Railway",
    origin: "Switzerland",
    tagline: "Bogie & wheelset maintenance systems",
    description:
      "Nencki is a Swiss specialist in railway depot equipment, supplying bogie exchange, wheelset handling and rolling-stock lifting systems that keep maintenance operations safe and efficient.",
    products: [
      "Bogie exchange systems",
      "Wheelset handling equipment",
      "Lifting & maintenance systems",
      "Depot equipment",
    ],
  },
  {
    slug: "aquafrisch",
    website: "https://www.aquafrisch.com",
    name: "Aquafrisch",
    field: "Railway",
    origin: "Spain",
    tagline: "Train washing & water treatment",
    description:
      "Aquafrisch supplies train-washing plants together with water-recycling and wastewater-treatment systems for rolling-stock depots, helping operators meet hygiene and environmental standards.",
    products: [
      "Train washing plants",
      "Water recycling systems",
      "Wastewater treatment",
      "Depot water management",
    ],
  },
  {
    slug: "niteq",
    website: "https://niteq.nl",
    name: "NiTEQ",
    field: "Railway",
    origin: "Netherlands",
    tagline: "Traction energy & charging systems",
    description:
      "NiTEQ delivers energy and fast-charging systems for electric rail and transport fleets, supporting reliable, efficient depot and operational power solutions.",
    products: [
      "Fast-charging systems",
      "Traction energy storage",
      "Depot power solutions",
      "Energy management",
    ],
  },
  {
    slug: "robel",
    website: "https://www.robel.com",
    name: "ROBEL",
    field: "Railway",
    origin: "Germany",
    tagline: "Track maintenance machines & tools",
    description:
      "ROBEL manufactures track-maintenance machines and power tools for the construction, repair and inspection of railway infrastructure, combining precision engineering with field-proven reliability.",
    products: [
      "Track maintenance machines",
      "Rail power tools",
      "Welding & grinding equipment",
      "Inspection systems",
    ],
  },
  {
    slug: "holmatro",
    website: "https://www.holmatro.com",
    name: "Holmatro",
    field: "Railway",
    origin: "Netherlands",
    tagline: "Hydraulic rescue & re-railing",
    description:
      "Holmatro provides hydraulic re-railing and rescue equipment used to recover rolling stock and respond to rail incidents quickly and safely, with powerful lifting and pulling systems.",
    products: [
      "Re-railing equipment",
      "Hydraulic rescue tools",
      "Lifting & pulling systems",
      "Incident-response kits",
    ],
  },
  {
    slug: "cenzin-pgz",
    website: "https://www.cenzin.com.pl",
    name: "CENZIN (PGZ)",
    field: "Railway",
    origin: "Poland",
    tagline: "Defence & rail supply — PGZ Group",
    description:
      "CENZIN, part of the Polish Armaments Group (PGZ), is an established export-import company supplying defence and railway equipment and integrated solutions to government and industrial customers.",
    products: [
      "Defence & rail equipment supply",
      "Integrated solutions",
      "Trade & logistics",
      "Lifecycle support",
    ],
  },
  {
    slug: "wintec",
    website: "https://wintec-process.de",
    name: "Wintec",
    field: "Railway",
    origin: "Germany",
    tagline: "Rail maintenance & servicing systems",
    description:
      "Wintec supplies maintenance, servicing and cleaning systems for rolling stock and railway depots, supporting operators with dependable equipment for day-to-day fleet upkeep.",
    products: [
      "Depot maintenance systems",
      "Cleaning & servicing equipment",
      "Rolling-stock upkeep solutions",
      "Technical support",
    ],
  },
];

export const militaryPrincipals = principals.filter((p) => p.field === "Military");
export const railwayPrincipals = principals.filter((p) => p.field === "Railway");

export const getPrincipal = (slug: string) =>
  principals.find((p) => p.slug === slug);
