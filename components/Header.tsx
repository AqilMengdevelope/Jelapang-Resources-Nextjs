"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MenuIcon, CloseIcon, ChevronDown, ArrowRight } from "./icons";

import { site as fallbackSite, briefingHref } from "@/data/site";
import { scrollToHash } from "@/components/HashScroll";

type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
};

const links: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    href: "/services",
    label: "Our Services",
    children: [
      { href: "/military", label: "Military" },
      { href: "/railway", label: "Railway" },
      { href: "/it", label: "IT" },
    ],
  },
  { href: "/activities", label: "Activities" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header({
  phoneDisplay = fallbackSite.phoneDisplay,
  phoneHref = fallbackSite.phoneHref,
}: {
  phoneDisplay?: string;
  phoneHref?: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href?: string) =>
    href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false;
  const groupActive = (item: NavItem) =>
    isActive(item.href) || (item.children?.some((c) => isActive(c.href)) ?? false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const goToBriefing = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    close();

    const scrollDelays = [0, 50, 150, 300, 600, 1000];
    const scheduleScroll = () => {
      scrollDelays.forEach((ms) => window.setTimeout(scrollToHash, ms));
    };

    if (pathname === "/contact") {
      window.history.replaceState(null, "", briefingHref);
      scheduleScroll();
      return;
    }

    router.push(briefingHref, { scroll: false });
    scheduleScroll();
  };

  return (
    <header
      className={`header ${scrolled ? "scrolled" : "at-top"} ${
        open ? "menu-open" : ""
      }`}
    >
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Jelapang Resources home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jelapang-logo-light.png"
            alt="Jelapang Resources Sdn. Bhd."
            className="brand-logo logo-on-dark"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jelapang-logo.png"
            alt="Jelapang Resources Sdn. Bhd."
            className="brand-logo logo-on-light"
          />
        </Link>

        <nav className="nav">
          {links.map((l) =>
            l.children ? (
              <div
                key={l.label}
                className={`nav-item has-dropdown ${
                  groupActive(l) ? "active" : ""
                }`}
              >
                <Link href={l.href!} className="nav-trigger">
                  {l.label}
                  <ChevronDown width={15} height={15} />
                </Link>
                <div className="dropdown">
                  {l.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={isActive(c.href) ? "active" : ""}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href!}
                className={isActive(l.href) ? "active" : ""}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="header-cta">
          <Link
            href={briefingHref}
            scroll={false}
            className="btn btn-primary"
            onClick={goToBriefing}
          >
            Request a Briefing
          </Link>
          <button
            className="menu-btn"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <div
        className={`drawer-backdrop ${open ? "show" : ""}`}
        onClick={close}
        aria-hidden
      />
      <aside
        className={`drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="drawer-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jelapang-logo-light.png"
            alt="Jelapang Resources Sdn. Bhd."
            className="drawer-logo"
          />
          <button className="drawer-close" aria-label="Close menu" onClick={close}>
            <CloseIcon />
          </button>
        </div>

        <nav className="drawer-nav">
          {links.map((l, i) =>
            l.children ? (
              <div
                key={l.label}
                className="drawer-group"
                style={{ ["--d" as string]: `${i * 55}ms` }}
              >
                <Link
                  href={l.href!}
                  className="drawer-group-label"
                  onClick={close}
                >
                  {l.label}
                </Link>
                <div className="drawer-sublist">
                  {l.children.map((c) => (
                    <Link key={c.href} href={c.href} onClick={close}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href!}
                className="drawer-link"
                onClick={close}
                style={{ ["--d" as string]: `${i * 55}ms` }}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="drawer-foot">
          <Link
            href={briefingHref}
            scroll={false}
            className="btn btn-primary"
            onClick={goToBriefing}
          >
            Request a Briefing <ArrowRight width={18} height={18} />
          </Link>
          <a href={phoneHref} className="drawer-phone">
            {phoneDisplay}
          </a>
        </div>
      </aside>
    </header>
  );
}
