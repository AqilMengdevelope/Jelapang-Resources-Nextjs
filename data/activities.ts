import type { GallerySlide } from "@/data/military-gallery";

export type ActivityCategory = {
  id: number;
  name: string;
  slug: string;
};

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
  order: number
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
];

/**
 * Activity content overrides applied on top of whatever the CMS returns
 * (the CMS is authoritative, so these keep the frontend in sync with edits
 * made in code without needing a CMS update).
 */
export const hiddenActivitySlugs: readonly string[] = ["fencing", "g-clamp"];

export const activityTitleOverrides: Record<string, string> = {
  "train-wash-plan-atwp": "Automatic Train Wash Plant (ATWP)",
};

export const contactSpotlightSlug = "mrt-niteq";

export const activitiesHeroSlug = "lr2-kj-line";

export const activitiesHeroFile = "IMG_3686.JPG";

export const activitiesHeroFallback = activityImagePath(
  activitiesHeroSlug,
  activitiesHeroFile
);
