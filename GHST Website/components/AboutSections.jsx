const { useState: useStateA } = React;

// ─── ABOUT HERO ───
function AboutHero() {
  return (
    <section className="hero" style={{ paddingBottom: 'clamp(40px, 5vw, 64px)' }}>
      <div className="container">
        <div style={{ maxWidth: 780 }}>
          <div className="eyebrow-pill">
            <span className="live-dot" aria-hidden />
            Cede Stable Ltd · Issuer of GHST
          </div>
          <h1 className="display display-xl" style={{ marginTop: 20 }}>
            Built in Ghana,<br />
            for the <em>Ghanaian economy.</em>
          </h1>
          <p className="lede" style={{ marginTop: 24, maxWidth: 620 }}>Cede Stable Ltd is a wholly Ghanaian-owned blockchain company building digital financial infrastructure for West Africa, starting with GHST, the Ghana Cedi onchain.

          </p>
        </div>
      </div>
    </section>);

}

// ─── MISSION ───
function Mission() {
  const pillars = [
  {
    n: "01",
    title: "Move money like information.",
    body: "Sending Cedis between people, businesses, and borders should be as fast and inexpensive as sending a message. GHST makes that the default."
  },
  {
    n: "02",
    title: "Backed, not promised.",
    body: "Every GHST in circulation is matched 1:1 by Cedi reserves held in segregated trust accounts. Verifiable onchain. Attested monthly."
  },
  {
    n: "03",
    title: "Open infrastructure.",
    body: "GHST is an ERC-20 anyone can build on. Wallets, banks, fintechs, and developers can integrate without permission from any one platform."
  }];

  return (
    <section className="section section-tint">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Our mission</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Digital Cedis that <em>work everywhere.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>We believe the Ghanaian Cedi belongs on the same rails as the rest of the global economy - programmable, portable, and instantly settled.

          </p>
        </div>

        <div className="how-grid" style={{ marginTop: 48 }}>
          {pillars.map((p, i) =>
          <div className="how-step" key={i}>
              <div className="how-num">{p.n}</div>
              <h3 style={{ fontSize: 20, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink)', margin: '0 0 10px' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--muted)', margin: 0 }}>
                {p.body}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── COMPANY STRUCTURE ───
function CompanyStructure() {
  const rows = [
  { role: "Issuer", org: "Cede Stable Ltd", note: "Ghanaian-owned. Issues and redeems GHST against Cedi reserves." },
  { role: "Primary broker", org: "WeWire", note: "Appointed primary broker. All institutional minting, redemption, and integration is routed through WeWire." },
  { role: "Trustee banks", org: "UMB Ghana · OmniBSIC", note: "Hold the cash component of GHST reserves in segregated trust accounts." },
  { role: "Asset manager", org: "Constant Capital", note: "Manages the treasury bill component of GHST reserves." },
  { role: "Attestor", org: "BNA Chartered Accountants", note: "Independently attests to reserves each month and publishes the report." }];

  return (
    <section className="section" id="structure">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Company structure</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Roles, separated <em>by design.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            GHST is built on a clear division of responsibilities. Issuance, brokerage, custody, and attestation each sit with a separate, accountable party.
          </p>
        </div>

        <div className="structure-list">
          {rows.map((r, i) =>
          <div className="structure-row" key={i}>
              <div className="structure-role">{r.role}</div>
              <div className="structure-org">{r.org}</div>
              <div className="structure-note">{r.note}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─── LEADERSHIP ───
function Leadership() {
  const team = [
  {
    name: "Desmond S.K. Atsakpo",
    role: "Managing Director",
    bio: "Experience across West African banking, payments, and crypto markets."
  },
  {
    name: "Solomon Afranie",
    role: "Regulatory Advisor",
    bio: "Regulatory lead at a global compliance & regulatory software firm for central banks."
  },
  {
    name: "Yaw Boateng Amankwah",
    role: "Chief Financial Officer",
    bio: "Chartered accountant specialising in fiduciary attestation and reserve audits."
  }];

  const initials = (n) => n.
  replace(/\./g, '').
  split(/\s+/).
  filter(Boolean).
  map((w) => w[0]).
  filter((_, i, a) => i === 0 || i === a.length - 1).
  join('').
  toUpperCase();

  return (
    <section className="section section-tint" id="leadership">
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <div className="eyebrow-label">Leadership</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Operators with deep roots in <em>Ghanaian finance.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 620 }}>
            Our team combines decades of regulated banking experience with frontier blockchain engineering, uniquely positioned to build trusted infrastructure for the Ghanaian market.
          </p>
        </div>

        <div className="team-grid">
          {team.map((p, i) =>
          <article className="team-card" key={i}>
              <div className="team-photo" aria-hidden>
                <span className="team-initials">{initials(p.name)}</span>
              </div>
              <div className="team-info">
                <div className="team-name">{p.name}</div>
                <div className="team-role">{p.role}</div>
                <p>{p.bio}</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}

// ─── ABOUT CTA ───
function AboutCTA() {
  return (
    <section className="container">
      <div className="cta">
        <div className="cta-inner">
          <div>
            <div className="eyebrow-label">Work with us</div>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>
              Help build the<br /><em>Cedi onchain.</em>
            </h2>
            <p>
              We're hiring across engineering, operations, and compliance. If you want to help build digital financial infrastructure for Ghana and West Africa, get in touch.
            </p>
            <div className="cta-actions">
              <a href="/Contact" className="btn btn-cream">Contact the team <ArrowRight /></a>
            </div>
          </div>
          <div className="cta-aside">
            <div className="cta-aside-label">Headquartered in</div>
            <div className="cta-aside-value" style={{ fontSize: 28 }}>
              Accra, Ghana
            </div>
            <div style={{ marginTop: 20, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55 }}>
              Cede Stable Ltd is registered in Ghana.<br />
              Wholly Ghanaian-owned.
            </div>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { AboutHero, Mission, CompanyStructure, Leadership, AboutCTA });