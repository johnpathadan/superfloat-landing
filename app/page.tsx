import type { Metadata, Viewport } from "next";

import { Flo, Icon, Shell, Thumb } from "./_landing/art";
import { HeroSea } from "./_landing/hero-sea";
import { FeedCard, METHODS, Row, SkyCard } from "./_landing/mockups";
import { SavingsCalculator } from "./_landing/savings-calculator";
import { pageClass, SiteFooter, SiteNav } from "./_landing/site";
import { WaitlistButton } from "./_landing/waitlist-button";
import s from "./_landing/landing.module.css";
import type { IconName } from "./_landing/icons";

export const metadata: Metadata = {
  title: "Superfloat",
  description: "Community pages for creators. Fans tip and subscribe in digital dollars, and Superfloat takes a flat 1.5% with no hidden charges.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const PERKS: { icon: IconName; title: string; body: string }[] = [
  { icon: "tip", title: "Tips and subscriptions", body: "One-time tips, or weekly and monthly support at an amount each fan chooses." },
  { icon: "wallet", title: "Its own wallet", body: "Page earnings never mix with your personal money." },
  { icon: "share", title: "A link and a QR code", body: "Share your page anywhere your fans already follow you." },
];

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

const FEES = [
  { figure: "1.5%", label: "flat, on each tip and subscription" },
  { figure: "$0", label: "network fees for you. Superfloat covers them" },
];

const STEPS = [
  { title: "Sign in", body: "Use a social login and your wallet is created for you with Coinbase embedded wallets." },
  { title: "Create your page", body: "Pick an @name, describe what you make and set your tiers." },
  { title: "Share your link", body: "Post it in your bio, your videos or your newsletter, and start getting support." },
];

export default function Home() {
  return (
    <div className={pageClass}>
      <section id="top" className={s.hero} aria-labelledby="hero-title">
        <span className={s.heroSun} />
        <SiteNav current="creators" />
        <div className={s.heroCopy}>
          <h1 id="hero-title">Keep more of what your <em>fans</em> give.</h1>
          <p>Superfloat gives creators a community page where fans tip and subscribe. We take a flat 1.5% with no hidden or surprise charges, a fraction of what most platforms keep.</p>
          <WaitlistButton source="hero" />
        </div>
        <HeroSea />
      </section>

      <main>
        <section id="communities" className={s.community}>
          <div className={s.communityInner}>
            <div>
              <h2 className={s.h2}>A home for the people who back you.</h2>
              <p className={s.lead}>Start a community page for your podcast, channel, studio or club. Fans find you by @name and back you in a few taps.</p>
              <ul className={s.perks}>
                {PERKS.map((p) => (
                  <li key={p.title}><Icon name={p.icon} /><div><strong>{p.title}</strong><span>{p.body}</span></div></li>
                ))}
              </ul>
              <div className={s.ladder}>
                {TIERS.map((tier) => <div key={tier}><Shell name={tier} /><span>{tier}</span></div>)}
              </div>
              <p className={s.note}>Set your own tiers. Fans move up as their total support grows and earn a badge for every tier they complete.</p>
            </div>
            <div className={s.pageCard}>
              <div className={s.pageHead}>
                <Thumb id="startup" size={76} />
                <div><strong>Startup Podcast</strong><span>@startuppodcast</span></div>
              </div>
              <p>Weekly podcast covering major startup news</p>
              <span className={s.subs}>455 subscribers</span>
              <div className={s.pageBtns}><span>Tip</span><span>Subscribe</span></div>
              <div className={s.tier}>
                <div className={s.tierShell}><Shell name="Bronze" /></div>
                <span>You are currently in the</span>
                <strong>Bronze tier</strong>
                <span>$85 of $100 donated</span>
                <i className={s.bar}><b style={{ width: "85%" }} /></i>
              </div>
              <p className={s.topHead}>Top contributors</p>
              <Row id="ana" title="Ana Costa" sub="Platinum tier" right="$512" note="1st" />
              <Row id="theo" title="Theo Brandt" sub="Gold tier" right="$340" note="2nd" />
            </div>
          </div>
        </section>

        <section id="savings" className={s.savings} aria-labelledby="savings-title">
          <div className={s.savingsInner}>
            <div>
              <h2 id="savings-title" className={s.h2}>Stop paying the platform tax.</h2>
              <p className={s.lead}>Most creator platforms keep a share of every tip and subscription, often 5 to 12%, and some take 30% or more. Superfloat takes a flat 1.5% and adds no hidden or surprise charges, so more of every payment reaches you.</p>
              <ul className={s.fees}>
                {FEES.map((f) => <li key={f.label}><strong>{f.figure}</strong><span>{f.label}</span></li>)}
              </ul>
            </div>
            <SavingsCalculator />
          </div>
        </section>

        <section id="start" className={s.wallets}>
          <div className={s.walletsCopy}>
            <h2 className={s.h2}>Your page is live in minutes.</h2>
            <ol className={`${s.steps} ${s.stepsRow}`}>
              {STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}
            </ol>
            <p className={s.lead}>Every community page and tips page gets its own wallet, separate from your personal one. Switch between them from the same login.</p>
          </div>
          <div className={s.fan}>
            <SkyCard sky={s.morning} kind="Tips page" name="@snehasingh_drummer" amount="1,250" pose="float" />
            <SkyCard sky={s.dusk} kind="Personal" name="@johnpathadan" amount="120" pose="float" />
            <SkyCard sky={s.night} kind="Community page" name="@fieldnotes" amount="342.50" pose="float" />
          </div>
        </section>

        <section className={s.money}>
          <div className={s.moneyInner}>
            <div>
              <h2 className={s.h2}>Fans pay the way they already pay.</h2>
              <p className={s.lead}>Your fans don&apos;t need to know anything about crypto. They add money with a card, bank transfer or Apple Pay, and you withdraw to your bank account when you want to. Balances and payments are in USDC, a digital dollar designed to stay worth $1.</p>
            </div>
            <ul className={s.methods}>
              {METHODS.map((m) => <li key={m.label}><Icon name={m.icon} />{m.label}</li>)}
            </ul>
          </div>
        </section>

        <section className={s.social}>
          <div className={s.socialInner}>
            <FeedCard />
            <div>
              <div className={s.hands}><Flo pose="hands" label="Two otters holding hands" /></div>
              <h2 className={s.h2}>Fans bring fans.</h2>
              <p className={s.lead}>When someone tips or subscribes, their connections see it in the Social feed, so word about your page spreads on its own. Private profiles stay private, and only accepted connections see each other&apos;s activity.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter source="footer" />
    </div>
  );
}
