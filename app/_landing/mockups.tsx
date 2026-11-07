import { Flo, Icon, Thumb, TickerTile, Water } from "./art";
import { STOCKS, TITANS, usd, type Ticker } from "./stocks";
import s from "./landing.module.css";

const TICKET = TITANS.reduce((sum, leg) => sum + leg.usd, 0);

/** A bundle as it appears in the app: who made it, what's in it and what one ticket costs. */
export function BundleCard() {
  return (
    <div className={s.pageCard} role="img" aria-label="Sample Bundle by Ana Costa: $2 NVIDIA, $1 Apple and $1 Alphabet per ticket, $4 a ticket">
      <div className={s.pageHead}>
        <Thumb id="titans" size={68} />
        <div>
          <strong>Sample Bundle</strong>
          <span className={s.byline}><Thumb id="ana" size={20} /> by @anacosta · version 2</span>
        </div>
      </div>
      <p>Three of the biggest names in tech, weighted toward chips.</p>
      <Weights legs={TITANS} />
      <ul className={s.legs}>
        {TITANS.map((leg) => (
          <li key={leg.ticker}>
            <TickerTile ticker={leg.ticker} size={36} />
            <span className={s.rowText}><strong>{STOCKS[leg.ticker].name}</strong><span>{Math.round((leg.usd / TICKET) * 100)}% of each ticket</span></span>
            <strong>{usd(leg.usd)}</strong>
          </li>
        ))}
      </ul>
      <div className={s.ticketLine}><span>One ticket</span><strong>{usd(TICKET)}</strong></div>
      <div className={s.pageBtns}><span>Buy tickets</span><span>Start a plan</span></div>
    </div>
  );
}

/** One bar split by each stock's share of a ticket. */
export function Weights({ legs }: { legs: { ticker: Ticker; usd: number }[] }) {
  const total = legs.reduce((sum, leg) => sum + leg.usd, 0) || 1;
  return (
    <i className={s.weights} aria-hidden="true">
      {legs.map((leg) => <b key={leg.ticker} style={{ flexGrow: leg.usd / total, background: STOCKS[leg.ticker].color }} />)}
    </i>
  );
}

/** The permission a plan asks for, written out the way the app shows it. */
export function PlanCard() {
  return (
    <div className={s.pageCard}>
      <div className={s.pageHead}>
        <Thumb id="titans" size={56} />
        <div><strong>Weekly plan</strong><span>Sample Bundle · version 2</span></div>
      </div>
      <p>You&apos;re allowing Superfloat to invest for you</p>
      <ul className={s.allow}>
        <li><span>Each time</span><strong>5 tickets, {usd(5 * TICKET)}</strong></li>
        <li><span>How often</span><strong>Every Monday</strong></li>
        <li><span>Never more than</span><strong>{usd(5 * TICKET)} a week</strong></li>
        <li><span>Stop it</span><strong>Pause or cancel anytime</strong></li>
      </ul>
    </div>
  );
}

const HOLDINGS: { ticker: Ticker; units: string; value: number }[] = [
  { ticker: "NVDA", units: "0.2183", value: 40.12 },
  { ticker: "AAPL", units: "0.0861", value: 20.35 },
  { ticker: "GOOGL", units: "0.1042", value: 19.88 },
];

/** The wallet screen: USDC on top, then only the stocks bought through Superfloat. */
export function WalletCard() {
  return (
    <div className={s.walletCard} role="img" aria-label="Example wallet: $86.40 in USDC, plus NVIDIA, Apple and Alphabet tokens bought through a Sample Bundle plan, each with a Convert to USDC button">
      <div className={`${s.miniCard} ${s.walletSky}`}>
        <span className={s.miniSun} />
        <span className={s.miniLabel}>USDC balance</span>
        <span className={s.miniAmount}>$86.40</span>
        <Water className={s.miniWater}><div className={s.miniFlo}><div className={s.bob}><Flo /></div></div></Water>
      </div>
      <div className={s.tiles}>
        <span className={s.tile}><Icon name="deposit" size={18} />Deposit USDC</span>
        <span className={s.tile}><Icon name="withdraw" size={18} />Withdraw USDC</span>
      </div>
      <p className={s.phoneHead}>From your Sample Bundle plan</p>
      {HOLDINGS.map((h) => (
        <div key={h.ticker} className={s.row}>
          <TickerTile ticker={h.ticker} size={36} />
          <div className={s.rowText}><strong>{STOCKS[h.ticker].name}</strong><span>{h.units} tokens · {usd(h.value)}</span></div>
          <span className={s.convert}>Convert to USDC</span>
        </div>
      ))}
    </div>
  );
}

/** A Social feed snippet: what your connections invest in. */
export function FeedCard() {
  return (
    <div className={s.feed}>
      <div className={s.feedWho}><Thumb id="sam" size={36} /><strong>Sam Smith</strong><span>2h</span></div>
      <div className={s.tier}>
        <span>Sam started a</span>
        <strong className={s.tierSmall}>Weekly plan in Sample Bundle</strong>
        <span className={s.feedStocks}>
          {TITANS.map((leg) => <TickerTile key={leg.ticker} ticker={leg.ticker} size={22} />)}
        </span>
      </div>
      <div className={s.feedLine}>
        <span className={s.pair}><Thumb id="ana" size={36} /><span><Thumb id="titans" size={36} /></span></span>
        <p><strong>Ana Costa</strong> published version 2 of <strong>Sample Bundle</strong></p>
      </div>
      <div className={s.feedLine}>
        <span className={s.pair}><Thumb id="sneha" size={36} /><span><Thumb id="calm" size={36} /></span></span>
        <p><strong>Sneha Singh</strong> bought tickets in <strong>Calm Compounders</strong></p>
      </div>
      <div className={s.feedLine}>
        <span className={s.pair}><Thumb id="david" size={36} /><span><Thumb id="chips" size={36} /></span></span>
        <p><strong>David Rao</strong> followed <strong>Chip Makers</strong></p>
      </div>
    </div>
  );
}
