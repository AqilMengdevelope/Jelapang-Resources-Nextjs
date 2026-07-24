import Image from "next/image";

/** Capability row media — resized via next/image (quality 75). */
export default function CapMedia({
  src,
  alt,
  tag,
}: {
  src: string;
  alt: string;
  tag: string;
}) {
  return (
    <div className="cap-img">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
        quality={75}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <span className="cap-imgtag">{tag}</span>
    </div>
  );
}
