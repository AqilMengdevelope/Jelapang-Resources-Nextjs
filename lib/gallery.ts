import type { Activity, GallerySlide } from "@/lib/wordpress";

/**
 * Cap on gallery images shown on an individual project or activity page,
 * so every detail page reads consistently regardless of how many photos
 * the CMS holds. Pages with fewer images in WordPress show what they have.
 */
export const MAX_GALLERY_IMAGES = 3;

/**
 * Slides for a detail page: the CMS gallery when present, otherwise the
 * featured image as a single slide, capped at MAX_GALLERY_IMAGES.
 *
 * Captions and descriptions arrive on the slides themselves, straight from
 * the `jelapang/v1` payload.
 */
export function detailSlides(item: Activity): GallerySlide[] {
  const slides =
    item.gallery.length > 0
      ? item.gallery
      : item.featuredImage
        ? [{ image: item.featuredImage, alt: item.title }]
        : [];

  return slides.slice(0, MAX_GALLERY_IMAGES);
}
