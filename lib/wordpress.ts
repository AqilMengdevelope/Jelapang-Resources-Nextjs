import {
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
  clientsSectionHeading,
  railwayClientsSectionHeading,
  type TrustedClient,
} from "@/data/clients";
import {
  workItemHref,
  type Activity,
  type WorkKind,
} from "@/data/activities";
import { getServerWordPressApiUrl } from "@/lib/config";

export type { Field, Principal, TrustedClient, HeroSlide, GallerySlide, Activity, WorkKind };
export { workItemHref };

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
  field?: string;
  description?: string;
  website?: string;
  featured?: boolean;
  featuredLabel?: string;
}

interface WpClientsResponse {
  heading: string;
  sector?: string;
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
  caption?: string;
}

interface WpMediaItem {
  slug: string;
  source_url: string;
  caption?: { rendered?: string };
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
  kind?: WorkKind;
  categories?: WpActivityCategory[];
  tags?: WpActivityCategory[];
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

async function wpFetch<T>(
  path: string,
  options?: { cache?: RequestCache }
): Promise<T | null> {
  try {
    const response = await fetch(
      `${WP_API_URL}${path}`,
      options?.cache === "no-store"
        ? { cache: "no-store" }
        : { next: { revalidate: 300, tags: ["wordpress"] } }
    );

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
  const field =
    client.field === "Railway"
      ? "Railway"
      : client.field === "Military"
        ? "Military"
        : client.field;
  return {
    slug: client.slug,
    name: decodeHtmlEntities(client.name),
    type: client.type === "badge" ? "badge" : "logo",
    badgeText: client.badgeText || undefined,
    logo: client.logo || undefined,
    field,
    description: client.description
      ? decodeHtmlEntities(client.description)
      : undefined,
    website: client.website || undefined,
    featured: Boolean(client.featured),
    featuredLabel: client.featuredLabel
      ? decodeHtmlEntities(client.featuredLabel)
      : undefined,
  };
}

function mapActivity(activity: WpActivity): Activity {
  const gallery = (activity.gallery ?? [])
    .filter((slide) => slide.image)
    .map((slide) => ({
      image: slide.image as string,
      // `??` would keep WordPress's empty alt strings, leaving every
      // gallery image without alt text.
      alt: decodeHtmlEntities(slide.alt || activity.title),
      caption: slide.caption ? decodeHtmlEntities(slide.caption) : undefined,
    }));

  return {
    id: activity.id,
    title: decodeHtmlEntities(activity.title),
    slug: activity.slug,
    excerpt: decodeHtmlEntities(activity.excerpt),
    content: activity.content,
    featuredImage: activity.featuredImage || gallery[0]?.image || "",
    gallery,
    order: activity.order ?? 0,
    categories: (activity.categories ?? []).map((category) => ({
      id: category.id,
      name: decodeHtmlEntities(category.name),
      slug: category.slug,
    })),
    tags: (activity.tags ?? []).map((tag) => ({
      id: tag.id,
      name: decodeHtmlEntities(tag.name),
      slug: tag.slug,
    })),
    kind: activity.kind === "activity" ? "activity" : "project",
  };
}

export async function getClients(
  sector?: "military" | "railway"
): Promise<ClientsSection> {
  const path = sector
    ? `/jelapang/v1/clients?sector=${encodeURIComponent(sector)}`
    : "/jelapang/v1/clients";
  const data = await wpFetch<WpClientsResponse>(path, { cache: "no-store" });
  const heading =
    data?.heading ||
    (sector === "railway"
      ? railwayClientsSectionHeading
      : clientsSectionHeading);

  if (!data?.clients?.length) {
    return { heading, clients: [] };
  }

  return {
    heading,
    clients: dedupeBySlug(data.clients.map(mapClient)),
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

  const data = await wpFetch<{ principals: WpPrincipal[] }>(path);

  if (!data?.principals?.length) {
    return [];
  }

  return dedupeBySlug(data.principals.map(mapPrincipal));
}

export async function getFeaturedPrincipals(limit?: number): Promise<Principal[]> {
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
      return typeof limit === "number" ? featured.slice(0, limit) : featured;
    }
  }

  return typeof limit === "number" ? all.slice(0, limit) : all;
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

export async function getActivities(category?: string): Promise<Activity[]> {
  const path = category
    ? `/jelapang/v1/activities?category=${encodeURIComponent(category)}`
    : "/jelapang/v1/activities";

  const data = await wpFetch<{ activities: WpActivity[] }>(path);

  if (!data?.activities?.length) {
    return [];
  }

  return dedupeBySlug(data.activities.map(mapActivity)).sort(
    (a, b) => b.order - a.order
  );
}

export async function getWorkItems(kind: WorkKind): Promise<Activity[]> {
  const items = await getActivities();
  return items.filter((item) => item.kind === kind);
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const data = await wpFetch<WpActivity>(`/jelapang/v1/activities/${slug}`);

  if (!data?.slug) {
    return null;
  }

  return mapActivity(data);
}

export async function getContactSpotlightActivity(): Promise<Activity | null> {
  const settings = await wpFetch<WpSettings>("/jelapang/v1/settings");
  const slug = settings?.contact?.spotlightActivitySlug;

  if (slug) {
    const spotlight = await getActivityBySlug(slug);
    if (spotlight) {
      return spotlight;
    }
  }

  const projects = await getWorkItems("project");
  return projects[0] ?? null;
}

export function resolveProjectsHeroImage(items: Activity[]): string {
  return items.find((item) => item.featuredImage)?.featuredImage ?? "";
}

export function resolveActivitiesHeroImage(items: Activity[]): string {
  return items.find((item) => item.featuredImage)?.featuredImage ?? "";
}

/**
 * WordPress derives an attachment slug from its filename, so
 * ".../2026/07/01.jpg" resolves to the attachment slug "01".
 */
function attachmentSlugFromUrl(url: string): string | null {
  const file = url.split("/").pop()?.split("?")[0];
  if (!file) return null;

  const base = file.replace(/\.[a-z0-9]+$/i, "");
  return base ? base.toLowerCase() : null;
}

/**
 * Fill in slide captions from the WordPress media library.
 *
 * The `jelapang/v1` endpoints do not expose attachment captions, so these
 * are read from core's `/wp/v2/media` in a single batched request. Slides
 * that already carry a caption (should the backend start sending one) are
 * left untouched, and any lookup failure just leaves captions unset.
 */
export async function withGalleryCaptions(
  slides: GallerySlide[]
): Promise<GallerySlide[]> {
  const pending = slides.filter((slide) => !slide.caption && slide.image);
  if (pending.length === 0) return slides;

  const slugs = [
    ...new Set(
      pending
        .map((slide) => attachmentSlugFromUrl(slide.image))
        .filter((slug): slug is string => Boolean(slug))
    ),
  ];
  if (slugs.length === 0) return slides;

  const query = slugs.map((slug) => `slug[]=${encodeURIComponent(slug)}`).join("&");
  const media = await wpFetch<WpMediaItem[]>(
    `/wp/v2/media?${query}&per_page=100&_fields=slug,source_url,caption`
  );
  if (!Array.isArray(media)) return slides;

  // Key by source_url so attachments sharing a slug base cannot cross-match.
  const captionByUrl = new Map<string, string>();
  for (const item of media) {
    const caption = item.caption?.rendered?.replace(/<[^>]*>/g, "").trim();
    if (caption && item.source_url) {
      captionByUrl.set(item.source_url, decodeHtmlEntities(caption));
    }
  }
  if (captionByUrl.size === 0) return slides;

  return slides.map((slide) =>
    slide.caption
      ? slide
      : { ...slide, caption: captionByUrl.get(slide.image) }
  );
}

export { principalLogo };
