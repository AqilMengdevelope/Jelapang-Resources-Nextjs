import { fallbackClients, type TrustedClient } from "@/data/clients";

type Props = {
  clients?: TrustedClient[];
};

export default function ClientLogos({ clients = fallbackClients }: Props) {
  return (
    <div className="client-logos">
      {clients.map((client) =>
        client.type === "badge" ? (
          <div className="client-badge" key={client.slug} title={client.name}>
            {client.badgeText ?? client.name}
          </div>
        ) : (
          <div className="client-logo" key={client.slug} title={client.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={client.logo ?? `/clients/${client.slug}.png`} alt={client.name} />
          </div>
        )
      )}
    </div>
  );
}
