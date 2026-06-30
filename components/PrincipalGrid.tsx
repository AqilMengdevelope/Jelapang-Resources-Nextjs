import Reveal from "./Reveal";
import { ExternalIcon } from "./icons";
import { principalLogo, type Principal } from "@/data/principals";

export default function PrincipalGrid({
  items,
  dark = false,
}: {
  items: Principal[];
  dark?: boolean;
}) {
  return (
    <div className={`principals-grid ${dark ? "on-dark" : ""}`}>
      {items.map((p, idx) => (
        <Reveal key={p.slug} className="principal-card" as="article" delay={(idx % 4) * 60}>
          <a
            href={p.website}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <span className="pc-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo ?? principalLogo(p.slug)} alt={`${p.name} logo`} loading="lazy" />
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
