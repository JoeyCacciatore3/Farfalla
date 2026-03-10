import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { KIT } from "../../data/content";

export const KitSection = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  return (
    <section id="kit" style={{ padding:"60px 0 90px" }}>
      <div ref={ref} style={{ padding:"0 28px", display:"flex", alignItems:"center", gap:14, marginBottom:36 }}>
        <div style={{ width:vis?36:0, height:1, background:`${th.accent}35`, transition:"width 0.8s ease" }}/>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:th.textDim, opacity:vis?1:0, transition:"opacity 0.6s ease 0.2s" }}>
          Studio Kit
        </span>
      </div>
      <div style={{ display:"flex", gap:0, overflowX:"auto", scrollSnapType:"x mandatory", scrollbarWidth:"none", padding:"0 28px" }}>
        {KIT.map((item, i) => {
          const [iRef, iVis] = useInView({ t: 0.1 });
          const [hov, setHov] = useState(false);
          return (
            <a ref={iRef} key={i} href={item.link} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
              style={{
                flex:"0 0 auto", width:"clamp(210px,28vw,280px)", scrollSnapAlign:"start",
                textDecoration:"none", padding:"28px 24px", position:"relative",
                borderLeft:`1px solid ${hov?th.borderHover:th.border}`,
                transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
                opacity:iVis?1:0, transform:iVis?"translateY(0)":"translateY(18px)",
                transitionDelay:`${i*0.05}s`,
              }}>
              <div style={{ position:"absolute", top:0, left:0, width:2, height:hov?"100%":"0%", background:`${th.accent}35`, transition:"height 0.5s cubic-bezier(0.16,1,0.3,1)" }}/>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:500, color:hov?th.text:th.textSoft, margin:"0 0 7px", transition:"color 0.3s" }}>{item.name}</h4>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:12, color:th.textDim, lineHeight:1.6, margin:"0 0 14px", fontStyle:"italic" }}>{item.note}</p>
              <span style={{
                fontFamily:"'Outfit',sans-serif", fontSize:12, color:th.accent, fontWeight:500,
                opacity:hov?1:0, transform:hov?"translateY(0)":"translateY(5px)",
                transition:"all 0.4s ease", display:"inline-flex", alignItems:"center", gap:5,
              }}>
                {item.price}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H4M9 1V6" stroke={th.accent} strokeWidth="1" strokeLinecap="round"/></svg>
              </span>
            </a>
          );
        })}
        <div style={{ flex:"0 0 28px" }}/>
      </div>
    </section>
  );
};
