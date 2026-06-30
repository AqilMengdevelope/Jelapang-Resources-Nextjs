import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { PinIcon, PhoneIcon, MailIcon, LayersIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us — Jelapang Resources",
  description:
    "Get in touch with Jelapang Resources Sdn. Bhd. — Kuala Lumpur, Malaysia. Email info@jelapangresources.com or call +60 11-3955 2624.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          kicker="Contact Us"
          title="Let's Talk"
          subtitle="Tell us about your military, railway or IT requirement and our technical team will respond with a tailored capability briefing."
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "Contact Us" }]}
        />

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              <Reveal className="contact-card">
                <span className="ic">
                  <MailIcon width={22} height={22} />
                </span>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </Reveal>

              <Reveal className="contact-card" delay={80}>
                <span className="ic">
                  <PhoneIcon width={22} height={22} />
                </span>
                <div>
                  <h3>Phone</h3>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </div>
              </Reveal>

              <Reveal className="contact-card" delay={160}>
                <span className="ic">
                  <PinIcon width={22} height={22} />
                </span>
                <div>
                  <h3>Head Office</h3>
                  <p>{site.address}</p>
                </div>
              </Reveal>

              <Reveal className="contact-card" delay={240}>
                <span className="ic">
                  <LayersIcon width={22} height={22} />
                </span>
                <div>
                  <h3>Workshop</h3>
                  <p>{site.workshop}</p>
                </div>
              </Reveal>
            </div>

            <Reveal className="contact-map" delay={120}>
              <iframe
                title="Jelapang Resources location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=3%20Towers%20Jalan%20Ampang%20Kuala%20Lumpur&output=embed"
              />
            </Reveal>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
