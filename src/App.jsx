import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { THEMES } from "./data/content";
import { useScroll } from "./hooks/useScroll";
import { SecurityErrorBoundary } from "./components/security/ErrorBoundary.jsx";
import { useSEO, StructuredData, CanonicalLink, PreloadCriticalResources } from "./components/seo/SEOOptimizer.jsx";
import { usePerformanceOptimizer } from "./components/effects/PerformanceOptimizer.jsx";
import { PaintBrushCursor } from "./components/ui/SignatureInteraction.jsx";

import { AmbientBg } from "./components/effects/AmbientBg";
import { BrushReveal } from "./components/effects/BrushReveal";
import { Grain } from "./components/effects/Grain";
import { PaintCanvas } from "./components/effects/PaintCanvas";
import { Spine } from "./components/effects/Spine";
import { ProgressBar } from "./components/effects/ProgressBar";

import { CinematicNav } from "./components/layout/CinematicNav";
import { Footer } from "./components/layout/Footer";

import { CinematicHero } from "./components/sections/CinematicHero";
import { Statement } from "./components/sections/Statement";
import { MarqueeGallery } from "./components/sections/MarqueeGallery";
import { KitSection } from "./components/sections/KitSection";
import { Connect } from "./components/sections/Connect";
import { SicilyPage } from "./components/sections/SicilyPage";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const { y, p } = useScroll();
  const th = isDark ? THEMES.dark : THEMES.light;
  const toggleTheme = useCallback(() => setIsDark(d => !d), []);

  // Runtime SEO update — static foundation lives in index.html.
  useSEO({
    title: 'Milly Farfalla — Sicilian Oil Paintings & Mediterranean Art',
    description: "Original oil paintings by Milly Farfalla. Sicilian light, Mediterranean coasts, and the slow craft of canvas and pigment — collected works, studio notes, and contact.",
    image: '/hero-landscape.jpg',
    path: '/',
  });
  
  usePerformanceOptimizer();

  // Buttery momentum scroll — disabled when the user prefers reduced motion.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); };
  }, []);

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
      <Spine scrollP={p} th={th} />
      <ProgressBar scrollP={p} th={th} />
      <CinematicNav isDark={isDark} toggleTheme={toggleTheme} th={th} />

      <PaintBrushCursor />
      
      <SecurityErrorBoundary componentName="App">
        <StructuredData />
        <CanonicalLink path="/" />
        <PreloadCriticalResources />
        
        <Routes>
          <Route path="/" element={
            <SecurityErrorBoundary componentName="HomePage">
              <main style={{ position:"relative", zIndex:2 }}>
                <CinematicHero scrollY={y} th={th} isDark={isDark} />
                <BrushReveal><Statement th={th} /></BrushReveal>
                <MarqueeGallery th={th} isDark={isDark} />
                <BrushReveal direction="rtl"><KitSection th={th} /></BrushReveal>
                <BrushReveal><Connect th={th} /></BrushReveal>
              </main>
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
