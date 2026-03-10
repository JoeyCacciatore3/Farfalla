import { useEffect, useRef } from "react";

export const Grain = ({ isDark }) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const c = ref.current; 
    if (!c) return;
    
    const ctx = c.getContext("2d");
    c.width = 200; 
    c.height = 200;
    
    const d = ctx.createImageData(200, 200);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255;
      d.data[i] = v; d.data[i+1] = v; d.data[i+2] = v; d.data[i+3] = 10;
    }
    ctx.putImageData(d, 0, 0);
  }, []);
  
  return (
    <canvas 
      ref={ref} 
      style={{ 
        position:"fixed", inset:0, width:"100%", height:"100%", 
        pointerEvents:"none", zIndex:9997, 
        opacity: isDark ? 0.45 : 0.15, 
        mixBlendMode: isDark ? "overlay" : "soft-light" 
      }} 
    />
  );
};
