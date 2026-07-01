import { TOKEN_ADDR, TX_MAX_PAGES, ZERO_ADDR } from "./constants";
import type { TokenTransfer } from "./types";

interface BlockscoutTransferItem {
  block_number: number;
  timestamp: string;
  transaction_hash: string;
  from?: { hash?: string };
  to?: { hash?: string };
  total?: { value?: string; decimals?: string };
}

export async function fetchAllTokenTransfersFromBlockscout(): Promise<TokenTransfer[] | null> {
  const all: TokenTransfer[] = [];
  let nextParams: Record<string, unknown> | null = null;

  for (let page = 0; page < TX_MAX_PAGES; page++) {
    const url = new URL(`https://base.blockscout.com/api/v2/tokens/${TOKEN_ADDR}/transfers`);
    if (nextParams) {
      Object.entries(nextParams).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    }
    const r = await fetch(url);
    if (!r.ok) break;
    const j = await r.json();
    const items: BlockscoutTransferItem[] = j.items || [];
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
