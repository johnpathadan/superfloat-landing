"use client";

import { useState, type CSSProperties } from "react";

import { Flo, Water } from "./art";
import s from "./landing.module.css";

const DIGIT_EM: Record<string, number> = { "0": 0.647, "1": 0.436, "2": 0.59, "3": 0.542, "4": 0.594, "5": 0.56, "6": 0.596, "7": 0.513, "8": 0.593, "9": 0.598 };
const fmt = (n: number) => n.toLocaleString("en-US");
const tide = (balance: number) => Math.min(1, Math.log10(1 + balance) / Math.log10(1001));

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

/** The hero is the app's balance card at full size: the water follows the balance. */
export function HeroSea() {
  const [balance, setBalance] = useState(120);
  const [burst, setBurst] = useState(0);
  const low = balance > 0 && balance < 60;
  return (
    <Water
      className={s.heroWater}
      style={{ "--rise": tide(balance) } as CSSProperties}
      over={
        <>
          {burst ? (
            <div key={burst} className={s.bubbles} aria-hidden="true">
              {BUBBLES.map((b, i) => <i key={i} style={{ left: `${b.left}%`, width: b.size, height: b.size, animationDelay: `${b.delay}s` }} />)}
            </div>
          ) : null}
          <div className={s.seaBar}>
            <div>
              <p className={s.seaLabel}>Try it. This is a demo balance.</p>
              <p className={s.seaAmount} role="status" aria-label={`${fmt(balance)} USDC`}>
                <Odometer value={balance} />
                <span className={s.seaUnit}>USDC</span>
              </p>
            </div>
            <div className={s.seaActions}>
              <button type="button" className={s.btnBuoy} disabled={balance >= 1000} onClick={() => { setBalance((b) => b + 50); setBurst((n) => n + 1); }}>Deposit 50</button>
              <button type="button" className={s.btnFoam} disabled={balance < 30} onClick={() => setBalance((b) => b - 30)}>Send 30</button>
            </div>
          </div>
        </>
      }>
      <div className={s.heroFlo}>
        <div className={s.bob}>
          <Flo pose={balance === 0 ? "sleep" : "float"} ex={low ? "worry" : "open"} />
        </div>
      </div>
    </Water>
  );
}
