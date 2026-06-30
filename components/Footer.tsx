import Link from "next/link";
import { PinIcon, PhoneIcon, MailIcon } from "./icons";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/jelapang-logo-light.png"
                alt="Jelapang Resources Sdn. Bhd."
                className="brand-logo"
              />
            </Link>
            <p>
              A Malaysian Bumiputera-owned engineering and supply specialist
              delivering world-class technology across Military, Railway and IT.
            </p>
          </div>

          <div>
            <h4>Our Services</h4>
            <ul>
              <li><Link href="/military">Military</Link></li>
              <li><Link href="/railway">Railway</Link></li>
              <li><Link href="/it">IT</Link></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li className="contact-line">
                <PinIcon />
                <span>{site.address}</span>
              </li>
              <li className="contact-line">
                <PhoneIcon />
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              </li>
              <li className="contact-line">
                <MailIcon />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name} ({site.regNo}). All rights
            reserved.
          </span>
          <span>Military · Railway · IT — Kuala Lumpur, Malaysia</span>
        </div>
      </div>
    </footer>
  );
}
