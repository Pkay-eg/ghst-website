"use client";

import { ArrowRight } from "@/components/icons";
import { useOnchainStats } from "@/lib/use-onchain-stats";
import { useCountUp } from "@/lib/use-count-up";
import { fmtMintVolume } from "@/lib/format";
import { TOKEN_ADDR as GHST_CONTRACT } from "@/lib/onchain/constants";

export function CTA() {
  const stats = useOnchainStats();
  const bars = stats?.monthlyMintBars;
  // Once the fetch resolves with no live mint data, settle the counter at 0 instead of
  // animating forever — only genuinely-pending data should keep the loading climb going.
  const mintVolumeTarget =
    stats?.monthlyMintVolume ?? (stats?.mintVolumeLive === false ? 0 : null);
  const animatedMintVolume = useCountUp(mintVolumeTarget, { loadingCeiling: 50_000 });
  const volumeText = fmtMintVolume(animatedMintVolume);
  const barItems = bars || Array.from({ length: 12 }, () => null);
  const firstLabel = bars?.[0]?.label || "Jan";
  const lastLabel = bars?.[bars.length - 1]?.label || "Dec";

  return (
    <section className="container" id="get">
      <div className="cta">
        <div className="cta-inner">
          <div>
            <div className="eyebrow-label">Get started</div>
            <h2 className="display display-lg" style={{ marginTop: 16 }}>
              Build on the <em>Cedi</em>.
            </h2>
            <p>
              For institutions: mint and redeem at scale. For developers: drop GHST into any
              ERC-20 toolkit. For everyone else: send Cedis anywhere, 24/7.
            </p>
            <div className="cta-actions">
              <a href="https://www.wewire.com" target="_blank" rel="noreferrer" className="btn btn-cream">
                Get GHST <ArrowRight />
              </a>
            </div>
          </div>
          <div className="cta-aside">
            <div className="cta-aside-label">Monthly mint volume</div>
            <div className="cta-aside-value">
              <span className="sym">₵</span>
              {volumeText}
            </div>
            <div className="cta-aside-bars">
              {barItems.map((bar, i) => (
                <i
                  key={i}
                  className={bar?.active ? "active" : ""}
                  style={bar ? { height: `${Math.round(bar.height * 100)}%` } : undefined}
                  title={bar ? `${bar.label}: ₵${Math.round(bar.volume).toLocaleString()}` : undefined}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{firstLabel}</span>
              <span>{lastLabel}</span>
            </div>
            {stats?.mintVolumeLive && (
              <div style={{ marginTop: 10, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                {stats.mintVolumeSource === "basescan" ? "Live from" : "Mint events on"}{" "}
                <a
                  href={`https://basescan.org/token/${GHST_CONTRACT}#events`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "rgba(199,187,255,0.9)" }}
                >
                  Basescan
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
