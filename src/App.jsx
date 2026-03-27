import { useState, useCallback, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { THEMES } from "./data/content";
import { useScroll } from "./hooks/useScroll";
import { SecurityErrorBoundary } from "./components/security/ErrorBoundary.jsx";
import { useSEO, StructuredData, CanonicalLink, PreloadCriticalResources } from "./components/seo/SEOOptimizer.jsx";
import { usePerformanceOptimizer } from "./components/effects/PerformanceOptimizer.jsx";
import { PaintBrushCursor } from "./components/ui/SignatureInteraction.jsx";

import { AmbientBg } from "./components/effects/AmbientBg";
import { Grain } from "./components/effects/Grain";
import { PaintCanvas } from "./components/effects/PaintCanvas";
import { Spine } from "./components/effects/Spine";
import { ProgressBar } from "./components/effects/ProgressBar";

import { CinematicNav } from "./components/layout/CinematicNav";
import { Footer } from "./components/layout/Footer";

import { CinematicHero } from "./components/sections/CinematicHero";
import { Statement } from "./components/sections/Statement";
import { LuxuryGallerySection } from "./components/sections/LuxuryGallerySection";
import { KitSection } from "./components/sections/KitSection";
import { Connect } from "./components/sections/Connect";
import { SicilyPage } from "./components/sections/SicilyPage";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const { y, p } = useScroll();
  const th = isDark ? THEMES.dark : THEMES.light;
  const toggleTheme = useCallback(() => setIsDark(d => !d), []);

  // SEO and Performance Optimization
  useSEO({
    title: 'Farfalla Portfolio - Sicilian Artist | Original Paintings',
    description: 'Discover the vibrant artwork of a Sicilian artist. Original oil paintings capturing the beauty, spirit, and luminous landscapes of Sicily.',
    image: '/hero-landscape.jpg',
    url: 'https://joeycacciatore3.github.io/Farfalla/'
  });
  
  usePerformanceOptimizer();

  useEffect(() => {
    const scheme = isDark ? 'dark' : 'light';
    document.documentElement.style.setProperty('color-scheme', scheme);
    document.documentElement.setAttribute('data-theme', scheme);

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
  }, [isDark]);

  return (
    <div style={{
      "--bg-color": th.bg,
      "--text-color": th.text,
      "--selection-color": th.selection,
      "--scroll-thumb-color": th.scrollThumb,
      "--text-ghost-color": th.textGhost,
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
        <CanonicalLink url="https://joeycacciatore3.github.io/Farfalla/" />
        <PreloadCriticalResources />
        
        <Routes>
          <Route path="/" element={
            <SecurityErrorBoundary componentName="HomePage">
              <main style={{ position:"relative", zIndex:2 }}>
                <CinematicHero scrollY={y} th={th} isDark={isDark} />
                <Statement th={th} />
                <LuxuryGallerySection th={th} isDark={isDark} />
                <KitSection th={th} />
                <Connect th={th} />
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
