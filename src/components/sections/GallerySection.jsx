import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { WORKS } from "../../data/content";

export const GallerySection = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  const [idx, setIdx] = useState(0);
  const touchStartX = useRef(null);

  const n = WORKS.length;
  const go = useCallback((d) => {
    setIdx((i) => (i + d + n) % n);
  }, [n]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = WORKS[idx];

  return (
    <section id="works" style={{ padding:"60px 0 48px" }}>
      <div ref={ref} style={{ padding:"0 28px", marginBottom:40, display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:vis?36:0, height:1, background:`${th.accent}35`, transition:"width 0.8s ease" }}/>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:th.textDim, opacity:vis?1:0, transition:"opacity 0.6s ease 0.2s" }}>
          Gallery · {n} {n === 1 ? "piece" : "pieces"}
        </span>
      </div>

      <div style={{ padding:"0 20px", maxWidth:1100, margin:"0 auto" }}>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Artwork gallery"
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start == null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (dx > 50) go(-1);
            if (dx < -50) go(1);
          }}
          style={{
            position:"relative",
            borderRadius:12,
            overflow:"hidden",
            boxShadow:th.cardShadow,
            background:th.bg,
            border:`1px solid ${th.border}`,
          }}
        >
          <div style={{
            aspectRatio:"16 / 10",
            maxHeight:"min(70vh, 900px)",
            width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background:`linear-gradient(180deg, ${th.bg} 0%, ${th.bg2} 100%)`,
          }}>
            <img
              src={current.img}
              alt={`Artwork ${idx + 1} of ${n}`}
              loading="lazy"
              draggable={false}
              style={{
                maxWidth:"100%",
                maxHeight:"min(70vh, 900px)",
                width:"auto",
                height:"auto",
                objectFit:"contain",
                display:"block",
                filter: isDark ? "brightness(0.98)" : th.imgFilter,
              }}
            />
          </div>

          <button
            type="button"
            aria-label="Previous artwork"
            onClick={() => go(-1)}
            style={{
              position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
              width:44, height:44, borderRadius:"50%", border:`1px solid ${th.border}`,
              background:th.surface, color:th.text, cursor:"pointer",
              backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18, lineHeight:1, transition:"opacity 0.2s",
            }}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next artwork"
            onClick={() => go(1)}
            style={{
              position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
              width:44, height:44, borderRadius:"50%", border:`1px solid ${th.border}`,
              background:th.surface, color:th.text, cursor:"pointer",
              backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:18, lineHeight:1,
            }}
          >
            ›
          </button>
        </div>

        <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginTop:20 }}>
          {WORKS.map((w, i) => (
            <button
              key={w.id}
              type="button"
              aria-label={`Go to artwork ${i + 1}`}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => setIdx(i)}
              style={{
                width:i === idx ? 22 : 8, height:8, borderRadius:4, padding:0, border:"none",
                background:i === idx ? th.accent : th.textGhost,
                cursor:"pointer", opacity:i === idx ? 1 : 0.45,
                transition:"all 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
