const clients = [
  { src: "/clients/army.png", name: "Malaysian Army" },
  { src: "/clients/navy.png", name: "Royal Malaysian Navy" },
  { src: "/clients/airforce.png", name: "Royal Malaysian Air Force" },
  { src: "/clients/police.png", name: "Royal Malaysia Police" },
  { src: "/clients/mmea.png", name: "Maritime Enforcement Agency" },
];

export default function ClientLogos() {
  return (
    <div className="client-logos">
      {clients.map((c) => (
        <div className="client-logo" key={c.name} title={c.name}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={c.name} />
        </div>
      ))}
      <div className="client-badge" title="Eastern Sabah Security Command">
        ESSCOM
      </div>
    </div>
  );
}
