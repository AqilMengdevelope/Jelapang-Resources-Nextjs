import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { principals, getPrincipal } from "@/data/principals";
import { ArrowRight, CheckIcon } from "@/components/icons";

export function generateStaticParams() {
  return principals.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrincipal(slug);
  if (!p) return { title: "Principal — Jelapang Resources" };
  return {
    title: `${p.name} — Jelapang Resources`,
    description: `${p.name} (${p.origin}) — ${p.tagline}. Represented in Malaysia by Jelapang Resources Sdn. Bhd.`,
  };
}

const heroImage: Record<string, string> = {
  Military:
    "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?fm=jpg&q=80&w=2000&auto=format&fit=crop",
  Railway:
    "https://images.unsplash.com/photo-1580442374555-3def8fb41738?fm=jpg&q=80&w=2000&auto=format&fit=crop",
};

export default async function PrincipalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPrincipal(slug);
  if (!p) notFound();

  const sectorHref = p.field === "Military" ? "/military" : "/railway";

  return (
    <>
      <Header />
      <main>
        <PageHero
          kicker={`${p.field} Principal`}
          title={p.name}
          subtitle={p.tagline}
          image={heroImage[p.field]}
          crumbs={[
            { label: "Our Services" },
            { label: p.field, href: sectorHref },
            { label: p.name },
          ]}
        />

        <section className="section">
          <div className="container">
            <div className="detail-grid">
              <Reveal className="detail-body">
                <span className="field-pill">{p.field} · {p.origin}</span>
                <h2 className="section-title" style={{ marginTop: 18 }}>
                  Overview
                </h2>
                <p style={{ marginTop: 18 }}>{p.description}</p>

                <h3
                  className="kicker"
                  style={{ marginTop: 40, display: "flex" }}
                >
                  Products &amp; Solutions
                </h3>
                <ul className="detail-products">
                  {p.products.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="detail-aside" delay={120}>
                <h4>Principal Details</h4>
                <div className="detail-fact">
                  <span className="k">Name</span>
                  <span className="v">{p.name}</span>
                </div>
                <div className="detail-fact">
                  <span className="k">Origin</span>
                  <span className="v">{p.origin}</span>
                </div>
                <div className="detail-fact">
                  <span className="k">Sector</span>
                  <span className="v">{p.field}</span>
                </div>
                <div className="detail-fact">
                  <span className="k">Represented by</span>
                  <span className="v">Jelapang Resources</span>
                </div>
                <Link href="/contact" className="btn btn-green">
                  Enquire <ArrowRight width={18} height={18} />
                </Link>
                <Link
                  href={sectorHref}
                  className="btn btn-outline-dark"
                  style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
                >
                  All {p.field} Principals
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
