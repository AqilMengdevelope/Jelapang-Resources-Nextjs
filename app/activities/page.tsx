import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getActivities, resolveActivitiesHeroImage } from "@/lib/wordpress";
import { ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Activities — Jelapang Resources",
  description:
    "Field activities and project delivery across railway depot systems, rolling-stock maintenance and infrastructure support.",
};

export default async function ActivitiesPage() {
  const activities = await getActivities();
  const heroImage = resolveActivitiesHeroImage(activities);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Work"
          title="Activities"
          subtitle="On-site project delivery, depot systems and workshop installations documented from the field."
          image={heroImage}
          crumbs={[{ label: "Activities" }]}
        />

        <section className="section">
          <div className="container">
            <Reveal className="lead-block" style={{ maxWidth: 720, marginBottom: 48 }}>
              <span className="kicker">Project Gallery</span>
              <h2 className="section-title">Recent field activities</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                Browse documented project work across railway and infrastructure programmes.
                Each category collects photos from delivery, installation and commissioning on site.
              </p>
            </Reveal>

            <div className="activities-grid">
              {activities.map((activity, index) => {
                return (
                  <Reveal key={activity.slug} delay={index * 80}>
                    <Link href={`/activities/${activity.slug}`} className="activity-card">
                      <div className="activity-card-media">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activity.featuredImage}
                          alt={activity.title}
                          loading={index < 2 ? "eager" : "lazy"}
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
                );
              })}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
