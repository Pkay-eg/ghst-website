interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Desmond S.K. Atsakpo",
    role: "Managing Director",
    bio: "Experience across West African banking, payments, and crypto markets.",
  },
  {
    name: "Solomon Afranie",
    role: "Regulatory Advisor",
    bio: "Regulatory lead at a global compliance & regulatory software firm for central banks.",
  },
  {
    name: "Yaw Boateng Amankwah",
    role: "Chief Financial Officer",
    bio: "Chartered accountant specialising in fiduciary attestation and reserve audits.",
  },
];

function initials(name: string): string {
  return name
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .join("")
    .toUpperCase();
}

export function Leadership() {
  return (
    <section className="section section-tint" id="leadership">
      <div className="container">
        <div style={{ maxWidth: 820 }}>
          <div className="eyebrow-label">Leadership</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Operators with deep roots in <em>Ghanaian finance.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 620 }}>
            Our team combines decades of regulated banking experience with frontier
            blockchain engineering, uniquely positioned to build trusted infrastructure for
            the Ghanaian market.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((p, i) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
