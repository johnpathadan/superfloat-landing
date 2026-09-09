import Image from "next/image";

export default function Home() {
  return (
    <main className="landing-shell">
      <div className="landing-content">
        <header className="brand-header">
          <a className="brand" href="#top" aria-label="SuperFloat home">
            <span className="brand-mark" aria-hidden="true">
              <Image
                src="/superfloat-mark.png"
                alt=""
                width={56}
                height={56}
                sizes="56px"
                priority
              />
            </span>
            <span className="brand-name">SuperFloat</span>
          </a>
        </header>

        <section id="top" className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            A billion people on-chain, through safety-prioritized investment
            opportunity.
          </h1>
        </section>
      </div>
    </main>
  );
}
