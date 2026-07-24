import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import WorkCardGrid from "@/components/WorkCardGrid";
import { getWorkItems, resolveProjectsHeroImage } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Projects, Jelapang Resources",
  description:
    "Project gallery of field delivery across railway depot systems, rolling-stock maintenance and infrastructure support.",
};

export default async function ProjectsPage() {
  const projects = await getWorkItems("project");
  const heroImage = resolveProjectsHeroImage(projects);

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Our Work"
          title="Projects"
          subtitle="On-site project delivery, depot systems and workshop installations documented from the field."
          image={heroImage}
          crumbs={[{ label: "Projects" }]}
        />

        <section className="section">
          <div className="container">
            <Reveal className="lead-block" style={{ maxWidth: 720, marginBottom: 48 }}>
              <span className="kicker">Project Gallery</span>
              <h2 className="section-title">Recent field projects</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 17, marginTop: 18 }}>
                Browse documented project work across railway and infrastructure programmes.
                Each gallery collects photos from delivery, installation and commissioning on site.
              </p>
            </Reveal>

            <WorkCardGrid items={projects} />
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
