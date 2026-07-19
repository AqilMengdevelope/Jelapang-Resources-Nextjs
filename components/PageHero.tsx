import Image from "next/image";
import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function PageHero({
  kicker,
  title,
  subtitle,
  image,
  crumbs = [],
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  image: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="page-hero">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="page-hero-image"
        />
      )}
      <div className="container page-hero-inner">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="crumb-sep">
              <span className="sep">/</span>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        {kicker && <span className="kicker">{kicker}</span>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
