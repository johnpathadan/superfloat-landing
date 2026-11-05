import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { Flo, Icon, Shell, Thumb, Water } from "../_landing/art";
import { FeedCard, METHODS, PhoneHome, SkyCard } from "../_landing/mockups";
import { pageClass, SiteFooter, SiteNav } from "../_landing/site";
import { WaitlistButton } from "../_landing/waitlist-button";
import s from "../_landing/landing.module.css";

export const metadata: Metadata = {
  title: "Superfloat for individuals",
  description: "Pay and request money from friends by their @name, for free, and back the creators you love.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const STEPS = [
  { title: "Find them by @name", body: "Search for a username or scan their code. No long wallet addresses to copy." },
  { title: "Slide to send", body: "Pick an amount and slide. Money only moves when you mean it." },
  { title: "It's there in seconds", body: "Payments settle in digital dollars on Base, and every one shows up in your history." },
];

const FEES = [
  { figure: "Free", label: "for payments between people" },
  { figure: "$0", label: "network fees for you. Superfloat covers them" },
];

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

export default function Individuals() {
  return (
    <div className={pageClass}>
      <section className={s.subHero} aria-labelledby="individuals-title">
        <span className={s.heroSun} />
        <SiteNav current="individuals" />
        <div className={s.heroCopy}>
          <h1 id="individuals-title">Send money to anyone by their <em>@name</em>.</h1>
          <p>Pay and request money from friends in seconds. Payments between people are free.</p>
          <WaitlistButton source="individuals" />
        </div>
        <Water className={s.subWater}>
          <div className={s.subFlo}><div className={s.bob}><Flo /></div></div>
        </Water>
      </section>

      <main>
        <section className={s.how} aria-labelledby="pay-title">
          <div className={s.howInner}>
            <PhoneHome />
            <div>
              <h2 id="pay-title" className={s.h2}>Pay people, not wallet addresses.</h2>
              <p className={s.lead}>Sign in with a social login and your wallet is created for you with Coinbase embedded wallets. Then pay or request money from anyone by their @username or QR code.</p>
              <ol className={s.steps}>
                {STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}
              </ol>
              <ul className={s.fees}>
                {FEES.map((f) => <li key={f.label}><strong>{f.figure}</strong><span>{f.label}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className={s.wallets} aria-labelledby="private-title">
          <div className={s.walletsCopy}>
            <h2 id="private-title" className={s.h2}>Your wallet stays yours.</h2>
            <p className={s.lead}>Your personal wallet stays private. Became popular? Create a tips page so strangers can support you without touching it. Each page gets its own wallet, and you switch between them from the same login.</p>
          </div>
          <div className={s.fan}>
            <SkyCard sky={s.dusk} kind="Personal" name="@johnpathadan" amount="120" pose="float" />
            <SkyCard sky={s.morning} kind="Tips page" name="@snehasingh_drummer" amount="1,250" pose="float" />
          </div>
        </section>

        <section className={s.social} aria-labelledby="friends-title">
          <div className={s.socialInner}>
            <FeedCard />
            <div>
              <div className={s.hands}><Flo pose="hands" label="Two otters holding hands" /></div>
              <h2 id="friends-title" className={s.h2}>Better with friends.</h2>
              <p className={s.lead}>Private profiles stay private. To pay or request money from someone, you send a connection request and they accept it. Your Social feed then shows what your connections tip and subscribe to.</p>
            </div>
          </div>
        </section>

        <section className={s.community} aria-labelledby="back-title">
          <div className={s.communityInner}>
            <div>
              <h2 id="back-title" className={s.h2}>Back the creators you love.</h2>
              <p className={s.lead}>Find a creator&apos;s community page by @name, then leave a one-time tip or subscribe weekly or monthly at an amount you choose.</p>
              <div className={s.ladder}>
                {TIERS.map((tier) => <div key={tier}><Shell name={tier} /><span>{tier}</span></div>)}
              </div>
              <p className={s.note}>Your tier grows with your total support, and every tier you complete earns a badge.</p>
              <p className={s.note}><Link href="/" className={s.inlineLink}>Make things yourself? See Superfloat for creators</Link></p>
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

        <section className={s.money} aria-labelledby="money-title">
          <div className={s.moneyInner}>
            <div>
              <h2 id="money-title" className={s.h2}>Easy in. Easy out.</h2>
              <p className={s.lead}>Add money the way you already pay, and withdraw to your bank account when you want to. Your balance is in USDC, a digital dollar designed to stay worth $1.</p>
            </div>
            <ul className={s.methods}>
              {METHODS.map((m) => <li key={m.label}><Icon name={m.icon} />{m.label}</li>)}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter source="individuals" title="Free between friends" />
    </div>
  );
}
