import type { Metadata, Viewport } from "next";

import { Flo, Icon, Thumb, Water } from "../_landing/art";
import { pageClass, SiteFooter, SiteNav } from "../_landing/site";
import s from "../_landing/landing.module.css";
import type { IconName } from "../_landing/icons";

export const metadata: Metadata = {
  title: "How Superfloat works",
  description: "What happens behind the scenes when a fan supports you on Superfloat, in plain words.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const JOURNEY: { icon: IconName; title: string; body: string }[] = [
  { icon: "tip", title: "Your fan taps Tip", body: "They choose $10 on your page and confirm. It comes from their Superfloat balance, which they topped up with a card, bank transfer or Apple Pay." },
  { icon: "send", title: "It travels over Base", body: "The $10 moves as digital dollars on Base, a payment network built by Coinbase. It arrives in seconds, at any hour, with no bank in the middle." },
  { icon: "wallet", title: "It lands in your page's wallet", body: "$9.85 goes to your community page and $0.15 (1.5%) goes to Superfloat. You see it in your history straight away." },
  { icon: "withdraw", title: "You cash out when you like", body: "Keep it to pay others, move it to your personal wallet, or withdraw it to your bank account." },
];

const PIECES: { icon: IconName; title: string; body: string }[] = [
  { icon: "shield", title: "Coinbase protects your account", body: "When you sign in with email, Google or a passkey, Coinbase creates your wallet and keeps it safe. There's no secret recovery phrase to write down or lose." },
  { icon: "coin", title: "USDC is the money", body: "A digital dollar issued by Circle and designed to stay worth $1, so your balance doesn't swing up and down like other crypto." },
  { icon: "link", title: "Base moves it", body: "A public payment network built by Coinbase. It records every payment, and once a payment goes through it's final, so there are no chargebacks." },
  { icon: "paw", title: "Superfloat ties it together", body: "Your @name, community pages, tiers, the Social feed and your history. The money itself sits in wallets linked to your login, not in a Superfloat bank account." },
];

const QUESTIONS = [
  { q: "Do I need to know anything about crypto?", a: "No. You sign in like any other app, see your balance in dollars, and pay with a tap. Superfloat handles the wallet and the network for you." },
  { q: "Who pays the network fees?", a: "Superfloat covers the small network fee on every payment, so the only cost is Superfloat's flat 1.5% on tips and subscriptions, with no hidden or surprise charges. Payments between people are free." },
  { q: "Can other people see my payments?", a: "Base is a public ledger, so payments are recorded with wallet addresses and amounts, but not your name or @handle. In the app, only your accepted connections see your activity in the Social feed." },
  { q: "Why does each page get its own wallet?", a: "So your page earnings never mix with your personal money. Fans paying your page never see your personal wallet, and you switch between wallets from the same login." },
];

export default function HowItWorks() {
  return (
    <div className={pageClass}>
      <section className={s.subHero} aria-labelledby="how-title">
        <span className={s.heroSun} />
        <SiteNav current="how" />
        <div className={s.heroCopy}>
          <h1 id="how-title">How Superfloat <em>works</em>.</h1>
          <p>What happens behind the scenes when a fan supports you, in plain words. No crypto knowledge needed.</p>
        </div>
        <Water className={s.subWater}>
          <div className={s.subFlo}><div className={s.bob}><Flo /></div></div>
        </Water>
      </section>

      <main>
        <section className={s.journey} aria-labelledby="journey-title">
          <div className={s.walletsCopy}>
            <h2 id="journey-title" className={s.h2}>What happens when a fan tips you $10.</h2>
            <p className={s.lead}>The whole trip, from your fan&apos;s tap to your bank account.</p>
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

        <section className={s.how} aria-labelledby="subs-title">
          <div className={s.howInner}>
            <div>
              <h2 id="subs-title" className={s.h2}>Subscriptions that can&apos;t overcharge.</h2>
              <p className={s.lead}>When a fan subscribes, they approve a limit: who can be paid, how much and how often. Superfloat can collect only that amount, once per week or month. Cancelling removes the permission straight away.</p>
            </div>
            <div className={s.pageCard}>
              <div className={s.pageHead}>
                <Thumb id="startup" size={64} />
                <div><strong>Startup Podcast</strong><span>@startuppodcast</span></div>
              </div>
              <p>You&apos;re allowing this page to collect</p>
              <ul className={s.allow}>
                <li><span>Up to</span><strong>$5</strong></li>
                <li><span>How often</span><strong>Every week</strong></li>
                <li><span>Stop it</span><strong>Cancel anytime</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className={s.faq} aria-labelledby="faq-title">
          <div className={s.walletsCopy}>
            <h2 id="faq-title" className={s.h2}>Good questions.</h2>
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
