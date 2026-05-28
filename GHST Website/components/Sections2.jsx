const { useState: useState2, useEffect: useEffect2 } = React;

const CONTRACT = "0x2094656c30C064EFae86C1fA1b87DdAB1f513fbb";

// ─── HOW IT WORKS ───
function HowItWorks() {
  return (
    <section className="section section-tint" id="how">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow-label">How it works</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            From bank deposit to <em>onchain Cedi</em>,<br />in three steps.
          </h2>
        </div>
        <div className="how-grid">
          <HowStep
            num="01"
            title="Deposit Cedis"
            body="Send Ghana Cedis to an issuer partner. Cash is placed in segregated trust accounts at UMB Ghana and OmniBSIC; treasuries are managed by Constant Capital."
            visual={<DepositDiagram />} />
          
          <HowStep
            num="02"
            title="Mint GHST 1:1"
            body="A matching quantity of GHST is minted onchain to your wallet. Every token represents one Cedi in reserve."
            visual={<MintDiagram />} />
          
          <HowStep
            num="03"
            title="Send, receive, redeem"
            body="Settle payments, integrate via API, or redeem GHST back to Cedis at any time - 24/7, near-zero fees."
            visual={<RedeemDiagram />} />
          
        </div>
      </div>
    </section>);

}

function HowStep({ num, title, body, visual }) {
  return (
    <div className="how-step">
      <div className="how-num">{num}</div>
      <div className="how-art">{visual}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>);

}

function DepositDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="80%" height="84%">
      {/* User */}
      <g>
        <rect x="14" y="38" width="56" height="44" rx="6" fill="#fff" stroke="#e0d8ff" />
        <text x="42" y="56" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8c89a8" letterSpacing="1">USER</text>
        <text x="42" y="74" textAnchor="middle" fontSize="14" fontWeight="500" fill="#0a0822">₵ 1,000</text>
      </g>
      {/* Arrow */}
      <g stroke="#785AFF" strokeWidth="1.5" fill="none">
        <line x1="74" y1="60" x2="160" y2="60" strokeLinecap="round" />
        <path d="M156 56 l6 4 l-6 4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Bank reserve */}
      <g>
        <rect x="166" y="30" width="64" height="60" rx="6" fill="#785AFF" />
        <text x="198" y="48" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.7)" letterSpacing="1">RESERVE</text>
        <line x1="180" y1="58" x2="216" y2="58" stroke="rgba(255,255,255,0.3)" />
        <text x="198" y="74" textAnchor="middle" fontSize="13" fontWeight="500" fill="#fff">₵ 1,000</text>
        <text x="198" y="86" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">Segregated</text>
      </g>
    </svg>);

}

function MintDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="84%" height="84%">
      {/* Reserve in */}
      <g>
        <rect x="14" y="38" width="50" height="44" rx="6" fill="#785AFF" />
        <text x="39" y="65" textAnchor="middle" fontSize="13" fontWeight="500" fill="#fff">₵</text>
      </g>
      {/* Contract block */}
      <g>
        <rect x="84" y="30" width="72" height="60" rx="6" fill="#0a0822" />
        <text x="120" y="48" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="1">CONTRACT</text>
        <text x="120" y="70" textAnchor="middle" fontSize="12" fontWeight="500" fill="#a08fff" fontFamily="ui-monospace, monospace">mint( )</text>
      </g>
      {/* Token out */}
      <g>
        <circle cx="200" cy="60" r="22" fill="#fff" stroke="#785AFF" strokeWidth="2" />
        <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="500" fill="#785AFF">₵</text>
      </g>
      {/* Arrows */}
      <g stroke="#e0d8ff" strokeWidth="1.5" fill="none">
        <line x1="68" y1="60" x2="80" y2="60" />
        <line x1="160" y1="60" x2="174" y2="60" />
        <path d="M70 56 l4 4 l-4 4" stroke="#785AFF" strokeLinecap="round" />
        <path d="M174 56 l4 4 l-4 4" stroke="#785AFF" strokeLinecap="round" />
      </g>
    </svg>);

}

function RedeemDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="84%" height="84%">
      {/* Sender */}
      <g>
        <circle cx="36" cy="60" r="20" fill="#fff" stroke="#785AFF" strokeWidth="2" />
        <text x="36" y="65" textAnchor="middle" fontSize="12" fontWeight="500" fill="#785AFF">₵</text>
      </g>
      {/* Node A */}
      <g>
        <circle cx="100" cy="42" r="6" fill="#785AFF" />
        <circle cx="100" cy="42" r="11" fill="none" stroke="#785AFF" opacity="0.3" />
      </g>
      {/* Node B */}
      <g>
        <circle cx="140" cy="78" r="6" fill="#785AFF" />
      </g>
      {/* Receiver */}
      <g>
        <circle cx="204" cy="60" r="20" fill="#785AFF" />
        <text x="204" y="65" textAnchor="middle" fontSize="12" fontWeight="500" fill="#fff">₵</text>
      </g>
      {/* Connection lines */}
      <g stroke="#785AFF" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <line x1="56" y1="56" x2="92" y2="46" />
        <line x1="106" y1="46" x2="134" y2="74" />
        <line x1="146" y1="76" x2="184" y2="62" />
      </g>
      {/* Timestamp */}
      <g transform="translate(80 96)">
        <rect width="80" height="18" rx="9" fill="#fff" stroke="#e0d8ff" />
        <text x="40" y="13" textAnchor="middle" fontSize="9" fontWeight="500" fill="#555274">3.2s · $0.000005</text>
      </g>
    </svg>);

}

// ─── RESERVES SECTION (live dashboard) ───
function Reserves() {
  const stats = useOnchainStats();
  const [copied, setCopied] = useState2(false);
  const live = stats?.totalSupply != null;
  const age = useLiveAge(stats?.updatedAt);

  const copy = () => {
    navigator.clipboard?.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const supplyFmt = live ? fmtInt(stats.totalSupply) : "—";
  const supplyCompact = live ? fmtCedi(stats.totalSupply, { compact: true }) : "—";
  const volumeFmt = stats?.volume24h != null ? fmtCedi(stats.volume24h, { compact: true }) : "—";
  const holdersFmt = stats?.holders != null ? fmtInt(stats.holders) : "—";

  // Chart data
  const points = [22, 26, 28, 32, 35, 40, 42, 44, 48, 52, 56, 60, 64, 68, 72, 78, 82, 86, 92, 96, 102, 108, 114, 120];
  const w = 600,h = 200;
  const max = 130,min = 0;
  const xs = points.map((_, i) => i / (points.length - 1) * w);
  const ys = points.map((p) => h - (p - min) / (max - min) * (h - 24) - 12);
  const path = points.map((_, i) => `${i === 0 ? 'M' : 'L'} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const fill = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <section className="section" id="reserves">
      <div className="container">
        <div className="rsv-grid">
          <div>
            <div className="eyebrow-label">Live reserves</div>
            <h2 className="display display-md" style={{ marginTop: 14 }}>
              Every Cedi <em>accounted for.</em>
            </h2>
            <p className="lede" style={{ marginTop: 18, maxWidth: 460 }}>
              Onchain supply and offchain reserves move in lockstep. Monthly attestations from independent auditors, plus a continuously-updated proof-of-reserves feed.
            </p>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--subtle)', fontWeight: 600, marginBottom: 8 }}>
                Contract · Base mainnet
              </div>
              <button className="contract-bar" onClick={copy}>
                <span className="chain">Base</span>
                <span>{CONTRACT.slice(0, 10)}…{CONTRACT.slice(-6)}</span>
                <span className="copy-btn">
                  {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                </span>
              </button>
            </div>

            <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#" className="btn btn-ghost btn-sm">Latest attestation →</a>
            </div>

            <ReservePartners />
          </div>

          <div className="rsv-detail">
            <div className="rsv-detail-head">
              <h4>Total Supply · GHST</h4>
              <span style={{ fontSize: 12, color: 'var(--subtle)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span className="live-dot" aria-hidden /> {live ? `Live · ${age || "just now"}` : "Connecting…"}
              </span>
            </div>
            <div className="rsv-detail-body">
              <div className="rsv-supply">
                <span className="sym">₵</span>{supplyFmt}
              </div>
              <div className="rsv-meta">
                <span className="badge">Onchain</span>
                <span>Backed by {supplyCompact} in reserves</span>
              </div>
              <div className="rsv-chart">
                <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#785AFF" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#785AFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* gridlines */}
                  {[0.25, 0.5, 0.75].map((g) =>
                  <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="#0a0822" strokeOpacity="0.05" />
                  )}
                  <path d={fill} fill="url(#gfill)" />
                  <path d={path} fill="none" stroke="#785AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="4" fill="#785AFF" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>
              <div className="rsv-axis">
                <span>Mar 1</span><span>Mar 15</span><span>Apr 1</span><span>Apr 15</span><span>Today</span>
              </div>
            </div>
            <div className="rsv-breakdown">
              <div>
                <div className="rsv-stat-label">Holders</div>
                <div className="rsv-stat-value">{holdersFmt}</div>
              </div>
              <div>
                <div className="rsv-stat-label">24h Volume</div>
                <div className="rsv-stat-value">{volumeFmt}</div>
              </div>
              <div>
                <div className="rsv-stat-label">Reserve Ratio</div>
                <div className="rsv-stat-value">100.00%</div>
              </div>
              <div>
                <div className="rsv-stat-label">Network</div>
                <div className="rsv-stat-value">Base</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─── RESERVE PARTNERS (logos under reserves section) ───
function ReservePartners() {
  const partners = [
  { name: "UMB Ghana", role: "Trustee bank", local: "assets/umb-logo.png" },
  { name: "OmniBSIC", role: "Trustee bank", domain: "omnibsic.com.gh" },
  { name: "Constant Capital", role: "Asset manager", domain: "constantcap.com.gh" },
  { name: "BNA", role: "Attestor", local: "assets/bna-mark.png" }];

  return (
    <div className="rsv-partners">
      <div className="rsv-partners-label">Reserve & audit partners</div>
      <div className="rsv-partners-grid">
        {partners.map((p, i) =>
        <div className="rsv-partner" key={i}>
            <img
            className="rsv-partner-mark"
            src={p.local || `https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
            alt=""
            aria-hidden
            loading="lazy" />
          
            <div>
              <div className="rsv-partner-name">{p.name}</div>
              <div className="rsv-partner-role">{p.role}</div>
            </div>
          </div>
        )}
      </div>
    </div>);

}

// ─── MULTICHAIN ROADMAP ───
function Multichain() {
  const chains = [
  {
    name: "Base",
    tagline: "Ethereum L2 by Coinbase",
    status: "live",
    statusLabel: "Live",
    eta: "Mainnet · today",
    domain: "base.org",
    desc: "GHST is live on Base as a standard ERC-20. Settlement in ~3 seconds, fees in fractions of a cent."
  },
  {
    name: "Stellar",
    tagline: "Built for cross-border payments",
    status: "soon",
    statusLabel: "Coming Q3 2026",
    eta: "Bridge in development",
    domain: "stellar.org",
    desc: "Stellar support unlocks low-cost remittance corridors and direct fiat on-/off-ramps through anchor partners."
  },
  {
    name: "Tempo",
    tagline: "Stablecoin-native L1",
    status: "soon",
    statusLabel: "Coming 2026",
    eta: "On the roadmap",
    domain: "tempo.xyz",
    desc: "A purpose-built chain for stablecoin payments at internet scale. GHST will launch with the network."
  }];

  return (
    <section className="section section-dark" id="chains">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Multichain roadmap</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            One Cedi.<br /><em>Many chains.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>GHST is launching across the networks where Ghanaian commerce, remittances, and DeFi already happen. Same backing, same redemption, wherever you transact.

          </p>
        </div>
        <div className="chain-grid">
          {chains.map((c, i) =>
          <ChainCard key={i} chain={c} />
          )}
        </div>
      </div>
    </section>);

}

function ChainCard({ chain }) {
  return (
    <div className={`chain-card chain-card--${chain.status}`}>
      <div className="chain-card-head">
        <div className="chain-card-mark">
          <img
            src={`https://www.google.com/s2/favicons?domain=${chain.domain}&sz=128`}
            alt=""
            aria-hidden
            loading="lazy" />
          
        </div>
        <span className={`chain-status chain-status--${chain.status}`}>
          {chain.status === 'live' && <span className="live-dot" aria-hidden />}
          {chain.statusLabel}
        </span>
      </div>
      <div className="chain-card-body">
        <div className="chain-name">{chain.name}</div>
        <div className="chain-tagline">{chain.tagline}</div>
        <p>{chain.desc}</p>
      </div>
      <div className="chain-card-foot">{chain.eta}</div>
    </div>);

}

Object.assign(window, { Multichain });

// ─── STATS STRIP ───
function StatsStrip() {
  const stats = useOnchainStats();
  const age = useLiveAge(stats?.updatedAt);
  const supplyFmt = stats?.totalSupply != null ? fmtCedi(stats.totalSupply, { compact: true }) : "—";
  const holdersFmt = stats?.holders != null ? fmtInt(stats.holders) : "—";
  const volumeFmt = stats?.volume24h != null ? fmtCedi(stats.volume24h, { compact: true }) : "—";
  const liveLabel = stats?.updatedAt ? `Updated ${age || "just now"}` : "Connecting…";

  return (
    <section className="section-tight">
      <div className="container">
        <div className="stats-strip">
          <div className="stat-cell">
            <div className="stat-label">Total Supply</div>
            <div className="stat-value">{supplyFmt}</div>
            <div className="stat-delta">{liveLabel}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Holders</div>
            <div className="stat-value">{holdersFmt}</div>
            <div className="stat-delta">Onchain</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">{volumeFmt}</div>
            <div className="stat-delta">Transfer volume</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Avg. Settlement</div>
            <div className="stat-value">3.2 s</div>
            <div className="stat-delta">on Base</div>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { HowItWorks, Reserves, ReservePartners, StatsStrip });