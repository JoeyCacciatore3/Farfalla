import { useState, useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { THEMES } from "./data/content";
import { useScroll } from "./hooks/useScroll";
import { SecurityErrorBoundary } from "./components/security/ErrorBoundary.jsx";
import { useSEO, StructuredData, CanonicalLink, PreloadCriticalResources } from "./components/seo/SEOOptimizer.jsx";
// PaintBrushCursor was the previous custom cursor — removed 2026-05-15 in
// favor of the butterfly trail in <PaintCanvas/> (the namesake of the site).
// SignatureInteraction.jsx deleted — zero consumers.

import { AmbientBg } from "./components/effects/AmbientBg";
import { Grain } from "./components/effects/Grain";
import { PaintCanvas } from "./components/effects/PaintCanvas";
import { ProgressBar } from "./components/effects/ProgressBar";

import { CinematicNav } from "./components/layout/CinematicNav";
import { Footer } from "./components/layout/Footer";

import { CinematicHero } from "./components/sections/CinematicHero";
import { Statement } from "./components/sections/Statement";
import { MarqueeGallery } from "./components/sections/MarqueeGallery";
import { Connect } from "./components/sections/Connect";
import { CucinaPreview, CucinaPage } from "./components/sections/CucinaSection";
import { GiardinoPreview, GiardinoPage } from "./components/sections/GiardinoSection";
import { BlogIndex, BlogPost } from "./components/sections/BlogPage";
import { CraftingPreview, CraftingPage } from "./components/sections/CraftingSection";
import { GalleryPage } from "./components/sections/GalleryPage";
import { SicilyPage } from "./components/sections/SicilyPage";

// Initial theme — must agree with the pre-paint script in index.html so we
// don't get a flash on hydrate. Reads localStorage first, falls back to OS.
const readInitialTheme = () => {
  if (typeof window === 'undefined') return false;
  try {
    const stored = window.localStorage.getItem('mf-theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
  } catch { /* localStorage blocked (private mode) — fall through */ }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default function App() {
  const [isDark, setIsDark] = useState(readInitialTheme);
  const { y, p } = useScroll();
  const th = isDark ? THEMES.dark : THEMES.light;
  const location = useLocation();
  const toggleTheme = useCallback(() => {
    setIsDark((d) => {
      const next = !d;
      try { window.localStorage.setItem('mf-theme', next ? 'dark' : 'light'); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Live-respond to OS theme changes — only if the user hasn't manually chosen.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      try {
        if (window.localStorage.getItem('mf-theme')) return; // user has overridden
      } catch { return; }
      setIsDark(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Runtime SEO update — only on homepage. Sub-pages (/blog, /sicilia) set
  // their own title via useSEO. Running this on every route overwrites them.
  useSEO(location.pathname === '/' ? {
    title: 'Milly Farfalla — Painter',
    description: 'Paintings by Milly Farfalla. Born in Palermo, Sicily. Studio works, contact, and notes.',
    image: '/hero-landscape.jpg',
    path: '/',
  } : {});
  
  // Buttery momentum scroll — desktop only. On touch devices native scroll
  // is faster, smoother, and respects the OS overscroll/refresh gestures.
  // Hijacking touch with Lenis was the #1 'janky on Android' contributor.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // touch handling is OFF — the matchMedia gate above means we never
      // construct Lenis on touch primaries, but if a hybrid device hot-swaps
      // pointer types we still don't want Lenis to grab touch events.
      smoothTouch: false,
    });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

  // Scroll to top on route change — ensures IntersectionObserver triggers
  // on sub-pages (blog posts, gallery) that mount above the fold.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const scheme = isDark ? 'dark' : 'light';
    document.documentElement.style.setProperty('color-scheme', scheme);
    document.documentElement.setAttribute('data-theme', scheme);

    // Set CSS custom properties on :root for global access
    const root = document.documentElement;
    Object.entries(th).forEach(([key, value]) => {
      // Convert camelCase to kebab-case (textSoft -> text-soft)
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}-color`;
      root.style.setProperty(cssVar, value);
    });

    // Also set the main ones for backward compatibility
    root.style.setProperty('--bg-color', th.bg);
    root.style.setProperty('--text-color', th.text);
    root.style.setProperty('--selection-color', th.selection);
    root.style.setProperty('--scroll-thumb-color', th.scrollThumb);
    root.style.setProperty('--text-ghost-color', th.textGhost);

    let colorSchemeMeta = document.getElementById('color-scheme-meta') ?? document.querySelector('meta[name="color-scheme"]');
    if (!colorSchemeMeta) {
      colorSchemeMeta = document.createElement('meta');
      colorSchemeMeta.setAttribute('name', 'color-scheme');
      colorSchemeMeta.id = 'color-scheme-meta';
      document.head.appendChild(colorSchemeMeta);
    }
    colorSchemeMeta.setAttribute('content', scheme);

    const themeColor = isDark ? THEMES.dark.bg : THEMES.light.bg;
    let themeColorMeta = document.getElementById('theme-color-meta') ?? document.querySelector('meta[name="theme-color"]');
    if (!themeColorMeta) {
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      themeColorMeta.id = 'theme-color-meta';
      document.head.appendChild(themeColorMeta);
    }
    themeColorMeta.setAttribute('content', themeColor);
  }, [isDark, th]);

  return (
    <div style={{
      // Core colors
      "--bg-color": th.bg,
      "--bg2-color": th.bg2,
      "--text-color": th.text,
      "--text-soft-color": th.textSoft,
      "--text-dim-color": th.textDim,
      "--text-ghost-color": th.textGhost,
      
      // Accents
      "--accent-color": th.accent,
      "--accent2-color": th.accent2,
      "--accent-glow": th.accentGlow,
      
      // Interactive elements
      "--border-color": th.border,
      "--border-hover-color": th.borderHover,
      "--surface-color": th.surface,
      "--surface-hover-color": th.surfaceHover,
      
      // UI feedback
      "--selection-color": th.selection,
      "--scroll-thumb-color": th.scrollThumb,
      
      // Effects
      "--img-filter": th.imgFilter,
      "--card-shadow": th.cardShadow,
      "--nav-bg": th.navBg,
      "--overlay-bg": th.overlayBg,
      
      minHeight:"100vh", position:"relative", overflowX:"hidden",
      background: isDark
        ? `linear-gradient(180deg, ${THEMES.dark.bg}, ${THEMES.dark.bg2}, ${THEMES.dark.bg})`
        : `linear-gradient(180deg, ${THEMES.light.bg}, ${THEMES.light.bg2}, ${THEMES.light.bg})`,
      color:th.text,
      colorScheme: isDark ? "dark" : "light",
      transition:"background 0.8s ease, color 0.6s ease",
    }}>
      <AmbientBg scrollY={y} isDark={isDark} th={th} />
      <Grain isDark={isDark} />
      <PaintCanvas />
      <ProgressBar scrollP={p} th={th} />
      <CinematicNav isDark={isDark} toggleTheme={toggleTheme} th={th} />

      <SecurityErrorBoundary componentName="App">
        <StructuredData />
        <CanonicalLink path="/" />
        <PreloadCriticalResources />
        
        <Routes>
          <Route path="/" element={
            <SecurityErrorBoundary componentName="HomePage">
              <main style={{ position:"relative", zIndex:2 }}>
                <CinematicHero scrollY={y} th={th} isDark={isDark} />
                <Statement th={th} />
                <MarqueeGallery th={th} isDark={isDark} />
                <CucinaPreview th={th} />
                <GiardinoPreview th={th} />
                <CraftingPreview th={th} />
                <Connect th={th} />
              </main>
            </SecurityErrorBoundary>
          } />
          <Route path="/gallery" element={
            <SecurityErrorBoundary componentName="GalleryPage">
              <GalleryPage th={th} isDark={isDark} />
            </SecurityErrorBoundary>
          } />
          <Route path="/cucina" element={
            <SecurityErrorBoundary componentName="CucinaPage">
              <CucinaPage th={th} />
            </SecurityErrorBoundary>
          } />
          <Route path="/giardino" element={
            <SecurityErrorBoundary componentName="GiardinoPage">
              <GiardinoPage th={th} />
            </SecurityErrorBoundary>
          } />
          <Route path="/crafting" element={
            <SecurityErrorBoundary componentName="CraftingPage">
              <CraftingPage th={th} />
            </SecurityErrorBoundary>
          } />
          <Route path="/blog" element={
            <SecurityErrorBoundary componentName="BlogIndex">
              <BlogIndex th={th} />
            </SecurityErrorBoundary>
          } />
          <Route path="/blog/:slug" element={
            <SecurityErrorBoundary componentName="BlogPost">
              <BlogPost th={th} />
            </SecurityErrorBoundary>
          } />
          <Route path="/sicilia" element={
            <SecurityErrorBoundary componentName="SicilyPage">
              <SicilyPage th={th} isDark={isDark} />
            </SecurityErrorBoundary>
          } />
        </Routes>
      </SecurityErrorBoundary>
      <Footer th={th} />
    </div>
  );
}
