"use client";

import type { ReactNode } from "react";
import { useOnchainStats } from "@/lib/use-onchain-stats";
import { useLiveAge } from "@/lib/use-live-age";
import { useCountUp } from "@/lib/use-count-up";
import { fmtCedi } from "@/lib/format";

export function TrustGrid() {
  const stats = useOnchainStats();
  const age = useLiveAge(stats?.updatedAt);
  const animatedSupply = useCountUp(stats?.totalSupply ?? null, { loadingCeiling: 400_000 });
  const supplyMeta = fmtCedi(animatedSupply, { compact: true });
  const asOfMeta = stats?.updatedAt ? age || "just now" : "…";
  const attestMeta = stats?.updatedAt ? age || "just now" : "…";

  return (
    <section className="section" id="trust">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow-label">Built for trust</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Stable by design.
            <br />
            <em>Transparent</em> by default.
          </h2>
          <p className="lede" style={{ marginTop: 18, maxWidth: 580 }}>
            Every GHST in circulation is backed by an equal value of Ghana Cedis held in
            audited, segregated reserve accounts. Verified onchain, every block.
          </p>
        </div>

        <div className="trust-grid">
          <TrustCard
            visual={<RatioDiagram />}
            title="1:1 fully reserved"
            body="Cash reserves sit in trust accounts at UMB Ghana and OmniBSIC. Treasury reserves are managed by Constant Capital. No fractional reserves."
            meta={[
              ["Reserve ratio", "100.0%"],
              ["Onchain supply", supplyMeta ?? "…"],
              ["As of", asOfMeta],
            ]}
          />

          <TrustCard
            visual={<ComplianceDiagram />}
            title="Independent attestation"
            body="Reserves are held in segregated trust accounts and verified each month by BNA Chartered Accountants. Reports are published in full."
            meta={[
              ["Attestor", "BNA"],
              ["Cadence", "Monthly"],
            ]}
          />

          <TrustCard
            visual={<AttestationDiagram ageLabel={attestMeta} />}
            title="Real-time attestation"
            body="Reserve composition is published onchain and refreshed continuously. Verify supply against backing at any moment."
            meta={[
              ["Attest. age", attestMeta],
              ["Method", "Onchain proof"],
            ]}
          />
        </div>
      </div>
    </section>
  );
}

interface TrustCardProps {
  visual: ReactNode;
  title: string;
  body: string;
  meta: [string, string][];
}

function TrustCard({ visual, title, body, meta }: TrustCardProps) {
  return (
    <div className="trust-card">
      <div className="trust-art">{visual}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="trust-meta">
        {meta.map(([k, v], i) => (
          <span key={i}>
            {k}: <strong>{v}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

function RatioDiagram() {
  return (
    <svg viewBox="0 0 280 160" width="86%" height="86%">
      <g>
        <text x="40" y="36" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1" fill="#8c89a8">
          ISSUED
        </text>
        <rect x="14" y="48" width="52" height="80" rx="6" fill="#785AFF" />
        <rect x="14" y="48" width="52" height="80" rx="6" fill="none" stroke="#5d3fe6" strokeWidth="1" />
        <text x="40" y="94" textAnchor="middle" fontSize="22" fontWeight="500" fill="#fff" letterSpacing="-0.5">
          ₵
        </text>
      </g>
      <g transform="translate(140 80)">
        <circle r="18" fill="#0a0822" />
        <text textAnchor="middle" y="5" fontSize="14" fill="#fff" fontWeight="500">
          =
        </text>
      </g>
      <g>
        <text x="240" y="36" textAnchor="middle" fontSize="11" fontWeight="600" letterSpacing="1" fill="#8c89a8">
          RESERVES
        </text>
        <rect x="214" y="48" width="52" height="50" rx="6" fill="#785AFF" />
        <rect x="214" y="100" width="52" height="20" rx="6" fill="#a08fff" />
        <rect x="214" y="122" width="52" height="6" rx="3" fill="#d6cbff" />
      </g>
      <g stroke="#e0d8ff" strokeWidth="1" strokeDasharray="2 3">
        <line x1="66" y1="88" x2="122" y2="80" />
        <line x1="158" y1="80" x2="214" y2="88" />
      </g>
    </svg>
  );
}

function ComplianceDiagram() {
  return (
    <svg viewBox="0 0 280 160" width="86%" height="86%">
      <g transform="translate(140 80)">
        <rect x="-44" y="-50" width="88" height="100" rx="8" fill="#fff" stroke="#e0d8ff" strokeWidth="1.5" />
        <line x1="-28" y1="-26" x2="20" y2="-26" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="-14" x2="28" y2="-14" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="-2" x2="20" y2="-2" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="10" x2="28" y2="10" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <line x1="-28" y1="22" x2="14" y2="22" stroke="#d6cbff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="22" cy="36" r="14" fill="#785AFF" />
        <path d="M16 36 l4 4 l8 -8" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g>
        <rect x="34" y="36" width="64" height="22" rx="11" fill="#fff" stroke="#e0d8ff" strokeWidth="1" />
        <text x="66" y="51" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">
          Reserve
        </text>
      </g>
      <g>
        <rect x="196" y="106" width="68" height="22" rx="11" fill="#fff" stroke="#e0d8ff" strokeWidth="1" />
        <text x="230" y="121" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">
          Attested
        </text>
      </g>
    </svg>
  );
}

function AttestationDiagram({ ageLabel = "…" }: { ageLabel?: string }) {
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
        fill="none"
        stroke="url(#pulse)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="240" cy="80" r="5" fill="#785AFF" />
      <circle cx="240" cy="80" r="10" fill="none" stroke="#785AFF" strokeWidth="1" opacity="0.4">
        <animate attributeName="r" from="5" to="14" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <g transform="translate(20 30)">
        <rect width="68" height="22" rx="4" fill="#fff" stroke="#e0d8ff" />
        <text x="34" y="15" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">
          block #4821
        </text>
      </g>
      <g transform="translate(190 122)">
        <rect width="70" height="22" rx="4" fill="#fff" stroke="#e0d8ff" />
        <text x="35" y="15" textAnchor="middle" fontSize="10" fontWeight="500" fill="#555274">
          {ageLabel}
        </text>
      </g>
    </svg>
  );
}
