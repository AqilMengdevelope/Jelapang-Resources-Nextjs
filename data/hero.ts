export type HeroSlide = {
  image: string;
  tag: string;
  /** Main headline text (rendered before the highlighted part). */
  title: string;
  /** Optional highlighted tail of the headline (shown in the accent colour). */
  titleHighlight?: string;
  sub: string;
};

/**
 * Default hero slides. Used as the fallback when the WordPress
 * `jelapang/v1/hero` endpoint returns nothing (or is unreachable).
 */
export const defaultHeroSlides: HeroSlide[] = [
  {
    image:
      "https://cms.jelapangresources.com/wp-content/uploads/2026/07/IMG_8513.jpeg",
    tag: "Land · Sea · Air",
    title: "Ready to serve",
    titleHighlight: "the nation",
    sub: "A Malaysian Bumiputera-owned defence partner supplying world-class equipment and technical services to the Armed Forces, Police and enforcement agencies.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580442374555-3def8fb41738?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "Rolling Stock · Infrastructure",
    title: "Keeping rail",
    titleHighlight: "on the move",
    sub: "Rolling-stock supply, maintenance and trackside infrastructure that keep the nation's rail networks safe, reliable and running.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506399309177-3b43e99fead2?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "Systems · Electronics",
    title: "Powering modern",
    titleHighlight: "operations",
    sub: "ICT hardware, electronics engineering and lifecycle support for the digital systems that run mission-critical operations.",
  },
];
