import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";
import { useSEO } from "../seo/SEOOptimizer";
import { WORKS } from "../../data/content";

const assetBase = import.meta.env.BASE_URL;

/**
 * Full gallery page — scrollable grid of all paintings with lightbox.
 * Grows over time as Emilia adds work. This is the canonical home
 * for the collection; the homepage shows only a curated preview.
 */

const GalleryTile = ({ work, th, isDark, index, onClick }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [hover, setHover] = useState(false);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`View ${work.title}`}
      style={{
        display: "block",
        width: "100%",
        aspectRatio: "4 / 5",
        padding: 0,
        border: `1px solid ${hover ? th.borderHover : th.border}`,
        background: th.surface,
        cursor: "pointer",
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: hover
          ? (isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(0,0,0,0.12)")
          : (isDark ? "0 8px 30px rgba(0,0,0,0.3)" : "0 8px 30px rgba(0,0,0,0.06)"),
        opacity: vis ? 1 : 0,
        transform: vis
          ? (hover ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)")
          : "translateY(24px) scale(0.98)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`,
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: isDark ? "brightness(0.96)" : th.imgFilter,
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </picture>

      {/* Title overlay */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "32px 16px 16px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
        opacity: hover ? 1 : 0.7,
        transition: "opacity 0.4s ease",
      }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
          color: "#fff",
          margin: 0,
          textShadow: "0 1px 6px rgba(0,0,0,0.4)",
        }}>
          {work.title}
        </h3>
        {work.medium && (
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.7)",
            margin: "4px 0 0",
            letterSpacing: "0.03em",
          }}>
            {work.medium}
          </p>
        )}
      </div>
    </button>
  );
};

const GalleryLightbox = ({ work, th, isDark, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (!work) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [work, onClose, onPrev, onNext]);

  if (!work) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: isDark ? "rgba(8,7,6,0.96)" : "rgba(247,244,238,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5vh 4vw",
        animation: "fadeIn 0.3s ease",
      }}
    >
      {/* Navigation arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous painting"
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: "translateY(-50%)",
          background: `${th.surface}`,
          border: `1px solid ${th.border}`,
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: th.text,
          fontSize: 20,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        ‹
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next painting"
        style={{
          position: "absolute",
          right: 24,
          top: "50%",
          transform: "translateY(-50%)",
          background: `${th.surface}`,
          border: `1px solid ${th.border}`,
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: th.text,
          fontSize: 20,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        ›
      </button>

      <picture onClick={(e) => e.stopPropagation()}>
        <source srcSet={`${assetBase}${work.lightbox}.webp`} type="image/webp" />
        <img
          src={`${assetBase}${work.lightbox}.jpg`}
          alt={work.title}
          style={{
            maxWidth: "90%",
            maxHeight: "75vh",
            objectFit: "contain",
            boxShadow: isDark
              ? "0 30px 80px rgba(0,0,0,0.6)"
              : "0 30px 80px rgba(0,0,0,0.15)",
            borderRadius: 8,
          }}
        />
      </picture>

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          color: th.text,
          margin: 0,
        }}>
          {work.title}
        </h3>
        {work.medium && (
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            color: th.textDim,
            margin: "6px 0 0",
            letterSpacing: "0.04em",
          }}>
            {work.medium}
          </p>
        )}
      </div>

      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          background: "transparent",
          border: `1px solid ${th.textDim}40`,
          borderRadius: 20,
          padding: "8px 20px",
          fontFamily: "'Outfit', sans-serif",
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: th.textDim,
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        Close
      </button>
    </div>
  );
};

export const GalleryPage = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [activeIndex, setActiveIndex] = useState(null);

  useSEO({
    title: "Gallery — Milly Farfalla",
    description: "Paintings by Milly Farfalla. Acrylics, watercolors, and mixed media from a Sicilian studio.",
    path: "/gallery",
  });

  const activeWork = activeIndex !== null ? WORKS[activeIndex] : null;

  const goNext = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % WORKS.length);
  };

  const goPrev = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + WORKS.length) % WORKS.length);
  };

  return (
    <main style={{
      position: "relative", zIndex: 2, padding: "120px 28px 80px",
      maxWidth: 1100,
      margin: "0 auto",
      minHeight: "80vh",
    }}>
      <div ref={ref} style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 300,
          color: th.text,
          margin: "0 0 12px",
          letterSpacing: "0.02em",
        }}>
          Gallery
        </h1>
        <p style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 15,
          color: th.textDim,
          margin: "0 0 48px",
          lineHeight: 1.6,
        }}>
          {WORKS.length} pieces — click to view larger
        </p>
      </div>

      {/* Responsive grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: 24,
      }}>
        {WORKS.map((work, i) => (
          <GalleryTile
            key={work.id}
            work={work}
            th={th}
            isDark={isDark}
            index={i}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      <GalleryLightbox
        work={activeWork}
        th={th}
        isDark={isDark}
        onClose={() => setActiveIndex(null)}
        onPrev={goPrev}
        onNext={goNext}
      />
    </main>
  );
};
