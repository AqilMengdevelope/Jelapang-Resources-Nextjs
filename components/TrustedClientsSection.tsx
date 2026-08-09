import Reveal from "@/components/Reveal";
import type { TrustedClient } from "@/data/clients";

type Props = {
  kicker: string;
  title: string;
  description: string;
  clients: TrustedClient[];
  /** Fallback image path when CMS logo is missing */
  logoFallback?: (slug: string) => string;
};

const GRID_COLS = 5;

export function splitTrustedClients(clients: TrustedClient[]) {
  const featuredCount = clients.length % GRID_COLS;
  if (featuredCount === 0) {
    return { featured: [] as TrustedClient[], grid: clients };
  }
  // Orders 1–5 (etc.) stay in the 5-col row; remainder (6, 7, …) become large cards.
  return {
    grid: clients.slice(0, clients.length - featuredCount),
    featured: clients.slice(clients.length - featuredCount),
  };
}

function ClientCard({
  client,
  logoSrc,
  wide = false,
}: {
  client: TrustedClient;
  logoSrc: string;
  wide?: boolean;
}) {
  const className = wide
    ? "rail-cust-card rail-cust-card--wide"
    : "rail-cust-card";

  const body = (
    <>
      <div className="rail-cust-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={client.name} />
      </div>
      <div className="rail-cust-copy">
        <span className="rail-cust-name">{client.name}</span>
        <span className="rail-cust-type">
          {client.description?.trim() || "\u00A0"}
        </span>
      </div>
    </>
  );

  if (client.website) {
    return (
      <a
        href={client.website}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export default function TrustedClientsSection({
  kicker,
  title,
  description,
  clients,
  logoFallback = (slug) => `/clients/${slug}.png`,
}: Props) {
  if (!clients.length) return null;

  const { featured, grid } = splitTrustedClients(clients);

  return (
    <section className="section rail-customers">
      <div className="container">
        <Reveal className="rail-customers-head">
          <span className="kicker">{kicker}</span>
          <h2 className="section-title">{title}</h2>
          <p>{description}</p>
        </Reveal>

        {grid.length > 0 && (
          <div className="rail-cust-grid">
            {grid.map((client, idx) => (
              <Reveal key={client.slug} delay={idx * 50}>
                <ClientCard
                  client={client}
                  logoSrc={client.logo ?? logoFallback(client.slug)}
                />
              </Reveal>
            ))}
          </div>
        )}

        {featured.length > 0 && (
          <div
            className={`rail-featured-row rail-featured-row--${featured.length}${grid.length ? " rail-featured-row--after-grid" : ""}`}
          >
            {featured.map((client, idx) => (
              <Reveal key={client.slug} delay={idx * 60}>
                <ClientCard
                  client={client}
                  logoSrc={client.logo ?? logoFallback(client.slug)}
                  wide
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
