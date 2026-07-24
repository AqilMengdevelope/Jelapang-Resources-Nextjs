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
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const count = slides.length;

  const go = useCallback(
    (n: number) => {
      const next = ((n % count) + count) % count;
      setMounted((prev) => {
        const copy = new Set(prev);
        copy.add(next);
        // Prefetch neighbour for smoother next click / autoplay
        copy.add((next + 1) % count);
        return copy;
      });
      setI(next);
    },
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => go(i + 1), 6500);
    return () => clearInterval(t);
  }, [count, go, i]);

  // Prefetch slide 2 shortly after first paint so autoplay is ready
  useEffect(() => {
    if (count < 2) return;
    const t = setTimeout(() => {
      setMounted((prev) => {
        const copy = new Set(prev);
        copy.add(1);
        return copy;
      });
    }, 1200);
    return () => clearTimeout(t);
  }, [count]);

  if (!count) return null;

  return (
    <section className="hero" id="top">
      {slides.map((s, idx) =>
        mounted.has(idx) ? (
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
              quality={75}
              sizes="100vw"
              className="hero-slide-image"
            />
          </div>
        ) : (
          <div
            key={idx}
            className="hero-slide"
            aria-hidden
            style={{ display: "none" }}
          />
        )
      )}

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
                onClick={() => go(idx)}
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
