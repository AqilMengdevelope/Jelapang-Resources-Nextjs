import type { Activity, GallerySlide } from "@/lib/wordpress";
import { withGalleryCaptions } from "@/lib/wordpress";

/**
 * Cap on gallery images shown on an individual project or activity page,
 * so every detail page reads consistently regardless of how many photos
 * the CMS holds. Pages with fewer images in WordPress show what they have.
 */
export const MAX_GALLERY_IMAGES = 3;

/**
 * Slides for a detail page: the CMS gallery when present, otherwise the
 * featured image as a single slide, capped at MAX_GALLERY_IMAGES.
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

/**
 * As detailSlides, with WordPress media-library captions resolved. Captions
 * are only looked up for the slides that survive the cap.
 */
export function detailSlidesWithCaptions(
  item: Activity
): Promise<GallerySlide[]> {
  return withGalleryCaptions(detailSlides(item));
}
