"use client";

import { useState } from "react";
import { Plus } from "@/components/icons";

const FAQ_ITEMS = [
  {
    q: "What is GHST?",
    a: "GHST is a fully-reserved digital Cedi. Each token is backed 1:1 by Ghana Cedis held in segregated reserve accounts, enabling fast, low-cost payments, remittances, and DeFi onchain.",
  },
  {
    q: "How is GHST reserved?",
    a: "Reserves are split 50/50 between trust accounts at UMB Ghana and OmniBSIC Bank, and short-dated treasury bills managed by Constant Capital. Reserves are attested monthly by BNA Chartered Accountants.",
  },
  {
    q: "Which blockchain is GHST on?",
    a: "GHST is live on Base, an Ethereum L2 by Coinbase. Stellar support is on the roadmap to enable lower-cost cross-border settlement for our remittance partners.",
  },
  {
    q: "How do I get GHST?",
    a: "WeWire is the appointed primary broker for GHST. Institutions and businesses mint, redeem, and integrate directly through WeWire. Retail users can acquire GHST via authorised ecosystem partners, exchanges, or peer-to-peer transfers.",
  },
  {
    q: "What are the fees?",
    a: "GHST itself has no protocol fee. Transactions on Base cost approximately $0.000005 in gas, with settlement in 3–5 seconds. Issuance and redemption fees vary by partner.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section section-tight" id="faq">
      <div className="container">
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <div className="eyebrow-label">FAQ</div>
          <h2 className="display display-md" style={{ marginTop: 14 }}>
            Common <em>questions.</em>
          </h2>
        </div>
        <div className="faq-wrap">
          {FAQ_ITEMS.map((f, i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <span className="faq-toggle" aria-hidden>
                  <Plus size={14} />
                </span>
              </button>
              <div className="faq-a">{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
