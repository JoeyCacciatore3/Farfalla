import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { KIT } from "../../data/content";

const KitItem = ({ item, i, th }) => {
  const [iRef, iVis] = useInView({ t: 0.1 });
  const [hov, setHov] = useState(false);
  return (
    <div
      ref={iRef}
      role="group"
      aria-label={item.name}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex:"0 0 auto", width:"clamp(210px,28vw,280px)", scrollSnapAlign:"start",
        padding:"28px 24px", position:"relative",
        borderLeft:`1px solid ${hov?th.borderHover:th.border}`,
        transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
        opacity:iVis?1:0, transform:iVis?"translateY(0)":"translateY(18px)",
        transitionDelay:`${i*0.05}s`,
      }}
    >
      <div style={{ position:"absolute", top:0, left:0, width:2, height:hov?"100%":"0%", background:`${th.accent}35`, transition:"height 0.5s cubic-bezier(0.16,1,0.3,1)" }}/>
      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, color:hov?th.text:th.textSoft, margin:"0 0 7px", transition:"color 0.3s" }}>{item.name}</h3>
      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:th.textDim, lineHeight:1.6, margin:0, fontStyle:"italic" }}>{item.note}</p>
    </div>
  );
};

export const KitSection = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });

  // Honest empty state. The previous KIT array was AI-fabricated brand names
  // for an oil-only painter; Milly works in many media (confirmed 2026-05-15)
  // so the inventory stays blank until she lists what's actually on her table.
  const hasKit = KIT.length > 0;

  return (
    <section id="kit" style={{ padding:"56px 0 72px" }}>
      <div ref={ref} style={{ padding:"0 28px", marginBottom:36 }}>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:vis?36:0, height:1, background:`${th.accent}35`, transition:"width 0.8s ease" }}/>
          <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:th.textDim, opacity:vis?1:0, transition:"opacity 0.6s ease 0.2s", fontWeight:400, margin:0 }}>
            Studio
          </h2>
        </div>
        {hasKit ? null : (
          <p style={{
            fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontWeight:400,
            fontSize:"clamp(0.95rem,1.4vw,1.05rem)", color:th.textDim, margin:"14px 0 0",
            maxWidth:520, lineHeight:1.5,
            opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(8px)",
            transition:"all 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}>
            — more soon —
          </p>
        )}
      </div>
      {hasKit && (
        <div style={{ display:"flex", gap:0, overflowX:"auto", scrollSnapType:"x mandatory", scrollbarWidth:"none", padding:"0 28px" }}>
          {KIT.map((item, i) => (
            <KitItem key={i} item={item} i={i} th={th} />
          ))}
          <div style={{ flex:"0 0 28px" }}/>
        </div>
      )}
    </section>
  );
};
