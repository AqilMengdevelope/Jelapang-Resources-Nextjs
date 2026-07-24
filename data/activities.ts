import type { GallerySlide } from "@/data/military-gallery";

export type ActivityCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WorkKind = "project" | "activity";

export type Activity = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featuredImage: string;
  gallery: GallerySlide[];
  order: number;
  categories: ActivityCategory[];
  kind: WorkKind;
};

function activityImagePath(slug: string, file: string): string {
  return `/activities/${slug}/${encodeURIComponent(file)}`;
}

function activityGallery(
  slug: string,
  files: readonly string[],
  altPrefix: string
): GallerySlide[] {
  return files.map((file, index) => ({
    image: activityImagePath(slug, file),
    alt: `${altPrefix} photo ${index + 1}`,
  }));
}

function activityEntry(
  id: number,
  title: string,
  slug: string,
  excerpt: string,
  files: readonly string[],
  order: number,
  kind: WorkKind = "project"
): Activity {
  return {
    id,
    title,
    slug,
    excerpt,
    featuredImage: activityImagePath(slug, files[0]),
    gallery: activityGallery(slug, files, title),
    order,
    categories: [{ id, name: title, slug }],
    kind,
  };
}

const MRT_NITEQ_FILES = [
  "IMG_2956.jpg",
  "IMG_2957.jpg",
  "IMG_9756.jpg",
  "IMG_9757.jpg",
  "IMG_9758.jpg",
  "IMG_9759.jpg",
  "IMG_9760.jpg",
  "IMG_9761.jpg",
  "IMG_9762.jpg",
  "IMG_9763.jpg",
  "IMG_9804.jpg",
  "IMG_9805.jpg",
  "IMG_9808.jpg",
  "IMG_9813.jpg",
  "IMG_9814.jpg",
  "IMG_9915.jpg",
] as const;

const BOGGIE_FILES = [
  "IMG_0389.jpg",
  "IMG_2092.jpg",
  "IMG_2158.jpg",
  "IMG_5866.jpg",
  "IMG_5867.jpg",
  "IMG_5868.jpg",
] as const;

const INSPECTION_VEHICLE_FILES = [
  "IMG_9445.jpg",
  "IMG_9449.jpg",
  "IMG_9451.jpg",
  "IMG_9456.jpg",
] as const;

const LR2_KJ_LINE_FILES = [
  "IMG_2305.JPG",
  "IMG_2951.jpg",
  "IMG_3684.JPG",
  "IMG_3685.JPG",
  "IMG_3686.JPG",
  "IMG_3687.JPG",
  "IMG_3688.JPG",
  "IMG_4029.JPG",
  "IMG_4030.JPG",
  "IMG_5121.JPG",
  "IMG_5122.JPG",
  "IMG_6676.JPG",
] as const;

const TRAIN_WASH_ATWP_FILES = [
  "IMG_0001.jpg",
  "IMG_0011.jpg",
  "IMG_0642.jpg",
  "IMG_0643.jpg",
  "IMG_9155.jpg",
  "IMG_9885.jpg",
  "IMG_9904.jpg",
  "IMG_9948.jpg",
  "IMG_9956.jpg",
  "IMG_9970.jpg",
  "IMG_9973.jpg",
] as const;

const ELECTRIC_MINI_SHUNTER_FILES = [
  "WhatsApp Image 2024-04-02 at 13.37.08 (1).jpeg",
  "WhatsApp Image 2024-04-02 at 13.37.08.jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (1).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (10).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (2).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (3).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (4).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (5).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (6).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (7).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (8).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25 (9).jpeg",
  "WhatsApp Image 2024-04-02 at 13.41.25.jpeg",
] as const;

const LOAD_GAUGE_FILES = [
  "WhatsApp Image 2024-04-04 at 14.16.47.jpeg",
  "WhatsApp Image 2024-04-04 at 14.16.48.jpeg",
] as const;

const SCOTCH_CLAMP_FILES = [
  "WhatsApp Image 2024-04-02 at 13.42.48 (3).jpeg",
  "WhatsApp Image 2024-04-02 at 13.42.48 (4).jpeg",
  "WhatsApp Image 2024-04-02 at 13.42.48 (5).jpeg",
] as const;

const SCD_FILES = [
  "WhatsApp Image 2024-04-02 at 13.44.09 (1).jpeg",
  "WhatsApp Image 2024-04-02 at 13.44.09 (2).jpeg",
  "WhatsApp Image 2024-04-02 at 13.44.09.jpeg",
  "WhatsApp Image 2024-04-04 at 14.03.07.jpeg",
] as const;

const STOP_MARKER_FILES = [
  "WhatsApp Image 2024-04-02 at 13.43.21.jpeg",
  "WhatsApp Image 2024-04-04 at 14.03.08.jpeg",
  "WhatsApp Image 2024-04-04 at 14.04.45.jpeg",
  "WhatsApp Image 2024-04-04 at 14.04.46.jpeg",
] as const;

const TRAIN_WASH_PLANT_FILES = [
  "WhatsApp Image 2024-04-02 at 13.45.02 (4).jpeg",
  "WhatsApp Image 2024-04-02 at 13.45.02 (5).jpeg",
  "WhatsApp Image 2024-04-02 at 13.47.47 (1).jpeg",
  "WhatsApp Image 2024-04-02 at 13.47.47 (2).jpeg",
  "WhatsApp Image 2024-04-02 at 13.47.47 (3).jpeg",
  "WhatsApp Image 2024-04-02 at 13.47.47.jpeg",
  "WhatsApp Image 2024-04-02 at 13.48.19.jpeg",
] as const;

const RAIL_DAMPER_KJ_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
] as const;

const ESSCOM_TRAINING_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
] as const;

const SIDEX_2025_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
] as const;

const BANGKOK_2025_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
] as const;

const EUROSATORY_2026_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
] as const;

const DSA_2026_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
] as const;

const FIRING_TEST_GOV_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
] as const;

const PRODUCT_TESTING_ESSCOM_LAHAD_DATU_FILES = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
] as const;

export const fallbackActivities: Activity[] = [
  activityEntry(
    1,
    "MRT Niteq",
    "mrt-niteq",
    "NiTEQ depot systems and workshop equipment delivery for MRT operations in Malaysia.",
    MRT_NITEQ_FILES,
    0
  ),
  activityEntry(
    2,
    "Boggie Press Machine Lrt3",
    "boggie-press-machine-lrt3",
    "Boggie press machine supply and commissioning for LRT3 rolling-stock maintenance.",
    BOGGIE_FILES,
    1
  ),
  activityEntry(
    3,
    "Inspection Vehicle",
    "inspection-vehicle",
    "Rail inspection vehicle supply and commissioning for depot and trackside maintenance programmes.",
    INSPECTION_VEHICLE_FILES,
    2
  ),
  activityEntry(
    4,
    "LR2 KJ Line",
    "lr2-kj-line",
    "Workshop and depot equipment delivery for the LR2 Kelana Jaya line upgrade programme.",
    LR2_KJ_LINE_FILES,
    3
  ),
  activityEntry(
    5,
    "Automatic Train Wash Plant (ATWP)",
    "train-wash-plan-atwp",
    "Train wash plant design, supply and installation for ATWP depot operations.",
    TRAIN_WASH_ATWP_FILES,
    4
  ),
  activityEntry(
    6,
    "Electric Mini Shunter",
    "electric-mini-shunter",
    "Electric mini shunter supply and commissioning for depot shunting and rolling-stock positioning.",
    ELECTRIC_MINI_SHUNTER_FILES,
    5
  ),
  activityEntry(
    9,
    "Load Gauge",
    "load-gauge",
    "Load gauge equipment supply for rolling-stock clearance and loading verification.",
    LOAD_GAUGE_FILES,
    8
  ),
  activityEntry(
    10,
    "Scotch and Clamp",
    "scotch-and-clamp",
    "Scotch block and rail clamp supply for rolling-stock securing and depot safety operations.",
    SCOTCH_CLAMP_FILES,
    9
  ),
  activityEntry(
    11,
    "Short Circuit Device (SCD)",
    "short-circuit-device-scd",
    "Short circuit device (SCD) supply for electrified rail maintenance and safety isolation.",
    SCD_FILES,
    10
  ),
  activityEntry(
    12,
    "Stop Marker",
    "stop-marker",
    "Stop marker boards and signage supply for depot stabling and platform alignment.",
    STOP_MARKER_FILES,
    11
  ),
  activityEntry(
    13,
    "Train Wash Plant",
    "train-wash-plant",
    "Train wash plant equipment supply, installation and commissioning for depot fleet cleaning.",
    TRAIN_WASH_PLANT_FILES,
    12
  ),
  activityEntry(
    14,
    "Supply and Install Rail Damper for Kelana Jaya Line",
    "rail-damper-kelana-jaya-line",
    "Supply and installation of rail dampers for the Kelana Jaya Line, supporting track performance and ride quality.",
    RAIL_DAMPER_KJ_FILES,
    13
  ),
  activityEntry(
    15,
    "Penghantaran dan training head to toe esscom",
    "penghantaran-training-esscom",
    "Delivery and head-to-toe training for ESSCOM equipment and operational readiness.",
    ESSCOM_TRAINING_FILES,
    14,
    "activity"
  ),
  activityEntry(
    16,
    "Singapore international disaster & emergency management expo SIDEX 2025",
    "sidex-2025",
    "Jelapang presence at SIDEX 2025 in Singapore — international disaster and emergency management expo.",
    SIDEX_2025_FILES,
    15,
    "activity"
  ),
  activityEntry(
    17,
    "Defence security and service Bangkok 2025",
    "defence-security-bangkok-2025",
    "Participation at Defence Security and Service Bangkok 2025, engaging defence and security partners in the region.",
    BANGKOK_2025_FILES,
    16,
    "activity"
  ),
  activityEntry(
    18,
    "Eurosatory Paris 2026",
    "eurosatory-paris-2026",
    "Jelapang at Eurosatory Paris 2026 — global defence and security exhibition engagement.",
    EUROSATORY_2026_FILES,
    17,
    "activity"
  ),
  activityEntry(
    19,
    "Defence Service Asia 2026 - Mitec Malaysia",
    "defence-service-asia-2026",
    "Defence Services Asia 2026 at MITEC Malaysia — showcasing capabilities with industry and defence stakeholders.",
    DSA_2026_FILES,
    18,
    "activity"
  ),
  activityEntry(
    20,
    "Firing test with Government Officers",
    "firing-test-government-officers",
    "Live firing test session conducted with government officers to validate system performance and operational readiness.",
    FIRING_TEST_GOV_FILES,
    19,
    "activity"
  ),
  activityEntry(
    21,
    "Product testing with Esscom at Lahad Datu",
    "product-testing-esscom-lahad-datu",
    "On-site product testing with ESSCOM at Lahad Datu to verify field performance and deployment readiness.",
    PRODUCT_TESTING_ESSCOM_LAHAD_DATU_FILES,
    20,
    "activity"
  ),
];

/**
 * Activity content overrides applied on top of whatever the CMS returns
 * (the CMS is authoritative, so these keep the frontend in sync with edits
 * made in code without needing a CMS update).
 */
export const hiddenActivitySlugs: readonly string[] = ["fencing", "g-clamp"];

/** Event / exhibition / training engagements shown under Activities. */
export const activityKindSlugs: readonly string[] = [
  "penghantaran-training-esscom",
  "sidex-2025",
  "defence-security-bangkok-2025",
  "eurosatory-paris-2026",
  "defence-service-asia-2026",
  "firing-test-government-officers",
  "product-testing-esscom-lahad-datu",
];

export function resolveWorkKind(slug: string): WorkKind {
  return activityKindSlugs.includes(slug) ? "activity" : "project";
}

export function workItemHref(item: Pick<Activity, "slug" | "kind">): string {
  return item.kind === "project"
    ? `/projects/${item.slug}`
    : `/activities/${item.slug}`;
}

export const activityTitleOverrides: Record<string, string> = {
  "train-wash-plan-atwp": "Automatic Train Wash Plant (ATWP)",
};

export const contactSpotlightSlug = "mrt-niteq";

export const projectsHeroSlug = "lr2-kj-line";
export const projectsHeroFile = "IMG_3686.JPG";
export const projectsHeroFallback = activityImagePath(
  projectsHeroSlug,
  projectsHeroFile
);

/** @deprecated Use projectsHero* — kept for existing imports during split. */
export const activitiesHeroSlug = projectsHeroSlug;
export const activitiesHeroFile = projectsHeroFile;
export const activitiesHeroFallback = projectsHeroFallback;

export const eventsHeroSlug = "eurosatory-paris-2026";
export const eventsHeroFile = "01.jpg";
export const eventsHeroFallback = activityImagePath(
  eventsHeroSlug,
  eventsHeroFile
);
