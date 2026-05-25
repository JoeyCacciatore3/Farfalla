/**
 * Cinematic Hero Section - Next-level parallax with color-reactive elements
 * 
 * Features:
 * - Multi-layer parallax with depth
 * - Color extraction from hero artwork
 * - Cinematic text animations with momentum
 * - Interactive paint brush elements
 * - Professional fade and scale effects
 */

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useInView } from "../../hooks/useInView";

// Desktop-only: WebGL displacement is heavy (R3F + Three.js ~226KB gzipped).
// Only import on devices wide enough to see the effect. Touch devices and
// narrow viewports skip the download entirely.
const isDesktop = typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
const PaintDisplacement = isDesktop
  ? lazy(() => import("../effects/PaintDisplacement").then(m => ({ default: m.PaintDisplacement })))
  : null;

export const CinematicHero = ({ scrollY, th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [dominantColors, setDominantColors] = useState(['#c9a84c', '#40e0ff', '#ff6b6b']);
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // Cinematic fade and parallax calculations
  const fade = Math.max(0, 1 - scrollY / 800);
  const parallaxSlow = scrollY * 0.15;
  const parallaxMedium = scrollY * 0.25;

  // Color extraction from hero image
  useEffect(() => {
    const extractColors = () => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = 100; // Small sample for performance
        canvas.height = 60;
        
        ctx.drawImage(img, 0, 0, 100, 60);
        
        const imageData = ctx.getImageData(0, 0, 100, 60);
        const data = imageData.data;
        const colorCounts = {};
        
        // Sample every 4th pixel for performance
        for (let i = 0; i < data.length; i += 16) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const alpha = data[i + 3];
          
          if (alpha < 128) continue; // Skip transparent pixels
          
          // Quantize colors for grouping
          const quantR = Math.round(r / 32) * 32;
          const quantG = Math.round(g / 32) * 32;
          const quantB = Math.round(b / 32) * 32;
          
          const colorKey = `${quantR},${quantG},${quantB}`;
          colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
        }
        
        // Get top 3 most common colors
        const sortedColors = Object.entries(colorCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([rgb]) => {
            const [r, g, b] = rgb.split(',').map(Number);
            return `rgb(${r}, ${g}, ${b})`;
          });
          
        if (sortedColors.length > 0) {
          setDominantColors(sortedColors);
        }
      };
      
      img.src = `${import.meta.env.BASE_URL}artwork/optimized/hero-gallery.jpg`;
    };
    
    extractColors();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="top"
      style={{
        // 100dvh tracks the dynamic viewport (URL bar collapsed/expanded), 100vh
        // is the static fallback for browsers without dvh. Without dvh the hero
        // jumps when Android Chrome's URL bar autohides on scroll.
        height: "100vh",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "0px",
        overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Multi-layer Background with Parallax */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        
        {/* Base background layer (slowest parallax) */}
        <div style={{
          position: "absolute",
          top: "-30%",
          left: "-10%",
          width: "120%", 
          height: "160%", 
          background: `linear-gradient(135deg, ${dominantColors[2]}15, ${dominantColors[0]}10)`,
          transform: `translateY(${parallaxSlow}px) scale(${1 + scrollY * 0.0002})`,
          transition: "background 2s ease"
        }} />
        
        {/* Hero artwork — wrapper does slow breath (28s), img does parallax. Two transforms,
            two elements; combining them on one node would let inline style override the keyframe. */}
        <div style={{
          position: "absolute",
          inset: 0,
          animation: "heroBreath 28s ease-in-out infinite alternate",
          transformOrigin: "center center",
          willChange: "transform",
        }}>
          <picture>
            {/* Mobile: 800px gallery image (~107KB). Desktop: 1439px lightbox (~388KB). */}
            <source srcSet={`${import.meta.env.BASE_URL}artwork/optimized/hero-gallery.webp`} type="image/webp" media="(max-width: 1023px)" />
            <source srcSet={`${import.meta.env.BASE_URL}artwork/optimized/hero-lightbox.webp`} type="image/webp" media="(min-width: 1024px)" />
            <source srcSet={`${import.meta.env.BASE_URL}artwork/optimized/hero-gallery.jpg`} type="image/jpeg" media="(max-width: 1023px)" />
            <img
              src={`${import.meta.env.BASE_URL}artwork/optimized/hero-lightbox.jpg`}
              alt="A painting by Milly Farfalla"
              fetchPriority="high"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                objectFit: "cover",
                objectPosition: "center center",
                transform: `translateY(${parallaxMedium}px) scale(${1 + scrollY * 0.00005})`,
                filter: `brightness(${0.9 + fade * 0.2}) saturate(${1.1 + fade * 0.1})`,
                transition: "filter 0.3s ease",
              }}
            />
          </picture>
          {/* WebGL paint-displacement — desktop only. Mobile skips the import entirely. */}
          {PaintDisplacement && (
            <Suspense fallback={null}>
              <PaintDisplacement src={`${import.meta.env.BASE_URL}artwork/optimized/hero-lightbox.jpg`} />
            </Suspense>
          )}
        </div>
        
      </div>

      {/* Main Content — restrained typography, brand colors, word-stagger reveal */}
      <div ref={ref} style={{
        textAlign: "center",
        zIndex: 3,
        position: "relative",
        opacity: fade,
        transform: `translateY(${scrollY * 0.1}px) scale(${0.98 + fade * 0.02})`,
        transition: "transform 0.1s ease-out"
      }}>

        {/* Title — bolder weight + layered text-shadow for legibility against
            the colorful hero painting. Was weight 400 italic and disappeared
            into the painting's mid-tones; now 700 italic with a soft halo so
            the name reads against any backdrop, light or dark. */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(3.2rem, 7.5vw, 6.5rem)",
          fontWeight: 700,
          margin: 0,
          marginBottom: 28,
          lineHeight: 1.05,
          letterSpacing: "0.005em",
          fontFeatureSettings: "'kern' 1, 'liga' 1",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          color: th.text,
          fontStyle: "italic",
          textShadow: isDark
            ? "0 1px 3px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.4)"
            : "0 1px 3px rgba(255,255,255,0.7), 0 0 8px rgba(255,255,255,0.4)",
        }}>
          {["Milly", "Farfalla"].map((word, i) => (
            <span key={word} style={{
              display: "inline-block",
              marginRight: i === 0 ? "0.3em" : 0,
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.18}s, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.18}s`,
            }}>{word}</span>
          ))}
        </h1>

        {/*
          Subtitle / tagline intentionally omitted.
          Prior copy ("dipingo l'anima della Sicilia / painting the soul of
          Sicily") was AI-fabricated voice. Emilia will provide her own line —
          or none — when ready. Reference: Cecily Brown / Olafur Eliasson, who
          let the work and the name stand alone.
        */}

      </div>

    </section>
  );
};

export default CinematicHero;