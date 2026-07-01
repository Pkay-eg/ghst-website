"use client";

import { useEffect, useState, type ReactNode } from "react";

export function Economy() {
  return (
    <section className="section section-tint" id="economy">
      <div className="container">
        <div className="economy-head">
          <div>
            <div className="eyebrow-label">24-Hour Economy</div>
            <h2 className="display display-md" style={{ marginTop: 14 }}>
              Money that doesn&apos;t sleep,
              <br />
              for a country that <em>doesn&apos;t either.</em>
            </h2>
          </div>
          <p className="lede economy-lede">
            Ghana&apos;s 24-hour economy agenda needs financial rails that match it. Bank
            cut-offs, weekends, and public holidays are friction that traders, exporters, and
            the diaspora can&apos;t afford. GHST settles in seconds, every second of the year.
          </p>
        </div>

        <Timeline24 />

        <div className="economy-grid">
          <UseCase
            visual={<MarketIcon />}
            tag="Night markets"
            title="Settle at 2 AM. Settle at 2 PM. Same flow."
            body="Vendors at Makola, Kejetia, and Madina accept and clear payments at midnight just as they do at noon, no batched morning reconciliation."
            stat="3.2s"
            statLabel="Average settlement"
          />
          <UseCase
            visual={<WeekendIcon />}
            tag="Weekends & holidays"
            title="No Friday 4 PM cut-off."
            body="GHST moves on Saturday morning, Sunday night, and on every public holiday. Cashflow doesn't stop because the banking week ended."
            stat="365"
            statLabel="Days online per year"
          />
          <UseCase
            visual={<DiasporaIcon />}
            tag="Diaspora remittances"
            title="Send from London at 2 AM. Arrives before breakfast."
            body="The diaspora moves on its own clock. GHST removes time-zone friction, family receives funds the moment they're sent, not the next business day."
            stat="0"
            statLabel="Days waiting"
          />
        </div>

        <UptimeStrip />
      </div>
    </section>
  );
}

function Timeline24() {
  const hours = Array.from({ length: 25 }, (_, i) => i);

  const [tNow, setTNow] = useState(() => {
    const d = new Date();
    return (d.getHours() + d.getMinutes() / 60) / 24;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTNow((d.getHours() + d.getMinutes() / 60) / 24);
    }, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="timeline24">
      <div className="timeline24-head">
        <div className="timeline24-title">A single day of money in Ghana</div>
        <div className="timeline24-legend">
          <span>
            <span className="legend-swatch legend-bank" />
            Traditional banks
          </span>
          <span>
            <span className="legend-swatch legend-ghst" />
            GHST
          </span>
        </div>
      </div>

      <div className="timeline-row">
        <div className="timeline-label">
          <div className="timeline-label-name">Traditional banks</div>
          <div className="timeline-label-meta">Mon–Fri · 8:30 AM – 4 PM</div>
        </div>
        <div className="timeline-track">
          <div
            className="timeline-bar timeline-bar--bank"
            style={{ left: `${(8.5 / 24) * 100}%`, width: `${(7.5 / 24) * 100}%` }}
          >
            <span className="bar-label">Open</span>
          </div>
          <div className="timeline-now" style={{ left: `${tNow * 100}%` }} aria-hidden>
            <span className="timeline-now-dot" />
          </div>
        </div>
      </div>

      <div className="timeline-row">
        <div className="timeline-label">
          <div className="timeline-label-name">GHST</div>
          <div className="timeline-label-meta">24/7 · always settling</div>
        </div>
        <div className="timeline-track">
          <div className="timeline-bar timeline-bar--ghst" style={{ left: 0, width: "100%" }}>
            <span className="bar-label">Open</span>
            <span className="pulse" style={{ left: "8%" }} />
            <span className="pulse" style={{ left: "24%", animationDelay: "-0.6s" }} />
            <span className="pulse" style={{ left: "46%", animationDelay: "-1.2s" }} />
            <span className="pulse" style={{ left: "62%", animationDelay: "-1.8s" }} />
            <span className="pulse" style={{ left: "79%", animationDelay: "-0.3s" }} />
            <span className="pulse" style={{ left: "93%", animationDelay: "-1.5s" }} />
          </div>
          <div className="timeline-now" style={{ left: `${tNow * 100}%` }} aria-hidden>
            <span className="timeline-now-dot" />
          </div>
        </div>
      </div>

      <div className="timeline-scale">
        <div className="timeline-scale-track">
          {hours.map((h) => {
            const major = h % 6 === 0;
            return (
              <span key={h} className={`tick ${major ? "tick-major" : ""}`} style={{ left: `${(h / 24) * 100}%` }}>
                {major && <span className="tick-label">{h.toString().padStart(2, "0")}:00</span>}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface UseCaseProps {
  visual: ReactNode;
  tag: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

function UseCase({ visual, tag, title, body, stat, statLabel }: UseCaseProps) {
  return (
    <div className="economy-card">
      <div className="economy-card-visual">{visual}</div>
      <div className="economy-card-tag">{tag}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="economy-card-stat">
        <span className="economy-stat-value">{stat}</span>
        <span className="economy-stat-label">{statLabel}</span>
      </div>
    </div>
  );
}

function UptimeStrip() {
  const items = [
    { v: "24 / 7", l: "Always settling" },
    { v: "0 hr", l: "Bank cut-off" },
    { v: "3.2 s", l: "Average finality" },
    { v: "$0.000005", l: "Average gas fee" },
  ];
  return (
    <div className="uptime-strip">
      {items.map((it, i) => (
        <div className="uptime-cell" key={i}>
          <div className="uptime-value">{it.v}</div>
          <div className="uptime-label">{it.l}</div>
        </div>
      ))}
    </div>
  );
}

function MarketIcon() {
  return (
    <svg viewBox="0 0 120 80" width="100%" height="100%">
      <line x1="0" y1="62" x2="120" y2="62" stroke="#d6cbff" strokeWidth="1" />
      <g>
        <rect x="14" y="40" width="20" height="22" rx="3" fill="#785AFF" />
        <rect x="38" y="32" width="22" height="30" rx="3" fill="#a08fff" />
        <rect x="64" y="44" width="18" height="18" rx="3" fill="#785AFF" />
        <rect x="86" y="36" width="22" height="26" rx="3" fill="#a08fff" />
      </g>
      <g fill="none" stroke="#785AFF" strokeWidth="1.5">
        <path d="M10 40 L24 30 L38 40" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 32 L49 22 L64 32" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M60 44 L73 36 L86 44" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 36 L97 26 L112 36" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="100" cy="14" r="6" fill="#0a0822" />
      <circle cx="103" cy="12" r="4" fill="#f5f3ff" />
      <circle cx="22" cy="68" r="3" fill="#785AFF" />
      <circle cx="72" cy="70" r="3" fill="#a08fff" />
    </svg>
  );
}

function WeekendIcon() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <svg viewBox="0 0 168 80" width="100%" height="100%">
      {days.map((d, i) => {
        const isWeekend = i >= 5;
        const x = 6 + i * 22;
        return (
          <g key={i}>
            <rect x={x} y={20} width="18" height="40" rx="4" fill={isWeekend ? "#785AFF" : "#ebe5ff"} />
            <text x={x + 9} y={45} textAnchor="middle" fontSize="11" fontWeight="600" fill={isWeekend ? "#fff" : "#785AFF"}>
              {d}
            </text>
            {isWeekend && (
              <circle cx={x + 9} cy={70} r="2.5" fill="#785AFF">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function DiasporaIcon() {
  return (
    <svg viewBox="0 0 200 80" width="100%" height="100%">
      <defs>
        <linearGradient id="arc" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#785AFF" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#785AFF" stopOpacity="1" />
          <stop offset="1" stopColor="#785AFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path d="M 30 60 Q 100 -10, 170 60" fill="none" stroke="url(#arc)" strokeWidth="2" strokeDasharray="2 4" />
      <circle r="4" fill="#785AFF">
        <animateMotion dur="3s" repeatCount="indefinite" path="M 30 60 Q 100 -10, 170 60" />
      </circle>
      <g transform="translate(30 60)">
        <circle r="10" fill="#fff" stroke="#785AFF" strokeWidth="1.5" />
        <text textAnchor="middle" y="3" fontSize="9" fontWeight="600" fill="#0a0822">
          LDN
        </text>
      </g>
      <g transform="translate(170 60)">
        <circle r="10" fill="#785AFF" />
        <text textAnchor="middle" y="3" fontSize="9" fontWeight="600" fill="#fff">
          ACC
        </text>
      </g>
      <text x="100" y="76" textAnchor="middle" fontSize="9" fontWeight="500" fill="#8c89a8" letterSpacing="0.5">
        2:00 AM GMT → 2:00 AM ACCRA
      </text>
    </svg>
  );
}
