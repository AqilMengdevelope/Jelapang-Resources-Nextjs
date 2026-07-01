import type { Metadata } from "next";
import "./maintenance.css";
import { MailIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Under Maintenance — Jelapang Resources",
  description:
    "Jelapang Resources is currently undergoing scheduled maintenance. We will be back online shortly.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="mnt">
      <span className="mnt-orb a" aria-hidden />
      <span className="mnt-orb b" aria-hidden />

      <div className="mnt-inner">
        <div className="mnt-logo-wrap">
          <span className="mnt-ring r1" aria-hidden />
          <span className="mnt-ring r2" aria-hidden />
          <span className="mnt-ring r3" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="Jelapang Resources" className="mnt-logo" />
        </div>

        <span className="mnt-kicker">Scheduled Maintenance</span>

        <h1>
          We&apos;ll be <span className="hl">right back</span>
        </h1>

        <p className="mnt-sub">
          Our website is currently undergoing planned maintenance to bring you an
          even better experience. Our team is on it — everything will be back
          online shortly. Thank you for your patience.
        </p>

        <div className="mnt-bar" role="progressbar" aria-label="Maintenance in progress" />
        <span className="mnt-bar-label">Working on it</span>

        <div className="mnt-divider" aria-hidden />

        <p className="mnt-sub" style={{ marginTop: 0, marginBottom: 24 }}>
          Need to reach us in the meantime?
        </p>

        <div className="mnt-contact">
          <a href={`mailto:${site.email}`}>
            <MailIcon width={17} height={17} />
            {site.email}
          </a>
          <a href={site.phoneHref}>
            <PhoneIcon width={17} height={17} />
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="mnt-foot">
        © {new Date().getFullYear()} {site.name} ({site.regNo}) · Military ·
        Railway · IT
      </div>
    </div>
  );
}
