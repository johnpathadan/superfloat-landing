import type { CSSProperties, ReactNode } from "react";

import { ICONS, type IconName } from "./icons";
import {
  coinXml,
  coverXml,
  floLayers,
  personXml,
  shellXml,
  svgDoc,
  type CoverLook,
  type Expression,
  type PersonLook,
  type Pose,
} from "./parts";
import s from "./landing.module.css";

/** The artwork below is fixed strings from parts.ts and never includes user input. */
function Svg({ xml, className, style }: { xml: string; className?: string; style?: CSSProperties }) {
  return <span className={className ?? s.layer} style={style} dangerouslySetInnerHTML={{ __html: xml }} />;
}

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const xml = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
  return <Svg xml={xml} className={s.icon} />;
}

/** Flo is drawn in layers so the coin sits between body and paws, and the eyes can blink without script. */
export function Flo({ pose = "float", ex = "open", coin = true, label = "Flo the otter" }: { pose?: Pose; ex?: Expression; coin?: boolean; label?: string }) {
  const f = floLayers(pose, coin);
  const [w, h] = f.box;
  const canBlink = ex === "open" && pose !== "sleep" && pose !== "cheer" && pose !== "hands";
  return (
    <span className={s.flo} style={{ aspectRatio: `${w} / ${h}` }} role="img" aria-label={label}>
      {f.base ? <Svg xml={svgDoc(w, h, f.base)} /> : null}
      {f.coin ? (
        <Svg
          xml={coinXml(f.coin.r)}
          className={f.coin.motion === "toss" ? s.coinToss : s.coinFloat}
          style={{ left: `${((f.coin.x - f.coin.r) / w) * 100}%`, top: `${((f.coin.y - f.coin.r) / h) * 100}%`, width: `${((f.coin.r * 2) / w) * 100}%` }}
        />
      ) : null}
      <Svg xml={svgDoc(w, h, f.top(ex))} />
      {canBlink ? <Svg xml={svgDoc(w, h, f.top("blink"))} className={s.blink} /> : null}
      {f.arm ? (
        <Svg
          xml={svgDoc(w, h, f.arm.xml)}
          className={s.arm}
          style={{ transformOrigin: `${(f.arm.origin[0] / w) * 100}% ${(f.arm.origin[1] / h) * 100}%` }}
        />
      ) : null}
      {f.sleeping ? (
        <>
          <span className={s.zed} style={{ left: "37%", top: "2%" }}>z</span>
          <span className={s.zed} style={{ left: "46%", top: "-6%", fontSize: "0.72em", animationDelay: "1s" }}>z</span>
        </>
      ) : null}
    </span>
  );
}

const WAVE = (() => {
  let d = "M0 9 Q12.5 0 25 9";
  for (let x = 50; x <= 400; x += 25) d += ` T${x} 9`;
  return `${d} V40 H0 Z`;
})();

function Wave({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 400 18" preserveAspectRatio="none" aria-hidden="true">
      <path d={WAVE} />
    </svg>
  );
}

/** Children float between the back and front waves. */
export function Water({ className, style, children, over }: { className?: string; style?: CSSProperties; children?: ReactNode; over?: ReactNode }) {
  return (
    <div className={`${s.water} ${className ?? ""}`} style={style}>
      <Wave className={s.waveBack} />
      <div className={s.fillBack} />
      {children}
      <Wave className={s.waveFront} />
      <div className={s.fillFront} />
      {over}
    </div>
  );
}

export function Shell({ name }: { name: string }) {
  return <Svg xml={shellXml(name)} className={s.shell} />;
}

const LOOKS: Record<string, PersonLook | CoverLook> = {
  me: { bg: "#FFB877", skin: "#C98F6B", hair: "#20140F", style: "short", top: "#0E6670" },
  sneha: { bg: "#F2777A", skin: "#B97C5B", hair: "#1E1412", style: "long", top: "#FCE9C6" },
  sam: { bg: "#7FCDBB", skin: "#E8BE9A", hair: "#6A3F24", style: "wave", top: "#26547C" },
  sara: { bg: "#F7C948", skin: "#8C5A3C", hair: "#201410", style: "curly", top: "#F4F8EE" },
  david: { bg: "#6C8CE0", skin: "#E2B48F", hair: "#2E2019", style: "beard", top: "#FCE9C6" },
  ana: { bg: "#9FD8D2", skin: "#E6BB96", hair: "#7B3F21", style: "bob", top: "#7A3E8E" },
  theo: { bg: "#F4D6A0", skin: "#EFC8A8", hair: "#B58A3C", style: "wave", top: "#26547C" },
  lovecraft: { bg: "#3E2C6B", fg: "#F7C948", g: "book" },
  startup: { bg: "#F4F8EE", fg: "#0E6670", g: "mic" },
  clay: { bg: "#B4583A", fg: "#FCE9C6", g: "vase" },
  borderbox: { bg: "#26547C", fg: "#9FD8D2", g: "box" },
  fieldnotes: { bg: "#2B2F6B", fg: "#F7C948", g: "note" },
};

/** People are circles and pages are rounded squares, the same rule as the app. */
export function Thumb({ id, size = 48 }: { id: keyof typeof LOOKS; size?: number }) {
  const look = LOOKS[id];
  const page = "g" in look;
  return (
    <Svg
      xml={page ? coverXml(look) : personXml(look)}
      className={s.thumb}
      style={{ width: size, height: size, borderRadius: page ? size * 0.24 : "50%" }}
    />
  );
}
