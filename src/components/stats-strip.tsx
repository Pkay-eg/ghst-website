"use client";

import { useOnchainStats } from "@/lib/use-onchain-stats";
import { useLiveAge } from "@/lib/use-live-age";
import { useCountUp } from "@/lib/use-count-up";
import { fmtCedi, fmtInt } from "@/lib/format";

export function StatsStrip() {
  const stats = useOnchainStats();
  const age = useLiveAge(stats?.updatedAt);
  const animatedSupply = useCountUp(stats?.totalSupply ?? null, { loadingCeiling: 400_000 });
  const animatedHolders = useCountUp(stats?.holders ?? null, { loadingCeiling: 150 });
  const animatedVolume = useCountUp(stats?.volume24h ?? null, { loadingCeiling: 2500 });
  const supplyFmt = fmtCedi(animatedSupply, { compact: true });
  const holdersFmt = fmtInt(animatedHolders);
  const volumeFmt = fmtCedi(animatedVolume, { compact: true });
  const liveLabel = stats?.updatedAt ? `Updated ${age || "just now"}` : "Connecting…";

  return (
    <section className="section-tight">
      <div className="container">
        <div className="stats-strip">
          <div className="stat-cell">
            <div className="stat-label">Total Supply</div>
            <div className="stat-value">{supplyFmt}</div>
            <div className="stat-delta">{liveLabel}</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Holders</div>
            <div className="stat-value">{holdersFmt}</div>
            <div className="stat-delta">Onchain</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">24h Volume</div>
            <div className="stat-value">{volumeFmt}</div>
            <div className="stat-delta">Transfer volume</div>
          </div>
          <div className="stat-cell">
            <div className="stat-label">Avg. Settlement</div>
            <div className="stat-value">3.2 s</div>
            <div className="stat-delta">on Base</div>
          </div>
        </div>
      </div>
    </section>
  );
}
