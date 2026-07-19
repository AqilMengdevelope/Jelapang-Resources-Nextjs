import Image from "next/image";
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
            <Image
              src={client.logo ?? `/clients/${client.slug}.png`}
              alt={client.name}
              width={160}
              height={72}
            />
          </div>
        )
      )}
    </div>
  );
}
