import {
  principals as fallbackPrincipals,
  militaryPrincipals as fallbackMilitary,
  railwayPrincipals as fallbackRailway,
  itPrincipals as fallbackIT,
  principalLogo,
  type Field,
  type Principal,
} from "@/data/principals";
import { site as fallbackSite } from "@/data/site";
import {
  defaultHeroSlides,
  heroImageReplacements,
  type HeroSlide,
} from "@/data/hero";
import { militaryGallery as fallbackMilitaryGallery, type GallerySlide } from "@/data/military-gallery";
import {
  clientLogo,
  clientsSectionHeading,
  fallbackClients,
  type TrustedClient,
} from "@/data/clients";
import {
  contactSpotlightSlug,
  activitiesHeroFallback,
  activitiesHeroFile,
  activitiesHeroSlug,
  activityTitleOverrides,
  fallbackActivities,
  hiddenActivitySlugs,
  type Activity,
} from "@/data/activities";
import { getServerWordPressApiUrl } from "@/lib/config";

export type { Field, Principal, TrustedClient, HeroSlide, GallerySlide, Activity };

export type ClientsSection = {
  heading: string;
  clients: TrustedClient[];
};

export type SiteInfo = {
  name: string;
  regNo: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  address: string;
  workshop: string;
  tagline?: string;
  hours?: string;
};

export type HomeStat = { n: string; l: string };

export interface WpPage {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
}

interface WpPrincipal {
  id: number;
  name: string;
  slug: string;
  description: string;
  website: string;
  order: number;
  logo: string;
  origin: string;
  tagline: string;
  products: string[];
  field: string;
}

interface WpClient {
  id: number;
  name: string;
  slug: string;
  logo: string;
  order: number;
  type: "logo" | "badge";
  badgeText: string;
}

interface WpClientsResponse {
  heading: string;
  clients: WpClient[];
}

interface WpSettings {
  company: {
    name?: string;
    regNo?: string;
    tagline?: string;
    phone?: string;
    phoneDisplay?: string;
    phoneHref?: string;
    email?: string;
    address?: string;
    workshop?: string;
    hours?: string;
  };
  stats?: HomeStat[];
  home?: {
    featuredPrincipalSlugs?: string[];
  };
  contact?: {
    spotlightActivitySlug?: string;
  };
}

interface WpHeroSlide {
  image?: string;
  tag?: string;
  title?: string;
  titleHighlight?: string;
  sub?: string;
}

interface WpGallerySlide {
  image?: string;
  alt?: string;
}

interface WpActivityCategory {
  id: number;
  name: string;
  slug: string;
}

interface WpActivity {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  featuredImage?: string;
  gallery?: WpGallerySlide[];
  order?: number;
  categories?: WpActivityCategory[];
}

const WP_API_URL = getServerWordPressApiUrl();

// Remove em-dashes from copy, matching the house style (kept out of all
// user-facing text). Collapses surrounding whitespace into a comma.
function stripEmDashes(value: string): string {
  return value.replace(/[ \t\r\n]*—[ \t\r\n]*/g, ", ");
}

function decodeHtmlEntities(value: string): string {
  const decoded = value.includes("&")
    ? value
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        )
        .replace(/&amp;/g, "&")
        .replace(/&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
    : value;

  return stripEmDashes(decoded);
}

function dedupeBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

async function wpFetch<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const response = await fetch(`${WP_API_URL}${path}`, {
      next: { revalidate },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function isSmallWpThumbnail(url: string): boolean {
  const match = url.match(/-(\d+)x(\d+)\.(png|jpe?g|webp|gif)$/i);
  if (!match) return false;
  const w = Number(match[1]);
  const h = Number(match[2]);
  return w <= 128 || h <= 128;
}

function resolvePrincipalLogo(slug: string, cmsLogo?: string): string {
  const local = principalLogo(slug);
  if (!cmsLogo) return local;
  if (cmsLogo.startsWith("/principals/")) return cmsLogo;
  if (isSmallWpThumbnail(cmsLogo)) return local;
  return cmsLogo;
}

function mapPrincipal(partner: WpPrincipal): Principal {
  return {
    slug: partner.slug,
    name: decodeHtmlEntities(partner.name),
    field: (partner.field === "Railway"
      ? "Railway"
      : partner.field === "IT"
        ? "IT"
        : "Military") as Field,
    origin: decodeHtmlEntities(partner.origin),
    tagline: decodeHtmlEntities(partner.tagline),
    description: decodeHtmlEntities(partner.description),
    products: partner.products ?? [],
    website: partner.website || "#",
    logo: resolvePrincipalLogo(partner.slug, partner.logo),
  };
}

function mapClient(client: WpClient): TrustedClient {
  return {
    slug: client.slug,
    name: decodeHtmlEntities(client.name),
    type: client.type === "badge" ? "badge" : "logo",
    badgeText: client.badgeText || undefined,
    logo: client.logo || (client.type === "logo" ? clientLogo(client.slug) : undefined),
  };
}

function mapActivity(activity: WpActivity): Activity {
  const fallback = fallbackActivities.find((item) => item.slug === activity.slug);
  const gallery = (activity.gallery ?? [])
    .filter((slide) => slide.image)
    .map((slide) => ({
      image: slide.image as string,
      alt: decodeHtmlEntities(slide.alt ?? activity.title),
    }));

  return {
    id: activity.id,
    title:
      activityTitleOverrides[activity.slug] ??
      decodeHtmlEntities(activity.title),
    slug: activity.slug,
    excerpt: decodeHtmlEntities(activity.excerpt),
    content: activity.content,
    featuredImage:
      activity.featuredImage ||
      activity.gallery?.[0]?.image ||
      fallback?.featuredImage ||
      "",
    gallery: gallery.length ? gallery : (fallback?.gallery ?? []),
    order: activity.order ?? 0,
    categories: (activity.categories ?? fallback?.categories ?? []).map((category) => ({
      id: category.id,
      name: decodeHtmlEntities(category.name),
      slug: category.slug,
    })),
  };
}

export async function getClients(): Promise<ClientsSection> {
  const data = await wpFetch<WpClientsResponse>("/jelapang/v1/clients");

  if (data?.clients?.length) {
    const fromCms = dedupeBySlug(data.clients.map(mapClient));
    const cmsSlugs = new Set(fromCms.map((c) => c.slug));
    // Append clients defined in code that the CMS doesn't return yet,
    // so new additions appear without needing a CMS update.
    const codeOnly = fallbackClients.filter((c) => !cmsSlugs.has(c.slug));
    return {
      heading: data.heading || clientsSectionHeading,
      clients: [...fromCms, ...codeOnly],
    };
  }

  return {
    heading: clientsSectionHeading,
    clients: fallbackClients,
  };
}

export async function getSiteInfo(): Promise<SiteInfo> {
  const data = await wpFetch<WpSettings>("/jelapang/v1/settings");
  const company = data?.company;

  if (!company?.name) {
    return fallbackSite;
  }

  return {
    name: stripEmDashes(company.name),
    regNo: company.regNo ?? fallbackSite.regNo,
    email: company.email ?? fallbackSite.email,
    // Phone numbers are managed in code (data/site.ts), not the CMS.
    phoneDisplay: fallbackSite.phoneDisplay,
    phoneHref: fallbackSite.phoneHref,
    address: stripEmDashes(company.address ?? fallbackSite.address),
    workshop: stripEmDashes(company.workshop ?? fallbackSite.workshop),
    tagline: company.tagline ? stripEmDashes(company.tagline) : undefined,
    hours: company.hours,
  };
}

export async function getHomeStats(): Promise<HomeStat[]> {
  const data = await wpFetch<WpSettings>("/jelapang/v1/settings");
  return data?.stats?.length ? data.stats : [
    { n: "2021", l: "Established" },
    { n: "100%", l: "Bumiputera-Owned" },
    { n: "21+", l: "Global Principals" },
    { n: "3", l: "Core Sectors" },
  ];
}

export async function getPrincipals(sector?: string): Promise<Principal[]> {
  const path = sector
    ? `/jelapang/v1/principals?sector=${encodeURIComponent(sector)}`
    : "/jelapang/v1/principals";

  const localFallback =
    sector === "military"
      ? fallbackMilitary
      : sector === "railway"
        ? fallbackRailway
        : sector === "it"
          ? fallbackIT
          : fallbackPrincipals;

  const data = await wpFetch<{ principals: WpPrincipal[] }>(path);

  if (data?.principals?.length) {
    const fromCms = dedupeBySlug(data.principals.map(mapPrincipal));
    const cmsSlugs = new Set(fromCms.map((p) => p.slug));
    // Append principals defined in code that the CMS doesn't return yet,
    // so new additions appear without needing a CMS update.
    const codeOnly = localFallback.filter((p) => !cmsSlugs.has(p.slug));
    return dedupeBySlug([...fromCms, ...codeOnly]);
  }

  return localFallback;
}

export async function getFeaturedPrincipals(limit = 8): Promise<Principal[]> {
  const [all, settings] = await Promise.all([
    getPrincipals(),
    wpFetch<WpSettings>("/jelapang/v1/settings"),
  ]);

  const slugs = settings?.home?.featuredPrincipalSlugs;
  if (slugs?.length) {
    const bySlug = new Map(all.map((p) => [p.slug, p]));
    const featured = slugs
      .map((slug) => bySlug.get(slug))
      .filter((p): p is Principal => Boolean(p));
    if (featured.length) {
      return featured.slice(0, limit);
    }
  }

  return all.slice(0, limit);
}

function replaceHeroImage(url: string): string {
  const hit = heroImageReplacements.find((r) => url.includes(r.match));
  return hit ? hit.replace : url;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await wpFetch<{ slides: WpHeroSlide[] }>("/jelapang/v1/hero");

  const slides = (data?.slides ?? [])
    .filter((s) => s.image) // an image is required for a usable slide
    .map((s) => ({
      image: replaceHeroImage(s.image as string),
      tag: stripEmDashes(s.tag ?? ""),
      title: stripEmDashes(s.title ?? ""),
      titleHighlight: s.titleHighlight ? stripEmDashes(s.titleHighlight) : undefined,
      sub: stripEmDashes(s.sub ?? ""),
    }));

  return slides.length ? slides : defaultHeroSlides;
}

export async function getMilitaryGallery(): Promise<GallerySlide[]> {
  const data = await wpFetch<{ slides: WpGallerySlide[] }>(
    "/jelapang/v1/gallery/military"
  );

  const slides = (data?.slides ?? [])
    .filter((s) => s.image)
    .map((s) => ({
      image: s.image as string,
      alt: s.alt ?? "",
    }));

  return slides.length ? slides : fallbackMilitaryGallery;
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  return wpFetch<WpPage>(`/jelapang/v1/pages/${slug}`);
}

const isHiddenActivity = (slug: string) => hiddenActivitySlugs.includes(slug);

export async function getActivities(category?: string): Promise<Activity[]> {
  const path = category
    ? `/jelapang/v1/activities?category=${encodeURIComponent(category)}`
    : "/jelapang/v1/activities";

  const data = await wpFetch<{ activities: WpActivity[] }>(path);

  if (data?.activities?.length) {
    return dedupeBySlug(data.activities.map(mapActivity))
      .filter((activity) => !isHiddenActivity(activity.slug))
      .sort((a, b) => a.order - b.order);
  }

  const fallback = category
    ? fallbackActivities.filter((activity) =>
        activity.categories.some((item) => item.slug === category)
      )
    : fallbackActivities;
  return fallback.filter((activity) => !isHiddenActivity(activity.slug));
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  if (isHiddenActivity(slug)) return null;

  const data = await wpFetch<WpActivity>(`/jelapang/v1/activities/${slug}`);

  if (data?.slug) {
    return mapActivity(data);
  }

  return fallbackActivities.find((activity) => activity.slug === slug) ?? null;
}

export async function getContactSpotlightActivity(): Promise<Activity | null> {
  const settings = await wpFetch<WpSettings>("/jelapang/v1/settings");
  const slug = settings?.contact?.spotlightActivitySlug || contactSpotlightSlug;

  return getActivityBySlug(slug);
}

export function resolveActivitiesHeroImage(activities: Activity[]): string {
  const activity = activities.find((item) => item.slug === activitiesHeroSlug);
  const heroNeedle = activitiesHeroFile.replace(/\.[^.]+$/, "").toLowerCase();

  const fromGallery = activity?.gallery.find((slide) =>
    slide.image.toLowerCase().includes(heroNeedle)
  );

  if (fromGallery?.image) {
    return fromGallery.image;
  }

  return activitiesHeroFallback;
}

export { principalLogo };
