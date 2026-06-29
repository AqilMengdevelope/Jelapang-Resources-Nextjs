import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import {
  ShieldIcon,
  GlobeIcon,
  HandshakeIcon,
  LayersIcon,
  TargetIcon,
  BoltIcon,
  ArrowRight,
  CheckIcon,
  PinIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/icons";

/* ---------------- Data ---------------- */

const stats = [
  { n: "2021", l: "Established" },
  { n: "100%", l: "Bumiputera-Owned" },
  { n: "13+", l: "Global OEM Partners" },
  { n: "3", l: "Core Sectors" },
];

const capabilities = [
  {
    id: "defence",
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
    id: "rail",
    no: "02",
    title: "Railway",
    tag: "Rolling Stock & Infrastructure",
    image:
      "https://images.unsplash.com/photo-1580442374555-3def8fb41738?fm=jpg&q=80&w=1600&auto=format&fit=crop",
    desc: "Engineering, supply and maintenance that keep rail networks safe and moving — from rolling stock components to trackside steel infrastructure.",
    points: [
      "Rolling stock spare parts",
      "Maintenance, repair & overhaul",
      "Signalling & electrical support",
      "Steel structure fabrication",
      "Motor & generator refurbishment",
      "Scheduled preventive servicing",
    ],
  },
  {
    id: "it",
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

const whyUs = [
  {
    icon: HandshakeIcon,
    title: "100% Bumiputera-Owned",
    body: "A fully Bumiputera-owned enterprise trusted to deliver on national priority programmes for government and defence.",
  },
  {
    icon: GlobeIcon,
    title: "World-Class Partners",
    body: "Direct access to leading global OEMs across Europe, Asia and North America — proven, certified technology into Malaysia.",
  },
  {
    icon: ShieldIcon,
    title: "Proven Delivery",
    body: "A portfolio of completed contracts for the Armed Forces, Police and enforcement agencies — on spec, on time.",
  },
  {
    icon: LayersIcon,
    title: "End-to-End Engineering",
    body: "From supply and integration to maintenance, repair and overhaul — one accountable partner across the lifecycle.",
  },
  {
    icon: TargetIcon,
    title: "Mission-Critical Standards",
    body: "Quality systems built around the uncompromising reliability that defence and critical infrastructure demand.",
  },
  {
    icon: BoltIcon,
    title: "Responsive Support",
    body: "24-hour breakdown response and dedicated technical teams keeping your assets operational when it matters.",
  },
];

const partners = [
  { name: "EOTECH", origin: "USA", desc: "Holographic weapon sights with brilliant accuracy and fast target acquisition." },
  { name: "Combined Systems", origin: "USA", desc: "Less-lethal munitions & launching systems for tactical and riot-control units." },
  { name: "SNT Motiv", origin: "South Korea", desc: "Advanced firearms and defence components with exceptional reliability." },
  { name: "Bruker", origin: "Germany", desc: "Mobile GC/MS, ion-mobility and radiological CBRNE detection instrumentation." },
  { name: "Blücher · SARATOGA", origin: "Germany", desc: "CBRN protective clothing trusted by military, civil defence and the OPCW." },
  { name: "MDH Defence", origin: "UK", desc: "CBRN collective protection, filtration and crew cooling for military platforms." },
  { name: "Hutchinson", origin: "France", desc: "Tactical runflat systems ensuring mobility in all-terrain and combat situations." },
  { name: "Kent Periscopes", origin: "UK", desc: "Electro-optical periscopes for strategic and upgraded vehicle programmes." },
  { name: "Kärcher Futuretech", origin: "Germany", desc: "Mobile CBRN protection, water supply and field-camp systems." },
  { name: "Mehler Protection", origin: "Germany", desc: "Ballistic body armour, helmets, shields and platform protection." },
  { name: "Eickhorn-Solingen", origin: "Germany", desc: "Military knives and bayonets from 150+ years of Solingen craftsmanship." },
  { name: "ARGO", origin: "Canada", desc: "Amphibious and extreme-terrain vehicles for rescue, utility and defence." },
];

/* ---------------- Page ---------------- */

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />

        {/* ABOUT / WELCOME */}
        <section className="section about" id="about">
          <div className="container">
            <div className="about-grid">
              <Reveal className="about-copy">
                <span className="kicker">Who We Are</span>
                <h2 className="section-title">
                  A strategic partner for the nation&apos;s defence
                </h2>
                <p className="section-lead">
                  Established in 2021 and headquartered in Kuala Lumpur,
                  Jelapang Resources Sdn. Bhd. is a recognised Bumiputera-owned
                  company committed to assisting the nation&apos;s growth by
                  bringing world-class technologies and technical services into
                  the local market.
                </p>
                <p className="section-lead" style={{ marginTop: 16 }}>
                  We combine the experience of our leaders with renowned global
                  technology partners to meet the growing needs of corporate,
                  industrial and government sectors for advanced,
                  specialised solutions.
                </p>
                <div className="about-actions">
                  <a href="#capabilities" className="btn btn-green">
                    Explore Capabilities <ArrowRight width={18} height={18} />
                  </a>
                  <a href="#contact" className="btn btn-outline-dark">
                    Get in Touch
                  </a>
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
                    enterprise providing solutions for the defence and security
                    needs of the country.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((s, idx) => (
                <Reveal key={s.l} className="stat" delay={idx * 90}>
                  <div className="n">{s.n}</div>
                  <div className="l">{s.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="section caps" id="capabilities">
          <div className="container">
            <div className="caps-head">
              <Reveal>
                <span className="kicker">Capabilities</span>
                <h2 className="section-title">Products &amp; Services</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="section-lead">
                  Three core sectors, one accountable partner — delivering
                  supply, integration and lifecycle support where reliability is
                  non-negotiable.
                </p>
              </Reveal>
            </div>

            {capabilities.map((cap, idx) => (
              <Reveal key={cap.id} id={cap.id} className="cap-row" delay={idx * 60}>
                <div
                  className="cap-img"
                  style={{ backgroundImage: `url(${cap.image})` }}
                >
                  <span className="cap-imgtag">{cap.tag}</span>
                </div>
                <div className="cap-body">
                  <span className="cap-no">SECTOR {cap.no}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                  <ul className="cap-points">
                    {cap.points.map((p) => (
                      <li key={p}>
                        <CheckIcon />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="cap-link">
                    Discuss a {cap.title} requirement{" "}
                    <ArrowRight width={16} height={16} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHY US */}
        <section className="section" id="why">
          <div className="container">
            <Reveal>
              <span className="kicker">Why Jelapang</span>
              <h2 className="section-title">
                Built for those who cannot afford to fail
              </h2>
            </Reveal>
            <div className="why-grid">
              {whyUs.map((f, idx) => (
                <Reveal key={f.title} className="why-item" delay={(idx % 3) * 90}>
                  <span className="ic">
                    <f.icon width={26} height={26} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS — replaces track record */}
        <section className="section partners" id="partners">
          <div className="container">
            <Reveal className="partners-head">
              <span className="kicker center">Strength Through Partnership</span>
              <h2 className="section-title on-dark">
                Our Global Technology Partners
              </h2>
              <p className="section-lead on-dark" style={{ margin: "20px auto 0" }}>
                We bring the world&apos;s leading defence and engineering
                manufacturers to Malaysia — delivering proven, certified
                technology trusted by armed forces worldwide.
              </p>
            </Reveal>

            <div className="partners-grid">
              {partners.map((p, idx) => (
                <Reveal key={p.name} className="partner" delay={(idx % 4) * 70}>
                  <div className="pname">{p.name}</div>
                  <div className="porigin">{p.origin}</div>
                  <p className="pdesc">{p.desc}</p>
                </Reveal>
              ))}
            </div>

            <p className="partners-note">
              Serving the Malaysian Army · Royal Malaysian Navy · Royal Malaysian
              Air Force · Royal Malaysian Police · ESSCOM · Maritime Enforcement
              Agency
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section cta" id="contact">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Have a military, railway or IT requirement?</h2>
                <p>
                  Tell us about your programme. Our technical team will respond
                  with a tailored capability briefing and the right global
                  partner for the job.
                </p>
              </Reveal>
              <Reveal className="cta-actions" delay={120}>
                <a
                  href="mailto:info@jelapangresources.com"
                  className="btn btn-primary"
                >
                  Request a Briefing <ArrowRight width={18} height={18} />
                </a>
                <a href="tel:+60327048591" className="btn btn-outline">
                  +603-2704 8591
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <a href="#top" className="brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/jelapang-logo-light.png"
                    alt="Jelapang Resources Sdn. Bhd."
                    className="brand-logo"
                  />
                </a>
                <p>
                  A Malaysian Bumiputera-owned engineering and supply specialist
                  delivering world-class technology across Military, Railway and IT.
                </p>
              </div>

              <div>
                <h4>Sectors</h4>
                <ul>
                  <li><a href="#defence">Military</a></li>
                  <li><a href="#rail">Railway</a></li>
                  <li><a href="#it">IT</a></li>
                  <li><a href="#partners">Partners</a></li>
                </ul>
              </div>

              <div>
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#why">Why Us</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4>Contact</h4>
                <ul>
                  <li className="contact-line">
                    <PinIcon />
                    <span>
                      T2A-17-06, 3 Towers, No. 296 Jalan Ampang, 50450 Kuala
                      Lumpur, Malaysia
                    </span>
                  </li>
                  <li className="contact-line">
                    <PhoneIcon />
                    <span>03-2704 8591 / 8592</span>
                  </li>
                  <li className="contact-line">
                    <MailIcon />
                    <a href="mailto:info@jelapangresources.com">
                      info@jelapangresources.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} Jelapang Resources Sdn. Bhd.
                (1405795-V). All rights reserved.
              </span>
              <span>Military · Railway · IT — Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
