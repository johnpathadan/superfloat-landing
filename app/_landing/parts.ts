/** Flo and every other drawing, kept as SVG source so one shared head keeps the character consistent. */
const FUR = { fur: '#7B4F37', dark: '#573523', light: '#A87A5A', cream: '#F4E5CF', ink: '#2A1810', blush: '#FF8E6E' };

export type Expression = 'open' | 'blink' | 'happy' | 'sleep' | 'worry';
export type Pose = 'float' | 'sleep' | 'wave' | 'cheer' | 'sad' | 'peek' | 'hands';

export function floHead(x: number, y: number, s = 1, rot = 0, ex: Expression = 'open') {
  const eyes = {
    open: `<circle cx="35" cy="56" r="5.8" fill="${FUR.ink}"/><circle cx="65" cy="56" r="5.8" fill="${FUR.ink}"/><circle cx="37" cy="53.6" r="1.9" fill="#fff"/><circle cx="67" cy="53.6" r="1.9" fill="#fff"/>`,
    blink: `<path d="M29 56 H41 M59 56 H71" stroke="${FUR.ink}" stroke-width="3.4" stroke-linecap="round"/>`,
    happy: `<path d="M28 58 Q35 48 42 58M58 58 Q65 48 72 58" fill="none" stroke="${FUR.ink}" stroke-width="3.4" stroke-linecap="round"/>`,
    sleep: `<path d="M28 54 Q35 61 42 54M58 54 Q65 61 72 54" fill="none" stroke="${FUR.ink}" stroke-width="3.4" stroke-linecap="round"/>`,
    worry: `<circle cx="35" cy="57" r="5.2" fill="${FUR.ink}"/><circle cx="65" cy="57" r="5.2" fill="${FUR.ink}"/><circle cx="36.5" cy="55" r="1.7" fill="#fff"/><circle cx="66.5" cy="55" r="1.7" fill="#fff"/><path d="M26 46 L40 42M74 46 L60 42" stroke="${FUR.ink}" stroke-width="2.8" stroke-linecap="round"/>`,
  }[ex];
  const mouth = ex === 'happy'
    ? `<path d="M41 76 Q50 90 59 76 Z" fill="#C5503E" stroke="${FUR.ink}" stroke-width="2.4" stroke-linejoin="round"/>`
    : ex === 'worry'
      ? `<path d="M50 72 V75 M42 81 Q50 74 58 81" fill="none" stroke="${FUR.ink}" stroke-width="2.4" stroke-linecap="round"/>`
      : `<path d="M50 72 V76 M50 76 Q45 82 39 78 M50 76 Q55 82 61 78" fill="none" stroke="${FUR.ink}" stroke-width="2.4" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s}) translate(-50 -52)">
    <circle cx="19" cy="27" r="10" fill="${FUR.fur}"/><circle cx="81" cy="27" r="10" fill="${FUR.fur}"/>
    <circle cx="19" cy="28" r="5.2" fill="${FUR.dark}"/><circle cx="81" cy="28" r="5.2" fill="${FUR.dark}"/>
    <path d="M50 11C76 11 91 30 91 54C91 79 72 93 50 93C28 93 9 79 9 54C9 30 24 11 50 11Z" fill="${FUR.fur}"/>
    <path d="M50 35C62 28 80 35 83 54C86 74 70 90 50 90C30 90 14 74 17 54C20 35 38 28 50 35Z" fill="${FUR.cream}"/>
    <ellipse cx="25" cy="68" rx="7" ry="4.5" fill="${FUR.blush}" opacity=".42"/><ellipse cx="75" cy="68" rx="7" ry="4.5" fill="${FUR.blush}" opacity=".42"/>
    ${eyes}
    <path d="M42 63 Q50 58 58 63 Q58 69 50 72 Q42 69 42 63Z" fill="${FUR.ink}"/>
    ${mouth}
    <path d="M30 70 L13 66M31 75 L15 79M70 70 L87 66M69 75 L85 79" stroke="${FUR.ink}" stroke-width="1.3" stroke-linecap="round" opacity=".42"/>
  </g>`;
}

const floatBody = (feet = true, kelp = false) => `${feet ? `<path d="M170 88C192 84 214 86 218 93C214 101 192 102 168 99Z" fill="${FUR.dark}"/>
  <ellipse cx="193" cy="58" rx="9.5" ry="16" transform="rotate(26 193 58)" fill="${FUR.dark}"/>
  <ellipse cx="176" cy="54" rx="9.5" ry="16" transform="rotate(10 176 54)" fill="${FUR.dark}"/>` : ''}
  <path d="M44 62C60 42 124 40 164 54C188 62 196 80 190 94C150 108 80 108 46 94C33 86 33 73 44 62Z" fill="${FUR.fur}"/>
  <path d="M72 58C100 46 136 50 156 62C166 72 152 88 122 90C94 92 68 82 72 58Z" fill="${FUR.light}"/>
  ${kelp ? `<path d="M60 96C72 60 86 44 98 40C106 70 118 44 132 42C142 62 150 58 160 52C164 74 158 92 150 100C120 106 88 106 60 96Z" fill="#2F8F6B"/><path d="M96 44C92 62 90 80 92 100M132 46C130 64 128 84 128 102" stroke="#1F6F52" stroke-width="2.2" fill="none"/>` : ''}`;
const paws = `<ellipse cx="100" cy="50" rx="9" ry="7.5" fill="${FUR.dark}" transform="rotate(-24 100 50)"/><ellipse cx="132" cy="50" rx="9" ry="7.5" fill="${FUR.dark}" transform="rotate(24 132 50)"/>`;

const armPath = (x1: number, y1: number, x2: number, y2: number) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${FUR.fur}" stroke-width="15" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="9" fill="${FUR.dark}"/>`;
const uprightBody = `<ellipse cx="116" cy="154" rx="30" ry="9" fill="${FUR.dark}"/>
  <path d="M73 58C108 58 122 96 120 132C118 162 28 162 26 132C24 96 38 58 73 58Z" fill="${FUR.fur}"/>
  <ellipse cx="73" cy="122" rx="30" ry="33" fill="${FUR.light}"/>
  <ellipse cx="50" cy="156" rx="15" ry="8" fill="${FUR.dark}"/><ellipse cx="96" cy="156" rx="15" ry="8" fill="${FUR.dark}"/>`;

export type FloLayers = {
  box: [number, number];
  base: string;
  /** Drawn above the coin. Takes the current expression so Flo can blink. */
  top: (ex: Expression) => string;
  coin?: { x: number; y: number; r: number; motion: 'float' | 'toss' };
  arm?: { xml: string; origin: [number, number] };
  sleeping?: boolean;
};

export function floLayers(pose: Pose, withCoin = true): FloLayers {
  switch (pose) {
    case 'float':
      return { box: [226, 120], base: floatBody(), top: (ex) => `${withCoin ? paws : ''}${floHead(55, 46, 0.72, -12, ex)}`, coin: withCoin ? { x: 116, y: 39, r: 13, motion: 'float' } : undefined };
    case 'sleep':
      return { box: [226, 120], base: floatBody(true, true), top: () => floHead(55, 46, 0.72, -12, 'sleep'), sleeping: true };
    case 'wave':
      return { box: [150, 170], base: uprightBody + armPath(40, 100, 50, 126), top: (ex) => floHead(73, 50, 0.86, 0, ex), arm: { xml: armPath(106, 98, 134, 66), origin: [106, 98] } };
    case 'cheer':
      return { box: [150, 170], base: uprightBody + armPath(40, 98, 20, 54) + armPath(106, 98, 126, 54), top: () => floHead(73, 50, 0.86, 0, 'happy'), coin: withCoin ? { x: 73, y: -4, r: 13, motion: 'toss' } : undefined };
    case 'sad':
      return { box: [150, 170], base: uprightBody + armPath(40, 100, 50, 126) + armPath(106, 100, 96, 126), top: () => floHead(73, 50, 0.86, 0, 'worry') };
    case 'peek':
      return { box: [120, 116], base: '', top: (ex) => `${floHead(60, 58, 1, 0, ex)}<ellipse cx="22" cy="100" rx="13" ry="9" fill="${FUR.dark}"/><ellipse cx="98" cy="100" rx="13" ry="9" fill="${FUR.dark}"/>` };
    case 'hands': {
      const one = (ex: Expression) => `${floatBody(false)}${floHead(55, 46, 0.72, -12, ex)}`;
      return {
        box: [400, 124],
        base: '',
        top: () => `<g>${one('happy')}</g><g transform="translate(400 0) scale(-1 1)">${one('happy')}</g>
          <path d="M160 66 Q182 46 196 54M240 66 Q218 46 204 54" stroke="${FUR.fur}" stroke-width="13" fill="none" stroke-linecap="round"/><circle cx="200" cy="54" r="10" fill="${FUR.dark}"/>`,
      };
    }
  }
}
export const svgDoc = (w: number, h: number, inner: string) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

export const coinXml = (r: number) => svgDoc(r * 2, r * 2, `<circle cx="${r}" cy="${r}" r="${r}" fill="#2F7FD6"/><circle cx="${r}" cy="${r}" r="${r - 2.5}" fill="none" stroke="#CFE6FF" stroke-width="1.3"/><path transform="translate(${r} ${r}) scale(${r / 13})" d="M4 -3.4C3.4 -5 1.8 -5.7 0 -5.7C-2.3 -5.7 -4 -4.5 -4 -2.8C-4 1.3 4.3 -.9 4.3 3.1C4.3 4.9 2.4 6 0 6C-2 6 -3.8 5.2 -4.5 3.5M0 -7.8V8" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`);

/* ── Profile pictures ── */
export type PersonLook = { bg: string; skin: string; hair: string; style: 'short' | 'long' | 'curly' | 'bun' | 'wave' | 'bob' | 'beard'; top: string };
export type CoverLook = { bg: string; fg: string; g: keyof typeof GLYPH };

export function personXml(l: PersonLook) {
  const hair = {
    short: `<path d="M29 47C24 12 76 12 71 47C66 36 58 33 50 34C42 33 34 36 29 47Z" fill="${l.hair}"/>`,
    long: `<path d="M26 74C22 30 34 20 50 20S78 30 74 74C70 76 66 76 64 74C70 50 62 36 50 34C38 36 30 50 36 74C34 76 30 76 26 74Z" fill="${l.hair}"/>`,
    curly: `<g fill="${l.hair}"><circle cx="34" cy="34" r="10"/><circle cx="46" cy="26" r="11"/><circle cx="60" cy="27" r="11"/><circle cx="69" cy="37" r="9"/><circle cx="29" cy="45" r="7"/><circle cx="72" cy="47" r="6"/></g>`,
    bun: `<circle cx="50" cy="16" r="9" fill="${l.hair}"/><path d="M29 47C24 13 76 13 71 47C64 34 36 34 29 47Z" fill="${l.hair}"/>`,
    wave: `<path d="M29 50C24 24 42 18 54 21C68 22 76 34 71 50C70 40 62 34 54 38C44 42 36 40 29 50Z" fill="${l.hair}"/>`,
    bob: `<path d="M28 62C22 30 38 21 50 21S78 30 72 62C70 64 66 64 65 62C68 46 60 36 44 36C36 40 32 50 35 62C33 64 30 64 28 62Z" fill="${l.hair}"/>`,
    beard: `<path d="M29 45C24 12 76 12 71 45C65 34 35 34 29 45Z" fill="${l.hair}"/><path d="M31 50C32 72 42 74 50 74S68 72 69 50C66 58 60 60 50 60S34 58 31 50Z" fill="${l.hair}"/>`,
  }[l.style];
  const y = l.style === 'beard' ? 56 : 57;
  return svgDoc(100, 100, `<rect width="100" height="100" fill="${l.bg}"/>
    ${l.style === 'long' ? hair : ''}
    <path d="M12 100C14 80 30 72 50 72S86 80 88 100Z" fill="${l.top}"/>
    <rect x="42" y="60" width="16" height="16" rx="7" fill="${l.skin}"/>
    <ellipse cx="50" cy="47" rx="20" ry="23" fill="${l.skin}"/>
    ${l.style === 'long' ? '' : hair}
    <circle cx="42.5" cy="47" r="2.1" fill="${FUR.ink}"/><circle cx="57.5" cy="47" r="2.1" fill="${FUR.ink}"/>
    <path d="M43 ${y} Q50 ${y + 6} 57 ${y}" fill="none" stroke="${l.style === 'beard' ? '#fff' : FUR.ink}" stroke-width="2" stroke-linecap="round"/>`);
}

export const GLYPH = {
  book: (f: string, b: string) => `<path d="M20 28c12-4 22-2 30 4 8-6 18-8 30-4v46c-12-4-22-2-30 4-8-6-18-8-30-4z" fill="${f}"/><path d="M50 32v46" stroke="${b}" stroke-width="3"/>`,
  tv: (f: string, b: string) => `<rect x="18" y="34" width="64" height="44" rx="9" fill="${f}"/><path d="M38 20l12 14 12-14" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="56" r="10" fill="${b}"/>`,
  mic: (f: string) => `<rect x="38" y="16" width="24" height="44" rx="12" fill="${f}"/><path d="M27 46c0 16 10 24 23 24s23-8 23-24M50 70v14M38 85h24" fill="none" stroke="${f}" stroke-width="5" stroke-linecap="round"/>`,
  vase: (f: string) => `<path d="M40 18h20l-4 16c11 8 17 18 17 29 0 13-10 21-23 21s-23-8-23-21c0-11 6-21 17-29z" fill="${f}"/>`,
  box: (f: string, b: string) => `<path d="M50 14l31 17v38L50 86 19 69V31z" fill="${f}"/><path d="M19 31l31 17 31-17M50 48v38" fill="none" stroke="${b}" stroke-width="3"/>`,
  waves: (f: string) => `<path d="M14 36q12-11 24 0t24 0 24 0M14 54q12-11 24 0t24 0 24 0M14 72q12-11 24 0t24 0 24 0" fill="none" stroke="${f}" stroke-width="7" stroke-linecap="round"/>`,
  play: (f: string, b: string) => `<rect x="14" y="26" width="72" height="50" rx="14" fill="${f}"/><path d="M43 39l22 12-22 12z" fill="${b}"/>`,
  glove: (f: string, b: string) => `<path d="M28 42C28 26 42 18 58 20c14 2 22 13 22 26 0 10-4 17-10 21v7H38v-9c-6-6-10-13-10-23z" fill="${f}"/><rect x="36" y="72" width="36" height="12" rx="4" fill="${f}"/><path d="M40 72h28" stroke="${b}" stroke-width="3"/>`,
  note: (f: string, b: string) => `<rect x="22" y="16" width="56" height="70" rx="9" fill="${f}"/><path d="M34 34h32M34 48h32M34 62h20" stroke="${b}" stroke-width="5" stroke-linecap="round"/>`,
  star: (f: string) => `<path d="M50 16l10 23 25 2-19 16 6 25-22-13-22 13 6-25-19-16 25-2z" fill="${f}" stroke="${f}" stroke-width="4" stroke-linejoin="round"/>`,
};
export const coverXml = (l: CoverLook) => svgDoc(100, 100, `<rect width="100" height="100" fill="${l.bg}"/>${GLYPH[l.g](l.fg, l.bg)}`);

const SHELL: Record<string, [string, string]> = { Bronze: ['#C98A53', '#EDBC8F'], Silver: ['#A9B9C2', '#E9F0F2'], Gold: ['#E3AE27', '#FCE694'], Platinum: ['#79C9C0', '#DDF6F1'] };
export function shellXml(name: string) {
  const [a, b] = SHELL[name] ?? SHELL.Bronze;
  return svgDoc(64, 64, `<path d="M32 58C21 58 6 41 6 27C6 14 17 6 32 6S58 14 58 27C58 41 43 58 32 58Z" fill="${b}" stroke="${a}" stroke-width="3"/>
    <path d="M32 54L11 26M32 54L20 12M32 54V9M32 54L44 12M32 54L53 26" stroke="${a}" stroke-width="2.2" stroke-linecap="round"/><rect x="24" y="53" width="16" height="7" rx="3" fill="${a}"/>`);
}
