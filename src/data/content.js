// ✎ WORKS — Slideshow; images under public/artwork/ (npm run convert-artwork after updating attachments)
export const WORKS = [
  { id: 1, img: "artwork/work-01.jpg", hue: 200, title: "Mediterranean Dawn", medium: "Oil on Canvas, 24\" × 36\"" },
  { id: 2, img: "artwork/work-02.jpg", hue: 42, title: "Sicilian Afternoon", medium: "Oil on Canvas, 18\" × 24\"" },
  { id: 3, img: "artwork/work-03.jpg", hue: 48, title: "Golden Coast", medium: "Oil on Canvas, 30\" × 40\"" },
  { id: 4, img: "artwork/work-04.jpg", hue: 265, title: "Evening Reflections", medium: "Oil on Canvas, 16\" × 20\"" },
  { id: 5, img: "artwork/work-05.jpg", hue: 175, title: "Coastal Winds", medium: "Oil on Canvas, 22\" × 28\"" },
  { id: 6, img: "artwork/work-06.jpg", hue: 15, title: "Sunset Embrace", medium: "Oil on Canvas, 20\" × 24\"" },
  { id: 7, img: "artwork/work-07.jpg", hue: 220, title: "Azure Dreams", medium: "Oil on Canvas, 18\" × 22\"" },
  { id: 8, img: "artwork/work-08.jpg", hue: 32, title: "Warm Horizon", medium: "Oil on Canvas, 24\" × 30\"" },
  { id: 9, img: "artwork/work-09.jpg", hue: 195, title: "Oceanic Memory", medium: "Oil on Canvas, 16\" × 24\"" },
  { id: 10, img: "artwork/work-10.jpg", hue: 280, title: "Twilight Serenity", medium: "Oil on Canvas, 20\" × 30\"" },
  { id: 11, img: "artwork/work-11.jpg", hue: 55, title: "Island Light", medium: "Oil on Canvas, 18\" × 28\"" },
  { id: 12, img: "artwork/work-12.jpg", hue: 125, title: "Emerald Shores", medium: "Oil on Canvas, 22\" × 32\"" },
  { id: 13, img: "artwork/work-13.jpg", hue: 310, title: "Mystic Evening", medium: "Oil on Canvas, 24\" × 36\"" },
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
