import { WORKS } from "../../data/content";

export const AmbientBg = ({ scrollY, isDark, th }) => {
  const idx = Math.min(Math.floor(scrollY / 600), WORKS.length - 1);
  const hue = WORKS[idx]?.hue || 35;
  
  return (
    <div style={{
      position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
      background: isDark
        ? `radial-gradient(ellipse 80% 60% at 50% 40%, hsla(${hue},18%,8%,1) 0%, ${th.bg} 100%)`
        : `radial-gradient(ellipse 80% 60% at 50% 40%, hsla(${hue},12%,92%,1) 0%, ${th.bg} 100%)`,
      transition:"background 2s ease",
    }}/>
  );
};
