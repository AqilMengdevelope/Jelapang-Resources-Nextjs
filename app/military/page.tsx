import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PrincipalGrid from "@/components/PrincipalGrid";
import ClientLogos from "@/components/ClientLogos";
import PhotoSlider from "@/components/PhotoSlider";
import { militaryGallery } from "@/data/military-gallery";
import { getPrincipals, getSiteInfo, getClients } from "@/lib/wordpress";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { briefingHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Military & Defence — Jelapang Resources",
  description:
    "Trusted supply of arms, ammunition, CBRNE detection, ballistic protection and vehicle systems to the Malaysian Armed Forces, Police and enforcement agencies.",
};

const points = [
  "Small arms & match-grade sniper ammunition",
  "CBRNE detection, filtration & decontamination",
  "Ballistic body armour, helmets & shields",
  "EOD, C-IED & disrupter equipment",
  "All-Terrain Support Vehicles (ATSV)",
  "Periscopes, optics & electro-optical sights",
  "Military knives, bayonets & edged weapons",
  "Tactical runflats & vehicle mobility systems",
];

export default async function MilitaryPage() {
  const [militaryPrincipals, site, { clients }] = await Promise.all([
    getPrincipals("military"),
    getSiteInfo(),
    getClients(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Services"
          title="Military & Defence"
          subtitle="Our heartland — supplying world-class arms, ammunition and protective systems to Malaysia's armed forces and enforcement agencies."
          image="https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "Our Services" }, { label: "Military" }]}
        />

        <section className="section">
          <div className="container">
            <div className="service-intro">
              <Reveal className="lead-block">
                <span className="kicker">Capabilities</span>
                <h2 className="section-title">
                  Mission-critical defence supply
                </h2>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                  Jelapang Resources is a trusted supplier of arms, ammunition
                  and protective systems to the Malaysian Armed Forces, Royal
                  Malaysian Police and enforcement agencies. Backed by
                  world-class OEM partners, we deliver certified, proven
                  technology — from small-calibre and sniper ammunition to CBRNE
                  detection, ballistic protection and specialised vehicles.
                </p>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 16 }}>
                  Our scope spans supply, integration and full lifecycle support,
                  including maintenance, repair and overhaul (MRO) of optical and
                  electronic systems.
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

        {/* Gallery */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="center-head">
              <Reveal>
                <span className="kicker center">In the Field</span>
                <h2 className="section-title">Proven on the Ground</h2>
                <p className="section-lead">
                  Alongside Malaysia&apos;s armed forces — where the equipment we
                  supply is put to work.
                </p>
              </Reveal>
            </div>
            <Reveal delay={100}>
              <PhotoSlider slides={militaryGallery} />
            </Reveal>
          </div>
        </section>

        {/* Principals */}
        <section className="section caps">
          <div className="container">
            <div className="center-head">
              <Reveal>
                <span className="kicker center">Our Principals</span>
                <h2 className="section-title">Defence Technology Partners</h2>
                <p className="section-lead">
                  The world-class manufacturers we represent across the defence
                  and security sector.
                </p>
              </Reveal>
            </div>
            <PrincipalGrid items={militaryPrincipals} />
          </div>
        </section>

        {/* Clients */}
        <section className="section partners">
          <div className="container">
            <Reveal className="partners-head">
              <span className="kicker center">Track Record</span>
              <h2 className="section-title on-dark">Trusted by the Forces</h2>
              <p className="section-lead on-dark" style={{ margin: "20px auto 0" }}>
                Delivering completed contracts for Malaysia&apos;s defence and
                enforcement community.
              </p>
            </Reveal>
            <ClientLogos clients={clients} />
          </div>
        </section>

        {/* CTA */}
        <section className="section cta">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Have a defence requirement?</h2>
                <p>
                  Tell us about your programme and we will respond with the right
                  principal and a tailored capability briefing.
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
