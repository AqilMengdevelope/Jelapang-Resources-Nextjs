import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import HeroCarousel from "@/components/HeroCarousel";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import PrincipalGrid from "@/components/PrincipalGrid";
import {
  getActivities,
  getFeaturedPrincipals,
  getHeroSlides,
  getHomeStats,
  getPrincipals,
  getSiteInfo,
} from "@/lib/wordpress";
import {
  ShieldIcon,
  GlobeIcon,
  HandshakeIcon,
  LayersIcon,
  TargetIcon,
  BoltIcon,
  ArrowRight,
  CheckIcon,
} from "@/components/icons";
import { briefingHref } from "@/data/site";

/* ---------------- Data ---------------- */

const capabilities = [
  {
    id: "defence",
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
    id: "rail",
    href: "/railway",
    no: "02",
    title: "Railway",
    tag: "Rolling Stock & Infrastructure",
    image:
      "https://cms.jelapangresources.com/wp-content/uploads/2026/07/IMG_9445-1.jpg",
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

const featuredCount = 8;

/* ---------------- Page ---------------- */

export default async function Home() {
  const [stats, featuredBase, site, heroSlides, allActivities] =
    await Promise.all([
      getHomeStats(),
      getFeaturedPrincipals(featuredCount),
      getSiteInfo(),
      getHeroSlides(),
      getActivities(),
    ]);
  const featuredActivities = allActivities.slice(0, 4);

  // Always feature MDH Bioquell on the home page. If the CMS-configured
  // featured set doesn't already include it, slot it in as the last card.
  let featuredPrincipals = featuredBase;
  if (!featuredPrincipals.some((p) => p.slug === "mdh-bioquell")) {
    const mdh = (await getPrincipals()).find((p) => p.slug === "mdh-bioquell");
    if (mdh) {
      featuredPrincipals = [...featuredBase.slice(0, featuredCount - 1), mdh];
    }
  }

  return (
    <>
      <SiteHeader />
      <main>
        <HeroCarousel slides={heroSlides} />

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
                  industrial and government sectors for advanced, specialised
                  solutions.
                </p>
                <div className="about-actions">
                  <Link href="/about" className="btn btn-green">
                    More About Us <ArrowRight width={18} height={18} />
                  </Link>
                  <Link href="/contact" className="btn btn-outline-dark">
                    Get in Touch
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
                <span className="kicker">Our Services</span>
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
                  <Link href={cap.href} className="cap-link">
                    Explore {cap.title} <ArrowRight width={16} height={16} />
                  </Link>
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

        {/* PROJECTS PREVIEW */}
        {featuredActivities.length > 0 && (
          <section className="section section-soft" id="projects">
            <div className="container">
              <div className="caps-head">
                <Reveal>
                  <span className="kicker">Our Work</span>
                  <h2 className="section-title">Recent Projects</h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="section-lead">
                    A look at recent field activities — depot systems,
                    rolling-stock maintenance and infrastructure delivered
                    on site.
                  </p>
                </Reveal>
              </div>

              <div className="activities-grid activities-grid--preview">
                {featuredActivities.map((activity, index) => (
                  <Reveal key={activity.slug} delay={index * 80}>
                    <Link
                      href={`/activities/${activity.slug}`}
                      className="activity-card"
                    >
                      <div className="activity-card-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activity.featuredImage}
                          alt={activity.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="activity-card-body">
                        <h3>{activity.title}</h3>
                        <p>{activity.excerpt}</p>
                        <span className="activity-card-link">
                          View gallery <ArrowRight width={16} height={16} />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>

              <div style={{ textAlign: "center", marginTop: 44 }}>
                <Link href="/activities" className="btn btn-green">
                  View All Projects <ArrowRight width={18} height={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* PRINCIPALS + CLIENTS */}
        <section className="section partners" id="partners">
          <div className="container">
            <Reveal className="partners-head">
              <span className="kicker center">Strength Through Partnership</span>
              <h2 className="section-title on-dark">
                Our Global Principals
              </h2>
              <p className="section-lead on-dark" style={{ margin: "20px auto 0" }}>
                We bring the world&apos;s leading defence and engineering
                manufacturers to Malaysia — proven, certified technology trusted
                by armed forces worldwide.
              </p>
            </Reveal>

            <PrincipalGrid items={featuredPrincipals} dark />

            <div style={{ textAlign: "center", marginTop: 36 }}>
              <Link href="/services" className="btn btn-primary">
                Explore Our Services <ArrowRight width={18} height={18} />
              </Link>
            </div>
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
                  Tell us about your programme. Our technical team will respond
                  with a tailored capability briefing and the right global
                  principal for the job.
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
