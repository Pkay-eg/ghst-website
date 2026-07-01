interface Pillar {
  n: string;
  title: string;
  body: string;
}

const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Move money like information.",
    body: "Sending Cedis between people, businesses, and borders should be as fast and inexpensive as sending a message. GHST makes that the default.",
  },
  {
    n: "02",
    title: "Backed, not promised.",
    body: "Every GHST in circulation is matched 1:1 by Cedi reserves held in segregated trust accounts. Verifiable onchain. Attested monthly.",
  },
  {
    n: "03",
    title: "Open infrastructure.",
    body: "GHST is an ERC-20 anyone can build on. Wallets, banks, fintechs, and developers can integrate without permission from any one platform.",
  },
];

export function Mission() {
  return (
    <section className="section section-tint">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Our mission</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Digital Cedis that <em>work everywhere.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            We believe the Ghanaian Cedi belongs on the same rails as the rest of the global
            economy - programmable, portable, and instantly settled.
          </p>
        </div>

        <div className="how-grid" style={{ marginTop: 48 }}>
          {PILLARS.map((p, i) => (
            <div className="how-step" key={i}>
              <div className="how-num">{p.n}</div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  margin: "0 0 10px",
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
