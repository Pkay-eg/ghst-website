"use client";

import { useEffect, useState } from "react";
import { fmtAge } from "@/lib/format";

export function useLiveAge(ts: number | null | undefined): string | null {
  const [, force] = useState(0);
  useEffect(() => {
    const t = setInterval(() => force((x) => x + 1), 10_000);
    return () => clearInterval(t);
  }, []);
  return fmtAge(ts);
}
