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

import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "../../hooks/useInView";
import { Wing } from "../effects/Wing";

export const CinematicHero = ({ scrollY, th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [dominantColors, setDominantColors] = useState(['#c9a84c', '#40e0ff', '#ff6b6b']);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  // Cinematic fade and parallax calculations
  const fade = Math.max(0, 1 - scrollY / 800);
  const parallaxSlow = scrollY * 0.15;  // Background layers
  const parallaxMedium = scrollY * 0.25; // Mid layers  
  const parallaxFast = scrollY * 0.4;   // Foreground elements

  // Mouse position for interactive effects
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  }, []);

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
      
      img.src = `${import.meta.env.BASE_URL}hero-landscape.jpg`;
    };
    
    extractColors();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="top" 
      onMouseMove={handleMouseMove}
      style={{
        height: "100vh", 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative",
        padding: "0px", 
        overflow: "hidden",
        cursor: "none" // Use custom paint cursor
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
        
        {/* Hero artwork (medium parallax) - Fixed scaling */}
        <img 
          src={`${import.meta.env.BASE_URL}hero-landscape.jpg`}
          alt="Cinematic Sicilian landscape — original painting" 
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw", 
            height: "100vh", 
            objectFit: "cover",
            objectPosition: "center center", // Center the complete image within viewport
            transform: `translateY(${parallaxMedium}px) scale(${1 + scrollY * 0.00005})`,
            filter: `brightness(${0.9 + fade * 0.2}) saturate(${1.1 + fade * 0.1})`,
            transition: "filter 0.3s ease"
          }} 
        />
        
        {/* Interactive color overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            ${dominantColors[0]}08 0%, 
            ${dominantColors[1]}05 30%, 
            transparent 60%)`,
          transition: "background 0.6s ease",
          mixBlendMode: "overlay"
        }} />
        
        {/* Light tone wash for text legibility only */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? `linear-gradient(to bottom, 
                rgba(0,0,0,0.05) 0%, 
                rgba(0,0,0,0.1) 50%,
                rgba(0,0,0,0.05) 100%)`
            : `linear-gradient(to bottom, 
                rgba(255,255,255,0.1) 0%, 
                rgba(255,255,255,0.15) 40%,
                rgba(255,255,255,0.1) 100%)`,
        }} />
        
        {/* Subtle center focus for text legibility */}
        <div style={{
          position: "absolute", 
          inset: 0,
          background: isDark
            ? `radial-gradient(ellipse 60% 40% at 50% 45%, 
                rgba(0,0,0,0.15) 0%, 
                rgba(0,0,0,0.05) 40%,
                transparent 70%)`
            : `radial-gradient(ellipse 55% 35% at 50% 42%, 
                rgba(0,0,0,0.12) 0%, 
                rgba(0,0,0,0.04) 35%,
                transparent 65%)`,
        }} />

        {/* Floating color particles */}
        {dominantColors.map((color, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 120 + i * 40,
              height: 120 + i * 40,
              borderRadius: "50%",
              background: `${color}06`,
              transform: `
                translateX(${20 + i * 60}%) 
                translateY(${30 + i * 25}%) 
                translateZ(0) 
                translate3d(${parallaxFast * (i + 1)}px, ${parallaxFast * 0.5}px, 0)
              `,
              filter: "blur(60px)",
              mixBlendMode: "overlay",
              animation: `float${i} ${8 + i * 2}s ease-in-out infinite`,
              opacity: fade * 0.6
            }}
          />
        ))}
      </div>

      {/* Decorative oversized mark with color harmony */}
      <span aria-hidden="true" style={{
        position: "absolute", 
        top: "10%", 
        right: "8%", 
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', serif", 
        fontSize: "clamp(80px, 18vw, 220px)",
        fontWeight: 300, 
        color: `${dominantColors[0]}08`, 
        lineHeight: 1, 
        pointerEvents: "none",
        transform: `translateY(${parallaxFast * 0.3}px) rotate(${scrollY * 0.01}deg)`,
        transition: "color 2s ease"
      }}>
        ✧
      </span>

      {/* Main Content with Cinematic Animation */}
      <div ref={ref} style={{
        textAlign: "center", 
        zIndex: 3, 
        position: "relative",
        opacity: fade,
        transform: `translateY(${scrollY * 0.1}px) scale(${0.98 + fade * 0.02})`,
        transition: "transform 0.1s ease-out"
      }}>
        
        {/* Animated title with stagger effect */}
        <h1 style={{
          fontFamily: "'Poppins', 'Inter', 'Playfair Display', serif",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          fontWeight: 500,
          margin: 0,
          marginBottom: 32,
          lineHeight: 1.15,
          letterSpacing: "0.015em",
          fontFeatureSettings: "'kern' 1, 'liga' 1, 'calt' 1",
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          background: isDark 
            ? "linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)"
            : "linear-gradient(135deg, #FF69B4 0%, #FFB6C1 50%, #FFC0CB 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: isDark 
            ? "0 4px 20px rgba(255, 182, 193, 0.3), 0 0 40px rgba(255, 192, 203, 0.2)"
            : "0 4px 20px rgba(255, 105, 180, 0.3), 0 0 40px rgba(255, 182, 193, 0.2)",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, transform 1.2s cubic-bezier(0.23, 1, 0.32, 1) 0.2s"
        }}>
          Milly Farfalla
        </h1>

        {/* Subtitle with elegant fade-in */}
        <p style={{
          fontFamily: "'Caveat', cursive",
          fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
          fontWeight: 600,
          background: isDark 
            ? "linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #FFE4E1 100%)"
            : "linear-gradient(135deg, #FF69B4 0%, #FFB6C1 50%, #FFC0CB 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: 0,
          marginBottom: 48,
          lineHeight: 1.4,
          letterSpacing: "0.02em",
          textShadow: isDark 
            ? "0 2px 12px rgba(255, 182, 193, 0.2)"
            : "0 2px 12px rgba(255, 105, 180, 0.2)",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.4s, transform 1.4s cubic-bezier(0.23, 1, 0.32, 1) 0.4s"
        }}>
          Painting the soul of Sicily
        </p>

        {/* Decorative wing with color harmony */}
        <div style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
          transition: "opacity 1.6s cubic-bezier(0.23, 1, 0.32, 1) 0.6s, transform 1.6s cubic-bezier(0.23, 1, 0.32, 1) 0.6s"
        }}>
          <Wing 
            color={dominantColors[0]} 
            isDark={isDark}
            style={{
              filter: `drop-shadow(0 4px 12px ${dominantColors[0]}20)`
            }}
          />
        </div>
      </div>

      {/* Scroll indicator with color accent */}
      <div style={{
        position: "absolute",
        bottom: 48,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 3,
        opacity: fade * 0.8,
        transition: "opacity 0.3s ease"
      }}>
        <div style={{
          width: 2,
          height: 40,
          background: `linear-gradient(to bottom, ${dominantColors[0]}80, transparent)`,
          margin: "0 auto 12px",
          borderRadius: 2,
          animation: "scrollPulse 2s ease-in-out infinite"
        }} />
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: th.textDim,
          margin: 0,
          textShadow: `0 1px 4px ${dominantColors[0]}10`
        }}>
          Scroll
        </p>
      </div>

    </section>
  );
};

export default CinematicHero;