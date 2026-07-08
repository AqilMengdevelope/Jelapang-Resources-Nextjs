import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { briefingHref } from "@/data/site";
import { getSiteInfo } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Our Services — Jelapang Resources",
  description:
    "Three core sectors, one accountable partner. Jelapang Resources delivers supply, integration and lifecycle support across Military, Railway and IT.",
};

const services = [
  {
    href: "/military",
    no: "01",
    title: "Military",
    tag: "Defence & Security",
    image:
      "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    desc: "Our heartland. Trusted supply of arms, ammunition and protective systems to the Malaysian Armed Forces, Police and enforcement agencies — backed by world-class OEM partners.",
    points: [
      "Small arms & sniper ammunition",
      "CBRNE detection & filtration",
      "Ballistic protection & gear",
      "EOD, C-IED & disrupters",
      "All-Terrain Support Vehicles",
      "Periscopes & optical sights",
    ],
  },
  {
    href: "/railway",
    no: "02",
    title: "Railway",
    tag: "Rolling Stock & Infrastructure",
    image:
      "https://cms.jelapangresources.com/wp-content/uploads/2026/07/IMG_9449-1.jpg",
    desc: "Engineering, supply and maintenance that keep rail networks safe and moving — from rolling stock components to depot equipment and trackside infrastructure.",
    points: [
      "Rolling stock spare parts",
      "Maintenance, repair & overhaul",
      "Bogie & wheelset systems",
      "Track maintenance machines",
      "Re-railing & rescue equipment",
      "Scheduled preventive servicing",
    ],
  },
  {
    href: "/it",
    no: "03",
    title: "IT",
    tag: "Systems & Electronics",
    image:
      "https://images.unsplash.com/photo-1506399309177-3b43e99fead2?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    desc: "Technology supply and electronics engineering — integrating, repairing and sustaining the digital and electronic systems that run modern operations.",
    points: [
      "ICT hardware supply & integration",
      "Electronic equipment repair",
      "PCB fabrication & refurbishment",
      "Detection & test equipment",
      "Optronic & electro-optical systems",
      "Lifecycle technical support",
    ],
  },
];

export default async function ServicesPage() {
  const site = await getSiteInfo();

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Services"
          title="Products & Services"
          subtitle="Three core sectors, one accountable partner — delivering supply, integration and lifecycle support where reliability is non-negotiable."
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "Our Services" }]}
        />

        <section className="section caps">
          <div className="container">
            {services.map((s, idx) => (
              <Reveal key={s.title} id={s.href.slice(1)} className="cap-row" delay={idx * 60}>
                <div
                  className="cap-img"
                  style={{ backgroundImage: `url(${s.image})` }}
                >
                  <span className="cap-imgtag">{s.tag}</span>
                </div>
                <div className="cap-body">
                  <span className="cap-no">SECTOR {s.no}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="cap-points">
                    {s.points.map((p) => (
                      <li key={p}>
                        <CheckIcon />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className="cap-link">
                    Explore {s.title} <ArrowRight width={16} height={16} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section cta">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Have a military, railway or IT requirement?</h2>
                <p>
                  Tell us about your programme and our technical team will
                  respond with a tailored capability briefing and the right
                  global principal for the job.
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
