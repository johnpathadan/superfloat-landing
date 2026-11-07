"use client";

import { useId, useState } from "react";

import { Thumb, TickerTile } from "./art";
import type { Ticker } from "./stocks";
import s from "./landing.module.css";

const PERIODS = ["24H", "7D", "1M", "YTD", "Max"] as const;
type Period = (typeof PERIODS)[number];

/** Made-up bundles and returns for the illustration. None of these numbers are real. */
const BUNDLES: { id: string; name: string; by: string; stocks: Ticker[]; returns: Record<Period, number> }[] = [
  { id: "titans", name: "Sample Bundle", by: "@anacosta", stocks: ["NVDA", "AAPL", "GOOGL"], returns: { "24H": 0.8, "7D": 2.1, "1M": 4.6, YTD: 18.2, Max: 21.5 } },
  { id: "calm", name: "Calm Compounders", by: "@theobrandt", stocks: ["BRKB", "COST", "KO", "V"], returns: { "24H": 0.2, "7D": 0.9, "1M": 1.8, YTD: 9.4, Max: 14.1 } },
  { id: "chips", name: "Chip Makers", by: "@snehasingh", stocks: ["NVDA", "AMD", "AVGO"], returns: { "24H": -1.4, "7D": 3.2, "1M": 6.9, YTD: 24.7, Max: 19.8 } },
  { id: "everyday", name: "Everyday Brands", by: "@sarat", stocks: ["AMZN", "COST", "KO", "AAPL"], returns: { "24H": 0.4, "7D": -0.6, "1M": 2.2, YTD: 7.1, Max: 8.3 } },
  { id: "screens", name: "Screen Time", by: "@davidrao", stocks: ["NFLX", "META", "GOOGL"], returns: { "24H": -0.3, "7D": 1.4, "1M": -2.1, YTD: 12.6, Max: 10.9 } },
];

const pct = (n: number) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(1)}%`;

/** A ranking card. Rows slide to their new places when the period changes. */
export function Rankings() {
  const id = useId();
  const [period, setPeriod] = useState<Period>("YTD");
  const order = [...BUNDLES].sort((a, b) => b.returns[period] - a.returns[period]).map((b) => b.id);

  return (
    <div className={s.rank}>
      <div className={s.rankHead}>
        <p id={`${id}-title`}>Top bundles</p>
        <span className={s.badge}>Illustration</span>
      </div>
      <div className={s.periods} role="group" aria-label="Ranking period">
        {PERIODS.map((p) => (
          <button key={p} type="button" aria-pressed={p === period} onClick={() => setPeriod(p)}>
            {p}
          </button>
        ))}
      </div>
      <ol className={s.rankList} aria-labelledby={`${id}-title`} style={{ height: `calc(${BUNDLES.length} * var(--row))` }}>
        {BUNDLES.map((b) => {
          const place = order.indexOf(b.id);
          const r = b.returns[period];
          return (
            // Kept in a fixed DOM order so each row can slide; the visible order comes from the transform.
            <li key={b.id} style={{ transform: `translateY(calc(${place} * var(--row)))` }} aria-posinset={place + 1} aria-setsize={BUNDLES.length}>
              <span className={s.rankNum}>{place + 1}</span>
              <Thumb id={b.id} size={42} />
              <span className={s.rankText}>
                <strong>{b.name}</strong>
                <span className={s.rankStocks}>
                  {b.stocks.map((t) => <TickerTile key={t} ticker={t} size={18} />)}
                  <small>{b.by}</small>
                </span>
              </span>
              <span className={r < 0 ? s.down : s.up}>{pct(r)}</span>
            </li>
          );
        })}
      </ol>
      <p className={s.rankNote}>
        Rankings use each bundle&apos;s model return: how its mix moved from the day it went live, never backdated. They aren&apos;t
        backtests, and they aren&apos;t any one investor&apos;s result.
      </p>
    </div>
  );
}
