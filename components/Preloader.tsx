"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [phase, setPhase] = useState<"visible" | "fading" | "gone">("visible");

  useEffect(() => {
    const fade = () => setPhase("fading");
    const remove = () => setPhase("gone");

    // Start fade once window has loaded (or after 2.2s max)
    const onLoad = () => {
      // Small delay so the animation has time to play at least once
      setTimeout(fade, 400);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      // Fallback: fade out after 2.5s regardless
      setTimeout(fade, 2500);
    }

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("gone"), 600);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div className={`preloader ${phase === "fading" ? "preloader-out" : ""}`}>
      <div className="preloader-inner">
        {/* Spinning ring */}
        <div className="preloader-ring" />

        {/* Logo emblem */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon.png"
          alt=""
          aria-hidden="true"
          className="preloader-logo"
        />
      </div>

      <span className="preloader-wordmark">JELAPANG RESOURCES</span>
    </div>
  );
}
