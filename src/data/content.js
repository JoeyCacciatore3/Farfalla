// ── Placeholder generator ────────────────────────────────────────────
// Creates unique abstract art placeholders — no external dependencies
export const placeholder = (hue, sat = 30) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800' viewBox='0 0 800 800'>
    <defs>
      <linearGradient id='g1' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='hsl(${hue},${sat}%,18%)'/>
        <stop offset='100%' stop-color='hsl(${(hue+40)%360},${sat+10}%,12%)'/>
      </linearGradient>
      <radialGradient id='g2' cx='30%' cy='40%' r='60%'>
        <stop offset='0%' stop-color='hsl(${hue},${sat+15}%,28%)' stop-opacity='0.6'/>
        <stop offset='100%' stop-color='transparent'/>
      </radialGradient>
      <radialGradient id='g3' cx='70%' cy='65%' r='45%'>
        <stop offset='0%' stop-color='hsl(${(hue+60)%360},${sat}%,22%)' stop-opacity='0.4'/>
        <stop offset='100%' stop-color='transparent'/>
      </radialGradient>
    </defs>
    <rect width='800' height='800' fill='url(%23g1)'/>
    <rect width='800' height='800' fill='url(%23g2)'/>
    <rect width='800' height='800' fill='url(%23g3)'/>
    <circle cx='250' cy='300' r='120' fill='hsl(${hue},${sat+5}%,24%)' opacity='0.3'/>
    <circle cx='550' cy='500' r='80' fill='hsl(${(hue+30)%360},${sat}%,20%)' opacity='0.25'/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const placeholderWide = (hue) => {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'>
    <defs>
      <linearGradient id='a' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stop-color='hsl(${hue},25%,16%)'/>
        <stop offset='100%' stop-color='hsl(${(hue+35)%360},30%,11%)'/>
      </linearGradient>
      <radialGradient id='b' cx='40%' cy='50%' r='55%'>
        <stop offset='0%' stop-color='hsl(${hue},35%,25%)' stop-opacity='0.5'/>
        <stop offset='100%' stop-color='transparent'/>
      </radialGradient>
    </defs>
    <rect width='800' height='500' fill='url(%23a)'/>
    <rect width='800' height='500' fill='url(%23b)'/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// ✎ WORKS — Slideshow; images from public/artwork/ (run npm run convert-artwork after updating attachments)
export const WORKS = [
  { id: 1, img: "artwork/work-01.jpg", hue: 200 },
  { id: 2, img: "artwork/work-02.jpg", hue: 42 },
  { id: 3, img: "artwork/work-03.jpg", hue: 48 },
  { id: 4, img: "artwork/work-04.jpg", hue: 265 },
  { id: 5, img: "artwork/work-05.jpg", hue: 175 },
  { id: 6, img: "artwork/work-06.jpg", hue: 15 },
  { id: 7, img: "artwork/work-07.jpg", hue: 220 },
];

// ✎ TOOLS — Update names, notes, prices, and affiliate links
export const KIT = [
  { name:"Winsor & Newton Artist Oils", note:"My daily palette foundation", price:"$42", link:"#" },
  { name:"Rosemary & Co. Ivory Filberts", note:"Nothing else feels right", price:"$65", link:"#" },
  { name:"Arches Oil Paper 300gsm", note:"For studies that deserve permanence", price:"$28", link:"#" },
  { name:"Gamblin Cold Wax Medium", note:"The secret texture ingredient", price:"$22", link:"#" },
  { name:"Richeson Lyptus Easel", note:"Solid as the work demands", price:"$189", link:"#" },
];

// ✎ SOCIALS — Use full https URLs; `#` entries show as disabled until URLs are set
export const SOCIALS = [
  { label:"Instagram", href:"https://www.instagram.com/emilia.it21/" },
  { label:"YouTube", href:"#" },
  { label:"TikTok", href:"https://www.tiktok.com/@milly.ita" },
  { label:"Pinterest", href:"#" },
];

// ═══════════════════════════════════════════════════════
// DESIGN TOKENS — Dark & Light palettes
// ═══════════════════════════════════════════════════════
export const THEMES = {
  dark: {
    bg:"#0a0908", bg2:"#0f0e0b",
    text:"#e2dace", textSoft:"#b0a490", textDim:"#6a6050", textGhost:"#3a3530",
    accent:"#c9a84c", accent2:"#a08c6a", accentGlow:"rgba(201,168,76,0.08)",
    border:"rgba(255,255,255,0.05)", borderHover:"rgba(201,168,76,0.2)",
    surface:"rgba(255,255,255,0.02)", surfaceHover:"rgba(201,168,76,0.04)",
    imgFilter:"brightness(0.95)", cardShadow:"0 30px 60px rgba(0,0,0,0.35)",
    navBg:"rgba(10,9,8,0.84)", overlayBg:"rgba(8,7,6,0.94)",
    selection:"rgba(201,168,76,0.2)", scrollThumb:"rgba(201,168,76,0.12)",
  },
  light: {
    bg:"#f7f4ee", bg2:"#eee9df",
    text:"#1c1a16", textSoft:"#5a5548", textDim:"#9a9488", textGhost:"#d0cbc2",
    accent:"#8a6d2b", accent2:"#b49450", accentGlow:"rgba(138,109,43,0.06)",
    border:"rgba(0,0,0,0.06)", borderHover:"rgba(138,109,43,0.18)",
    surface:"rgba(0,0,0,0.02)", surfaceHover:"rgba(138,109,43,0.04)",
    imgFilter:"brightness(1.02) saturate(1.05)", cardShadow:"0 30px 60px rgba(0,0,0,0.08)",
    navBg:"rgba(247,244,238,0.84)", overlayBg:"rgba(247,244,238,0.96)",
    selection:"rgba(138,109,43,0.15)", scrollThumb:"rgba(138,109,43,0.1)",
  },
};
