"use client";

import { useState, type CSSProperties } from "react";

import { Flo, TickerTile, Water } from "./art";
import { STOCKS, TITANS, usd } from "./stocks";
import s from "./landing.module.css";

const DIGIT_EM: Record<string, number> = { "0": 0.647, "1": 0.436, "2": 0.59, "3": 0.542, "4": 0.594, "5": 0.56, "6": 0.596, "7": 0.513, "8": 0.593, "9": 0.598 };
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const TICKET = TITANS.reduce((sum, leg) => sum + leg.usd, 0);
const START = 5;
const MAX = 50;
// Rounded so the server and browser agree on the last float digit during hydration.
const tide = (total: number) => Math.round(Math.min(1, Math.log10(1 + total) / Math.log10(1 + MAX * TICKET)) * 1e4) / 1e4;

/** Rolling digits after a dollar sign. Columns are keyed from the right so 20.00 → 24.00 only rolls what changed. */
function Odometer({ value }: { value: number }) {
  const chars = `$${fmt(value)}`.split("");
  return (
    <span className={s.odo} aria-hidden="true">
      {chars.map((c, i) => {
        const key = chars.length - i;
        if (!/\d/.test(c)) return <span key={key}>{c}</span>;
        return (
          <span key={key} className={s.digit} style={{ width: `${DIGIT_EM[c]}em` }}>
            <span className={s.strip} style={{ transform: `translateY(-${Number(c) * 10}%)` }}>
              {"0123456789".split("").map((d) => <i key={d}>{d}</i>)}
            </span>
          </span>
        );
      })}
    </span>
  );
}

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({ left: 6 + ((i * 37) % 88), size: 6 + ((i * 5) % 12), delay: (i % 5) * 0.09 }));

/** The hero is the app's balance card at full size: each ticket raises the water and splits across the bundle. */
export function TicketHero() {
  const [tickets, setTickets] = useState(START);
  const [burst, setBurst] = useState(0);
  const total = tickets * TICKET;
  const split = TITANS.map((leg) => `${usd(leg.usd * tickets)} in ${STOCKS[leg.ticker].name}`).join(", ");

  return (
    <Water
      className={s.heroWater}
      style={{ "--rise": tide(total) } as CSSProperties}
      over={
        <>
          {burst ? (
            <div key={burst} className={s.bubbles} aria-hidden="true">
              {BUBBLES.map((b, i) => <i key={i} style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s` }} />)}
            </div>
          ) : null}
          <div className={s.seaBar}>
            <div>
              <p className={s.seaLabel}>
                {tickets} {tickets === 1 ? "ticket" : "tickets"} of Titans, an example bundle, invests
              </p>
              <div className={s.seaRow}>
                <p className={s.seaAmount} role="status" aria-label={`${usd(total)}: ${split}.`}>
                  <Odometer value={total} />
                </p>
                <ul className={s.split} aria-hidden="true">
                  {TITANS.map((leg) => (
                    <li key={leg.ticker}>
                      <TickerTile ticker={leg.ticker} size={30} />
                      <span>
                        {/* Keyed on the amount so the pop replays on every change. */}
                        <strong key={tickets} className={s.pop}>{usd(leg.usd * tickets)}</strong>
                        <small>{STOCKS[leg.ticker].name}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={s.seaActions}>
              <button
                type="button"
                className={s.btnBuoy}
                disabled={tickets >= MAX}
                onClick={() => {
                  setTickets((t) => t + 1);
                  setBurst((n) => n + 1);
                }}>
                Add a ticket
              </button>
              <button type="button" className={s.btnFoam} disabled={tickets === START} onClick={() => setTickets(START)}>
                Start over
              </button>
            </div>
          </div>
        </>
      }>
      <div className={s.heroFlo}>
        <div className={s.bob}>
          <Flo />
        </div>
      </div>
    </Water>
  );
}
