"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function scrollToHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;

  const tryScroll = (attempt = 0) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (attempt < 24) {
      window.setTimeout(() => tryScroll(attempt + 1), 50);
    }
  };

  tryScroll();
}

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHash();
    const timers = [0, 100, 250, 500, 800].map((ms) =>
      window.setTimeout(scrollToHash, ms)
    );
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
