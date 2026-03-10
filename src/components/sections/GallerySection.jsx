import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { Wing } from "../effects/Wing";
import { WORKS } from "../../data/content";

const LAYOUTS = [
  { w:"65%", ml:"10%", mr:"auto", radius:"2px 16px 2px 2px", ratio:"4/3" },
  { w:"45%", ml:"auto", mr:"8%", radius:"16px 2px 2px 2px", ratio:"3/4" },
  { w:"55%", ml:"auto", mr:"auto", radius:"2px", ratio:"4/5" },
  { w:"40%", ml:"12%", mr:"auto", radius:"2px 2px 16px 2px", ratio:"1/1" },
  { w:"55%", ml:"auto", mr:"5%", radius:"2px 2px 2px 16px", ratio:"4/5" },
  { w:"72%", ml:"auto", mr:"auto", radius:"12px", ratio:"16/9" },
  { w:"38%", ml:"auto", mr:"15%", radius:"2px", ratio:"3/4" },
  { w:"52%", ml:"8%", mr:"auto", radius:"2px 16px 16px 2px", ratio:"4/3" },
];

const WorkPiece = ({ work, layout, idx, th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.08 });
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position:"relative", cursor:"pointer", width:layout.w, maxWidth:"94vw",
        marginLeft:layout.ml, marginRight:layout.mr,
        marginBottom:"clamp(50px,9vw,110px)",
        opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(60px)",
        transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
      <div style={{
        borderRadius:layout.radius, overflow:"hidden", position:"relative",
        boxShadow: hov
          ? `${th.cardShadow}, 0 0 50px hsla(${work.hue},25%,${isDark?25:70}%,0.12)`
          : th.cardShadow,
        transition:"box-shadow 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        transform:hov?"scale(1.012)":"scale(1)",
      }}>
        <img src={work.img} alt={work.title} loading="lazy" style={{
          width:"100%", display:"block", aspectRatio:layout.ratio, objectFit:"cover",
          filter: hov ? `brightness(${isDark?0.8:0.92}) saturate(1.1)` : th.imgFilter,
          transition:"transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 0.8s ease",
          transform: work.rotate 
            ? (hov ? `rotate(${work.rotate}) scale(1.05)` : `rotate(${work.rotate}) scale(1.025)`)
            : (hov ? "scale(1.05)" : "scale(1)"),
        }}/>
        <div style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse at 30% 70%, hsla(${work.hue},35%,${isDark?28:60}%,${hov?0.2:0}) 0%, transparent 70%)`,
          transition:"all 0.8s ease", pointerEvents:"none",
        }}/>
        {/* View indicator */}
        <div style={{
          position:"absolute", top:16, right:16, width:32, height:32, borderRadius:"50%",
          background:`${th.surface}`, border:`1px solid ${th.border}`,
          backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
          display:"flex", alignItems:"center", justifyContent:"center",
          opacity:hov?1:0, transform:hov?"scale(1)":"scale(0.6)",
          transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H5M10 2V7" stroke={th.text} strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      {/* Label */}
      <div style={{ marginTop:14, display:"flex", alignItems:"baseline", gap:12, opacity:vis?1:0, transition:"opacity 0.8s ease 0.3s" }}>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textGhost, letterSpacing:"0.15em" }}>
          {String(idx+1).padStart(2,"0")}
        </span>
        <div style={{ flex:1 }}>
          <h3 style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(17px,2.2vw,24px)",
            color:hov?th.text:th.textSoft, fontWeight:500, transition:"color 0.4s", margin:0,
          }}>{work.title}</h3>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:11, color:th.textDim, letterSpacing:"0.05em", margin:"4px 0 0" }}>
            {work.sub}
          </p>
        </div>
        {hov && <Wing size={16} c1={`${th.accent}35`} c2={`${th.accent2}25`} style={{ marginLeft:"auto", opacity:0.5, animation:"fadeIn 0.4s ease", color:th.textDim }} />}
      </div>
    </div>
  );
};

export const GallerySection = ({ th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.1 });
  return (
    <section id="works" style={{ padding:"60px 0 40px" }}>
      <div ref={ref} style={{ padding:"0 28px", marginBottom:56, display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ width:vis?36:0, height:1, background:`${th.accent}35`, transition:"width 0.8s ease" }}/>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, letterSpacing:"0.28em", textTransform:"uppercase", color:th.textDim, opacity:vis?1:0, transition:"opacity 0.6s ease 0.2s" }}>
          Selected Works · {WORKS.length} Pieces
        </span>
      </div>
      <div style={{ padding:"0 28px" }}>
        {WORKS.map((w, i) => <WorkPiece key={w.id} work={w} layout={LAYOUTS[i] || LAYOUTS[0]} idx={i} th={th} isDark={isDark} />)}
      </div>
    </section>
  );
};
