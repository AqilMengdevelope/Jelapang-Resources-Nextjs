"use client";

import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "./icons";

const links = [
  { href: "#about", label: "About Us" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#why", label: "Why Us" },
  { href: "#partners", label: "Partners" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header ${scrolled ? "scrolled" : "at-top"} ${
        open ? "menu-open" : ""
      }`}
    >
      <div className="container header-inner">
        <a href="#top" className="brand" aria-label="Jelapang Resources home">
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
        </a>

        <nav className="nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-cta">
          <a href="#contact" className="btn btn-primary">
            Request a Briefing
          </a>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav" style={{ display: "flex" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => setOpen(false)}
          >
            Request a Briefing
          </a>
        </div>
      )}
    </header>
  );
}
