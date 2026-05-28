// ─── Onchain data hook for GHST on Base ───
// Supply: Base RPC. Transfers, holders, 24h volume, mint stats: Basescan (Etherscan v2, chain 8453).
// Set window.BASESCAN_API_KEY from https://basescan.org/myapikey

const { useState: useStateO, useEffect: useEffectO } = React;

const TOKEN_ADDR = "0x2094656c30C064EFae86C1fA1b87DdAB1f513fbb";
const BASE_CHAIN_ID = 8453;
const BASE_RPC = "https://base-rpc.publicnode.com";
const BASESCAN_V2 = "https://api.etherscan.io/v2/api";
const REFRESH_MS = 60_000;
const ZERO_ADDR = "0x0000000000000000000000000000000000000000";
const MINT_LOOKBACK_MONTHS = 12;
const TX_PAGE_SIZE = 1000;
const TX_MAX_PAGES = 20;

const SEL_TOTAL_SUPPLY = "0x18160ddd";
const SEL_DECIMALS = "0x313ce567";

function getApiKey() {
  return (typeof window !== "undefined" && window.BASESCAN_API_KEY) || "";
}

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
  const decimals = Number(hexToBig(decHex) || 18n);
  const supplyRaw = hexToBig(supHex);
  const totalSupply = Number(supplyRaw) / Math.pow(10, decimals);
  return { totalSupply, decimals };
}

async function basescanRequest(params, apiKey) {
  const q = new URLSearchParams({ chainid: String(BASE_CHAIN_ID), ...params });
  if (apiKey) q.set("apikey", apiKey);
  const r = await fetch(`${BASESCAN_V2}?${q}`);
  if (!r.ok) throw new Error(`Basescan HTTP ${r.status}`);
  const j = await r.json();
  if (j.status !== "1") {
    if (j.message === "No transactions found") return null;
    throw new Error(typeof j.result === "string" ? j.result : j.message || "Basescan error");
  }
  return j.result;
}

async function fetchTokenTxPage(apiKey, page, startBlock = 0) {
  const result = await basescanRequest({
    module: "account",
    action: "tokentx",
    contractaddress: TOKEN_ADDR,
    startblock: String(startBlock),
    endblock: "99999999",
    page: String(page),
    offset: String(TX_PAGE_SIZE),
    sort: "asc",
  }, apiKey);
  return Array.isArray(result) ? result : [];
}

async function fetchAllTokenTransfersFromBasescan(apiKey, startBlock = 0) {
  const all = [];
  for (let page = 1; page <= TX_MAX_PAGES; page++) {
    const batch = await fetchTokenTxPage(apiKey, page, startBlock);
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < TX_PAGE_SIZE) break;
  }
  return all;
}

async function fetchAllTokenTransfersFromBlockscout() {
  const all = [];
  let nextParams = null;
  for (let page = 0; page < TX_MAX_PAGES; page++) {
    const url = new URL(`https://base.blockscout.com/api/v2/tokens/${TOKEN_ADDR}/transfers`);
    if (nextParams) {
      Object.entries(nextParams).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    }
    const r = await fetch(url);
    if (!r.ok) break;
    const j = await r.json();
    const items = j.items || [];
    for (const item of items) {
      all.push({
        blockNumber: String(item.block_number),
        timeStamp: String(Math.floor(new Date(item.timestamp).getTime() / 1000)),
        hash: item.transaction_hash,
        from: item.from?.hash || ZERO_ADDR,
        to: item.to?.hash || ZERO_ADDR,
        value: item.total?.value || "0",
        tokenDecimal: item.total?.decimals || "18",
      });
    }
    nextParams = j.next_page_params;
    if (!nextParams || !items.length) break;
  }
  return all.length ? all : null;
}

async function fetchIndexerTransfers(apiKey) {
  if (apiKey) {
    try {
      const transfers = await fetchAllTokenTransfersFromBasescan(apiKey, 0);
      return { transfers, source: "basescan" };
    } catch (err) {
      console.warn("[onchain] Basescan transfer fetch failed:", err.message || err);
    }
  }
  try {
    const transfers = await fetchAllTokenTransfersFromBlockscout();
    if (transfers) return { transfers, source: "blockscout" };
  } catch (err) {
    console.warn("[onchain] Blockscout transfer fallback failed:", err.message || err);
  }
  return null;
}

function isMintTransfer(tx) {
  return (tx.from || "").toLowerCase() === ZERO_ADDR;
}

function monthKeyFromTimestamp(tsSec) {
  const d = new Date(tsSec * 1000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function computeMonthlyMintStats(mintTransfers, decimals) {
  const buckets = {};
  for (const tx of mintTransfers) {
    const ts = Number(tx.timeStamp);
    if (!ts) continue;
    const key = monthKeyFromTimestamp(ts);
    const amount = Number(tx.value) / Math.pow(10, decimals);
    if (!Number.isFinite(amount)) continue;
    buckets[key] = (buckets[key] || 0) + amount;
  }

  const now = new Date();
  const months = [];
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
  const monthlyMintBars = months.map((m) => ({
    label: m.label,
    volume: m.volume,
    height: m.volume ? Math.max(0.18, m.volume / maxVol) : 0.1,
    active: m.volume > 0,
  }));

  return { currentMonthVolume, monthlyMintBars };
}

function compute24hVolume(transfers, decimals) {
  if (!transfers?.length) return 0;
  const cutoff = Math.floor(Date.now() / 1000) - 24 * 3600;
  let raw = 0n;
  for (const t of transfers) {
    const ts = Number(t.timeStamp);
    if (!ts || ts < cutoff) continue;
    try { raw += BigInt(t.value); } catch {}
  }
  return Number(raw) / Math.pow(10, decimals);
}

function countHoldersFromTransfers(transfers) {
  if (!transfers?.length) return null;
  const balances = new Map();
  const tokenAddr = TOKEN_ADDR.toLowerCase();
  const sorted = [...transfers].sort((a, b) => Number(a.timeStamp) - Number(b.timeStamp));

  for (const t of sorted) {
    const from = (t.from || "").toLowerCase();
    const to = (t.to || "").toLowerCase();
    let val = 0n;
    try { val = BigInt(t.value || 0); } catch { continue; }
    if (from !== ZERO_ADDR) balances.set(from, (balances.get(from) || 0n) - val);
    if (to !== ZERO_ADDR) balances.set(to, (balances.get(to) || 0n) + val);
  }

  let count = 0;
  for (const [addr, bal] of balances) {
    if (bal > 0n && addr !== tokenAddr) count++;
  }
  return count;
}

let _onchain = null;
const _subs = new Set();
let _timer = null;
let _refreshing = false;

async function _doRefresh() {
  if (_refreshing) return;
  _refreshing = true;
  try {
    const { totalSupply, decimals } = await fetchSupplyAndDecimals();
    const apiKey = getApiKey();
    const indexer = await fetchIndexerTransfers(apiKey);
    const transfers = indexer?.transfers || null;
    const mintTransfers = transfers ? transfers.filter(isMintTransfer) : null;
    const mintStats = mintTransfers
      ? computeMonthlyMintStats(mintTransfers, decimals)
      : { currentMonthVolume: null, monthlyMintBars: null };

    _onchain = {
      totalSupply,
      decimals,
      volume24h: transfers ? compute24hVolume(transfers, decimals) : null,
      holders: transfers ? countHoldersFromTransfers(transfers) : null,
      monthlyMintVolume: mintStats.currentMonthVolume,
      monthlyMintBars: mintStats.monthlyMintBars,
      mintVolumeLive: mintTransfers != null,
      mintVolumeSource: indexer?.source || null,
      indexerSource: indexer?.source || null,
      updatedAt: Date.now(),
      hasIndexer: !!transfers,
    };
    _subs.forEach((fn) => fn(_onchain));
  } catch (err) {
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

function fmtCedi(n, opts = {}) {
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

function fmtMintVolume(n) {
  if (n == null || Number.isNaN(n)) return null;
  const compact = fmtCedi(n, { compact: true });
  return compact ? compact.replace("₵", "") : null;
}

function fmtInt(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n).toLocaleString("en-US");
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
  fmtMintVolume,
  fmtInt,
  fmtAge,
  GHST_CONTRACT: TOKEN_ADDR,
});
