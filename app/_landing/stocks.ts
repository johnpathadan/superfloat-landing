/** The stocks the prototype will offer as test tokens. Tiles show the ticker, never a company logo. */
export const STOCKS = {
  NVDA: { name: "NVIDIA", color: "#76B947", ink: "#0B2410" },
  AAPL: { name: "Apple", color: "#D9DEE2", ink: "#10282C" },
  GOOGL: { name: "Alphabet", color: "#6C8CE0", ink: "#0B1A3D" },
  MSFT: { name: "Microsoft", color: "#3CC4B4", ink: "#04222A" },
  AMZN: { name: "Amazon", color: "#FFB877", ink: "#2A0E04" },
  META: { name: "Meta", color: "#7FA7F5", ink: "#0B1A3D" },
  TSLA: { name: "Tesla", color: "#FF9C8A", ink: "#2A0E04" },
  NFLX: { name: "Netflix", color: "#E0605A", ink: "#2A0604" },
  AMD: { name: "AMD", color: "#A6CAC4", ink: "#04222A" },
  AVGO: { name: "Broadcom", color: "#F7C948", ink: "#2A1E04" },
  JPM: { name: "JPMorgan", color: "#C9A27A", ink: "#2A1810" },
  V: { name: "Visa", color: "#8F86E8", ink: "#160F3D" },
  COST: { name: "Costco", color: "#5FB4E0", ink: "#04222A" },
  KO: { name: "Coca-Cola", color: "#F2777A", ink: "#2A0604" },
  BRKB: { name: "Berkshire", color: "#B9D98A", ink: "#14240B" },
} as const;

export type Ticker = keyof typeof STOCKS;
export const TICKERS = Object.keys(STOCKS) as Ticker[];

/** How a ticker is written on screen. */
export const label = (t: Ticker) => (t === "BRKB" ? "BRK.B" : t);

/** The example bundle used across the site: $4 a ticket. */
export const TITANS: { ticker: Ticker; usd: number }[] = [
  { ticker: "NVDA", usd: 2 },
  { ticker: "AAPL", usd: 1 },
  { ticker: "GOOGL", usd: 1 },
];

export const usd = (n: number, digits = 2) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
