"use client";

import { useState } from "react";

/**
 * Brand splash. CSS starts the fade immediately (no wait for window.load
 * or hydration timers). React only removes the node after the animation.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  if (gone) return null;

  return (
    <div
      className="preloader"
      onAnimationEnd={(e) => {
        if (e.animationName === "preloader-exit") setGone(true);
      }}
    >
      <div className="preloader-inner">
        <div className="preloader-ring" />
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
