import { fetchAllTokenTransfersFromBasescan } from "./basescan";
import { fetchAllTokenTransfersFromBlockscout } from "./blockscout";
import { MINT_LOOKBACK_MONTHS, TOKEN_ADDR, ZERO_ADDR } from "./constants";
import type { MonthlyMintBar, TokenTransfer } from "./types";

export async function fetchIndexerTransfers(
  apiKey: string
): Promise<{ transfers: TokenTransfer[]; source: string } | null> {
  if (apiKey) {
    try {
      const transfers = await fetchAllTokenTransfersFromBasescan(apiKey, 0);
      return { transfers, source: "basescan" };
    } catch (err) {
      console.warn("[onchain] Basescan transfer fetch failed:", err instanceof Error ? err.message : err);
    }
  }
  try {
    const transfers = await fetchAllTokenTransfersFromBlockscout();
    if (transfers) return { transfers, source: "blockscout" };
  } catch (err) {
    console.warn(
      "[onchain] Blockscout transfer fallback failed:",
      err instanceof Error ? err.message : err
    );
  }
  return null;
}

export function isMintTransfer(tx: TokenTransfer): boolean {
  return (tx.from || "").toLowerCase() === ZERO_ADDR;
}

function monthKeyFromTimestamp(tsSec: number): string {
  const d = new Date(tsSec * 1000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export function computeMonthlyMintStats(
  mintTransfers: TokenTransfer[],
  decimals: number
): { currentMonthVolume: number; monthlyMintBars: MonthlyMintBar[] } {
  const buckets: Record<string, number> = {};
  for (const tx of mintTransfers) {
    const ts = Number(tx.timeStamp);
    if (!ts) continue;
    const key = monthKeyFromTimestamp(ts);
    const amount = Number(tx.value) / Math.pow(10, decimals);
    if (!Number.isFinite(amount)) continue;
    buckets[key] = (buckets[key] || 0) + amount;
  }

  const now = new Date();
  const months: { key: string; label: string; volume: number }[] = [];
  for (let i = MINT_LOOKBACK_MONTHS - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    months.push({
      key,
      label: d.toLocaleString("en", { month: "short", timeZone: "UTC" }),
      volume: buckets[key] || 0,
    });
  }

  const currentMonthVolume = months[months.length - 1]?.volume ?? 0;
  const maxVol = Math.max(...months.map((m) => m.volume), 1);
  const monthlyMintBars: MonthlyMintBar[] = months.map((m) => ({
    label: m.label,
    volume: m.volume,
    height: m.volume ? Math.max(0.18, m.volume / maxVol) : 0.1,
    active: m.volume > 0,
  }));

  return { currentMonthVolume, monthlyMintBars };
}

export function compute24hVolume(transfers: TokenTransfer[] | null, decimals: number): number {
  if (!transfers?.length) return 0;
  const cutoff = Math.floor(Date.now() / 1000) - 24 * 3600;
  let raw = 0n;
  for (const t of transfers) {
    const ts = Number(t.timeStamp);
    if (!ts || ts < cutoff) continue;
    try {
      raw += BigInt(t.value);
    } catch {
      // ignore malformed values
    }
  }
  return Number(raw) / Math.pow(10, decimals);
}

export function countHoldersFromTransfers(transfers: TokenTransfer[] | null): number | null {
  if (!transfers?.length) return null;
  const balances = new Map<string, bigint>();
  const tokenAddr = TOKEN_ADDR.toLowerCase();
  const sorted = [...transfers].sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));

  for (const t of sorted) {
    const from = (t.from || "").toLowerCase();
    const to = (t.to || "").toLowerCase();
    let val = 0n;
    try {
      val = BigInt(t.value || 0);
    } catch {
      continue;
    }
    if (from !== ZERO_ADDR) balances.set(from, (balances.get(from) || 0n) - val);
    if (to !== ZERO_ADDR) balances.set(to, (balances.get(to) || 0n) + val);
  }

  let count = 0;
  for (const [addr, bal] of balances) {
    if (bal > 0n && addr !== tokenAddr) count++;
  }
  return count;
}
