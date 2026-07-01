import type { ReactNode } from "react";

export function HowItWorks() {
  return (
    <section className="section section-tint" id="how">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <div className="eyebrow-label">How it works</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            From bank deposit to <em>onchain Cedi</em>,
            <br />
            in three steps.
          </h2>
        </div>
        <div className="how-grid">
          <HowStep
            num="01"
            title="Deposit Cedis"
            body="Send Ghana Cedis to an issuer partner. Cash is placed in segregated trust accounts at UMB Ghana and OmniBSIC; treasuries are managed by Constant Capital."
            visual={<DepositDiagram />}
          />
          <HowStep
            num="02"
            title="Mint GHST 1:1"
            body="A matching quantity of GHST is minted onchain to your wallet. Every token represents one Cedi in reserve."
            visual={<MintDiagram />}
          />
          <HowStep
            num="03"
            title="Send, receive, redeem"
            body="Settle payments, integrate via API, or redeem GHST back to Cedis at any time - 24/7, near-zero fees."
            visual={<RedeemDiagram />}
          />
        </div>
      </div>
    </section>
  );
}

interface HowStepProps {
  num: string;
  title: string;
  body: string;
  visual: ReactNode;
}

function HowStep({ num, title, body, visual }: HowStepProps) {
  return (
    <div className="how-step">
      <div className="how-num">{num}</div>
      <div className="how-art">{visual}</div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function DepositDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="80%" height="84%">
      <g>
        <rect x="14" y="38" width="56" height="44" rx="6" fill="#fff" stroke="#e0d8ff" />
        <text x="42" y="56" textAnchor="middle" fontSize="9" fontWeight="600" fill="#8c89a8" letterSpacing="1">
          USER
        </text>
        <text x="42" y="74" textAnchor="middle" fontSize="14" fontWeight="500" fill="#0a0822">
          ₵ 1,000
        </text>
      </g>
      <g stroke="#785AFF" strokeWidth="1.5" fill="none">
        <line x1="74" y1="60" x2="160" y2="60" strokeLinecap="round" />
        <path d="M156 56 l6 4 l-6 4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g>
        <rect x="166" y="30" width="64" height="60" rx="6" fill="#785AFF" />
        <text x="198" y="48" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.7)" letterSpacing="1">
          RESERVE
        </text>
        <line x1="180" y1="58" x2="216" y2="58" stroke="rgba(255,255,255,0.3)" />
        <text x="198" y="74" textAnchor="middle" fontSize="13" fontWeight="500" fill="#fff">
          ₵ 1,000
        </text>
        <text x="198" y="86" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">
          Segregated
        </text>
      </g>
    </svg>
  );
}

function MintDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="84%" height="84%">
      <g>
        <rect x="14" y="38" width="50" height="44" rx="6" fill="#785AFF" />
        <text x="39" y="65" textAnchor="middle" fontSize="13" fontWeight="500" fill="#fff">
          ₵
        </text>
      </g>
      <g>
        <rect x="84" y="30" width="72" height="60" rx="6" fill="#0a0822" />
        <text x="120" y="48" textAnchor="middle" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.5)" letterSpacing="1">
          CONTRACT
        </text>
        <text x="120" y="70" textAnchor="middle" fontSize="12" fontWeight="500" fill="#a08fff" fontFamily="ui-monospace, monospace">
          mint( )
        </text>
      </g>
      <g>
        <circle cx="200" cy="60" r="22" fill="#fff" stroke="#785AFF" strokeWidth="2" />
        <text x="200" y="65" textAnchor="middle" fontSize="14" fontWeight="500" fill="#785AFF">
          ₵
        </text>
      </g>
      <g stroke="#e0d8ff" strokeWidth="1.5" fill="none">
        <line x1="68" y1="60" x2="80" y2="60" />
        <line x1="160" y1="60" x2="174" y2="60" />
        <path d="M70 56 l4 4 l-4 4" stroke="#785AFF" strokeLinecap="round" />
        <path d="M174 56 l4 4 l-4 4" stroke="#785AFF" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function RedeemDiagram() {
  return (
    <svg viewBox="0 0 240 120" width="84%" height="84%">
      <g>
        <circle cx="36" cy="60" r="20" fill="#fff" stroke="#785AFF" strokeWidth="2" />
        <text x="36" y="65" textAnchor="middle" fontSize="12" fontWeight="500" fill="#785AFF">
          ₵
        </text>
      </g>
      <g>
        <circle cx="100" cy="42" r="6" fill="#785AFF" />
        <circle cx="100" cy="42" r="11" fill="none" stroke="#785AFF" opacity="0.3" />
      </g>
      <g>
        <circle cx="140" cy="78" r="6" fill="#785AFF" />
      </g>
      <g>
        <circle cx="204" cy="60" r="20" fill="#785AFF" />
        <text x="204" y="65" textAnchor="middle" fontSize="12" fontWeight="500" fill="#fff">
          ₵
        </text>
      </g>
      <g stroke="#785AFF" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <line x1="56" y1="56" x2="92" y2="46" />
        <line x1="106" y1="46" x2="134" y2="74" />
        <line x1="146" y1="76" x2="184" y2="62" />
      </g>
      <g transform="translate(80 96)">
        <rect width="80" height="18" rx="9" fill="#fff" stroke="#e0d8ff" />
        <text x="40" y="13" textAnchor="middle" fontSize="9" fontWeight="500" fill="#555274">
          3.2s · $0.000005
        </text>
      </g>
    </svg>
  );
}
