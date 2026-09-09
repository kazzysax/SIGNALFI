import { GOAT_MAINNET, HYPERLIQUID_API } from "@/lib/mainnet";

export const runtime = "edge";

async function postJson(url: string, body: object) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
  return response.json();
}

export async function GET(request: Request) {
  const address = new URL(request.url).searchParams.get("address");
  if (address && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return Response.json({ error: "Invalid wallet address" }, { status: 400 });
  }

  try {
    const calls: Promise<unknown>[] = [
      postJson(`${HYPERLIQUID_API}/info`, { type: "metaAndAssetCtxs" }),
      postJson(GOAT_MAINNET.rpcUrl, { jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
    ];
    if (address) {
      calls.push(postJson(`${HYPERLIQUID_API}/info`, { type: "clearinghouseState", user: address }));
      calls.push(postJson(`${HYPERLIQUID_API}/info`, { type: "frontendOpenOrders", user: address }));
    }
    const [marketRaw, goatRaw, account, openOrders] = await Promise.all(calls);
    const [meta, contexts] = marketRaw as [{ universe: Array<{ name: string; szDecimals: number; maxLeverage: number }> }, Array<Record<string,string>>];
    const assets = meta.universe.map((asset, index) => ({ ...asset, assetId: index, ...(contexts[index] ?? {}) }));
    const goatBlockHex = (goatRaw as { result?: string }).result;
    return Response.json({
      network: "mainnet",
      updatedAt: Date.now(),
      goatBlock: goatBlockHex ? Number.parseInt(goatBlockHex, 16) : null,
      assets,
      account: account ?? null,
      openOrders: openOrders ?? [],
    }, { headers: { "cache-control": address ? "no-store" : "public, max-age=5" } });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Mainnet data unavailable" }, { status: 502 });
  }
}
