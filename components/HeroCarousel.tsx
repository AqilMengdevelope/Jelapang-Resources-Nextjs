"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";
import { defaultHeroSlides, type HeroSlide } from "@/data/hero";

export default function HeroCarousel({
  slides = defaultHeroSlides,
}: {
  slides?: HeroSlide[];
}) {
  const [i, setI] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (n: number) => setI(() => ((n % count) + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count]);

  if (!count) return null;

  return (
    <section className="hero" id="top">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === i ? "active" : ""}`}
          aria-hidden={idx !== i}
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={idx === 0}
            sizes="100vw"
            className="hero-slide-image"
          />
        </div>
      ))}

      <div className="container hero-content">
        <span className="hero-flag">
          <span /> {slides[i].tag}
        </span>
        <h1>
          {slides[i].title}
          {slides[i].titleHighlight ? (
            <>
              {" "}
              <span className="hl">{slides[i].titleHighlight}</span>
            </>
          ) : null}
        </h1>
        <p className="hero-sub">{slides[i].sub}</p>
        <div className="hero-actions">
          <Link href="/services" className="btn btn-primary">
            Explore Our Services <ArrowRight width={18} height={18} />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>

      <div className="hero-ui">
        <div className="container hero-ui-inner">
          <div className="hero-dots">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={idx === i ? "on" : ""}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setI(idx)}
              />
            ))}
          </div>
          <span className="hero-tag">
            0{i + 1} / 0{count}
          </span>
          <div className="hero-arrows">
            <button aria-label="Previous slide" onClick={() => go(i - 1)}>
              <ChevronLeft />
            </button>
            <button aria-label="Next slide" onClick={() => go(i + 1)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
