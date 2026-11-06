import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { Flo, Icon } from "./_landing/art";
import { BundleCard, FeedCard, PlanCard, WalletCard } from "./_landing/mockups";
import { Rankings } from "./_landing/rankings";
import { pageClass, SiteFooter, SiteNav } from "./_landing/site";
import { TicketHero } from "./_landing/ticket-hero";
import { WaitlistButton } from "./_landing/waitlist-button";
import s from "./_landing/landing.module.css";
import type { IconName } from "./_landing/icons";

export const metadata: Metadata = {
  title: "Superfloat",
  description: "Discover stock bundles made by people you follow, invest in them with USDC on a schedule, and keep every stock token in your own wallet.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const BUNDLE_POINTS: { icon: IconName; title: string; body: string }[] = [
  { icon: "list", title: "2 to 7 stocks", body: "Each bundle names its stocks and a dollar amount for each one." },
  { icon: "coin", title: "Priced in tickets", body: "One ticket is the sum of those amounts. Buy as many tickets as you like." },
  { icon: "clock", title: "History stays put", body: "Every change makes a new version. Old versions and their record are never rewritten." },
];

const PLAN_STEPS = [
  { title: "Pick your tickets", body: "Choose a bundle and how many tickets to buy each time." },
  { title: "Choose how often", body: "Weekly, every two weeks or monthly." },
  { title: "Approve a limit", body: "Superfloat can spend up to that amount each period, and nothing more." },
];

const WALLET_POINTS: { icon: IconName; title: string; body: string }[] = [
  { icon: "wallet", title: "No pooled fund", body: "There are no bundle shares. You hold each stock token directly." },
  { icon: "repeat", title: "Convert to USDC", body: "Sell a stock back to USDC when its market is open, and see the minimum you'll get first." },
  { icon: "deposit", title: "USDC in, USDC out", body: "Add USDC on Base, and withdraw to an address you choose." },
];

export default function Home() {
  return (
    <div className={pageClass}>
      <section id="top" className={s.hero} aria-labelledby="hero-title">
        <span className={s.heroSun} />
        <SiteNav current="invest" />
        <div className={s.heroCopy}>
          <h1 id="hero-title">Invest in portfolios built by people you <em>follow</em>.</h1>
          <p>Pick a bundle of stocks, choose how many tickets to buy, and set it to repeat. Every stock lands in your own wallet.</p>
          <WaitlistButton source="hero" />
        </div>
        <TicketHero />
      </section>

      <main>
        <section id="bundles" className={s.community} aria-labelledby="bundles-title">
          <div className={s.communityInner}>
            <div>
              <h2 id="bundles-title" className={s.h2}>Bundles, made by people.</h2>
              <p className={s.lead}>Anyone can publish a bundle of stocks they believe in. You can see exactly what&apos;s inside and what each ticket buys before you put in a dollar.</p>
              <ul className={s.perks}>
                {BUNDLE_POINTS.map((p) => (
                  <li key={p.title}><Icon name={p.icon} /><div><strong>{p.title}</strong><span>{p.body}</span></div></li>
                ))}
              </ul>
              <p className={s.note}><Link href="/creators" className={s.inlineLink}>Have a strategy of your own? Create a bundle</Link></p>
            </div>
            <BundleCard />
          </div>
        </section>

        <section id="rankings" className={s.how} aria-labelledby="rankings-title">
          <div className={s.howInner}>
            <Rankings />
            <div>
              <h2 id="rankings-title" className={s.h2}>Ranked in the open.</h2>
              <p className={s.lead}>Compare bundles over 24 hours, 7 days, a month, this year or their whole life. Every ranking says what it measures, so a bundle&apos;s track record, a backtest and your own return are never mixed up.</p>
              <p className={s.lead}>Your result depends on when you buy and sell, so it can differ from the bundle&apos;s.</p>
            </div>
          </div>
        </section>

        <section id="plans" className={s.social} aria-labelledby="plans-title">
          <div className={s.howInner}>
            <div>
              <h2 id="plans-title" className={s.h2}>Set it, and let it float.</h2>
              <p className={s.lead}>An investment plan buys your tickets on a schedule, so you don&apos;t have to sign every purchase.</p>
              <ol className={s.steps}>
                {PLAN_STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}
              </ol>
              <p className={s.lead}>Each run buys every stock in the bundle together, or nothing at all, so you&apos;re never left with half a bundle.</p>
            </div>
            <PlanCard />
          </div>
        </section>

        <section id="wallet" className={s.money} aria-labelledby="wallet-title">
          <div className={s.moneyInner}>
            <WalletCard />
            <div>
              <h2 id="wallet-title" className={s.h2}>Every stock lands in your wallet.</h2>
              <p className={s.lead}>You sign in with email, Google or MetaMask, and Coinbase creates a wallet that only you control. Superfloat never holds your money or your stocks.</p>
              <ul className={`${s.perks} ${s.perksDark}`}>
                {WALLET_POINTS.map((p) => (
                  <li key={p.title}><Icon name={p.icon} /><div><strong>{p.title}</strong><span>{p.body}</span></div></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={s.social} aria-labelledby="social-title">
          <div className={s.socialInner}>
            <FeedCard />
            <div>
              <div className={s.hands}><Flo pose="hands" label="Two otters holding hands" /></div>
              <h2 id="social-title" className={s.h2}>Better with friends.</h2>
              <p className={s.lead}>Follow creators and connect with friends. Your Social feed shows the bundles they start plans in, buy and publish, and only your connections see what you do.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter source="footer" />
    </div>
  );
}
