import { useState } from "react";
import { useInView } from "../../hooks/useInView";
import { Wing } from "../effects/Wing";
import { SOCIALS } from "../../data/content";
import { isValidExternalHref } from "../../utils/links";

export const Connect = ({ th }) => {
  const [ref, vis] = useInView({ t: 0.15 });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  
  return (
    <section ref={ref} id="connect" style={{ padding:"90px 28px 110px", maxWidth:540, margin:"0 auto", textAlign:"center" }}>
      <div style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(35px)", transition:"all 1.2s cubic-bezier(0.16,1,0.3,1)" }}>
        <Wing size={30} c1={`${th.accent}20`} c2={`${th.accent2}14`} style={{ opacity:0.45, color:th.textDim }} />
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.7rem,4vw,2.6rem)", fontWeight:400, color:th.text, margin:"18px 0 10px" }}>
          Enter the Studio
        </h3>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:13, color:th.textDim, lineHeight:1.8, marginBottom:8 }}>
          New works, process films, and studio dispatches — arriving like a quiet letter.
        </p>
        <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:13, color:`${th.accent}c0`, marginBottom:32 }}>
          benvenuti nello studio.
        </p>
        {sent ? (
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:th.accent, fontStyle:"italic" }}>You&apos;re in. Welcome to the studio.</p>
        ) : (
          /* ✎ CONNECT — Replace with your Formspree/ConvertKit action */
          <div style={{ display:"flex", gap:0, flexWrap:"wrap", justifyContent:"center" }}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
              style={{
                flex:"1 1 200px", padding:"13px 18px", borderRadius:0,
                border:"none", borderBottom:`1px solid ${th.border}`,
                background:"transparent", color:th.text,
                fontFamily:"'Outfit',sans-serif", fontSize:13, outline:"none", transition:"border-color 0.3s",
              }}
              onFocus={e => e.target.style.borderBottomColor = th.accent}
              onBlur={e => e.target.style.borderBottomColor = th.border} />
            <button onClick={() => email.includes("@") && setSent(true)} style={{
              padding:"13px 28px", 
              borderStyle: "solid", borderWidth: "1px 1px 1px 0", borderColor: `${th.accent}30`,
              background:"transparent", color:th.accent, borderRadius:0,
              fontFamily:"'Outfit',sans-serif", fontSize:10, fontWeight:500,
              letterSpacing:"0.16em", textTransform:"uppercase", cursor:"pointer", transition:"all 0.4s",
            }}
            onMouseEnter={e => { e.target.style.background = th.accent; e.target.style.color = th.bg; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = th.accent; }}>
              Subscribe
            </button>
          </div>
        )}
        <div style={{ marginTop:44, display:"flex", justifyContent:"center", gap:22, flexWrap:"wrap" }}>
          {SOCIALS.map(l => {
            const socialStyle = {
              fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textDim, textDecoration:"none",
              letterSpacing:"0.16em", textTransform:"uppercase", transition:"color 0.3s",
            };
            if (isValidExternalHref(l.href)) {
              return (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={socialStyle}
                  onMouseEnter={e => { e.currentTarget.style.color = th.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = th.textDim; }}>
                  {l.label}
                </a>
              );
            }
            return (
              <span key={l.label} aria-disabled="true" style={{ ...socialStyle, cursor:"default", opacity:0.45 }}
                title="Link coming soon">
                {l.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};
