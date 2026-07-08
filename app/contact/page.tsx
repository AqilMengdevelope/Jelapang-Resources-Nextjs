import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { PinIcon, PhoneIcon, MailIcon, LayersIcon, CheckIcon } from "@/components/icons";
import { getSiteInfo } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Contact Us — Jelapang Resources",
  description:
    "Get in touch with Jelapang Resources Sdn. Bhd. — Kuala Lumpur, Malaysia. Email info@jelapangresources.com or call +603-2704 8591 or +603-2704 8592.",
};

export default async function ContactPage() {
  const site = await getSiteInfo();

  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          kicker="Contact Us"
          title="Let's Talk"
          subtitle="Tell us about your military, railway or IT requirement and our technical team will respond with a tailored capability briefing."
          image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=2000&auto=format&fit=crop"
          crumbs={[{ label: "Contact Us" }]}
        />

        <section className="section contact-section">
          <div className="container">
            <Reveal className="contact-section-head">
              <span className="kicker">Get in Touch</span>
              <h2 className="section-title">Reach our technical team</h2>
              <p className="section-lead">
                Project enquiries, capability briefings and partnership discussions —
                connect with us in Kuala Lumpur or Shah Alam.
              </p>
            </Reveal>

            <div className="contact-split">
              <div className="contact-details">
                <ul className="contact-list">
                  <Reveal as="li" className="contact-item" delay={60}>
                    <span className="contact-item-icon" aria-hidden>
                      <MailIcon width={20} height={20} />
                    </span>
                    <div className="contact-item-body">
                      <span className="contact-item-label">Email</span>
                      <a href={`mailto:${site.email}`} className="contact-item-value contact-item-value--link">
                        {site.email}
                      </a>
                    </div>
                  </Reveal>

                  <Reveal as="li" className="contact-item" delay={100}>
                    <span className="contact-item-icon" aria-hidden>
                      <PhoneIcon width={20} height={20} />
                    </span>
                    <div className="contact-item-body">
                      <span className="contact-item-label">Phone</span>
                      <div className="contact-item-phones">
                        {site.phoneDisplay.split(" / ").map((line) => {
                          const href = `tel:${line.replace(/[^\d+]/g, "")}`;
                          return (
                            <a key={line} href={href} className="contact-item-value contact-item-value--link">
                              {line.trim()}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </Reveal>

                  <Reveal as="li" className="contact-item" delay={140}>
                    <span className="contact-item-icon" aria-hidden>
                      <PinIcon width={20} height={20} />
                    </span>
                    <div className="contact-item-body">
                      <span className="contact-item-label">Head Office</span>
                      <p className="contact-item-value">{site.address}</p>
                      <a
                        href="https://www.google.com/maps?q=3+Towers+Jalan+Ampang+Kuala+Lumpur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item-action"
                      >
                        Get directions
                      </a>
                    </div>
                  </Reveal>

                  <Reveal as="li" className="contact-item" delay={180}>
                    <span className="contact-item-icon" aria-hidden>
                      <LayersIcon width={20} height={20} />
                    </span>
                    <div className="contact-item-body">
                      <span className="contact-item-label">Workshop</span>
                      <p className="contact-item-value">{site.workshop}</p>
                      <a
                        href="https://www.google.com/maps?q=Jalan+Astaka+U8/88A+Bukit+Jelutong+Shah+Alam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-item-action"
                      >
                        Get directions
                      </a>
                    </div>
                  </Reveal>
                </ul>
              </div>
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

        <section className="section cf-section" id="briefing">
          <div className="container">
            <div className="cf-wrap">
              <Reveal className="cf-aside">
                <span className="kicker">Request a Briefing</span>
                <h2>Tell us about your requirement</h2>
                <p>
                  Fill in the form and one of our technical team members will
                  get back to you within 2 business days with a tailored
                  capability briefing.
                </p>
                <ul className="cf-aside-points">
                  <li><CheckIcon width={16} height={16} /> Military &amp; defence systems</li>
                  <li><CheckIcon width={16} height={16} /> Railway rolling stock &amp; infrastructure</li>
                  <li><CheckIcon width={16} height={16} /> IT hardware, electronics &amp; systems</li>
                  <li><CheckIcon width={16} height={16} /> General partnerships &amp; enquiries</li>
                </ul>
              </Reveal>

              <Reveal delay={120}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
