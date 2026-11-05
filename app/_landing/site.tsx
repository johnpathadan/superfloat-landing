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

/** Section links point at the home page so they work from every page. */
export function SiteNav() {
  return (
    <header className={s.nav}>
      <Link href="/" aria-label="Superfloat home"><Wordmark /></Link>
      <nav aria-label="Site">
        <a href="/#communities">Community pages</a>
        <a href="/#savings">Fees</a>
        <a href="/#start">Get started</a>
        <Link href="/how-it-works" className={s.navPage}>How it works</Link>
      </nav>
    </header>
  );
}

export function SiteFooter({ source }: { source: string }) {
  return (
    <footer className={s.close}>
      <span className={s.moon} />
      <div className={s.closeCopy}>
        <h2>Made to support creators</h2>
        <p className={s.soon}>Coming soon to iOS and Android. Get early access to hear first.</p>
        <WaitlistButton source={source} />
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
