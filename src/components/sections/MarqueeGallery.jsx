import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";
import { WORKS } from "../../data/content";

const assetBase = import.meta.env.BASE_URL;

/**
 * Continuous-scroll marquee of every painting. Two copies side-by-side,
 * translateX'd by a CSS keyframe so the loop is seamless. Hover slows the
 * animation; click expands the painting in a lightbox overlay.
 *
 * Design intent: an art site should be drowning in color, not gating its
 * work behind clicks. This puts every piece on screen at all times.
 */

const TileImg = ({ work, th, isDark, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`View ${work.title}`}
    style={{
      flex: "0 0 auto",
      width: "clamp(220px, 28vw, 380px)",
      aspectRatio: "4 / 5",
      margin: "0 14px",
      padding: 0,
      border: "none",
      background: "transparent",
      cursor: "none",
      position: "relative",
      borderRadius: 4,
      overflow: "hidden",
      boxShadow: isDark
        ? "0 18px 40px rgba(0,0,0,0.45)"
        : "0 18px 40px rgba(0,0,0,0.10)",
    }}
  >
    <picture>
      <source srcSet={`${assetBase}${work.gallery}.webp`} type="image/webp" />
      <img
        src={`${assetBase}${work.gallery}.jpg`}
        alt={work.medium
          ? `${work.title} — ${work.medium} by Milly Farfalla`
          : `${work.title} by Milly Farfalla`}
        loading="lazy"
        draggable={false}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          filter: isDark ? "brightness(0.96)" : th.imgFilter,
          transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1.0)"; }}
      />
    </picture>
    <div style={{
      position: "absolute", left: 14, bottom: 12, right: 14,
      fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
      color: "#fff", fontSize: 14, lineHeight: 1.3,
      textShadow: "0 1px 8px rgba(0,0,0,0.5)",
      pointerEvents: "none",
    }}>
      {work.title}
    </div>
  </button>
);

const Lightbox = ({ work, th, isDark, onClose }) => {
  // Escape key closes the lightbox
  useEffect(() => {
    if (!work) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [work, onClose]);

  if (!work) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: isDark ? "rgba(8,7,6,0.94)" : "rgba(247,244,238,0.96)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "5vh 4vw",
        animation: "fadeIn 0.4s ease",
        cursor: "none",
      }}
    >
      <picture>
        <source srcSet={`${assetBase}${work.lightbox}.webp`} type="image/webp" />
        <img
          src={`${assetBase}${work.lightbox}.jpg`}
          alt={work.title}
          style={{
            maxWidth: "100%", maxHeight: "78vh",
            objectFit: "contain",
          boxShadow: isDark
            ? "0 30px 80px rgba(0,0,0,0.6)"
            : "0 30px 80px rgba(0,0,0,0.2)",
          borderRadius: 4,
        }}
        />
      </picture>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic", fontWeight: 400,
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          color: th.text, margin: 0,
        }}>{work.title}</h3>
        {work.medium ? (
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13, color: th.textDim,
            margin: "6px 0 0", letterSpacing: "0.04em",
          }}>{work.medium}</p>
        ) : null}
      </div>
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: "absolute", top: 24, right: 32,
          background: "transparent", border: `1px solid ${th.textDim}40`,
          borderRadius: 20, padding: "8px 20px",
          fontFamily: "'Outfit', sans-serif", fontSize: 11,
          letterSpacing: "0.16em", textTransform: "uppercase",
          color: th.textDim, cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Close ✕
      </button>
    </div>
  );
};

export const MarqueeGallery = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(null);

  // Two copies of WORKS — when the first copy translates -50%, the second
  // copy is exactly where the first started, so the seam is invisible.
  const tiles = [...WORKS, ...WORKS];

  return (
    <section id="works" style={{ padding: "56px 0 64px", overflow: "hidden" }}>
      <div ref={ref} style={{ padding: "0 28px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: vis ? 36 : 0, height: 1, background: `${th.accent}50`, transition: "width 0.8s ease" }}/>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 10,
            letterSpacing: "0.32em", textTransform: "uppercase",
            color: th.textDim, opacity: vis ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
            fontWeight: 400, margin: 0,
          }}>
            Works · {WORKS.length} pieces
          </h2>
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
          fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
          color: th.textDim, margin: "12px 0 0",
          maxWidth: 540, lineHeight: 1.5,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          Hover to slow. Click to look closer.
        </p>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          width: "100%",
          maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div style={{
          display: "flex",
          width: "max-content",
          animation: "marquee 90s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          willChange: "transform",
        }}>
          {tiles.map((w, i) => (
            <TileImg key={`${w.id}-${i}`} work={w} th={th} isDark={isDark} onClick={() => setActive(w)} />
          ))}
        </div>
      </div>

      <Lightbox work={active} th={th} isDark={isDark} onClose={() => setActive(null)} />
    </section>
  );
};

export default MarqueeGallery;
