import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";

import { Flo, Icon, Shell, Thumb, Water } from "./_landing/art";
import { HeroSea } from "./_landing/hero-sea";
import { WaitlistButton } from "./_landing/waitlist-button";
import s from "./_landing/landing.module.css";
import type { IconName } from "./_landing/icons";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-fraunces", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Superfloat",
  description: "Send USDC to anyone by their @name, tip the people you follow and back the communities you love, on Base.",
};

export const viewport: Viewport = { themeColor: "#FFC389" };

const STEPS = [
  { title: "Find them by @name", body: "Search for a username or scan their code. No long wallet addresses to copy." },
  { title: "Slide to send", body: "Pick an amount and slide. Money only moves when you mean it." },
  { title: "It arrives in USDC", body: "Payments settle in USDC on Base, and every one shows up in your transaction history." },
];

const TIERS = ["Bronze", "Silver", "Gold", "Platinum"];

const METHODS: { icon: IconName; label: string }[] = [
  { icon: "card", label: "Debit or credit card" },
  { icon: "bank", label: "Bank transfer" },
  { icon: "phone", label: "Apple Pay" },
  { icon: "coin", label: "Coinbase balance" },
];

const PRICES = [
  { kind: "Payments between people", figure: "Free", body: "Pay or request USDC from your connections at no charge.", fee: false },
  { kind: "Tips and subscriptions", figure: "1.5%", body: "On each tip and subscription payment to a tips page or community page.", fee: true },
];

function Wordmark({ light }: { light?: boolean }) {
  return <span className={`${s.wordmark} ${light ? s.wordmarkLight : ""}`}>superfl<i>o</i>at</span>;
}

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
    <div className={s.phone} role="img" aria-label="The Superfloat home screen, showing a balance of 120 USDC and upcoming payments">
      <div className={s.phoneScreen}>
        <div className={s.phoneTop}>
          <Thumb id="me" size={36} />
          <span className={s.bell}><Icon name="bell" size={18} /></span>
        </div>
        <div className={s.miniCard}>
          <span className={s.miniSun} />
          <span className={s.miniLabel}>Your Balance</span>
          <span className={s.miniAmount}>120 <small>USDC</small></span>
          <Water className={s.miniWater}><div className={s.miniFlo}><div className={s.bob}><Flo /></div></div></Water>
        </div>
        <div className={s.tiles}>
          {([["deposit", "Deposit"], ["send", "Send"], ["withdraw", "Withdraw"], ["scan", "Scan QR"]] as [IconName, string][]).map(([icon, label]) => (
            <span key={label} className={s.tile}><Icon name={icon} size={18} />{label}</span>
          ))}
        </div>
        <p className={s.phoneHead}>Your upcoming payments</p>
        <Row id="sara" title="Sara Toast" sub="User · every month" right="45 USDC" note="Sun, 1 Nov" />
        <Row id="lovecraft" title="The Lovecraft" sub="Community · every month" right="5 USDC" note="Wed, 4 Nov" />
        <Row id="startup" title="Startup Podcast" sub="Community · every week" right="5 USDC" note="Fri, 6 Nov" />
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
      <span className={s.skyAmount}>{amount} <small>USDC</small></span>
      <Water className={s.skyWater}><div className={s.miniFlo}><div className={s.bob}><Flo pose={pose} /></div></div></Water>
    </article>
  );
}

export default function Home() {
  return (
    <div className={`${s.page} ${fraunces.variable} ${figtree.variable}`}>
      <section id="top" className={s.hero} aria-labelledby="hero-title">
        <span className={s.heroSun} />
        <header className={s.nav}>
          <a href="#top" aria-label="Superfloat home"><Wordmark /></a>
          <nav aria-label="Page sections">
            <a href="#how">How it works</a>
            <a href="#communities">Communities</a>
            <a href="#wallets">Wallets</a>
            <a href="#pricing">Pricing</a>
          </nav>
        </header>
        <div className={s.heroCopy}>
          <h1 id="hero-title">Send USDC to anyone by their <em>@name</em>.</h1>
          <p>Superfloat is a social app on Base. Pay your friends, tip the people you follow and back the communities you love.</p>
          <WaitlistButton source="hero" />
        </div>
        <HeroSea />
      </section>

      <main>
        <section id="how" className={s.how}>
          <div className={s.howInner}>
            <PhoneHome />
            <div>
              <h2 className={s.h2}>Pay people, not wallet addresses.</h2>
              <p className={s.lead}>Sign in with a social login and your wallet is created for you with Coinbase embedded wallets. Then pick a unique @username, and anyone can find you.</p>
              <ol className={s.steps}>
                {STEPS.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>)}
              </ol>
            </div>
          </div>
        </section>

        <section id="communities" className={s.community}>
          <div className={s.communityInner}>
            <div>
              <h2 className={s.h2}>Back the people who make things you love.</h2>
              <p className={s.lead}>Anyone can start a community page and ask for support in USDC. Fans leave a one-time tip or subscribe, and choose how much to give each week or month.</p>
              <div className={s.ladder}>
                {TIERS.map((tier) => <div key={tier}><Shell name={tier} /><span>{tier}</span></div>)}
              </div>
              <p className={s.note}>Tiers follow your total contribution, and every tier you complete earns a badge.</p>
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
                <span>85/100 USDC donated</span>
                <i className={s.bar}><b style={{ width: "85%" }} /></i>
              </div>
              <p className={s.topHead}>Top contributors</p>
              <Row id="ana" title="Ana Costa" sub="Platinum tier" right="512 USDC" note="1st" />
              <Row id="theo" title="Theo Brandt" sub="Gold tier" right="340 USDC" note="2nd" />
            </div>
          </div>
        </section>

        <section id="wallets" className={s.wallets}>
          <div className={s.walletsCopy}>
            <h2 className={s.h2}>One sign-in. Separate wallets.</h2>
            <p className={s.lead}>Your personal wallet stays private. Became popular? Create a tips page so strangers can support you without touching it. Tips and community pages each get their own wallet, and you switch between them from the same login.</p>
          </div>
          <div className={s.fan}>
            <SkyCard sky={s.morning} kind="Tips page" name="@snehasingh_drummer" amount="1,250" pose="float" />
            <SkyCard sky={s.dusk} kind="Personal" name="@johnpathadan" amount="120" pose="float" />
            <SkyCard sky={s.night} kind="Community page" name="@fieldnotes" amount="342.50" pose="float" />
          </div>
        </section>

        <section className={s.social}>
          <div className={s.socialInner}>
            <div className={s.feed}>
              <div className={s.feedWho}><Thumb id="sam" size={36} /><strong>Sam Smith</strong><span>2h</span></div>
              <div className={s.tier}>
                <span>Sam is now a</span>
                <strong className={s.tierSmall}>Gold tier subscriber of Clay</strong>
                <span>412/500 USDC donated</span>
                <i className={s.bar}><b style={{ width: "82%" }} /></i>
              </div>
              <div className={s.feedLine}>
                <span className={s.pair}><Thumb id="sneha" size={36} /><span><Thumb id="borderbox" size={36} /></span></span>
                <p><strong>Sneha Singh</strong> started a subscription to <strong>Border Box</strong></p>
              </div>
              <div className={s.feedLine}>
                <span className={s.pair}><Thumb id="david" size={36} /><span><Thumb id="clay" size={36} /></span></span>
                <p><strong>David Smith</strong> gave a 5 USDC tip to <strong>Clay</strong></p>
              </div>
            </div>
            <div>
              <div className={s.hands}><Flo pose="hands" label="Two otters holding hands" /></div>
              <h2 className={s.h2}>Better with friends.</h2>
              <p className={s.lead}>Private profiles stay private. To pay or request money from someone, you send a connection request and they accept it. Your Social feed then shows what your connections subscribe to and tip.</p>
            </div>
          </div>
        </section>

        <section className={s.money}>
          <div className={s.moneyInner}>
            <div>
              <h2 className={s.h2}>Easy in. Easy out.</h2>
              <p className={s.lead}>Add USDC the way you already pay, and withdraw to your bank account when you want to. If you bring a wallet you already have, Superfloat only shows the USDC in it.</p>
            </div>
            <ul className={s.methods}>
              {METHODS.map((m) => <li key={m.label}><Icon name={m.icon} />{m.label}</li>)}
            </ul>
          </div>
        </section>

        <section id="pricing" className={s.pricing} aria-labelledby="pricing-title">
          <div className={s.pricingInner}>
            <div>
              <h2 id="pricing-title" className={s.h2}>Free between friends.</h2>
              <p className={s.lead}>Superfloat only charges when fans back the people and communities they love.</p>
            </div>
            <ul className={s.prices}>
              {PRICES.map((p) => (
                <li key={p.kind} className={`${s.price} ${p.fee ? s.priceFee : ""}`}>
                  <span className={s.priceKind}>{p.kind}</span>
                  <strong className={s.priceFigure}>{p.figure}</strong>
                  <span className={s.priceBody}>{p.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className={s.close}>
        <span className={s.moon} />
        <div className={s.closeCopy}>
          <h2>Made to support creators</h2>
          <p className={s.soon}>Coming soon to iOS and Android. Join the waitlist to hear first.</p>
          <WaitlistButton source="footer" />
        </div>
        <Water
          className={s.closeWater}
          over={
            <div className={s.foot}>
              <Wordmark light />
              <span>Built on Base with USDC</span>
              <span>© {new Date().getFullYear()} Superfloat</span>
            </div>
          }>
          <div className={s.closeFlo}><div className={s.bob}><Flo pose="sleep" label="Flo the otter, asleep in kelp" /></div></div>
        </Water>
      </footer>
    </div>
  );
}
