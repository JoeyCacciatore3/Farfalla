import { useInView } from "../../hooks/useInView";

export const Statement = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.2 });
  return (
    <section ref={ref} style={{ padding:"72px 28px 56px", maxWidth:880, margin:"0 auto", display:"flex", gap:36, alignItems:"flex-start", flexWrap:"wrap" }}>
      <div style={{ flex:"0 0 auto", width:50, paddingTop:10, opacity:vis?1:0, transition:"opacity 1s ease 0.2s" }}>
        <div style={{ width:36, height:1, background:`${th.accent}30` }}/>
      </div>
      <div style={{ flex:"1 1 280px" }}>
        {/*
          ✎ STATEMENT — Emilia writes this in her own words.
          Do NOT auto-generate or pre-fill an artist statement. The site's
          credibility depends on this being her voice. Leave the placeholder
          until she provides text via the daily-email loop.
        */}
        <p style={{
          fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.05rem,2vw,1.3rem)",
          color:th.textDim, fontWeight:300, lineHeight:1.55, margin:0, fontStyle:"italic",
          opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)",
          transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)",
          letterSpacing:"0.02em",
        }}>
          — statement coming soon —
        </p>
        <span aria-hidden="true" style={{
          display:"inline-block", marginTop:24,
          fontFamily:"'Caveat',cursive", fontSize:"clamp(1.5rem,3vw,2rem)",
          color:th.accent, opacity:vis?0.9:0,
          transition:"opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s",
          transform:"rotate(-3deg)",
        }}>
          — Milly
        </span>
      </div>
    </section>
  );
};
