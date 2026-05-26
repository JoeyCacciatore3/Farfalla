// ✎ WORKS — Source of truth for the gallery. README is canonical:
// "9 unique source images." Only Emilia's verified works belong here.
//
// RULES (locked 2026-05-15):
// - Never invent titles. Use roman-numeral "Plate N" until Emilia names a piece.
// - Never invent the medium. Joey confirmed 2026-05-15 that Milly works in
//   many styles, not exclusively oil — `medium` stays empty until she provides
//   per-piece detail.
// - Never invent dimensions. Leave blank.
// - Never expand the array past the count of real Emilia paintings on disk.
//   work-08 through work-13 are confirmed as her work (2026-05-21 email)
//   but not yet added to the gallery — titles/media pending from Emilia.
//   Originals live in artwork-originals/ (not deployed). Optimized versions
//   in public/artwork/optimized/ are what the site actually serves.
export const WORKS = [
  { id: 1, img: "artwork/optimized/work-01-lightbox.jpg", gallery: "artwork/optimized/work-01-gallery", lightbox: "artwork/optimized/work-01-lightbox", hue: 200, title: "Plate I",   medium: "", artist: "Milly Farfalla" },
  { id: 2, img: "artwork/optimized/work-02-lightbox.jpg", gallery: "artwork/optimized/work-02-gallery", lightbox: "artwork/optimized/work-02-lightbox", hue: 42,  title: "Plate II",  medium: "", artist: "Milly Farfalla" },
  { id: 3, img: "artwork/optimized/work-03-lightbox.jpg", gallery: "artwork/optimized/work-03-gallery", lightbox: "artwork/optimized/work-03-lightbox", hue: 48,  title: "Palermo's Soccer Logo", medium: "", artist: "Milly Farfalla" },
  { id: 4, img: "artwork/optimized/work-04-lightbox.jpg", gallery: "artwork/optimized/work-04-gallery", lightbox: "artwork/optimized/work-04-lightbox", hue: 265, title: "Cats Heaven",  medium: "Acrylics on canvas", artist: "Milly Farfalla" },
  { id: 5, img: "artwork/optimized/work-05-lightbox.jpg", gallery: "artwork/optimized/work-05-gallery", lightbox: "artwork/optimized/work-05-lightbox", hue: 175, title: "Plate V",   medium: "", artist: "Milly Farfalla" },
  { id: 6, img: "artwork/optimized/work-06-lightbox.jpg", gallery: "artwork/optimized/work-06-gallery", lightbox: "artwork/optimized/work-06-lightbox", hue: 15,  title: "Plate VI",  medium: "", artist: "Milly Farfalla" },
  { id: 7, img: "artwork/optimized/work-07-lightbox.jpg", gallery: "artwork/optimized/work-07-gallery", lightbox: "artwork/optimized/work-07-lightbox", hue: 220, title: "Plate VII", medium: "", artist: "Milly Farfalla" },
  { id: 8, img: "artwork/optimized/work-08-lightbox.jpg", gallery: "artwork/optimized/work-08-gallery", lightbox: "artwork/optimized/work-08-lightbox", hue: 200, title: "Barcarello, Palermo", medium: "", artist: "Milly Farfalla" },
  { id: 9, img: "artwork/optimized/work-09-lightbox.jpg", gallery: "artwork/optimized/work-09-gallery", lightbox: "artwork/optimized/work-09-lightbox", hue: 120, title: "Bright Day", medium: "", artist: "Milly Farfalla" },
];

// ✎ VIDEOS — Process videos, time-lapses, behind-the-scenes.
// Same rules as WORKS: only real Emilia content. Add entries as she provides them.
// Shape: { id, src: "video/filename.mp4", poster: "video/filename-poster.jpg",
//          title, description, duration (seconds) }
// Components consuming this: (none yet — structure is ready for when content arrives)
export const VIDEOS = [];

// ✎ KIT — Studio inventory. ONLY items Emilia confirms.
// Mediums confirmed by Emilia on 2026-05-15 via email (reply to daily nudge).
// Brand names + per-item notes intentionally left blank until she provides
// them — never invent. Crafting section is pending: she's sending more
// info in a follow-up email.
export const KIT = [
  { name: "Acrilici",        note: "" },
  { name: "Acquerelli",      note: "" },
  { name: "Tecniche miste",  note: "" },
  { name: "Markers",         note: "" },
  { name: "Matite colorate", note: "" },
];

// ✎ CUCINA — Emilia's Sicilian recipes and dishes.
// RULES: Only recipes she provides. Never invent ingredients, steps, or photos.
// Shape: { id, title, description, image (optional — path in public/cucina/),
//          ingredients (array), steps (array), category ("primo"|"secondo"|"dolce"|"contorno") }
export const CUCINA = [];

// ✎ GIARDINO — Emilia's garden: plants, tips, seasonal notes.
// RULES: Only real plants/tips she provides. Never invent content.
// Shape: { id, title, description, image (optional — path in public/giardino/),
//          season ("spring"|"summer"|"autumn"|"winter"|"all"), category ("plants"|"tips"|"harvest") }
export const GIARDINO = [];

// ✎ CRAFTING — Emilia's handmade crafts: jewelry, décor, wearables.
// RULES: Only real crafts she provides. Never invent items, materials, or photos.
// Shape: { id, title, description, image (optional — path in public/crafting/),
//          materials (array of strings), category ("jewelry"|"decor"|"wearable"|"other") }
export const CRAFTING = [];

// ✎ BLOG — Daily posts for SEO visibility and audience building.
// Shape: { slug, title, date (ISO), excerpt, body (markdown or plain text),
//          image (optional), tags (array), author: "Milly Farfalla" }
// Blog posts live in public/blog/ as individual JSON files loaded on demand.
// This array is the index — lightweight for fast listing without loading bodies.
export const BLOG_INDEX_PATH = "/blog/index.json";

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
    text:"#e2dace", textSoft:"#d0c8b8", textDim:"#a09888", textGhost:"#3a3530",
    accent:"#c9a84c", accent2:"#a08c6a", accentGlow:"rgba(201,168,76,0.08)",
    border:"rgba(255,255,255,0.10)", borderHover:"rgba(201,168,76,0.25)",
    surface:"rgba(255,255,255,0.06)", surfaceHover:"rgba(201,168,76,0.08)",
    surfaceStrong:"rgba(255,255,255,0.12)",
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
    text:"#1c1a16", textSoft:"#3a3530", textDim:"#7a7468", textGhost:"#d0cbc2",
    accent:"#8a6d2b", accent2:"#b49450", accentGlow:"rgba(138,109,43,0.06)",
    border:"rgba(0,0,0,0.10)", borderHover:"rgba(138,109,43,0.25)",
    surface:"rgba(0,0,0,0.04)", surfaceHover:"rgba(138,109,43,0.06)",
    surfaceStrong:"rgba(0,0,0,0.08)",
    imgFilter:"brightness(1.02) saturate(1.05)", cardShadow:"0 30px 60px rgba(0,0,0,0.08)",
    navBg:"rgba(247,244,238,0.88)", navBgHover:"rgba(247,244,238,0.96)",
    overlayBg:"rgba(247,244,238,0.96)",
    selection:"rgba(138,109,43,0.15)", scrollThumb:"rgba(138,109,43,0.1)",
  },
};
