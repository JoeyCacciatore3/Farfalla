import { useState } from "react";
import { Wing } from "../effects/Wing";
import { SOCIALS } from "../../data/content";

export const Nav = ({ scrollY, isDark, toggleTheme, th }) => {
  const [open, setOpen] = useState(false);
  const [hLogo, setHLogo] = useState(false);
  const [hTheme, setHTheme] = useState(false);
  const [hMenu, setHMenu] = useState(false);
  const show = scrollY > 80;
  
  const sections = [
    { label:"Works", id:"works" }, 
    { label:"Process", id:"process" },
    { label:"Studio Kit", id:"kit" }, 
    { label:"Connect", id:"connect" },
  ];

  return (
    <>
      {/* Logo */}
      <a href="#top" aria-label="Back to top"
        onMouseEnter={() => setHLogo(true)}
        onMouseLeave={() => setHLogo(false)}
        style={{
        position:"fixed", top:22, left:24, zIndex:10003,
        textDecoration:"none", display:"flex", alignItems:"center", gap:9,
        transition:"all 0.5s ease",
        transform: hLogo ? "scale(1.02)" : "scale(1)",
      }}>
        <Wing size={20} c1={th.accent} c2={th.accent2} style={{ color:th.textDim, filter: hLogo ? `drop-shadow(0 0 8px ${th.accent}80)` : "none", transition:"filter 0.4s ease" }} />
        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, fontWeight:600, color:th.text, letterSpacing:"0.04em", textShadow: hLogo ? `0 0 15px ${th.accent}90` : "none", transition:"text-shadow 0.4s ease" }}>
          Farfalla
        </span>
      </a>

      {/* Top-right controls */}
      <div style={{
        position:"fixed", top:22, right:24, zIndex:10003,
        display:"flex", alignItems:"center", gap:8,
        transition:"opacity 0.5s ease",
      }}>
        {/* Theme toggle */}
        <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onMouseEnter={() => setHTheme(true)}
          onMouseLeave={() => setHTheme(false)}
          style={{
          background:th.surface, border:`1px solid ${hTheme ? th.borderHover : th.border}`, borderRadius:40,
          padding:"7px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:7,
          backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", transition:"all 0.4s",
          boxShadow: hTheme ? `0 0 20px ${th.accent}40` : "none",
          transform: hTheme ? "translateY(-1px)" : "none",
        }}>
          <Wing size={16} c1={th.accent} c2={th.accent2} style={{ color:th.textDim }} />
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, letterSpacing:"0.14em", textTransform:"uppercase", color:hTheme ? th.text : th.textDim, transition:"color 0.4s" }}>
            {isDark ? "Light" : "Dark"}
          </span>
        </button>

        {/* Menu button */}
        <button onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}
          onMouseEnter={() => setHMenu(true)}
          onMouseLeave={() => setHMenu(false)}
          style={{
          background:th.surface, border:`1px solid ${hMenu ? th.borderHover : th.border}`, borderRadius:40,
          padding:"7px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:8,
          backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", transition:"all 0.4s",
          boxShadow: hMenu ? `0 0 20px ${th.accent}40` : "none",
          transform: hMenu ? "translateY(-1px)" : "none",
        }}>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:9, letterSpacing:"0.16em", textTransform:"uppercase", color:hMenu ? th.text : th.textDim, transition:"color 0.4s" }}>
            {open ? "Close" : "Menu"}
          </span>
          <div style={{ width:14, height:9, display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
            <span style={{ display:"block", width:14, height:1, background:hMenu ? th.text : th.textDim, transition:"all 0.3s", transform:open?"rotate(45deg) translate(2.5px,2.5px)":"none" }} />
            <span style={{ display:"block", width:8, height:1, background:hMenu ? th.text : th.textDim, transition:"all 0.3s", opacity:open?0:1, marginLeft:"auto" }} />
            <span style={{ display:"block", width:14, height:1, background:hMenu ? th.text : th.textDim, transition:"all 0.3s", transform:open?"rotate(-45deg) translate(2.5px,-2.5px)":"none" }} />
          </div>
        </button>
      </div>

      {/* Full overlay menu */}
      <div style={{
        position:"fixed", inset:0, zIndex:10001,
        background:th.overlayBg, backdropFilter:"blur(40px)", WebkitBackdropFilter:"blur(40px)",
        display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:6,
        opacity:open?1:0, pointerEvents:open?"all":"none",
        transition:"opacity 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,6vw,4.5rem)",
            color:th.text, textDecoration:"none", fontWeight:300,
            opacity:open?1:0, transform:open?"translateY(0)":"translateY(30px)",
            transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.08+0.12}s`,
            padding:"6px 0", position:"relative", lineHeight:1.2,
          }}
          onMouseEnter={e => e.target.style.color = th.accent}
          onMouseLeave={e => e.target.style.color = th.text}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textGhost, letterSpacing:"0.15em", position:"absolute", left:-36, top:"50%", transform:"translateY(-50%)" }}>
              {String(i+1).padStart(2,"0")}
            </span>
            {s.label}
          </a>
        ))}
        <div style={{ marginTop:36, display:"flex", gap:20, flexWrap:"wrap", justifyContent:"center" }}>
          {SOCIALS.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily:"'Outfit',sans-serif", fontSize:10, color:th.textDim, textDecoration:"none",
              letterSpacing:"0.15em", textTransform:"uppercase", transition:"color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = th.accent}
            onMouseLeave={e => e.target.style.color = th.textDim}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
