// ✎ WORKS — Source of truth for the gallery. README is canonical:
// "7 unique source images." Only Emilia's verified works belong here.
//
// RULES (locked 2026-05-15):
// - Never invent titles. Use roman-numeral "Plate N" until Emilia names a piece.
// - Never invent the medium. Joey confirmed 2026-05-15 that Milly works in
//   many styles, not exclusively oil — `medium` stays empty until she provides
//   per-piece detail.
// - Never invent dimensions. Leave blank.
// - Never expand the array past the count of real Emilia paintings on disk.
//   work-08.jpg through work-13.jpg exist in public/artwork/ but are NOT
//   confirmed as her work — pending verification with her before re-adding.
export const WORKS = [
  { id: 1, img: "artwork/work-01.jpg", hue: 200, title: "Plate I",   medium: "", artist: "Milly Farfalla" },
  { id: 2, img: "artwork/work-02.jpg", hue: 42,  title: "Plate II",  medium: "", artist: "Milly Farfalla" },
  { id: 3, img: "artwork/work-03.jpg", hue: 48,  title: "Plate III", medium: "", artist: "Milly Farfalla" },
  { id: 4, img: "artwork/work-04.jpg", hue: 265, title: "Plate IV",  medium: "", artist: "Milly Farfalla" },
  { id: 5, img: "artwork/work-05.jpg", hue: 175, title: "Plate V",   medium: "", artist: "Milly Farfalla" },
  { id: 6, img: "artwork/work-06.jpg", hue: 15,  title: "Plate VI",  medium: "", artist: "Milly Farfalla" },
  { id: 7, img: "artwork/work-07.jpg", hue: 220, title: "Plate VII", medium: "", artist: "Milly Farfalla" },
];

// ✎ KIT — Studio inventory. ONLY items Emilia confirms.
// Brand names left as placeholders pending her confirmation. Notes blanked.
// Joey confirmed 2026-05-15 that she works in many media; the oil-only kit was
// AI-fabricated. Items here are guesses until she provides her actual kit.
export const KIT = [];

// ✎ SOCIALS — Only real, live profiles. Add new ones with full https URL.
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/emilia.it21/" },
  { label: "TikTok",    href: "https://www.tiktok.com/@milly.ita" },
];

// ✎ CONTACT — Studio inbox.
// Set to Emilia's personal Gmail per Joey's direction 2026-05-15. A dedicated
// alias (hello@millyfarfalla.com) is still an option for later if she wants
// to keep her personal address off the public site, but she said this is fine
// for now. Connect button uses this as the mailto: target.
export const STUDIO_EMAIL = "amatoemilia94@gmail.com";

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
    surfaceStrong:"rgba(255,255,255,0.08)",
    imgFilter:"brightness(0.95)", cardShadow:"0 30px 60px rgba(0,0,0,0.35)",
    // navBg + navBgHover are read directly — never concat alpha onto them.
    // Concatenating "F0"/"FA" onto an rgba() string produces invalid CSS and
    // the pill silently falls back to transparent, which exposes the hero
    // painting underneath. The bug looked like "dark mode doesn't apply to
    // the nav" on Android because the home hero is the only place a colored
    // backdrop reveals the transparency.
    navBg:"rgba(10,9,8,0.88)", navBgHover:"rgba(10,9,8,0.96)",
    overlayBg:"rgba(8,7,6,0.94)",
    selection:"rgba(201,168,76,0.2)", scrollThumb:"rgba(201,168,76,0.12)",
  },
  light: {
    bg:"#f7f4ee", bg2:"#eee9df",
    text:"#1c1a16", textSoft:"#5a5548", textDim:"#9a9488", textGhost:"#d0cbc2",
    accent:"#8a6d2b", accent2:"#b49450", accentGlow:"rgba(138,109,43,0.06)",
    border:"rgba(0,0,0,0.06)", borderHover:"rgba(138,109,43,0.18)",
    surface:"rgba(0,0,0,0.02)", surfaceHover:"rgba(138,109,43,0.04)",
    surfaceStrong:"rgba(0,0,0,0.06)",
    imgFilter:"brightness(1.02) saturate(1.05)", cardShadow:"0 30px 60px rgba(0,0,0,0.08)",
    navBg:"rgba(247,244,238,0.88)", navBgHover:"rgba(247,244,238,0.96)",
    overlayBg:"rgba(247,244,238,0.96)",
    selection:"rgba(138,109,43,0.15)", scrollThumb:"rgba(138,109,43,0.1)",
  },
};
