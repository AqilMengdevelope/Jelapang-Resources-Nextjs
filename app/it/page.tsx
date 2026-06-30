import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getSiteInfo } from "@/lib/wordpress";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { briefingHref } from "@/data/site";

export const metadata: Metadata = {
  title: "IT & Electronics — Jelapang Resources",
  description:
    "Technology supply and electronics engineering — ICT hardware integration, electronic equipment repair, PCB fabrication, detection and optronic systems with full lifecycle support.",
};

const points = [
  "ICT hardware supply & integration",
  "Electronic & electrical equipment repair",
  "Printed circuit board (PCB) fabrication & refurbishment",
  "Detection & test equipment systems",
  "Optronic & electro-optical solutions",
  "Lifecycle technical support & maintenance",
];

export default async function ITPage() {
  const site = await getSiteInfo();

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Services"
          title="IT & Electronics"
          subtitle="Integrating, repairing and sustaining the digital and electronic systems that run modern operations."
          image="https://images.unsplash.com/photo-1506399309177-3b43e99fead2?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "Our Services" }, { label: "IT" }]}
        />

        <section className="section">
          <div className="container">
            <div className="service-intro">
              <Reveal className="lead-block">
                <span className="kicker">Capabilities</span>
                <h2 className="section-title">
                  Systems & electronics engineering
                </h2>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                  Jelapang Resources delivers technology supply and electronics
                  engineering — integrating ICT hardware, repairing electronic
                  and electrical equipment, and sustaining the systems that keep
                  organisations operational.
                </p>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 16 }}>
                  Our engineering heritage in PCB fabrication, optronics and
                  detection systems lets us support specialised, mission-critical
                  electronics across the full lifecycle — from supply and
                  integration to repair, refurbishment and technical support.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <ul className="service-points">
                  {points.map((p) => (
                    <li key={p}>
                      <CheckIcon />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section cta">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Have an IT or electronics requirement?</h2>
                <p>
                  From systems integration to electronics repair, our technical
                  team is ready to help.
                </p>
              </Reveal>
              <Reveal className="cta-actions" delay={120}>
                <Link href={briefingHref} className="btn btn-primary">
                  Request a Briefing <ArrowRight width={18} height={18} />
                </Link>
                <a href={site.phoneHref} className="btn btn-outline">
                  {site.phoneDisplay}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
