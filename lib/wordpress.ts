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
import { defaultHeroSlides, type HeroSlide } from "@/data/hero";
import {
  clientLogo,
  clientsSectionHeading,
  fallbackClients,
  type TrustedClient,
} from "@/data/clients";
import { getServerWordPressApiUrl } from "@/lib/config";

export type { Field, Principal, TrustedClient };

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
}

const WP_API_URL = getServerWordPressApiUrl();

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

function mapPrincipal(partner: WpPrincipal): Principal {
  return {
    slug: partner.slug,
    name: partner.name,
    field: (partner.field === "Railway"
      ? "Railway"
      : partner.field === "IT"
        ? "IT"
        : "Military") as Field,
    origin: partner.origin,
    tagline: partner.tagline,
    description: partner.description,
    products: partner.products ?? [],
    website: partner.website || "#",
    logo: partner.logo || principalLogo(partner.slug),
  };
}

function mapClient(client: WpClient): TrustedClient {
  return {
    slug: client.slug,
    name: client.name,
    type: client.type === "badge" ? "badge" : "logo",
    badgeText: client.badgeText || undefined,
    logo: client.logo || (client.type === "logo" ? clientLogo(client.slug) : undefined),
  };
}

export async function getClients(): Promise<ClientsSection> {
  const data = await wpFetch<WpClientsResponse>("/jelapang/v1/clients");

  if (data?.clients?.length) {
    const fromCms = data.clients.map(mapClient);
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
    name: company.name,
    regNo: company.regNo ?? fallbackSite.regNo,
    email: company.email ?? fallbackSite.email,
    // Phone numbers are managed in code (data/site.ts), not the CMS.
    phoneDisplay: fallbackSite.phoneDisplay,
    phoneHref: fallbackSite.phoneHref,
    address: company.address ?? fallbackSite.address,
    workshop: company.workshop ?? fallbackSite.workshop,
    tagline: company.tagline,
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
    const fromCms = data.principals.map(mapPrincipal);
    const cmsSlugs = new Set(fromCms.map((p) => p.slug));
    // Append principals defined in code that the CMS doesn't return yet,
    // so new additions appear without needing a CMS update.
    const codeOnly = localFallback.filter((p) => !cmsSlugs.has(p.slug));
    return [...fromCms, ...codeOnly];
  }

  return localFallback;
}

interface WpHeroSlide {
  image?: string;
  tag?: string;
  title?: string;
  titleHighlight?: string;
  sub?: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await wpFetch<{ slides: WpHeroSlide[] }>("/jelapang/v1/hero");

  const slides = (data?.slides ?? [])
    .filter((s) => s.image) // an image is required for a usable slide
    .map((s) => ({
      image: s.image as string,
      tag: s.tag ?? "",
      title: s.title ?? "",
      titleHighlight: s.titleHighlight || undefined,
      sub: s.sub ?? "",
    }));

  return slides.length ? slides : defaultHeroSlides;
}

export async function getPageBySlug(slug: string): Promise<WpPage | null> {
  return wpFetch<WpPage>(`/jelapang/v1/pages/${slug}`);
}

export { principalLogo };
