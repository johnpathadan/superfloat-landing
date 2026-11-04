"use client";

import { useState, type CSSProperties } from "react";

import { Flo, Water } from "./art";
import s from "./landing.module.css";

const DIGIT_EM: Record<string, number> = { "0": 0.647, "1": 0.436, "2": 0.59, "3": 0.542, "4": 0.594, "5": 0.56, "6": 0.596, "7": 0.513, "8": 0.593, "9": 0.598 };
const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const FEE = 0.015;
const START = 100;
// Rounded so the server and browser agree on the last float digit during hydration.
const tide = (balance: number) => Math.round(Math.min(1, Math.log10(1 + balance) / Math.log10(1001)) * 1e4) / 1e4;

/** Rolling digits. Columns are keyed from the right so 120 → 170 only rolls what changed. */
function Odometer({ value }: { value: number }) {
  const chars = fmt(value).split("");
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

/** The hero is the app's balance card at full size: the water follows what the creator keeps. */
export function HeroSea() {
  const [given, setGiven] = useState(START);
  const [burst, setBurst] = useState(0);
  // Worked in cents so 1.5% never leaves a float tail like 147.74999.
  const fee = Math.round(given * FEE * 100) / 100;
  const kept = given - fee;
  return (
    <Water
      className={s.heroWater}
      style={{ "--rise": tide(kept) } as CSSProperties}
      over={
        <>
          {burst ? (
            <div key={burst} className={s.bubbles} aria-hidden="true">
              {BUBBLES.map((b, i) => <i key={i} style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s` }} />)}
            </div>
          ) : null}
          <div className={s.seaBar}>
            <div>
              <p className={s.seaLabel}>When fans give you {given.toLocaleString("en-US")} USDC, you keep</p>
              <p className={s.seaAmount} role="status" aria-label={`You keep ${fmt(kept)} USDC. Superfloat gets ${fmt(fee)} USDC.`}>
                <Odometer value={kept} />
                <span className={s.seaUnit}>USDC</span>
              </p>
              <p className={s.seaFee} aria-hidden="true">Superfloat gets {fmt(fee)} USDC</p>
            </div>
            <div className={s.seaActions}>
              <button type="button" className={s.btnBuoy} disabled={given >= 1000} onClick={() => { setGiven((g) => g + 50); setBurst((n) => n + 1); }}>Fan tips 50</button>
              <button type="button" className={s.btnFoam} disabled={given === START} onClick={() => setGiven(START)}>Start over</button>
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
