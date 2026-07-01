"use client";

import { useState } from "react";
import { Check, Copy } from "@/components/icons";
import { useOnchainStats } from "@/lib/use-onchain-stats";
import { useLiveAge } from "@/lib/use-live-age";
import { useCountUp } from "@/lib/use-count-up";
import { fmtCedi, fmtInt } from "@/lib/format";
import { ReservePartners } from "@/components/reserve-partners";

const CONTRACT = "0x2094656c30C064EFae86C1fA1b87DdAB1f513fbb";

const POINTS = [
  22, 26, 28, 32, 35, 40, 42, 44, 48, 52, 56, 60, 64, 68, 72, 78, 82, 86, 92, 96, 102, 108, 114,
  120,
];
const CHART_W = 600;
const CHART_H = 200;
const CHART_MAX = 130;
const CHART_MIN = 0;

export function Reserves() {
  const stats = useOnchainStats();
  const [copied, setCopied] = useState(false);
  const live = stats?.totalSupply != null;
  const age = useLiveAge(stats?.updatedAt);

  const copy = () => {
    navigator.clipboard?.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const animatedSupply = useCountUp(stats?.totalSupply ?? null, { loadingCeiling: 400_000 });
  const animatedVolume = useCountUp(stats?.volume24h ?? null, { loadingCeiling: 2500 });
  const animatedHolders = useCountUp(stats?.holders ?? null, { loadingCeiling: 150 });
  const supplyFmt = fmtInt(animatedSupply);
  const supplyCompact = fmtCedi(animatedSupply, { compact: true });
  const volumeFmt = fmtCedi(animatedVolume, { compact: true });
  const holdersFmt = fmtInt(animatedHolders);

  const xs = POINTS.map((_, i) => (i / (POINTS.length - 1)) * CHART_W);
  const ys = POINTS.map(
    (p) => CHART_H - ((p - CHART_MIN) / (CHART_MAX - CHART_MIN)) * (CHART_H - 24) - 12
  );
  const path = POINTS.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i].toFixed(1)} ${ys[i].toFixed(1)}`).join(
    " "
  );
  const fill = `${path} L ${CHART_W} ${CHART_H} L 0 ${CHART_H} Z`;

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
              Onchain supply and offchain reserves move in lockstep. Monthly attestations from
              independent auditors, plus a continuously-updated proof-of-reserves feed.
            </p>

            <div style={{ marginTop: 32 }}>
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--subtle)",
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Contract · Base mainnet
              </div>
              <button className="contract-bar" onClick={copy}>
                <span className="chain">Base</span>
                <span>
                  {CONTRACT.slice(0, 10)}…{CONTRACT.slice(-6)}
                </span>
                <span className="copy-btn">
                  {copied ? (
                    <>
                      <Check size={11} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={11} /> Copy
                    </>
                  )}
                </span>
              </button>
            </div>

            <div style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#" className="btn btn-ghost btn-sm">
                Latest attestation →
              </a>
            </div>

            <ReservePartners />
          </div>

          <div className="rsv-detail">
            <div className="rsv-detail-head">
              <h4>Total Supply · GHST</h4>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--subtle)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span className="live-dot" aria-hidden /> {live ? `Live · ${age || "just now"}` : "Connecting…"}
              </span>
            </div>
            <div className="rsv-detail-body">
              <div className="rsv-supply">
                <span className="sym">₵</span>
                {supplyFmt}
              </div>
              <div className="rsv-meta">
                <span className="badge">Onchain</span>
                <span>Backed by {supplyCompact} in reserves</span>
              </div>
              <div className="rsv-chart">
                <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="gfill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#785AFF" stopOpacity="0.18" />
                      <stop offset="1" stopColor="#785AFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[0.25, 0.5, 0.75].map((g) => (
                    <line
                      key={g}
                      x1="0"
                      y1={CHART_H * g}
                      x2={CHART_W}
                      y2={CHART_H * g}
                      stroke="#0a0822"
                      strokeOpacity="0.05"
                    />
                  ))}
                  <path d={fill} fill="url(#gfill)" />
                  <path d={path} fill="none" stroke="#785AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r="4" fill="#785AFF" stroke="#fff" strokeWidth="2" />
                </svg>
              </div>
              <div className="rsv-axis">
                <span>Mar 1</span>
                <span>Mar 15</span>
                <span>Apr 1</span>
                <span>Apr 15</span>
                <span>Today</span>
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
    </section>
  );
}
