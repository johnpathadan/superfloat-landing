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
  { key: "creators", href: "/", label: "For creators" },
  { key: "individuals", href: "/individuals", label: "For individuals" },
  { key: "how", href: "/how-it-works", label: "How it works" },
] as const;

export type PageKey = (typeof PAGES)[number]["key"];

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

export function SiteFooter({ source, title = "Made to support creators" }: { source: string; title?: string }) {
  return (
    <footer className={s.close}>
      <span className={s.moon} />
      <div className={s.closeCopy}>
        <h2>{title}</h2>
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
