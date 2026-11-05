import { Flo, Icon, Thumb, Water } from "./art";
import s from "./landing.module.css";
import type { IconName } from "./icons";

/** The ways people add money, shared by the creator and individual pages. */
export const METHODS: { icon: IconName; label: string }[] = [
  { icon: "card", label: "Debit or credit card" },
  { icon: "bank", label: "Bank transfer" },
  { icon: "phone", label: "Apple Pay" },
  { icon: "coin", label: "Coinbase balance" },
];

export function Row({ id, title, sub, right, note }: { id: Parameters<typeof Thumb>[0]["id"]; title: string; sub: string; right: string; note: string }) {
  return (
    <div className={s.row}>
      <Thumb id={id} size={40} />
      <div className={s.rowText}><strong>{title}</strong><span>{sub}</span></div>
      <div className={s.rowAmt}><strong>{right}</strong><span>{note}</span></div>
    </div>
  );
}

export function PhoneHome() {
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

export function SkyCard({ sky, name, kind, amount, pose }: { sky: string; name: string; kind: string; amount: string; pose: "float" | "sleep" }) {
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

/** A Social feed snippet: what someone's connections tipped and subscribed to. */
export function FeedCard() {
  return (
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
  );
}
