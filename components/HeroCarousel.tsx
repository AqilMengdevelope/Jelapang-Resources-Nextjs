"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "./icons";

type Slide = {
  image: string;
  tag: string;
  title: React.ReactNode;
  sub: string;
};

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1588450248442-1c8357368dba?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "Land · Sea · Air",
    title: (
      <>
        Ready to serve <span className="hl">the nation</span>
      </>
    ),
    sub: "A Malaysian Bumiputera-owned defence partner supplying world-class equipment and technical services to the Armed Forces, Police and enforcement agencies.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1545631757-8b75025a310e?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "Strength · Mobility · Protection",
    title: (
      <>
        Strength in <span className="hl">every mission</span>
      </>
    ),
    sub: "From small arms ammunition to armoured vehicle systems — proven, certified technology delivered on specification and on time.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1719553946838-1190abdeee92?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "A Strategic Partner",
    title: (
      <>
        Trusted across <span className="hl">military, railway &amp; IT</span>
      </>
    ),
    sub: "Engineering, supply and lifecycle support for mission-critical assets — backed by renowned global technology partners.",
  },
];

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const count = slides.length;

  const go = useCallback(
    (n: number) => setI((p) => (n + count) % count),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % count), 6500);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="hero" id="top">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`hero-slide ${idx === i ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden={idx !== i}
        />
      ))}

      <div className="container hero-content">
        <span className="hero-flag">
          <span /> {slides[i].tag}
        </span>
        <h1>{slides[i].title}</h1>
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
