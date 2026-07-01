import { BASE_RPC, SEL_DECIMALS, SEL_TOTAL_SUPPLY, TOKEN_ADDR } from "./constants";

export async function rpcEthCall(to: string, data: string): Promise<string> {
  const r = await fetch(BASE_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: [{ to, data }, "latest"],
    }),
  });
  if (!r.ok) throw new Error(`RPC HTTP ${r.status}`);
  const j = await r.json();
  if (j.error) throw new Error(j.error.message || "RPC error");
  return j.result;
}

export function hexToBig(h: string | undefined): bigint {
  if (!h || h === "0x") return 0n;
  return BigInt(h);
}

export async function fetchSupplyAndDecimals(): Promise<{
  totalSupply: number;
  decimals: number;
}> {
  const [supHex, decHex] = await Promise.all([
    rpcEthCall(TOKEN_ADDR, SEL_TOTAL_SUPPLY),
    rpcEthCall(TOKEN_ADDR, SEL_DECIMALS),
  ]);
  const decimals = Number(hexToBig(decHex) || 18n);
  const supplyRaw = hexToBig(supHex);
  const totalSupply = Number(supplyRaw) / Math.pow(10, decimals);
  return { totalSupply, decimals };
}
