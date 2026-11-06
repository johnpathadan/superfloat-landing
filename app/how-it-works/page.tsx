import type { Metadata, Viewport } from "next";

import { Flo, Icon, Water } from "../_landing/art";
import { PlanCard } from "../_landing/mockups";
import { pageClass, SiteFooter, SiteNav } from "../_landing/site";
import s from "../_landing/landing.module.css";
import type { IconName } from "../_landing/icons";

export const metadata: Metadata = {
  title: "How Superfloat works",
  description: "What happens when your investment plan runs, where your stocks go, and what Superfloat can and can't do with your money.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const JOURNEY: { icon: IconName; title: string; body: string }[] = [
  { icon: "clock", title: "Your plan comes due", body: "On the weekly or monthly schedule from when you subscribed, Superfloat checks that your plan is active, the bundle is open and your limit has room." },
  { icon: "coin", title: "It uses up to $4", body: "Only the amount you approved, once per period, from the USDC in your wallet." },
  { icon: "repeat", title: "All three stocks are bought at once", body: "$2 of NVIDIA, $1 of Apple and $1 of Alphabet in one transaction. If any of them can't be bought at a fair price, the whole purchase is called off." },
  { icon: "wallet", title: "The stocks land in your wallet", body: "Straight to the wallet you sign in with, never a shared account. Your history shows what was bought and for how much." },
];

const PIECES: { icon: IconName; title: string; body: string }[] = [
  { icon: "shield", title: "Coinbase protects your account", body: "When you sign in with email, Google or MetaMask, Coinbase creates a wallet that only you control. There's no recovery phrase to write down." },
  { icon: "coin", title: "USDC on Base is the money", body: "USDC is a digital dollar issued by Circle and designed to stay worth $1. Base is the public network, built by Coinbase, that moves it." },
  { icon: "trend", title: "Tokenized stocks are what you buy", body: "Digital tokens that track the price of a company's shares. They're issued by other companies, and each issuer sets what its token gives you." },
  { icon: "paw", title: "Superfloat ties it together", body: "Bundles, tickets, plans, rankings and the Social feed. It never holds your money or your stocks." },
];

const QUESTIONS = [
  { q: "What's a ticket?", a: "Just a way of counting. If a bundle's ticket is $4, buying 5 tickets invests $20, split the way the bundle says. Tickets aren't tokens, and you never hold or trade them. You hold the stocks." },
  { q: "Do I own the stocks?", a: "You hold the stock tokens yourself, in your own wallet. Superfloat has no pooled fund and no bundle shares. What a token gives you, such as its link to the real share, depends on the company that issues it." },
  { q: "What if one stock can't be bought?", a: "Then none of them are. A purchase buys every stock in the bundle together, or it's called off and your USDC stays in your wallet." },
  { q: "Can I sell?", a: "Yes. Convert to USDC sells some or all of a stock back to USDC, when its market is open and a fair price is available. You see the minimum you'll get before you approve it. Selling doesn't stop your plan; pausing or cancelling a plan is a separate choice." },
  { q: "What if the creator changes the bundle?", a: "Your plan pauses until you approve the new version. Nothing you already bought is sold, and you can cancel instead. If a creator archives a bundle, its plans stop and you keep your stocks." },
  { q: "What does it cost?", a: "We haven't set pricing yet. We'll show every fee before you invest, and the cost of each purchase before you confirm it." },
  { q: "Do creators get paid?", a: "Not at launch. We're exploring ways to reward creators, and we'll only add one that's clear, fair and allowed where Superfloat operates." },
  { q: "Where will Superfloat be available?", a: "We plan to open country by country, starting outside the US, and only where we're allowed to. Join early access and we'll tell you when it opens where you live." },
];

export default function HowItWorks() {
  return (
    <div className={pageClass}>
      <section className={s.subHero} aria-labelledby="how-title">
        <span className={s.heroSun} />
        <SiteNav current="how" />
        <div className={s.heroCopy}>
          <h1 id="how-title">How Superfloat <em>works</em>.</h1>
          <p>What happens when your investment plan runs, and where your stocks go, in plain words.</p>
        </div>
        <Water className={s.subWater}>
          <div className={s.subFlo}><div className={s.bob}><Flo /></div></div>
        </Water>
      </section>

      <main>
        <section className={s.journey} aria-labelledby="journey-title">
          <div className={s.walletsCopy}>
            <h2 id="journey-title" className={s.h2}>What happens when a $4 Titans plan runs.</h2>
            <p className={s.lead}>Titans is an example bundle with $2 of NVIDIA, $1 of Apple and $1 of Alphabet in each ticket. This plan buys 1 ticket each period.</p>
            <ol className={s.flow}>
              {JOURNEY.map((step) => (
                <li key={step.title}>
                  <Icon name={step.icon} />
                  <strong>{step.title}</strong>
                  <span>{step.body}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={s.pieces} aria-labelledby="pieces-title">
          <div className={s.walletsCopy}>
            <h2 id="pieces-title" className={s.h2}>The four pieces behind it.</h2>
            <p className={s.lead}>You never have to deal with these directly, but here&apos;s what each one does.</p>
            <ul className={s.pieceGrid}>
              {PIECES.map((p) => (
                <li key={p.title}>
                  <Icon name={p.icon} />
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={s.how} aria-labelledby="limits-title">
          <div className={s.howInner}>
            <div>
              <h2 id="limits-title" className={s.h2}>Plans that can&apos;t overspend.</h2>
              <p className={s.lead}>When you start a plan, you approve a limit on how much can be spent and how often. Superfloat is built so the limit is enforced on Base itself, where even Superfloat can&apos;t go past it, and so bought stocks can only go to your wallet.</p>
              <p className={s.lead}>Pause a plan, cancel it or remove its permission whenever you like.</p>
            </div>
            <PlanCard />
          </div>
        </section>

        <section className={s.faq} aria-labelledby="faq-title">
          <div className={s.walletsCopy}>
            <h2 id="faq-title" className={s.h2}>A few questions answered.</h2>
            <div className={s.faqList}>
              {QUESTIONS.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter source="how-it-works" />
    </div>
  );
}
