import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ShieldIcon,
  GlobeIcon,
  HandshakeIcon,
  LayersIcon,
  ArrowRight,
  CheckIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us — Jelapang Resources",
  description:
    "Established in 2021, Jelapang Resources Sdn. Bhd. is a Malaysian Bumiputera-owned engineering and supply specialist bringing world-class Military, Railway and IT technology into the local market.",
};

const milestones = [
  { icon: HandshakeIcon, title: "100% Bumiputera-Owned", body: "A fully Bumiputera-owned enterprise serving national priority programmes." },
  { icon: GlobeIcon, title: "Global Network", body: "Direct partnerships with leading OEMs across Europe, Asia and North America." },
  { icon: ShieldIcon, title: "Defence Heritage", body: "Proven supply of arms, ammunition and protective systems to the armed forces." },
  { icon: LayersIcon, title: "Full Lifecycle", body: "Supply, integration, maintenance, repair and overhaul under one roof." },
];

const values = [
  "Integrity and accountability in every engagement",
  "Uncompromising quality and reliability",
  "World-class technology partnerships",
  "Commitment to national development",
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          kicker="About Us"
          title="A Strategic Partner for the Nation"
          subtitle="Bringing world-class technologies and technical services into Malaysia across Military, Railway and IT."
          image="https://images.unsplash.com/photo-1664575602554-2087b04935a5?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "About Us" }]}
        />

        {/* Overview */}
        <section className="section">
          <div className="container">
            <div className="about-grid">
              <Reveal className="about-copy">
                <span className="kicker">Who We Are</span>
                <h2 className="section-title">Young in age, deep in capability</h2>
                <p className="section-lead">
                  Jelapang Resources Sdn. Bhd. was established in 2021 with
                  operations headquartered in Kuala Lumpur, Malaysia. A
                  recognised Bumiputera-owned company, we are inspired by a
                  commitment to assist in the nation&apos;s growth through our
                  professional capability in bringing world-class technologies
                  and technical services into the local market.
                </p>
                <p className="section-lead" style={{ marginTop: 16 }}>
                  Although young in age, we are confident in our personnel
                  strength, which lies in the breadth of our capabilities and
                  in-depth knowledge of today&apos;s requirements. We combine the
                  vast experience of our leaders with renowned technology
                  partners to meet the growing needs of corporate, industrial,
                  organisational and government sectors.
                </p>
                <div className="about-actions">
                  <Link href="/contact" className="btn btn-green">
                    Get in Touch <ArrowRight width={18} height={18} />
                  </Link>
                  <Link href="/military" className="btn btn-outline-dark">
                    Our Services
                  </Link>
                </div>
              </Reveal>

              <Reveal className="about-vm" delay={140}>
                <div className="vm-card">
                  <h4>Our Vision</h4>
                  <p>
                    To be a world-class enterprise producing and supplying
                    international-standard quality products for the defence
                    industry.
                  </p>
                </div>
                <div className="vm-card">
                  <h4>Our Mission</h4>
                  <p>
                    To establish ourselves as a leading supplier of military
                    equipment and emerge as a world-class, state-of-the-art
                    global enterprise providing solutions for the defence and
                    security needs of the country.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="why-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
              {milestones.map((m, idx) => (
                <Reveal key={m.title} className="why-item" delay={(idx % 4) * 80}>
                  <span className="ic">
                    <m.icon width={26} height={26} />
                  </span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section caps">
          <div className="container">
            <div className="service-intro">
              <Reveal className="lead-block">
                <span className="kicker">Leadership</span>
                <h2 className="section-title">Led by engineering expertise</h2>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                  Our Managing Director, <strong>Mohamed Izwan bin Dato&apos;
                  Mohamed Khalid</strong>, holds a Master of Engineering in
                  Advanced Manufacturing Technology from Swinburne University of
                  Technology (Melbourne), a Bachelor of Engineering (Hons) in
                  Mechanical Engineering, and a Diploma of Engineering
                  (Aeronautical) from Universiti Teknologi Malaysia.
                </p>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 16 }}>
                  With a career spanning design engineering at Perodua
                  Manufacturing and Subsea Explore Services through to technical
                  leadership in the defence sector, his expertise anchors
                  Jelapang&apos;s commitment to technological excellence.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <ul className="service-points">
                  {values.map((v) => (
                    <li key={v}>
                      <CheckIcon />
                      {v}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Work With Us</span>
                <h2>Partner with a name the nation trusts</h2>
                <p>
                  From defence programmes to railway infrastructure and IT
                  systems, our team is ready to deliver.
                </p>
              </Reveal>
              <Reveal className="cta-actions" delay={120}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us <ArrowRight width={18} height={18} />
                </Link>
                <a href="tel:+601139552624" className="btn btn-outline">
                  +60 11-3955 2624
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
