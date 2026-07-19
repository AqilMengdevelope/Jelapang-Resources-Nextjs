import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import PhotoSlider from "@/components/PhotoSlider";
import { getActivities, getActivityBySlug } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const activities = await getActivities();
  return activities.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    return { title: "Activity, Jelapang Resources" };
  }

  return {
    title: `${activity.title}, Activities, Jelapang Resources`,
    description: activity.excerpt,
  };
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const category = activity.categories[0];
  const slides =
    activity.gallery.length > 0
      ? activity.gallery
      : activity.featuredImage
        ? [{ image: activity.featuredImage, alt: activity.title }]
        : [];

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker={category?.name ?? "Activities"}
          title={activity.title}
          subtitle={activity.excerpt}
          image={activity.featuredImage}
          crumbs={[
            { label: "Activities", href: "/activities" },
            { label: activity.title },
          ]}
        />

        <section className="section">
          <div className="container">
            {slides.length > 0 && (
              <Reveal>
                <PhotoSlider slides={slides} />
              </Reveal>
            )}

            {activity.content && (
              <Reveal className="activity-content" delay={120}>
                <div dangerouslySetInnerHTML={{ __html: activity.content }} />
              </Reveal>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
