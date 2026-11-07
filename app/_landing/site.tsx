import { Figtree, Fraunces } from "next/font/google";
import Link from "next/link";

import { Flo, Water } from "./art";
import { WaitlistButton } from "./waitlist-button";
import s from "./landing.module.css";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-fraunces", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

/** Class names for the wrapper of every page: shared tokens and both fonts. */
export const pageClass = `${s.page} ${fraunces.variable} ${figtree.variable}`;

export function Wordmark({ light }: { light?: boolean }) {
  return <span className={`${s.wordmark} ${light ? s.wordmarkLight : ""}`}>superfl<i>o</i>at</span>;
}

const PAGES = [
  { key: "invest", href: "/", label: "Invest" },
  { key: "creators", href: "/creators", label: "Create a bundle" },
  // Hidden from the header for now. The page itself still works at /how-it-works.
  // { key: "how", href: "/how-it-works", label: "How it works" },
] as const;

/** "how" stays a valid key so the How it works page can still render the header. */
export type PageKey = (typeof PAGES)[number]["key"] | "how";

/** The header on every page. `current` underlines the page you're on. */
export function SiteNav({ current }: { current: PageKey }) {
  return (
    <header className={s.nav}>
      <Link href="/" aria-label="Superfloat home"><Wordmark /></Link>
      <nav aria-label="Site">
        {PAGES.map((p) => (
          <Link key={p.key} href={p.href} aria-current={p.key === current ? "page" : undefined}>{p.label}</Link>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter({
  source,
  title = "Discover a portfolio. Invest automatically. Keep every stock.",
  interest,
}: {
  source: string;
  title?: string;
  interest?: "invest" | "create" | "both";
}) {
  return (
    <footer className={s.close}>
      <span className={s.moon} />
      <div className={s.closeCopy}>
        <h2>{title}</h2>
        <p className={s.soon}>Superfloat isn&apos;t open yet. Get early access to hear first.</p>
        <WaitlistButton source={source} interest={interest} />
        <p className={s.fine}>
          Superfloat is in development and doesn&apos;t accept investments yet. It will open country by country, starting outside the
          US, only where it&apos;s allowed. Tokenized stocks are digital tokens that track the price of a company&apos;s shares, and what
          each token gives you depends on the company that issues it. Investing carries risk, and you can get back less than you put
          in. Every bundle, price and return on this site is an illustration. Nothing here is investment advice.
        </p>
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
  );
}
