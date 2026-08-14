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
  tags: ActivityCategory[];
  kind: WorkKind;
};

export function workItemHref(item: Pick<Activity, "slug" | "kind">): string {
  return item.kind === "project"
    ? `/projects/${item.slug}`
    : `/activities/${item.slug}`;
}
