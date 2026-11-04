import type { Metadata, Viewport } from "next";

import { Flo, Icon, Shell, Thumb, Water } from "./_landing/art";
import { HeroSea } from "./_landing/hero-sea";
import { SavingsCalculator } from "./_landing/savings-calculator";
import { pageClass, SiteFooter, SiteNav } from "./_landing/site";
import { WaitlistButton } from "./_landing/waitlist-button";
import s from "./_landing/landing.module.css";
import type { IconName } from "./_landing/icons";

export const metadata: Metadata = {
  title: "Superfloat",
  description: "Community pages for creators. Fans tip and subscribe in digital dollars, and Superfloat takes just 1.5%.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const PERKS: { icon: IconName; title: string; body: string }[] = [
  { icon: "tip", title: "Tips and subscriptions", body: "One-time tips, or weekly and monthly support at an amount each fan chooses." },
  { icon: "wallet", title: "Its own wallet", body: "Page earnings never mix with your personal money." },
  { icon: "share", title: "A link and a QR code", body: "Share your page anywhere your fans already follow you." },
];

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

const FEES = [
  { figure: "1.5%", label: "on each tip and subscription" },
  { figure: "Free", label: "for payments between people" },
];

const STEPS = [
  { title: "Sign in", body: "Use a social login and your wallet is created for you with Coinbase embedded wallets." },
  { title: "Create your page", body: "Pick an @name, describe what you make and set your tiers." },
  { title: "Share your link", body: "Post it in your bio, your videos or your newsletter, and start getting support." },
];

const METHODS: { icon: IconName; label: string }[] = [
  { icon: "card", label: "Debit or credit card" },
  { icon: "bank", label: "Bank transfer" },
  { icon: "phone", label: "Apple Pay" },
  { icon: "coin", label: "Coinbase balance" },
];

function Row({ id, title, sub, right, note }: { id: Parameters<typeof Thumb>[0]["id"]; title: string; sub: string; right: string; note: string }) {
  return (
    <div className={s.row}>
      <Thumb id={id} size={40} />
      <div className={s.rowText}><strong>{title}</strong><span>{sub}</span></div>
      <div className={s.rowAmt}><strong>{right}</strong><span>{note}</span></div>
    </div>
  );
}

function PhoneHome() {
  return (
    <div className={s.phone} role="img" aria-label="The Superfloat home screen, showing a balance of $120 and upcoming payments">
      <div className={s.phoneScreen}>
        <div className={s.phoneTop}>
          <Thumb id="me" size={36} />
          <span className={s.bell}><Icon name="bell" size={18} /></span>
        </div>
        <div className={s.miniCard}>
          <span className={s.miniSun} />
          <span className={s.miniLabel}>Your Balance</span>
          <span className={s.miniAmount}>$120</span>
          <Water className={s.miniWater}><div className={s.miniFlo}><div className={s.bob}><Flo /></div></div></Water>
        </div>
        <div className={s.tiles}>
          {([["deposit", "Deposit"], ["send", "Send"], ["withdraw", "Withdraw"], ["scan", "Scan QR"]] as [IconName, string][]).map(([icon, label]) => (
            <span key={label} className={s.tile}><Icon name={icon} size={18} />{label}</span>
          ))}
        </div>
        <p className={s.phoneHead}>Your upcoming payments</p>
        <Row id="sara" title="Sara Toast" sub="User · every month" right="$45" note="Sun, 1 Nov" />
        <Row id="lovecraft" title="The Lovecraft" sub="Community · every month" right="$5" note="Wed, 4 Nov" />
        <Row id="startup" title="Startup Podcast" sub="Community · every week" right="$5" note="Fri, 6 Nov" />
      </div>
    </div>
  );
}

function SkyCard({ sky, name, kind, amount, pose }: { sky: string; name: string; kind: string; amount: string; pose: "float" | "sleep" }) {
  return (
    <article className={`${s.sky} ${sky}`}>
      <span className={s.skySun} />
      <span className={s.skyKind}>{kind}</span>
      <strong className={s.skyName}>{name}</strong>
      <span className={s.skyAmount}>${amount}</span>
      <Water className={s.skyWater}><div className={s.miniFlo}><div className={s.bob}><Flo pose={pose} /></div></div></Water>
    </article>
  );
}

export default function Home() {
  return (
    <div className={pageClass}>
      <section id="top" className={s.hero} aria-labelledby="hero-title">
        <span className={s.heroSun} />
        <SiteNav />
        <div className={s.heroCopy}>
          <h1 id="hero-title">Keep more of what your <em>fans</em> give.</h1>
          <p>Superfloat gives creators a community page where fans tip and subscribe. We take 1.5%, a fraction of what most platforms keep.</p>
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
              <p className={s.lead}>Most creator platforms keep a share of every tip and subscription, often 5 to 12%, and some take 30% or more. Superfloat takes 1.5%, so more of every payment reaches you.</p>
              <ul className={s.fees}>
                {FEES.map((f) => <li key={f.label}><strong>{f.figure}</strong><span>{f.label}</span></li>)}
              </ul>
            </div>
            <SavingsCalculator />
          </div>
          <p className={s.calcNote}>An estimate.</p>
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
            <div className={s.feed}>
              <div className={s.feedWho}><Thumb id="sam" size={36} /><strong>Sam Smith</strong><span>2h</span></div>
              <div className={s.tier}>
                <span>Sam is now a</span>
                <strong className={s.tierSmall}>Gold tier subscriber of Clay</strong>
                <span>$412 of $500 donated</span>
                <i className={s.bar}><b style={{ width: "82%" }} /></i>
              </div>
              <div className={s.feedLine}>
                <span className={s.pair}><Thumb id="sneha" size={36} /><span><Thumb id="borderbox" size={36} /></span></span>
                <p><strong>Sneha Singh</strong> started a subscription to <strong>Border Box</strong></p>
              </div>
              <div className={s.feedLine}>
                <span className={s.pair}><Thumb id="david" size={36} /><span><Thumb id="clay" size={36} /></span></span>
                <p><strong>David Smith</strong> gave a $5 tip to <strong>Clay</strong></p>
              </div>
            </div>
            <div>
              <div className={s.hands}><Flo pose="hands" label="Two otters holding hands" /></div>
              <h2 className={s.h2}>Fans bring fans.</h2>
              <p className={s.lead}>When someone tips or subscribes, their connections see it in the Social feed, so word about your page spreads on its own. Private profiles stay private, and only accepted connections see each other&apos;s activity.</p>
            </div>
          </div>
        </section>

        <section id="payments" className={s.how}>
          <div className={s.howInner}>
            <PhoneHome />
            <div>
              <h2 className={s.h2}>Pay friends by @name, too.</h2>
              <p className={s.lead}>Superfloat is also a wallet for everyday payments. Find anyone by their @username or QR code, then pay or request money. Payments between people are free.</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter source="footer" />
    </div>
  );
}
