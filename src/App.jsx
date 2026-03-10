import { useState, useCallback } from "react";
import { THEMES } from "./data/content";
import { useScroll } from "./hooks/useScroll";

import { AmbientBg } from "./components/effects/AmbientBg";
import { Grain } from "./components/effects/Grain";
import { PaintCanvas } from "./components/effects/PaintCanvas";
import { Spine } from "./components/effects/Spine";
import { ProgressBar } from "./components/effects/ProgressBar";

import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";

import { Hero } from "./components/sections/Hero";
import { Statement } from "./components/sections/Statement";
import { GallerySection } from "./components/sections/GallerySection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { KitSection } from "./components/sections/KitSection";
import { Connect } from "./components/sections/Connect";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const { y, p } = useScroll();
  const th = isDark ? THEMES.dark : THEMES.light;
  const toggleTheme = useCallback(() => setIsDark(d => !d), []);

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
      transition:"background 0.8s ease, color 0.6s ease",
    }}>
      <AmbientBg scrollY={y} isDark={isDark} th={th} />
      <Grain isDark={isDark} />
      <PaintCanvas />
      <Spine scrollP={p} th={th} />
      <ProgressBar scrollP={p} th={th} />
      <Nav scrollY={y} isDark={isDark} toggleTheme={toggleTheme} th={th} />

      <main style={{ position:"relative", zIndex:2 }}>
        <Hero scrollY={y} th={th} isDark={isDark} />
        <Statement th={th} />
        <GallerySection th={th} isDark={isDark} />
        <ProcessSection th={th} />
        <KitSection th={th} />
        <Connect th={th} />
      </main>
      <Footer th={th} />
    </div>
  );
}
