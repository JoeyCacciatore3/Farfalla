/**
 * Cinematic Navigation - Professional nav with micro-interactions
 * 
 * Features:
 * - Magnetic button effects
 * - Smooth glass morphism design
 * - Color-reactive hover states
 * - Professional animation timing
 * - Enhanced accessibility
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Wing } from "../effects/Wing";
import { SOCIALS } from "../../data/content";
import { MagneticButton, ColorReactiveLink } from "../ui/MicroInteractions";

export const CinematicNav = ({ isDark, toggleTheme, th }) => {
  const [open, setOpen] = useState(false);
  const [hLogo, setHLogo] = useState(false);
  const [hTheme, setHTheme] = useState(false);
  const [hMenu, setHMenu] = useState(false);

  const sections = [
    { label:"Works", id:"works" }, 
    { label:"Milly's Art Room", id:"kit" }, 
    { label:"Connect", id:"connect" },
    { label:"Sicilia", path:"/sicilia" },
  ];

  return (
    <>
      {/* Enhanced Logo with magnetic effect */}
      <Link to="/" aria-label="Back to top"
        onClick={() => window.scrollTo(0, 0)}
        onMouseEnter={() => setHLogo(true)}
        onMouseLeave={() => setHLogo(false)}
        style={{
          position: "fixed",
          top: 28,
          left: 28,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 20px",
          borderRadius: 24,
          background: hLogo 
            ? `${th.navBg}FA`
            : `${th.navBg}F0`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${hLogo ? th.borderHover : th.border}`,
          textDecoration: "none",
          transform: hLogo ? "translateY(-1px) scale(1.02)" : "translateY(0) scale(1)",
          boxShadow: hLogo 
            ? `0 8px 32px ${th.accent}15, 0 4px 16px ${th.accent}08`
            : `0 4px 20px ${isDark ? '#00000030' : '#00000015'}`,
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          cursor: "none" // Use custom paint cursor
        }}
      >
        <div style={{
          transform: hLogo ? "rotate(360deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
        }}>
          <Wing color={th.accent} size={22} />
        </div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 14,
          fontWeight: 600,
          background: isDark 
            ? "linear-gradient(135deg, #FFB6C1, #FFC0CB)"
            : "linear-gradient(135deg, #FF69B4, #FFB6C1)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "0.02em",
          opacity: hLogo ? 1 : 0.9,
          transition: "opacity 0.3s ease"
        }}>
          Milly Farfalla
        </span>
      </Link>

      {/* Enhanced Theme Toggle with magnetic effect */}
      <MagneticButton
        onClick={toggleTheme}
        onMouseEnter={() => setHTheme(true)}
        onMouseLeave={() => setHTheme(false)}
        style={{
          position: "fixed",
          top: 28,
          right: open ? 320 : 98,
          zIndex: 1000,
          width: 48,
          height: 48,
          borderRadius: 24,
          border: `1px solid ${hTheme ? th.borderHover : th.border}`,
          background: hTheme 
            ? `${th.navBg}FA`
            : `${th.navBg}F0`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: th.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: hTheme 
            ? `0 8px 32px ${th.accent}15, 0 4px 16px ${th.accent}08`
            : `0 4px 20px ${isDark ? '#00000030' : '#00000015'}`,
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <span style={{
          transform: hTheme ? "rotate(180deg) scale(1.1)" : "rotate(0deg) scale(1)",
          transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)"
        }}>
          {isDark ? "☀️" : "🌙"}
        </span>
      </MagneticButton>

      {/* Enhanced Menu Toggle */}
      <MagneticButton
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHMenu(true)}
        onMouseLeave={() => setHMenu(false)}
        style={{
          position: "fixed",
          top: 28,
          right: 28,
          zIndex: 1001,
          width: 48,
          height: 48,
          borderRadius: 24,
          border: `1px solid ${hMenu || open ? th.borderHover : th.border}`,
          background: hMenu || open 
            ? `${th.navBg}FA`
            : `${th.navBg}F0`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          color: th.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          boxShadow: hMenu || open 
            ? `0 8px 32px ${th.accent}15, 0 4px 16px ${th.accent}08`
            : `0 4px 20px ${isDark ? '#00000030' : '#00000015'}`,
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <div style={{
          width: 18,
          height: 14,
          position: "relative",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
        }}>
          <span style={{
            position: "absolute",
            left: 0,
            top: open ? 6 : 0,
            width: 18,
            height: 2,
            background: th.text,
            borderRadius: 1,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
          }} />
          <span style={{
            position: "absolute",
            left: 0,
            top: 6,
            width: 18,
            height: 2,
            background: th.text,
            borderRadius: 1,
            opacity: open ? 0 : 1,
            transform: open ? "translateX(20px)" : "translateX(0)",
            transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
          }} />
          <span style={{
            position: "absolute",
            left: 0,
            top: open ? 6 : 12,
            width: 18,
            height: 2,
            background: th.text,
            borderRadius: 1,
            transform: open ? "rotate(0deg)" : "rotate(0deg)",
            transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
          }} />
        </div>
      </MagneticButton>

      {/* Enhanced Slide-out Menu */}
      <aside style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: 280,
        height: "100vh",
        background: isDark 
          ? "rgba(10, 9, 8, 0.98)" 
          : "rgba(247, 244, 238, 0.98)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderLeft: `1px solid ${th.border}`,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        zIndex: 999,
        display: "flex",
        flexDirection: "column",
        padding: "100px 32px 40px",
        boxShadow: open ? `0 0 80px ${isDark ? '#00000060' : '#00000030'}` : "none"
      }}>
        
        {/* Enhanced Navigation Links */}
        <nav style={{ marginBottom: 40 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {sections.map((item, i) => {
              const isActive = item.path ? location.pathname === item.path : false;
              const delay = i * 0.1;
              
              return (
                <li key={item.label} style={{
                  marginBottom: 20,
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(30px)",
                  transition: `opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${delay}s`
                }}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block",
                        padding: "12px 20px",
                        borderRadius: 12,
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 16,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? th.accent : th.text,
                        textDecoration: "none",
                        background: isActive ? `${th.accent}08` : "transparent",
                        border: `1px solid ${isActive ? th.accent : "transparent"}`,
                        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        cursor: "none"
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      style={{
                        display: "block",
                        padding: "12px 20px",
                        borderRadius: 12,
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: 16,
                        fontWeight: 500,
                        color: th.text,
                        textDecoration: "none",
                        background: "transparent",
                        border: `1px solid transparent`,
                        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
                        cursor: "pointer"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `${th.accent}12`;
                        e.target.style.borderColor = `${th.accent}40`;
                        e.target.style.color = isDark ? '#FFB6C1' : '#FF69B4';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.borderColor = "transparent";
                        e.target.style.color = th.text;
                      }}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Enhanced Social Links */}
        <div style={{
          marginTop: "auto",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s, transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.4s"
        }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: th.textDim,
            marginBottom: 16,
            fontWeight: 500
          }}>
            Connect
          </p>
          
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12
          }}>
            {SOCIALS.map((social) => (
              <ColorReactiveLink
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  background: `${th.surface}80`,
                  border: `1px solid ${th.border}`,
                  transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)"
                }}
              >
                {social.label}
              </ColorReactiveLink>
            ))}
          </div>
        </div>
      </aside>

      {/* Enhanced Backdrop */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: `${isDark ? '#000000' : '#ffffff'}40`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 998,
            opacity: open ? 1 : 0,
            transition: "opacity 0.4s ease"
          }}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default CinematicNav;