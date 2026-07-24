import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PhotoSlider from "@/components/PhotoSlider";
import { getActivityBySlug, getWorkItems } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getWorkItems("project");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getActivityBySlug(slug);

  if (!project || project.kind !== "project") {
    return { title: "Project, Jelapang Resources" };
  }

  return {
    title: `${project.title}, Projects, Jelapang Resources`,
    description: project.excerpt,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getActivityBySlug(slug);

  if (!project) {
    notFound();
  }

  if (project.kind !== "project") {
    redirect(`/activities/${project.slug}`);
  }

  const category = project.categories[0];
  const slides =
    project.gallery.length > 0
      ? project.gallery
      : project.featuredImage
        ? [{ image: project.featuredImage, alt: project.title }]
        : [];

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker={category?.name ?? "Projects"}
          title={project.title}
          subtitle={project.excerpt}
          image={project.featuredImage}
          crumbs={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />

        <section className="section">
          <div className="container">
            {slides.length > 0 && (
              <Reveal>
                <PhotoSlider slides={slides} />
              </Reveal>
            )}

            {project.content && (
              <Reveal className="activity-content" delay={120}>
                <div dangerouslySetInnerHTML={{ __html: project.content }} />
              </Reveal>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
