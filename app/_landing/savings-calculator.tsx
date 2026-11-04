"use client";

import { useId, useState } from "react";

import s from "./landing.module.css";

const SUPERFLOAT_CUT = 0.015;
const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** What a creator keeps on Superfloat compared with the cut their current platform takes. */
export function SavingsCalculator() {
  const id = useId();
  const [monthly, setMonthly] = useState(2000);
  const [cut, setCut] = useState(10);

  const keepHere = monthly * (1 - SUPERFLOAT_CUT);
  const keepThere = monthly * (1 - cut / 100);
  const yearly = (keepHere - keepThere) * 12;

  return (
    <div className={s.calc}>
      <p className={s.calcTitle}>See what you'd keep</p>

      <div className={s.calcField}>
        <label htmlFor={`${id}-monthly`}>What fans pay you each month</label>
        <output htmlFor={`${id}-monthly`}>{usd(monthly)}</output>
      </div>
      <input id={`${id}-monthly`} className={s.calcRange} type="range" min={100} max={20000} step={100} value={monthly} aria-valuetext={usd(monthly)} onChange={(e) => setMonthly(Number(e.target.value))} />

      <div className={s.calcField}>
        <label htmlFor={`${id}-cut`}>What your current platform keeps</label>
        <output htmlFor={`${id}-cut`}>{cut}%</output>
      </div>
      <input id={`${id}-cut`} className={s.calcRange} type="range" min={3} max={50} step={1} value={cut} onChange={(e) => setCut(Number(e.target.value))} aria-describedby={`${id}-cut-hint`} />
      <small id={`${id}-cut-hint`} className={s.calcHint}>Add payment processing fees if your platform charges them on top.</small>

      <div className={s.calcBars}>
        <div>
          <span>On Superfloat</span>
          <strong>{usd(keepHere)} a month</strong>
          <i className={s.bar}><b style={{ width: `${(1 - SUPERFLOAT_CUT) * 100}%` }} /></i>
        </div>
        <div>
          <span>On your current platform</span>
          <strong>{usd(keepThere)} a month</strong>
          <i className={`${s.bar} ${s.barMuted}`}><b style={{ width: `${100 - cut}%` }} /></i>
        </div>
      </div>

      <p className={s.calcResult} role="status">
        <strong>{usd(yearly)}</strong>
        <span>more in your pocket every year</span>
      </p>
    </div>
  );
}
