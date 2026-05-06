import { WORKS } from "../../data/content";

/**
 * Smooth-morphing color wash — the page is gently bathed in the palette of
 * the next painting before you reach it.
 *
 * `scrollY` (or page progress) maps the document onto the WORKS array, then
 * we lerp HSL hues between adjacent works using shortest-arc on the hue
 * circle. The effect is calming, painterly, and tied to her actual palette
 * (every painting in WORKS already has a `hue` value).
 */

const lerp = (a, b, t) => a + (b - a) * t;

const lerpHueShortest = (h1, h2, t) => {
  const diff = ((h2 - h1 + 540) % 360) - 180;
  return (h1 + diff * t + 360) % 360;
};

export const AmbientBg = ({ scrollY, isDark, th }) => {
  // Map document scroll onto WORKS slots. The hero takes ~1 viewport, so we
  // start the cycle slightly into the page and let it run through 80% of
  // total scroll. Outside that range, hold the first / last hue.
  const docHeight = (typeof document !== "undefined")
    ? Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    : 1;
  const start = window.innerHeight * 0.6;
  const end = docHeight - window.innerHeight * 0.3;
  const range = Math.max(end - start, 1);
  const progress = Math.min(Math.max((scrollY - start) / range, 0), 1);

  const slot = progress * (WORKS.length - 1);
  const i = Math.floor(slot);
  const t = slot - i;
  const h1 = WORKS[i]?.hue ?? 35;
  const h2 = WORKS[Math.min(i + 1, WORKS.length - 1)]?.hue ?? h1;
  const hue = lerpHueShortest(h1, h2, t);

  // Saturation/lightness are gentle so the wash never overwhelms the work.
  const sat = lerp(10, 22, isDark ? 0.6 : 0.4);
  const light = isDark ? 7 : 93;
  const innerAlpha = isDark ? 0.85 : 0.7;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      background: `radial-gradient(ellipse 90% 70% at 50% 40%, hsla(${hue.toFixed(1)},${sat}%,${light}%,${innerAlpha}) 0%, ${th.bg} 75%)`,
      // No explicit transition: scroll updates ~60Hz already, and a long CSS
      // transition would lag behind quick scrolls. The lerp is the smoothing.
    }}/>
  );
};
