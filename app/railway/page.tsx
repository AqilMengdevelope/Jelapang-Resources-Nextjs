import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PrincipalGrid from "@/components/PrincipalGrid";
import { getActivities, getPrincipals, getSiteInfo } from "@/lib/wordpress";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { briefingHref } from "@/data/site";

export const metadata: Metadata = {
  title: "Railway, Jelapang Resources",
  description:
    "Engineering, supply and maintenance that keep rail networks safe and moving, rolling stock components, depot equipment, track maintenance and re-railing solutions.",
};

const points = [
  "Rolling stock spare parts & components",
  "Bogie & wheelset maintenance systems",
  "Track maintenance machines & power tools",
  "Train washing & water-treatment plants",
  "Hydraulic re-railing & rescue equipment",
  "Traction energy & fast-charging systems",
  "Steel structure fabrication & erection",
  "Scheduled preventive servicing & MRO",
];

export default async function RailwayPage() {
  const [railwayPrincipals, site, allActivities] = await Promise.all([
    getPrincipals("railway"),
    getSiteInfo(),
    getActivities(),
  ]);
  const featuredActivities = allActivities.slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Services"
          title="Railway"
          subtitle="Engineering, supply and maintenance solutions that keep rail networks safe, reliable and moving."
          image="https://cms.jelapangresources.com/wp-content/uploads/2026/07/IMG_9756-15.jpg"
          crumbs={[{ label: "Our Services" }, { label: "Railway" }]}
        />

        <section className="section">
          <div className="container">
            <div className="service-intro">
              <Reveal className="lead-block">
                <span className="kicker">Capabilities</span>
                <h2 className="section-title">
                  Keeping the network moving
                </h2>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                  Jelapang Resources supplies and supports the systems that keep
                  rail operations safe and efficient, from rolling stock spare
                  parts and depot maintenance equipment to track-maintenance
                  machinery and re-railing solutions.
                </p>
                <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 16 }}>
                  Working with specialised European principals, we deliver
                  proven railway technology together with engineering,
                  fabrication and lifecycle maintenance services.
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

        <section className="section caps">
          <div className="container">
            <div className="center-head">
              <Reveal>
                <span className="kicker center">Our Principals</span>
                <h2 className="section-title">Railway Technology Partners</h2>
                <p className="section-lead">
                  The specialised manufacturers we represent across the railway
                  sector.
                </p>
              </Reveal>
            </div>
            <PrincipalGrid items={railwayPrincipals} layout="page" />
          </div>
        </section>

        {/* Current Customers */}
        <section className="section rail-customers">
          <div className="container">
            <Reveal className="rail-customers-head">
              <span className="kicker">Trusted By</span>
              <h2 className="section-title">Current Customers</h2>
              <p>
                Proud to support Malaysia&apos;s leading rail operators and
                transit authorities with proven engineering and supply solutions.
              </p>
            </Reveal>

            {/* Featured: Prasarana */}
            <Reveal>
              <div className="rail-featured">
                <div className="rail-featured-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/railway-customers/prasarana.png" alt="Prasarana" />
                </div>
                <div className="rail-featured-body">
                  <span className="rail-featured-tag">Primary Operator</span>
                  <h3>Prasarana Malaysia Berhad</h3>
                  <p>
                    Malaysia&apos;s national integrated public transport corporation,
                    operating urban rail and bus networks across the Klang Valley, including LRT, MRT, Monorail and BRT lines serving millions
                    of daily commuters.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Other customers */}
            <div className="rail-cust-grid">
              {[
                { slug: "lrt3",       name: "LRT 3",        type: "Light Rapid Transit Line 3",  site: "https://lrt3.com.my" },
                { slug: "kl-monorail",name: "KL Monorail",  type: "Kuala Lumpur Urban Monorail", site: "https://myrapid.com.my" },
                { slug: "klia-ekspres",name: "KLIA Ekspres", type: "Express Rail Link to KLIA",   site: "https://kliaekspres.com" },
                { slug: "rapid-rail", name: "Rapid Rail",   type: "Urban Rail Operations",       site: "https://rapidrail.com.my" },
                { slug: "mrt-corp",   name: "MRT Corp",     type: "Mass Rapid Transit Corp.",    site: "https://mrt.com.my" },
              ].map((c, idx) => (
                <Reveal key={c.slug} delay={idx * 70}>
                  <a
                    href={c.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rail-cust-card"
                  >
                    <div className="rail-cust-logo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/railway-customers/${c.slug}.png`} alt={c.name} />
                    </div>
                    <span className="rail-cust-name">{c.name}</span>
                    <span className="rail-cust-type">{c.type}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Projects */}
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
                    A look at recent field activities, depot systems,
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
                        <Image
                          src={activity.featuredImage}
                          alt={activity.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
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

        <section className="section cta">
          <div className="container">
            <div className="cta-inner">
              <Reveal>
                <span className="kicker">Let&apos;s Talk</span>
                <h2>Have a railway requirement?</h2>
                <p>
                  From rolling stock to depot systems, tell us what you need and
                  we will match you with the right principal.
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
