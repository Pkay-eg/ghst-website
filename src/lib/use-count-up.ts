"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
  duration?: number;
  loadingCeiling?: number;
  loadingTimeConstant?: number;
}

export function useCountUp(
  target: number | null,
  { duration = 900, loadingCeiling = 2500, loadingTimeConstant = 1.1 }: CountUpOptions = {}
): number {
  const [display, setDisplay] = useState(0);
  const displayRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const loadStartRef = useRef<number | null>(null);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    let cancelled = false;

    if (target == null) {
      if (loadStartRef.current == null) loadStartRef.current = performance.now();
      const loadStart = loadStartRef.current;

      const loadingTick = (now: number) => {
        if (cancelled) return;
        const t = (now - loadStart) / 1000;
        const value = loadingCeiling * (1 - Math.exp(-t / loadingTimeConstant));
        setDisplay(value);
        rafRef.current = requestAnimationFrame(loadingTick);
      };
      rafRef.current = requestAnimationFrame(loadingTick);
      return () => {
        cancelled = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    loadStartRef.current = null;
    const from = displayRef.current;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, loadingCeiling, loadingTimeConstant]);

  return display;
}
