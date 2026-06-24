const { useState, useEffect, useRef } = React;

// Cede Stable Ltd is the issuer of GHST; WeWire is the appointed primary broker.
// All institutional minting, redemption, and integration is routed through WeWire.
const WEWIRE_URL = "https://www.wewire.com";

// ─── NAV ───
function Nav() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const onAbout = /About\.html/i.test(path);
  const onContact = /Contact\.html/i.test(path);
  const onSubpage = onAbout || onContact;
  const homeHref = onSubpage ? "GHST%20Landing.html" : "#";
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href={homeHref} className="nav-logo">
          <span className="nav-logo-mark" aria-hidden />
          <span>GHST</span>
        </a>
        <nav className="nav-links">
          <a href={homeHref}>Home</a>
          <a href="About.html">About</a>
          <a href="Contact.html">Contact</a>
        </nav>
        <div className="nav-actions">
          <a href={WEWIRE_URL} target="_blank" rel="noreferrer" className="nav-cta">Get GHST</a>
        </div>
      </div>
    </header>);

}

// ─── HERO ───
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="display display-xl">
              The Ghana Cedi,<br />
              <em>onchain.</em>
            </h1>
            <p className="lede">GHST is a fully-reserved digital Cedi for businesses and developers. Mint, redeem, and settle 1:1 with traditional Ghana Cedis - 24/7, in seconds, for fractions of a penny.

            </p>
            <div className="hero-ctas">
              <a href={WEWIRE_URL} target="_blank" rel="noreferrer" className="btn btn-primary">Get GHST <ArrowRight /></a>
            </div>
            <div className="hero-trust">
              <span><span className="tick"><Check size={10} /></span> 1:1 reserves</span>
              <span><span className="tick"><Check size={10} /></span> Monthly attestation</span>
              <span><span className="tick"><Check size={10} /></span> ERC-20 on Base</span>
            </div>
          </div>

          <HeroReservesCard />
        </div>
      </div>
    </section>);

}

function HeroReservesCard() {
  const stats = useOnchainStats();
  const live = stats?.totalSupply != null;
  const supply = live ? fmtCedi(stats.totalSupply, { compact: true }) : "—";
  const age = useLiveAge(stats?.updatedAt);
  return (
    <div className="reserves-card">
      <div className="reserves-card-head">
        <div className="reserves-card-title">
          Reserves Snapshot
          <span className="tag">{live ? "Live" : "…"}</span>
        </div>
        <div className="reserves-card-meta">
          <span className="live-dot" aria-hidden />
          {live ? `Updated ${age || "just now"}` : "Connecting…"}
        </div>
      </div>
      <div className="reserves-peg">
        <div className="peg-side">
          <div className="lbl">Issued</div>
          <div className="val"><span className="sym">₵</span>{live ? supply.replace("₵","") : "—"}</div>
        </div>
        <div className="peg-equals" aria-hidden>=</div>
        <div className="peg-side" style={{ textAlign: 'right' }}>
          <div className="lbl">Backed by</div>
          <div className="val" style={{ justifyContent: 'flex-end' }}><span className="sym">₵</span>{live ? supply.replace("₵","") : "—"}</div>
        </div>
      </div>
      <div className="reserves-bars">
        <div className="reserves-row">
          <span className="reserves-row-l"><span className="dot" />Trust deposits — UMB Ghana, OmniBSIC</span>
          <span className="reserves-row-r">50.0%</span>
        </div>
        <div className="reserves-row">
          <span className="reserves-row-l"><span className="dot" style={{ background: '#a08fff' }} />Treasury bills · Constant Capital</span>
          <span className="reserves-row-r">50.0%</span>
        </div>
      </div>
      <div className="reserves-foot">
        <span style={{ color: 'var(--subtle)' }}>Attested by BNA Chartered Accountants</span>
        <a href={`https://basescan.org/token/${GHST_CONTRACT}`} target="_blank" rel="noreferrer">View on BaseScan →</a>
      </div>
    </div>);

}

// ─── PARTNER STRIP ───
function PartnerStrip() {
  const items = [
  { name: "WeWire", domain: "wewire.com", url: "https://www.wewire.com" },
  { name: "Obiex", domain: "obiex.finance", url: "https://obiex.finance" },
  { name: "BitAfrika", domain: "bitafrika.com", url: "https://bitafrika.com" },
  { name: "AFri", logo: "assets/afri-logo.png", url: "#" },
  { name: "Mansu", logo: "assets/mansu-logo.png", url: "#" }];

  const loop = [...items, ...items];

  return (
    <section className="partner-strip">
      <div className="container">
        <div className="partner-strip-label">Built with partners across West Africa</div>
      </div>
      <div className="partner-marquee">
        <div className="partner-track" aria-hidden={false}>
          {loop.map((p, i) =>
          <a
            className="partner"
            key={i}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            aria-hidden={i >= items.length ? true : undefined}
            tabIndex={i >= items.length ? -1 : undefined}>
              <img
              className="partner-mark"
              src={p.logo || `https://www.google.com/s2/favicons?domain=${p.domain}&sz=128`}
              alt=""
              aria-hidden
              loading="lazy" />
            
              <span className="partner-name">{p.name}</span>
            </a>
          )}
        </div>
      </div>
    </section>);

}

// ─── TRUST GRID ───
function TrustGrid() {
  const stats = useOnchainStats();
  const age = useLiveAge(stats?.updatedAt);
  const live = stats?.totalSupply != null;
  const supplyMeta = live ? fmtCedi(stats.totalSupply, { compact: true }) : "…";
  const asOfMeta = stats?.updatedAt ? (age || "just now") : "…";
  const attestMeta = stats?.updatedAt ? (age || "just now") : "…";

  return (
    <section className="section" id="trust">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow-label">Built for trust</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Stable by design.<br />
            <em>Transparent</em> by default.
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            Every GHST in circulation is backed by an equal value of Ghana Cedis held in audited, segregated reserve accounts. Verified onchain, every block.
          </p>
        </div>

        <div className="trust-grid">
          <TrustCard
            visual={<RatioDiagram />}
            title="1:1 fully reserved"
            body="Cash reserves sit in trust accounts at UMB Ghana and OmniBSIC. Treasury reserves are managed by Constant Capital. No fractional reserves."
            meta={[["Reserve ratio", "100.0%"], ["Onchain supply", supplyMeta], ["As of", asOfMeta]]} />
          
          <TrustCard
            visual={<ComplianceDiagram />}
            title="Independent attestation"
            body="Reserves are held in segregated trust accounts and verified each month by BNA Chartered Accountants. Reports are published in full."
            meta={[["Attestor", "BNA"], ["Cadence", "Monthly"]]} />
          
          <TrustCard
            visual={<AttestationDiagram ageLabel={attestMeta} />}
            title="Real-time attestation"
            body="Reserve composition is published onchain and refreshed continuously. Verify supply against backing at any moment."
            meta={[["Attest. age", attestMeta], ["Method", "Onchain proof"]]} />
          
        </div>
      </div>
    </section>);

}

function TrustCard({ visual, title, body, meta }) {
  return (
    <div className="trust-card">
      <div className="trust-art">{visual}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="trust-meta">
        {meta.map(([k, v], i) =>
        <span key={i}>{k}: <strong>{v}</strong></span>
        )}
      </div>
    </div>);

}

// ─── ILLUSTRATIONS — abstract, corporate, data-forward ───
function RatioDiagram() {
  return (
    <svg viewBox="0 0 280 160" width="86%" height="86%">
      {/* Issued side */}
      <g>
        <text x="40" y="36" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1" fill="#8c89a8">ISSUED</text>
        <rect x="14" y="48" width="52" height="80" rx="6" fill="#785AFF" />
        <rect x="14" y="48" width="52" height="80" rx="6" fill="none" stroke="#5d3fe6" strokeWidth="1" />
        <text x="40" y="94" textAnchor="middle" fontSize="22" fontWeight="500" fill="#fff" letterSpacing="-0.5">₵</text>
      </g>
      {/* Equals */}
      <g transform="translate(140 80)">
        <circle r="18" fill="#0a0822" />
        <text textAnchor="middle" y="5" fontSize="14" fill="#fff" fontWeight="500">=</text>
      </g>
      {/* Reserves side - stacked */}
      <g>
        <text x="240" y="36" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1" fill="#8c89a8">RESERVES</text>
        <rect x="214" y="48" width="52" height="50" rx="6" fill="#785AFF" />
        <rect x="214" y="100" width="52" height="20" rx="6" fill="#a08fff" />
        <rect x="214" y="122" width="52" height="6" rx="3" fill="#d6cbff" />
      </g>
      {/* connecting lines */}
      <g stroke="#e0d8ff" strokeWidth="1" strokeDasharray="2 3">
        <line x1="66" y1="88" x2="122" y2="80" />
        <line x1="158" y1="80" x2="214" y2="88" />
      </g>
    </svg>);

}

function ComplianceDiagram() {
  return (
    <svg viewBox="0 0 280 160" width="86%" height="86%">
      {/* Shield-style document with checkmark */}
      <g transform="translate(140 80)">
        <rect x="-44" y="-50" width="88" height="100" rx="8" fill="#fff" stroke="#e0d8ff" strokeWidth="1.5" />
        <line x1="-28" y1="-26" x2="20" y2="-26" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="-14" x2="28" y2="-14" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="-2" x2="20" y2="-2" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="10" x2="28" y2="10" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="22" x2="14" y2="22" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        {/* Seal */}
        <circle cx="22" cy="36" r="14" fill="#785AFF" />
        <path d="M16 36 l4 4 l8 -8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* satellite badges */}
      <g>
        <rect x="34" y="36" width="64" height="22" rx="11" fill="#fff" stroke="#e0d8ff" strokeWidth="1" />
        <text x="66" y="51" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">Reserve</text>
      </g>
      <g>
        <rect x="196" y="106" width="68" height="22" rx="11" fill="#fff" stroke="#e0d8ff" strokeWidth="1" />
        <text x="230" y="121" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">Attested</text>
      </g>
    </svg>);

}

function AttestationDiagram({ ageLabel = "…" }) {
  // Live waveform / pulse
  return (
    <svg viewBox="0 0 280 160" width="86%" height="86%">
      <defs>
        <linearGradient id="pulse" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#785AFF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#785AFF" stopOpacity="1" />
          <stop offset="1" stopColor="#785AFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="80" x2="280" y2="80" stroke="#e0d8ff" strokeWidth="1" strokeDasharray="2 4" />
      <path
        d="M0 80 L40 80 L52 80 L60 60 L72 100 L84 50 L96 110 L108 70 L120 80 L160 80 L172 80 L180 65 L192 95 L204 55 L216 105 L228 75 L240 80 L280 80"
        fill="none" stroke="url(#pulse)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      <circle cx="240" cy="80" r="5" fill="#785AFF" />
      <circle cx="240" cy="80" r="10" fill="none" stroke="#785AFF" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" from="5" to="14" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      {/* timestamp chips */}
      <g transform="translate(20 30)">
        <rect width="68" height="22" rx="4" fill="#fff" stroke="#e0d8ff" />
        <text x="34" y="15" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">block #4821</text>
      </g>
      <g transform="translate(190 122)">
        <rect width="70" height="22" rx="4" fill="#fff" stroke="#e0d8ff" />
        <text x="35" y="15" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">{ageLabel}</text>
      </g>
    </svg>);

}

Object.assign(window, { Nav, Hero, PartnerStrip, TrustGrid });