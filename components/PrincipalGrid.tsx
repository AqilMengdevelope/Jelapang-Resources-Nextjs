import Link from "next/link";
import Reveal from "./Reveal";
import { ArrowRight } from "./icons";
import type { Principal } from "@/data/principals";

export default function PrincipalGrid({ items }: { items: Principal[] }) {
  return (
    <div className="principals-grid">
      {items.map((p, idx) => (
        <Reveal key={p.slug} className="principal-card" as="article" delay={(idx % 4) * 60}>
          <Link
            href={`/principals/${p.slug}`}
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <span className="pc-origin">{p.origin}</span>
            <span className="pc-name">{p.name}</span>
            <span className="pc-tag">{p.tagline}</span>
            <span className="pc-more">
              View Principal <ArrowRight width={15} height={15} />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
