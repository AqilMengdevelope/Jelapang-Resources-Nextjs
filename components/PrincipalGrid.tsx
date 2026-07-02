import Reveal from "./Reveal";
import { ExternalIcon } from "./icons";
import { principalLogo, type Principal } from "@/data/principals";

export default function PrincipalGrid({
  items,
  dark = false,
  layout = "default",
}: {
  items: Principal[];
  dark?: boolean;
  /** Larger logo area for service pages (e.g. /military). */
  layout?: "default" | "page";
}) {
  return (
    <div
      className={`principals-grid ${dark ? "on-dark" : ""} ${
        layout === "page" ? "principals-grid--page" : ""
      }`.trim()}
    >
      {items.map((p, idx) => (
        <Reveal key={`${p.slug}-${idx}`} className="principal-card" as="article" delay={(idx % 4) * 60}>
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <span className="pc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.logo || principalLogo(p.slug)}
                alt={`${p.name} logo`}
                loading={layout === "page" ? "eager" : "lazy"}
                decoding="async"
              />
            </span>
            <span className="pc-origin">{p.origin}</span>
            <span className="pc-name">{p.name}</span>
            <span className="pc-tag">{p.tagline}</span>
            <span className="pc-more">
              Visit Website <ExternalIcon width={14} height={14} />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
