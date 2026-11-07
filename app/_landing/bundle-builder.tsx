"use client";

import { useId, useState } from "react";

import { TickerTile } from "./art";
import { Weights } from "./mockups";
import { label, STOCKS, TICKERS, TITANS, usd, type Ticker } from "./stocks";
import s from "./landing.module.css";

const MIN = 2;
const MAX = 7;
const STEP_MAX = 20;

/** A try-it-yourself bundle editor. Nothing here is saved or sent anywhere. */
export function BundleBuilder() {
  const id = useId();
  const [name, setName] = useState("Sample Bundle");
  const [legs, setLegs] = useState<{ ticker: Ticker; usd: number }[]>(TITANS);

  const picked = new Set(legs.map((l) => l.ticker));
  const ticket = legs.reduce((sum, l) => sum + l.usd, 0);
  const full = legs.length >= MAX;

  const toggle = (t: Ticker) =>
    setLegs((ls) => (ls.some((l) => l.ticker === t) ? ls.filter((l) => l.ticker !== t) : ls.length >= MAX ? ls : [...ls, { ticker: t, usd: 1 }]));
  const nudge = (t: Ticker, by: number) =>
    setLegs((ls) => ls.map((l) => (l.ticker === t ? { ...l, usd: Math.min(STEP_MAX, Math.max(1, l.usd + by)) } : l)));

  const status =
    legs.length < MIN ? `Pick at least ${MIN} stocks.` : full ? `${MAX} stocks is the most a bundle can hold.` : `${legs.length} of ${MAX} stocks picked.`;

  return (
    <div className={s.builder}>
      <label className={s.builderName}>
        <span>Bundle name</span>
        <input value={name} maxLength={28} onChange={(e) => setName(e.target.value)} placeholder="Name your bundle" />
      </label>

      <p className={s.builderHint} id={`${id}-pick`}>Tap stocks to add or remove them.</p>
      <div className={s.chips} role="group" aria-describedby={`${id}-pick`}>
        {TICKERS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={picked.has(t)}
            aria-label={STOCKS[t].name}
            disabled={!picked.has(t) && full}
            onClick={() => toggle(t)}>
            <i className={s.dot} style={{ background: STOCKS[t].color }} aria-hidden="true" />
            <span>{label(t)}</span>
          </button>
        ))}
      </div>

      <Weights legs={legs} />
      <ul className={s.builderLegs}>
        {legs.map((l) => (
          <li key={l.ticker}>
            <TickerTile ticker={l.ticker} size={34} />
            <span className={s.rowText}>
              <strong>{STOCKS[l.ticker].name}</strong>
              <span>{ticket ? Math.round((l.usd / ticket) * 100) : 0}% of each ticket</span>
            </span>
            <span className={s.stepper}>
              <button type="button" aria-label={`Less ${STOCKS[l.ticker].name}`} disabled={l.usd <= 1} onClick={() => nudge(l.ticker, -1)}>−</button>
              <output aria-live="polite">{usd(l.usd, 0)}</output>
              <button type="button" aria-label={`More ${STOCKS[l.ticker].name}`} disabled={l.usd >= STEP_MAX} onClick={() => nudge(l.ticker, 1)}>+</button>
            </span>
          </li>
        ))}
      </ul>

      <div className={s.builderTotal}>
        <span>
          <small>One ticket of {name.trim() || "your bundle"}</small>
          <strong>{usd(ticket)}</strong>
        </span>
        <span className={legs.length < MIN ? s.builderWarn : undefined} role="status">{status}</span>
      </div>
    </div>
  );
}
