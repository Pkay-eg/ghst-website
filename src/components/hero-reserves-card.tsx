"use client";

import { useOnchainStats } from "@/lib/use-onchain-stats";
import { useLiveAge } from "@/lib/use-live-age";
import { useCountUp } from "@/lib/use-count-up";
import { fmtCedi } from "@/lib/format";
import { TOKEN_ADDR as GHST_CONTRACT } from "@/lib/onchain/constants";

export function HeroReservesCard() {
  const stats = useOnchainStats();
  const live = stats?.totalSupply != null;
  const animatedSupply = useCountUp(stats?.totalSupply ?? null, { loadingCeiling: 400_000 });
  const supply = fmtCedi(animatedSupply, { compact: true })!.replace("₵", "");
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
          <div className="val">
            <span className="sym">₵</span>
            {supply}
          </div>
        </div>
        <div className="peg-equals" aria-hidden>
          =
        </div>
        <div className="peg-side" style={{ textAlign: "right" }}>
          <div className="lbl">Backed by</div>
          <div className="val" style={{ justifyContent: "flex-end" }}>
            <span className="sym">₵</span>
            {supply}
          </div>
        </div>
      </div>
      <div className="reserves-bars">
        <div className="reserves-row">
          <span className="reserves-row-l">
            <span className="dot" />
            Trust deposits — UMB Ghana, OmniBSIC
          </span>
          <span className="reserves-row-r">50.0%</span>
        </div>
        <div className="reserves-row">
          <span className="reserves-row-l">
            <span className="dot" style={{ background: "#a08fff" }} />
            Treasury bills · Constant Capital
          </span>
          <span className="reserves-row-r">50.0%</span>
        </div>
      </div>
      <div className="reserves-foot">
        <span style={{ color: "var(--subtle)" }}>Attested by BNA Chartered Accountants</span>
        <a href={`https://basescan.org/token/${GHST_CONTRACT}`} target="_blank" rel="noreferrer">
          View on BaseScan →
        </a>
      </div>
    </div>
  );
}
