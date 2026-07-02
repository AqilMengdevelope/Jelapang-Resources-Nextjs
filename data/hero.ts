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
      "https://images.unsplash.com/photo-1545631757-8b75025a310e?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "Strength · Mobility · Protection",
    title: "Strength in",
    titleHighlight: "every mission",
    sub: "From small arms ammunition to armoured vehicle systems — proven, certified technology delivered on specification and on time.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1719553946838-1190abdeee92?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    tag: "A Strategic Partner",
    title: "Trusted across",
    titleHighlight: "military, railway & IT",
    sub: "Engineering, supply and lifecycle support for mission-critical assets — backed by renowned global technology partners.",
  },
];
