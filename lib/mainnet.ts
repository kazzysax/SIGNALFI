export const HYPERLIQUID_API = "https://api.hyperliquid.xyz";

export const GOAT_MAINNET = {
  chainId: 2345,
  chainIdHex: "0x929",
  chainName: "GOAT Network",
  rpcUrl: "https://rpc.goat.network",
  explorerUrl: "https://explorer.goat.network",
  nativeCurrency: { name: "Bitcoin", symbol: "BTC", decimals: 18 },
} as const;

export const GOATSWAP = {
  swapRouter02: "0x0d230A6A3E49301F0Ef9663982a529412EAAFAf4",
  quoterV2: "0xa58536246beEB4E68C84caFFC07C87aB5F9f7A16",
  universalRouter: "0xD269cf6c970b3c02f01CC6C5e83bB108236b273c",
  permit2: "0x000000000022D473030F116dDEE9F6B43aC78BA3",
  tokens: {
    WGBTC: "0xbC10000000000000000000000000000000000000",
    USDCe: "0x3022b87ac063DE95b1570F46f5e470F8B53112D8",
    USDT: "0xE1AD845D93853fff44990aE0DcecD8575293681e",
    WETH: "0x3a1293Bdb83bBbDd5Ebf4fAc96605aD2021BbC0f",
    BTCB: "0xfe41e7e5cB3460c483AB2A38eb605Cda9e2d248E",
  },
} as const;

export type InjectedProvider = {
  request(args: { method: string; params?: unknown[] | object }): Promise<unknown>;
  on?: (event: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window { ethereum?: InjectedProvider }
}
