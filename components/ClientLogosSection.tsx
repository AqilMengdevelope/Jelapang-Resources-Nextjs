import Reveal from "./Reveal";
import ClientLogos from "./ClientLogos";
import { getClients } from "@/lib/wordpress";

export default async function ClientLogosSection({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { heading, clients } = await getClients();

  return (
    <Reveal className={className} style={style}>
      <p
        className="section-lead on-dark"
        style={{ textAlign: "center", margin: "0 auto" }}
      >
        {heading}
      </p>
      <ClientLogos clients={clients} />
    </Reveal>
  );
}
