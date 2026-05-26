import { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { WORKS } from "../../data/content";

const assetBase = import.meta.env.BASE_URL;

/**
 * Homepage gallery preview — shows 4 featured paintings in a static grid.
 * No auto-scroll, no animation jitter. Click opens lightbox; "View all"
 * links to the full /gallery page.
 *
 * Replaces the old infinite marquee which caused:
 * - Sub-pixel shake on slow linear translateX
 * - No user control (can't scroll/browse)
 * - Low engagement (research: auto-carousels perform poorly)
 */

// Show first 4 paintings on homepage as a curated preview
const FEATURED = WORKS.slice(0, 4);

const FeaturedTile = ({ work, th, isDark, index }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const [hover, setHover] = useState(false);

  return (
    <Link
      ref={ref}
      to="/gallery"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`${work.title} — View gallery`}
      style={{
        display: "block",
        position: "relative",
        aspectRatio: "4 / 5",
        borderRadius: 12,
        overflow: "hidden",
        textDecoration: "none",
        border: `1px solid ${hover ? th.borderHover : th.border}`,
        boxShadow: hover
          ? (isDark ? "0 20px 50px rgba(0,0,0,0.5)" : "0 20px 50px rgba(0,0,0,0.12)")
          : (isDark ? "0 8px 30px rgba(0,0,0,0.3)" : "0 8px 30px rgba(0,0,0,0.06)"),
        opacity: vis ? 1 : 0,
        transform: vis
          ? (hover ? "translateY(-3px)" : "translateY(0)")
          : "translateY(24px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
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
            transform: hover ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      </picture>
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        padding: "28px 14px 12px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
        pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          color: "#fff",
          fontSize: 14,
          lineHeight: 1.3,
          textShadow: "0 1px 6px rgba(0,0,0,0.4)",
        }}>
          {work.title}
        </span>
      </div>
    </Link>
  );
};

export const MarqueeGallery = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });

  return (
    <section id="works" style={{ padding: "64px 28px 72px", maxWidth: 1100, margin: "0 auto" }}>
      <div ref={ref} style={{ marginBottom: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: vis ? 36 : 0,
            height: 1,
            background: `${th.accent}50`,
            transition: "width 0.8s ease",
          }} />
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: th.textDim,
            opacity: vis ? 1 : 0,
            transition: "opacity 0.6s ease 0.2s",
            fontWeight: 400,
            margin: 0,
          }}>
            Works
          </h2>
        </div>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
          color: th.textDim,
          margin: "12px 0 0",
          maxWidth: 540,
          lineHeight: 1.5,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(8px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          Selected works from the studio
        </p>
      </div>

      {/* 2-column grid on mobile, 4-column on desktop */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 20,
      }}>
        {FEATURED.map((work, i) => (
          <FeaturedTile key={work.id} work={work} th={th} isDark={isDark} index={i} />
        ))}
      </div>

      {/* View all link */}
      <div style={{
        textAlign: "center",
        marginTop: 40,
        opacity: vis ? 1 : 0,
        transition: "opacity 0.8s ease 0.4s",
      }}>
        <Link
          to="/gallery"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: th.accent,
            textDecoration: "none",
            padding: "12px 28px",
            borderRadius: 24,
            border: `1px solid ${th.accent}40`,
            transition: "all 0.3s ease",
          }}
        >
          View all {WORKS.length} works
        </Link>
      </div>
    </section>
  );
};

export default MarqueeGallery;
