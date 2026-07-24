import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WorkCardGrid from "@/components/WorkCardGrid";
import { getWorkItems, resolveActivitiesHeroImage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Activities, Jelapang Resources",
  description:
    "Exhibitions, training and field engagement activities across defence, security and emergency management.",
};

export default async function ActivitiesPage() {
  const activities = await getWorkItems("activity");
  const heroImage = resolveActivitiesHeroImage(activities);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Work"
          title="Activities"
          subtitle="Exhibitions, training programmes and partner engagements documented from the field."
          image={heroImage}
          crumbs={[{ label: "Activities" }]}
        />

        <section className="section">
          <div className="container">
            <Reveal className="lead-block" style={{ maxWidth: 720, marginBottom: 48 }}>
              <span className="kicker">Activity Gallery</span>
              <h2 className="section-title">Recent activities</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                Browse documented exhibitions, training and engagement work with defence,
                security and emergency-management partners.
              </p>
            </Reveal>

            <WorkCardGrid items={activities} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
