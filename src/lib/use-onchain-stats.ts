"use client";

import { useEffect, useState } from "react";
import type { OnchainStats } from "@/lib/onchain/types";

const REFRESH_MS = 60_000;

export function useOnchainStats(): OnchainStats | null {
  const [stats, setStats] = useState<OnchainStats | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const r = await fetch("/api/onchain");
        if (!r.ok) return;
        const data = await r.json();
        if (!cancelled && !("error" in data)) setStats(data);
      } catch (err) {
        console.warn("[onchain] client refresh failed:", err instanceof Error ? err.message : err);
      }
    }

    refresh();
    const t = setInterval(refresh, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  return stats;
}
