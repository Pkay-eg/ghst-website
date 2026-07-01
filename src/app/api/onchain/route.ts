import { NextResponse } from "next/server";
import { computeMonthlyMintStats, compute24hVolume, countHoldersFromTransfers, fetchIndexerTransfers, isMintTransfer } from "@/lib/onchain/aggregate";
import { fetchSupplyAndDecimals } from "@/lib/onchain/rpc";
import type { OnchainStats } from "@/lib/onchain/types";

export const revalidate = 60;

let lastGood: OnchainStats | null = null;

export async function GET() {
  try {
    const { totalSupply, decimals } = await fetchSupplyAndDecimals();
    const apiKey = process.env.BASESCAN_API_KEY ?? "";
    const indexer = await fetchIndexerTransfers(apiKey);
    const transfers = indexer?.transfers ?? null;
    const mintTransfers = transfers ? transfers.filter(isMintTransfer) : null;
    const mintStats = mintTransfers
      ? computeMonthlyMintStats(mintTransfers, decimals)
      : { currentMonthVolume: null, monthlyMintBars: null };

    const stats: OnchainStats = {
      totalSupply,
      decimals,
      volume24h: transfers ? compute24hVolume(transfers, decimals) : null,
      holders: transfers ? countHoldersFromTransfers(transfers) : null,
      monthlyMintVolume: mintStats.currentMonthVolume,
      monthlyMintBars: mintStats.monthlyMintBars,
      mintVolumeLive: mintTransfers != null,
      mintVolumeSource: indexer?.source ?? null,
      indexerSource: indexer?.source ?? null,
      updatedAt: Date.now(),
      hasIndexer: !!transfers,
    };

    lastGood = stats;
    return NextResponse.json(stats);
  } catch (err) {
    console.error("[onchain] refresh failed:", err instanceof Error ? err.message : err);
    if (lastGood) return NextResponse.json(lastGood);
    return NextResponse.json({ error: "onchain data unavailable" }, { status: 503 });
  }
}
