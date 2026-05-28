// ─── Onchain data hook for GHST on Base ───
// Pulls live total supply directly from the Base RPC (no API key needed).
// If window.BASESCAN_API_KEY is set, also fetches recent transfers from
// BaseScan to compute 24h volume and an approximate holder count.

const { useState: useStateO, useEffect: useEffectO } = React;

const TOKEN_ADDR = "0x2094656c30C064EFae86C1fA1b87DdAB1f513fbb";
const BASE_CHAIN_ID = 8453;
const BASE_RPC = "https://base-rpc.publicnode.com";
const REFRESH_MS = 60_000;

// Function selectors
const SEL_TOTAL_SUPPLY = "0x18160ddd";
const SEL_DECIMALS     = "0x313ce567";

async function rpcEthCall(to, data) {
  const r = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to, data }, "latest"] }),
  });
  if (!r.ok) throw new Error(`RPC HTTP ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(j.error.message || "RPC error");
  return j.result;
}

function hexToBig(h) {
  if (!h || h === "0x") return 0n;
  return BigInt(h);
}

async function fetchSupplyAndDecimals() {
  const [supHex, decHex] = await Promise.all([
    rpcEthCall(TOKEN_ADDR, SEL_TOTAL_SUPPLY),
    rpcEthCall(TOKEN_ADDR, SEL_DECIMALS),
  ]);
  const decimals = Number(hexToBig(decHex) || 6n);
  const supplyRaw = hexToBig(supHex);
  const totalSupply = Number(supplyRaw) / Math.pow(10, decimals);
  return { totalSupply, decimals };
}

async function fetchTransfers(apiKey, decimals) {
  // BaseScan v2 — requires API key. Returns up to 1000 most recent transfers.
  if (!apiKey) return null;
  const url =
    `https://api.basescan.org/v2/api` +
    `?chainid=${BASE_CHAIN_ID}` +
    `&module=account&action=tokentx` +
    `&contractaddress=${TOKEN_ADDR}` +
    `&page=1&offset=1000&sort=desc` +
    `&apikey=${encodeURIComponent(apiKey)}`;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    const j = await r.json();
    if (j.status !== "1" || !Array.isArray(j.result)) return null;
    return j.result;
  } catch { return null; }
}

function compute24hVolume(transfers, decimals) {
  if (!transfers) return null;
  const cutoff = Math.floor(Date.now() / 1000) - 24 * 3600;
  let raw = 0n;
  for (const t of transfers) {
    const ts = Number(t.timeStamp);
    if (!ts || ts < cutoff) break;
    try { raw += BigInt(t.value); } catch {}
  }
  return Number(raw) / Math.pow(10, decimals);
}

function countHolders(transfers) {
  // Heuristic: union of recipients minus zero address. Approximation.
  if (!transfers) return null;
  const set = new Set();
  for (const t of transfers) {
    const to = (t.to || "").toLowerCase();
    if (to && to !== "0x0000000000000000000000000000000000000000") set.add(to);
  }
  return set.size || null;
}

// shared cache + subscribers so multiple components share one fetch
let _onchain = null;
const _subs = new Set();
let _timer = null;
let _refreshing = false;

async function _doRefresh() {
  if (_refreshing) return;
  _refreshing = true;
  try {
    const supplyData = await fetchSupplyAndDecimals();
    const { totalSupply, decimals } = supplyData;
    const apiKey = (typeof window !== "undefined" && window.BASESCAN_API_KEY) || "";
    const transfers = await fetchTransfers(apiKey, decimals);
    _onchain = {
      totalSupply,
      decimals,
      volume24h: compute24hVolume(transfers, decimals),
      holders: countHolders(transfers),
      updatedAt: Date.now(),
      hasIndexer: !!transfers,
    };
    _subs.forEach((fn) => fn(_onchain));
  } catch (err) {
    // Stay quiet on the UI; fall back to placeholder copy.
    console.warn("[onchain] refresh failed:", err.message || err);
  } finally {
    _refreshing = false;
  }
}

function _ensurePolling() {
  if (_timer) return;
  _doRefresh();
  _timer = setInterval(_doRefresh, REFRESH_MS);
}

function useOnchainStats() {
  const [s, setS] = useStateO(_onchain);
  useEffectO(() => {
    _subs.add(setS);
    _ensurePolling();
    if (_onchain) setS(_onchain);
    return () => { _subs.delete(setS); };
  }, []);
  return s;
}

// ── Formatting helpers ──
function fmtCedi(n, opts = {}) {
  if (n == null || Number.isNaN(n)) return null;
  const { compact = false, decimals = 0 } = opts;
  if (compact) {
    if (n >= 1e9) return `₵${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `₵${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `₵${(n / 1e3).toFixed(n >= 1e4 ? 0 : 1)}K`;
    return `₵${Math.round(n).toLocaleString()}`;
  }
  return `₵${n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function fmtInt(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n).toLocaleString('en-US');
}

function fmtAge(ts) {
  if (!ts) return null;
  const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

function useLiveAge(ts) {
  const [, force] = useStateO(0);
  useEffectO(() => {
    const t = setInterval(() => force((x) => x + 1), 10_000);
    return () => clearInterval(t);
  }, []);
  return fmtAge(ts);
}

Object.assign(window, {
  useOnchainStats,
  useLiveAge,
  fmtCedi,
  fmtInt,
  fmtAge,
  GHST_CONTRACT: TOKEN_ADDR,
});
