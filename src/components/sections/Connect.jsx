import { useInView } from "../../hooks/useInView";
import { Wing } from "../effects/Wing";
import { SOCIALS, STUDIO_EMAIL } from "../../data/content";

export const Connect = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });

  return (
    <section ref={ref} id="connect" style={{ padding:"72px 28px 56px", maxWidth:540, margin:"0 auto", textAlign:"center" }}>
      <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(35px)", transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
        <Wing size={30} c1={`${th.accent}20`} c2={`${th.accent2}14`} style={{ opacity:0.45, color:th.textDim }} />
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", fontWeight:400, color:th.text, margin:"18px 0 28px" }}>
          Contact
        </h2>

        <a
          href={`mailto:${STUDIO_EMAIL}`}
          style={{
            display:"inline-block",
            padding:"14px 36px",
            border:`1px solid ${th.accent}50`,
            background:"transparent",
            color:th.accent,
            fontFamily:"'Outfit',sans-serif", fontSize:11, fontWeight:500,
            letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none",
            transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = th.accent; e.currentTarget.style.color = th.bg; e.currentTarget.style.borderColor = th.accent; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = th.accent; e.currentTarget.style.borderColor = `${th.accent}50`; }}
        >
          Email Milly
        </a>

        <div style={{ marginTop:44, display:"flex", justifyContent:"center", gap:22, flexWrap:"wrap" }}>
          {SOCIALS.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textDim, textDecoration:"none",
                letterSpacing:"0.16em", textTransform:"uppercase", transition:"color 0.3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = th.accent; }}
              onMouseLeave={e => { e.currentTarget.style.color = th.textDim; }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
