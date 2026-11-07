import type { Metadata, Viewport } from "next";
import Link from "next/link";

import { Flo, Icon, Thumb, TickerTile, Water } from "../_landing/art";
import { BundleBuilder } from "../_landing/bundle-builder";
import { pageClass, SiteFooter, SiteNav } from "../_landing/site";
import type { Ticker } from "../_landing/stocks";
import { WaitlistButton } from "../_landing/waitlist-button";
import s from "../_landing/landing.module.css";
import type { IconName } from "../_landing/icons";

export const metadata: Metadata = {
  title: "Create a bundle on Superfloat",
  description: "Build a bundle of 2 to 7 stocks, set a dollar amount for each, and let people invest alongside you.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const STEPS = [
  { title: "Sign in", body: "Use email, Google or MetaMask. Your wallet is created for you." },
  { title: "Build your bundle", body: "Pick 2 to 7 stocks, set a dollar amount for each and give it a name." },
  { title: "Publish and share", body: "Your bundle gets a public page with your name on it and its own ranking." },
];

const VERSIONS: { v: number; date: string; note: string; legs: Ticker[]; current?: boolean }[] = [
  { v: 2, date: "From 3 Oct 2026", note: "Added Microsoft", legs: ["NVDA", "AAPL", "GOOGL", "MSFT"], current: true },
  { v: 1, date: "4 Mar to 2 Oct 2026", note: "First version", legs: ["NVDA", "AAPL", "GOOGL"] },
];

const RULES: { icon: IconName; title: string; body: string }[] = [
  { icon: "check", title: "Investors say yes first", body: "When you publish a new version, existing plans pause until each investor approves it." },
  { icon: "shield", title: "Nobody's stocks are sold", body: "A change only affects future purchases. What people already bought stays in their wallets." },
  { icon: "clock", title: "The record can't be edited", body: "Every version keeps its dates and its results. Rankings never backdate a change." },
];

export default function Creators() {
  return (
    <div className={pageClass}>
      <section className={s.subHero} aria-labelledby="creators-title">
        <span className={s.heroSun} />
        <SiteNav current="creators" />
        <div className={s.heroCopy}>
          <h1 id="creators-title">Share how you <em>invest</em>.</h1>
          <p>Build a bundle of stocks, set a dollar amount for each, and let people invest alongside you.</p>
          <WaitlistButton source="creators-hero" interest="create" />
        </div>
        <Water className={s.subWater}>
          <div className={s.subFlo}><div className={s.bob}><Flo pose="wave" label="Flo the otter, waving" /></div></div>
        </Water>
      </section>

      <main>
        <section className={s.community} aria-labelledby="build-title">
          <div className={s.communityInner}>
            <div>
              <h2 id="build-title" className={s.h2}>Try building one.</h2>
              <p className={s.lead}>A bundle is a list of 2 to 7 stocks with a dollar amount for each. Those amounts add up to one ticket, and investors buy as many tickets as they want.</p>
              <ol className={`${s.steps} ${s.stepsLight}`}>
                {STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}
              </ol>
            </div>
            <BundleBuilder />
          </div>
        </section>

        <section className={s.how} aria-labelledby="versions-title">
          <div className={s.howInner}>
            <div>
              <h2 id="versions-title" className={s.h2}>Change the mix. Keep the record.</h2>
              <p className={s.lead}>Markets move and so do your views. Publish a new version whenever you like, and Superfloat keeps every earlier one exactly as it was.</p>
              <ul className={`${s.perks} ${s.perksDark}`}>
                {RULES.map((r) => (
                  <li key={r.title}><Icon name={r.icon} /><div><strong>{r.title}</strong><span>{r.body}</span></div></li>
                ))}
              </ul>
            </div>
            <div className={s.pageCard}>
              <div className={s.pageHead}>
                <Thumb id="titans" size={56} />
                <div><strong>Sample Bundle</strong><span>by @anacosta · version history</span></div>
              </div>
              <ol className={s.versions}>
                {VERSIONS.map((v) => (
                  <li key={v.v} className={v.current ? s.versionNow : undefined}>
                    <span className={s.versionTag}>v{v.v}</span>
                    <span className={s.rowText}>
                      <strong>{v.note}</strong>
                      <span>{v.date}</span>
                    </span>
                    <span className={s.versionLegs}>{v.legs.map((t) => <TickerTile key={t} ticker={t} size={22} />)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={s.social} aria-labelledby="archive-title">
          <div className={s.walletsCopy}>
            <h2 id="archive-title" className={s.h2}>Done with a bundle? Archive it.</h2>
            <p className={s.lead}>Archiving stops new purchases and pauses everyone&apos;s plans. Investors keep every stock they bought, and the bundle&apos;s page and history stay up for anyone to look back on.</p>
            <p className={s.lead}>Want to see what investors see? <Link href="/" className={s.inlineLinkLight}>Explore Superfloat for investors</Link>.</p>
          </div>
        </section>
      </main>

      <SiteFooter source="creators" interest="create" title="Your strategy, out in the open." />
    </div>
  );
}
