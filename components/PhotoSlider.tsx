"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./icons";
import type { GallerySlide } from "@/data/military-gallery";

/**
 * Simple auto-advancing photo slider with arrows, dots and swipe support.
 * Used for photo galleries on service pages.
 */
export default function PhotoSlider({
  slides,
  interval = 5000,
}: {
  slides: GallerySlide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const count = slides.length;
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => setI(((n % count) + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, interval]);

  if (!count) return null;

  return (
    <div className="pslider">
      <div
        className="pslider-frame"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 48) go(dx < 0 ? i + 1 : i - 1);
          touchX.current = null;
        }}
      >
        {slides.map((s, idx) => (
          <div
            key={idx}
            className={`pslider-slide ${idx === i ? "active" : ""}`}
            aria-hidden={idx !== i}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.alt} loading={idx === 0 ? "eager" : "lazy"} />
          </div>
        ))}

        <button
          className="pslider-arrow prev"
          aria-label="Previous photo"
          onClick={() => go(i - 1)}
        >
          <ChevronLeft />
        </button>
        <button
          className="pslider-arrow next"
          aria-label="Next photo"
          onClick={() => go(i + 1)}
        >
          <ChevronRight />
        </button>

        <span className="pslider-count">
          {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
      </div>

      <div className="pslider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={idx === i ? "on" : ""}
            aria-label={`Go to photo ${idx + 1}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  );
}
