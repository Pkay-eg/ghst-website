interface StructureRow {
  role: string;
  org: string;
  note: string;
}

const ROWS: StructureRow[] = [
  {
    role: "Issuer",
    org: "Cede Stable Ltd",
    note: "Ghanaian-owned. Issues and redeems GHST against Cedi reserves.",
  },
  {
    role: "Primary broker",
    org: "WeWire",
    note: "Appointed primary broker. All institutional minting, redemption, and integration is routed through WeWire.",
  },
  {
    role: "Trustee banks",
    org: "UMB Ghana · OmniBSIC",
    note: "Hold the cash component of GHST reserves in segregated trust accounts.",
  },
  {
    role: "Asset manager",
    org: "Constant Capital",
    note: "Manages the treasury bill component of GHST reserves.",
  },
  {
    role: "Attestor",
    org: "BNA Chartered Accountants",
    note: "Independently attests to reserves each month and publishes the report.",
  },
];

export function CompanyStructure() {
  return (
    <section className="section" id="structure">
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow-label">Company structure</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Roles, separated <em>by design.</em>
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            GHST is built on a clear division of responsibilities. Issuance, brokerage,
            custody, and attestation each sit with a separate, accountable party.
          </p>
        </div>

        <div className="structure-list">
          {ROWS.map((r, i) => (
            <div className="structure-row" key={i}>
              <div className="structure-role">{r.role}</div>
              <div className="structure-org">{r.org}</div>
              <div className="structure-note">{r.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
