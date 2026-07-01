import { BASESCAN_V2, BASE_CHAIN_ID, TOKEN_ADDR, TX_MAX_PAGES, TX_PAGE_SIZE } from "./constants";
import type { TokenTransfer } from "./types";

export async function basescanRequest(
  params: Record<string, string>,
  apiKey: string
): Promise<unknown> {
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

export async function fetchTokenTxPage(
  apiKey: string,
  page: number,
  startBlock = 0
): Promise<TokenTransfer[]> {
  const result = await basescanRequest(
    {
      module: "account",
      action: "tokentx",
      contractaddress: TOKEN_ADDR,
      startblock: String(startBlock),
      endblock: "99999999",
      page: String(page),
      offset: String(TX_PAGE_SIZE),
      sort: "asc",
    },
    apiKey
  );
  return Array.isArray(result) ? (result as TokenTransfer[]) : [];
}

export async function fetchAllTokenTransfersFromBasescan(
  apiKey: string,
  startBlock = 0
): Promise<TokenTransfer[]> {
  const all: TokenTransfer[] = [];
  for (let page = 1; page <= TX_MAX_PAGES; page++) {
    const batch = await fetchTokenTxPage(apiKey, page, startBlock);
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < TX_PAGE_SIZE) break;
  }
  return all;
}
