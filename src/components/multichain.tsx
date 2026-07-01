interface Chain {
  name: string;
  tagline: string;
  status: "live" | "soon";
  statusLabel: string;
  eta: string;
  domain: string;
  desc: string;
}

const CHAINS: Chain[] = [
  {
    name: "Base",
    tagline: "Ethereum L2 by Coinbase",
    status: "live",
    statusLabel: "Live",
    eta: "Mainnet · today",
    domain: "base.org",
    desc: "GHST is live on Base as a standard ERC-20. Settlement in ~3 seconds, fees in fractions of a cent.",
  },
  {
    name: "Stellar",
    tagline: "Built for cross-border payments",
    status: "soon",
    statusLabel: "Coming Q3 2026",
    eta: "Bridge in development",
    domain: "stellar.org",
    desc: "Stellar support unlocks low-cost remittance corridors and direct fiat on-/off-ramps through anchor partners.",
  },
  {
    name: "Tempo",
    tagline: "Stablecoin-native L1",
    status: "soon",
    statusLabel: "Coming 2026",
    eta: "On the roadmap",
    domain: "tempo.xyz",
    desc: "A purpose-built chain for stablecoin payments at internet scale. GHST will launch with the network.",
  },
];

export function Multichain() {
  return (
    <section className="section section-dark" id="chains">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Multichain roadmap</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            One Cedi.
            <br />
            <em>Many chains.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            GHST is launching across the networks where Ghanaian commerce, remittances, and
            DeFi already happen. Same backing, same redemption, wherever you transact.
          </p>
        </div>
        <div className="chain-grid">
          {CHAINS.map((c, i) => (
            <ChainCard key={i} chain={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChainCard({ chain }: { chain: Chain }) {
  return (
    <div className={`chain-card chain-card--${chain.status}`}>
      <div className="chain-card-head">
        <div className="chain-card-mark">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://www.google.com/s2/favicons?domain=${chain.domain}&sz=128`}
            alt=""
            aria-hidden
            loading="lazy"
          />
        </div>
        <span className={`chain-status chain-status--${chain.status}`}>
          {chain.status === "live" && <span className="live-dot" aria-hidden />}
          {chain.statusLabel}
        </span>
      </div>
      <div className="chain-card-body">
        <div className="chain-name">{chain.name}</div>
        <div className="chain-tagline">{chain.tagline}</div>
        <p>{chain.desc}</p>
      </div>
      <div className="chain-card-foot">{chain.eta}</div>
    </div>
  );
}
