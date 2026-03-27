/**
 * Luxury Gallery Section - High-end slideshow with silky smooth transitions
 * 
 * Features:
 * - Silk-smooth transitions with momentum physics
 * - Elegant fade/scale animations
 * - Luxury UI with subtle shadows and gradients
 * - Responsive touch gestures with easing
 * - High-end hover states and micro-interactions
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { WORKS } from "../../data/content";

const assetBase = import.meta.env.BASE_URL;
const AUTOPLAY_MS = 6000; // Slightly slower for luxury feel

export const LuxuryGallerySection = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [idx, setIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const wrapRef = useRef(null);
  const transitionTimeoutRef = useRef(null);

  const n = WORKS.length;
  
  const go = useCallback((direction) => {
    if (isTransitioning) return; // Prevent rapid clicks
    
    setIsTransitioning(true);
    setPrevIdx(idx);
    setIdx((i) => (i + direction + n) % n);
    
    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    // Reset transition state after animation
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [idx, n, isTransitioning]);

  const goTo = useCallback((targetIdx) => {
    if (targetIdx === idx || isTransitioning) return;
    
    setIsTransitioning(true);
    setPrevIdx(idx);
    setIdx(targetIdx);
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  }, [idx, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key >= "1" && e.key <= "9") {
        const num = parseInt(e.key) - 1;
        if (num < n) goTo(num);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, n]);

  const pauseAutoplay = hovering || focusInside;

  // Autoplay with luxury timing
  useEffect(() => {
    if (n <= 1) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    if (pauseAutoplay) return;

    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [n, go, pauseAutoplay]);

  const onWrapBlurCapture = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    queueMicrotask(() => {
      if (!el.contains(document.activeElement)) setFocusInside(false);
    });
  }, []);

  // Touch handling with momentum
  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchStartX === null || touchStartY === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Ensure horizontal swipe (not vertical scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) go(-1);
      else go(1);
    }
    
    setTouchStartX(null);
    setTouchStartY(null);
  }, [touchStartX, touchStartY, go]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const current = WORKS[idx];
  const previous = WORKS[prevIdx];

  return (
    <section id="works" style={{ padding: "80px 0 64px" }}>
      <div ref={ref} style={{ 
        padding: "0 32px", 
        marginBottom: 48, 
        display: "flex", 
        alignItems: "center", 
        gap: 16,
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        <div style={{ 
          width: vis ? 48 : 0, 
          height: 2, 
          background: `linear-gradient(90deg, ${th.accent}AA, ${th.accent}44)`, 
          transition: "width 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
          borderRadius: 1
        }}/>
        <span style={{ 
          fontFamily: "'Outfit', sans-serif", 
          fontSize: 11, 
          letterSpacing: "0.32em", 
          textTransform: "uppercase", 
          color: th.textDim, 
          opacity: vis ? 1 : 0, 
          transform: vis ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.3s",
          fontWeight: 500
        }}>
          Gallery · {n} {n === 1 ? "piece" : "pieces"}
        </span>
      </div>

      <div
        ref={wrapRef}
        style={{ 
          padding: "0 24px", 
          maxWidth: 1200, 
          margin: "0 auto",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s"
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={() => setFocusInside(true)}
        onBlurCapture={onWrapBlurCapture}
      >
        <div
          role="region"
          aria-roledescription="luxury carousel"
          aria-label="Artwork gallery"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: hovering 
              ? `0 32px 64px ${th.accent}15, 0 8px 32px ${th.accent}08, ${th.cardShadow}`
              : `0 24px 48px ${isDark ? '#00000040' : '#00000020'}, 0 8px 24px ${isDark ? '#00000020' : '#00000010'}`,
            background: `linear-gradient(145deg, ${th.bg}, ${th.bg2})`,
            border: `1px solid ${th.border}`,
            transition: "box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.3s ease",
            transform: hovering ? "translateY(-2px)" : "translateY(0)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)"
          }}
        >
          <div style={{
            aspectRatio: "16 / 10",
            maxHeight: "min(75vh, 900px)",
            width: "100%",
            position: "relative",
            background: `linear-gradient(135deg, ${th.bg} 0%, ${th.bg2} 50%, ${th.bg} 100%)`,
            overflow: "hidden"
          }}>
            
            {/* Previous image (fading out) */}
            {isTransitioning && previous && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transform: "scale(1.02)",
                transition: "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
                zIndex: 1
              }}>
                <img
                  src={`${assetBase}${previous.img}`}
                  alt={`Previous artwork`}
                  draggable={false}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    filter: isDark ? "brightness(0.98)" : th.imgFilter,
                  }}
                />
              </div>
            )}
            
            {/* Current image (fading in) */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "scale(0.95)" : "scale(1)",
              transition: "opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.1s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.1s",
              zIndex: 2
            }}>
              <img
                key={current.img}
                src={`${assetBase}${current.img}`}
                alt={`Artwork ${idx + 1} of ${n}: ${current.title || 'Untitled'}`}
                loading="lazy"
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter: isDark ? "brightness(0.98)" : th.imgFilter,
                  transition: "filter 0.3s ease"
                }}
              />
            </div>

            {/* Gradient overlays for luxury feel */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "20%",
              background: `linear-gradient(180deg, ${th.bg}08 0%, transparent 100%)`,
              pointerEvents: "none"
            }} />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "20%",
              background: `linear-gradient(0deg, ${th.bg}08 0%, transparent 100%)`,
              pointerEvents: "none"
            }} />
          </div>

          {/* Luxury Navigation Buttons */}
          <button
            type="button"
            aria-label="Previous artwork"
            onClick={() => go(-1)}
            disabled={isTransitioning}
            style={{
              position: "absolute", 
              left: 20, 
              top: "50%",
              width: 56, 
              height: 56, 
              borderRadius: "50%", 
              border: `2px solid ${th.border}`,
              background: `${th.surface}F5`,
              color: th.text, 
              cursor: isTransitioning ? "not-allowed" : "pointer",
              backdropFilter: "blur(20px)", 
              WebkitBackdropFilter: "blur(20px)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 20, 
              lineHeight: 1, 
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              opacity: hovering ? 1 : 0.7,
              transform: hovering ? "translateY(-50%) scale(1.05)" : "translateY(-50%) scale(1)",
              boxShadow: `0 8px 32px ${th.accent}15`,
              fontWeight: "300"
            }}
          >
            ‹
          </button>
          
          <button
            type="button"
            aria-label="Next artwork"
            onClick={() => go(1)}
            disabled={isTransitioning}
            style={{
              position: "absolute", 
              right: 20, 
              top: "50%",
              width: 56, 
              height: 56, 
              borderRadius: "50%", 
              border: `2px solid ${th.border}`,
              background: `${th.surface}F5`,
              color: th.text, 
              cursor: isTransitioning ? "not-allowed" : "pointer",
              backdropFilter: "blur(20px)", 
              WebkitBackdropFilter: "blur(20px)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: 20, 
              lineHeight: 1,
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
              opacity: hovering ? 1 : 0.7,
              transform: hovering ? "translateY(-50%) scale(1.05)" : "translateY(-50%) scale(1)",
              boxShadow: `0 8px 32px ${th.accent}15`,
              fontWeight: "300"
            }}
          >
            ›
          </button>
        </div>

        {/* Luxury Progress Indicators */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          gap: 12, 
          flexWrap: "wrap", 
          marginTop: 32,
          padding: "16px 24px",
          borderRadius: 24,
          background: `${th.surface}40`,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${th.border}`
        }}>
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              type="button"
              aria-label={`Go to artwork ${i + 1}`}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => goTo(i)}
              disabled={isTransitioning}
              style={{
                width: i === idx ? 32 : 12, 
                height: 12, 
                borderRadius: 6, 
                padding: 0, 
                border: "none",
                background: i === idx 
                  ? `linear-gradient(90deg, ${th.accent}, ${th.accent}CC)` 
                  : `${th.textGhost}60`,
                cursor: isTransitioning ? "not-allowed" : "pointer", 
                opacity: i === idx ? 1 : 0.4,
                transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                transform: i === idx ? "scale(1)" : "scale(0.8)",
                boxShadow: i === idx ? `0 4px 12px ${th.accent}40` : "none"
              }}
            />
          ))}
        </div>

        {/* Artwork Info */}
        {current.title && (
          <div style={{
            textAlign: "center",
            marginTop: 24,
            opacity: isTransitioning ? 0.5 : 1,
            transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 600,
              color: th.text,
              margin: 0,
              marginBottom: 8
            }}>
              {current.title}
            </h3>
            {current.medium && (
              <p style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 14,
                color: th.textDim,
                margin: 0,
                letterSpacing: "0.02em"
              }}>
                {current.medium}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LuxuryGallerySection;