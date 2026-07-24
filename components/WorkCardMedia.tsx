import Image from "next/image";

/** Card thumbnail — fills frame; focal crop can later come from CMS meta. */
export default function WorkCardMedia({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  position = "center",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** CSS object-position, e.g. "center top" or "50% 35%" from future CMS crop. */
  position?: string;
}) {
  return (
    <div className="activity-card-media">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        style={{ objectFit: "cover", objectPosition: position }}
      />
    </div>
  );
}
