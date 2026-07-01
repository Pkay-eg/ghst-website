import Image from "next/image";

interface ReservePartner {
  name: string;
  role: string;
  domain?: string;
  local?: string;
  localWidth?: number;
  localHeight?: number;
}

const PARTNERS: ReservePartner[] = [
  { name: "UMB Ghana", role: "Trustee bank", local: "/assets/umb-logo.png", localWidth: 225, localHeight: 225 },
  { name: "OmniBSIC", role: "Trustee bank", domain: "omnibsic.com.gh" },
  { name: "Constant Capital", role: "Asset manager", domain: "constantcap.com.gh" },
  { name: "BNA", role: "Attestor", local: "/assets/bna-mark.png", localWidth: 256, localHeight: 256 },
];

export function ReservePartners() {
  return (
    <div className="rsv-partners">
      <div className="rsv-partners-label">Reserve &amp; audit partners</div>
      <div className="rsv-partners-grid">
        {PARTNERS.map((p, i) => (
          <div className="rsv-partner" key={i}>
            {p.local ? (
              <Image
                className="rsv-partner-mark"
                src={p.local}
                alt=""
                aria-hidden
                width={p.localWidth}
                height={p.localHeight}
                loading="lazy"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="rsv-partner-mark"
                src={`https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
                alt=""
                aria-hidden
                loading="lazy"
              />
            )}
            <div>
              <div className="rsv-partner-name">{p.name}</div>
              <div className="rsv-partner-role">{p.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
