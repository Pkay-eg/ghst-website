import Image from "next/image";

interface Partner {
  name: string;
  domain?: string;
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  url: string;
}

const PARTNERS: Partner[] = [
  { name: "WeWire", domain: "wewire.com", url: "https://www.wewire.com" },
  { name: "Obiex", domain: "obiex.finance", url: "https://obiex.finance" },
  { name: "BitAfrika", domain: "bitafrika.com", url: "https://bitafrika.com" },
  { name: "AFri", logo: "/assets/afri-logo.png", logoWidth: 512, logoHeight: 512, url: "#" },
  { name: "Mansu", logo: "/assets/mansu-logo.png", logoWidth: 1024, logoHeight: 1024, url: "#" },
];

const LOOP = [...PARTNERS, ...PARTNERS];

export function PartnerStrip() {
  return (
    <section className="partner-strip">
      <div className="container">
        <div className="partner-strip-label">Built with partners across West Africa</div>
      </div>
      <div className="partner-marquee">
        <div className="partner-track" aria-hidden={false}>
          {LOOP.map((p, i) => (
            <a
              className="partner"
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              aria-hidden={i >= PARTNERS.length ? true : undefined}
              tabIndex={i >= PARTNERS.length ? -1 : undefined}
            >
              {p.logo ? (
                <Image
                  className="partner-mark"
                  src={p.logo}
                  alt=""
                  aria-hidden
                  width={p.logoWidth}
                  height={p.logoHeight}
                  loading="lazy"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="partner-mark"
                  src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                />
              )}
              <span className="partner-name">{p.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
