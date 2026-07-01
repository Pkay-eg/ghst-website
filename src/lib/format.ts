export function fmtCedi(n: number | null | undefined, opts: { compact?: boolean; decimals?: number } = {}): string | null {
  if (n == null || Number.isNaN(n)) return null;
  const { compact = false, decimals = 0 } = opts;
  if (compact) {
    if (n >= 1e9) return `₵${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `₵${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `₵${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}K`;
    return `₵${Math.round(n).toLocaleString()}`;
  }
  return `₵${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

export function fmtMintVolume(n: number | null | undefined): string | null {
  if (n == null || Number.isNaN(n)) return null;
  const compact = fmtCedi(n, { compact: true });
  return compact ? compact.replace("₵", "") : null;
}

export function fmtInt(n: number | null | undefined): string | null {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n).toLocaleString("en-US");
}

export function fmtAge(ts: number | null | undefined): string | null {
  if (!ts) return null;
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}
