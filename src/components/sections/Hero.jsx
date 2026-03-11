import { useInView } from "../../hooks/useInView";
import { Wing } from "../effects/Wing";

export const Hero = ({ scrollY, th, isDark }) => {
  const [ref, vis] = useInView({ t: 0.05 });
  const fade = Math.max(0, 1 - scrollY / 700);

  return (
    <section ref={ref} id="top" style={{
      minHeight:"100vh", display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center", position:"relative",
      padding:"60px 24px", overflow:"hidden",
    }}>
      {/* Decorative oversized mark */}
      <span aria-hidden="true" style={{
        position:"absolute", top:"10%", right:"8%",
        fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(80px,18vw,220px)",
        fontWeight:300, color: isDark ? "#ffffff04" : "#00000004", lineHeight:1, pointerEvents:"none",
        opacity:vis?1:0, transition:"opacity 2s ease 0.3s", userSelect:"none",
      }}>✦</span>

      <div style={{ position:"relative", zIndex:2, textAlign:"center", opacity:fade, transition:"opacity 0.1s linear" }}>

        {/* ✎ HERO — Subtitle */}
        <div style={{ overflow:"hidden", marginBottom:12 }}>
          <p style={{
            fontFamily:"'Outfit',sans-serif", fontSize:11, letterSpacing:"0.4em",
            textTransform:"uppercase", color:th.textDim,
            transform:vis?"translateY(0)":"translateY(100%)",
            transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}>Oil · Mixed Media · Watercolor</p>
        </div>

        {/* ✎ HERO — Artist name clipped with artwork */}
        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:"clamp(4rem,15vw,13rem)",
          fontWeight:600, lineHeight:0.88, margin:"0 0 8px",
          backgroundImage:`url('artwork/header_bg.jpg')`,
          backgroundSize:"cover", backgroundPosition:"center",
          WebkitBackgroundClip:"text", backgroundClip:"text",
          WebkitTextFillColor: "transparent",
          filter:vis?"none":"blur(20px)",
          opacity:0.9,
          transition:"all 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>Farfalla</h1>

        {/* Accent line */}
        <div style={{ width:vis?60:0, height:1, background:`${th.accent}40`, margin:"20px auto", transition:"width 1s ease 0.8s" }}/>

        {/* ✎ HERO — Tagline */}
        <div style={{ overflow:"hidden" }}>
          <p style={{
            fontFamily:"'Cormorant Garamond',serif",
            fontSize:"clamp(1rem,2.5vw,1.5rem)",
            color:th.textSoft, fontWeight:300, fontStyle:"italic", letterSpacing:"0.06em",
            transform:vis?"translateY(0)":"translateY(100%)",
            transition:"transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s",
          }}>Painted worlds, one stroke at a time</p>
        </div>

        {/* Butterfly icon */}
        <div style={{ marginTop:48, opacity:vis?1:0, transition:"opacity 1s ease 1.2s", animation:vis?"gentleFloat 6s ease-in-out infinite":"none" }}>
          <Wing size={44} c1={`${th.accent}50`} c2={`${th.accent2}40`} style={{ color:th.textDim }} />
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
        opacity:vis && scrollY < 50 ? 0.3 : 0, transition:"opacity 0.6s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
      }}>
        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:8, letterSpacing:"0.25em", textTransform:"uppercase", color:th.textDim, writingMode:"vertical-lr" }}>Scroll</span>
        <div style={{ width:1, height:28, background:`linear-gradient(${th.textDim}60, transparent)`, animation:"scrollPulse 2s ease-in-out infinite" }}/>
      </div>
    </section>
  );
};
