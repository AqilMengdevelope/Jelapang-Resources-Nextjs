"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CloseIcon, ChevronDown, ArrowRight } from "./icons";

type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
};

const links: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    label: "Our Services",
    children: [
      { href: "/military", label: "Military" },
      { href: "/railway", label: "Railway" },
      { href: "/it", label: "IT" },
    ],
  },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href?: string) =>
    href ? (href === "/" ? pathname === "/" : pathname.startsWith(href)) : false;
  const groupActive = (item: NavItem) =>
    item.children?.some((c) => isActive(c.href)) ?? false;

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
                <button className="nav-trigger" type="button">
                  {l.label}
                  <ChevronDown width={15} height={15} />
                </button>
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
          <Link href="/contact" className="btn btn-primary">
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
                <span className="drawer-group-label">{l.label}</span>
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
          <Link href="/contact" className="btn btn-primary" onClick={close}>
            Request a Briefing <ArrowRight width={18} height={18} />
          </Link>
          <a href="tel:+601139552624" className="drawer-phone">
            +60 11-3955 2624
          </a>
        </div>
      </aside>
    </header>
  );
}
