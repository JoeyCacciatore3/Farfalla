import { useEffect, useRef } from "react";

const TRAIL_COLORS = [
  "#E8751A", "#D46A15", "#F4A830", "#C94E2B", "#E89040", // Monarch oranges
  "#8B5CF6", "#A78BFA", "#7C3AED",                       // Purples
  "#F472B6", "#EC4899",                                    // Pinks
  "#34D399", "#10B981",                                    // Greens
  "#60A5FA", "#3B82F6",                                    // Blues
  "#FBBF24", "#F59E0B",                                    // Golds
];

const drawMiniButterfly = (ctx, x, y, size, angle, color, alpha) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  const s = size;

  // Left upper wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s*1.2, -s*1.8, -s*2.4, -s*2, -s*2, -s*0.8);
  ctx.bezierCurveTo(-s*1.6, s*0.2, -s*0.4, s*0.3, 0, 0);
  ctx.fillStyle = color;
  ctx.fill();

  // Right upper wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s*1.2, -s*1.8, s*2.4, -s*2, s*2, -s*0.8);
  ctx.bezierCurveTo(s*1.6, s*0.2, s*0.4, s*0.3, 0, 0);
  ctx.fill();

  // Left lower wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-s*0.8, s*0.6, -s*1.6, s*1.6, -s*1.1, s*1.2);
  ctx.bezierCurveTo(-s*0.6, s*0.8, -s*0.1, s*0.2, 0, 0);
  ctx.globalAlpha = alpha * 0.8;
  ctx.fill();

  // Right lower wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(s*0.8, s*0.6, s*1.6, s*1.6, s*1.1, s*1.2);
  ctx.bezierCurveTo(s*0.6, s*0.8, s*0.1, s*0.2, 0, 0);
  ctx.fill();

  // Body
  ctx.beginPath();
  ctx.ellipse(0, 0, s*0.15, s*0.7, 0, 0, Math.PI*2);
  ctx.fillStyle = "#1a1008";
  ctx.globalAlpha = alpha * 0.6;
  ctx.fill();

  ctx.restore();
};

export const PaintCanvas = () => {
  const ref = useRef(null);
  const pts = useRef([]);
  const raf = useRef(null);
  const spawnTimer = useRef(0);
  const mouse = useRef({ x: -100, y: -100, isDown: false, phase: 0 });

  useEffect(() => {
    const c = ref.current; 
    if (!c) return;
    
    const ctx = c.getContext("2d");
    let w, h;
    
    const resize = () => { 
      w = c.width = window.innerWidth; 
      h = c.height = window.innerHeight; 
    };
    resize(); 
    window.addEventListener("resize", resize);

    const onMove = e => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      spawnTimer.current++;
      // Spawn a butterfly every 3rd move event for better spacing
      if (spawnTimer.current % 3 !== 0) return;
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      pts.current.push({
        x: e.clientX + (Math.random()-.5)*20,
        y: e.clientY + (Math.random()-.5)*20,
        size: Math.random()*3 + 2.5,
        vx: (Math.random()-.5)*1.4,
        vy: Math.random()*-1.8 - 0.4,
        life: 1,
        color,
        angle: Math.random()*Math.PI*2,
        rotSpeed: (Math.random()-.5)*0.06,
        wingPhase: Math.random()*Math.PI*2,
      });
      if (pts.current.length > 50) pts.current.splice(0, 5);
    };
    window.addEventListener("mousemove", onMove);

    // Also support touch
    const onTouch = e => {
      const touch = e.touches[0]; 
      if (!touch) return;
      mouse.current.x = touch.clientX;
      mouse.current.y = touch.clientY;
      
      const color = TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)];
      pts.current.push({
        x: touch.clientX + (Math.random()-.5)*24,
        y: touch.clientY + (Math.random()-.5)*24,
        size: Math.random()*3.5 + 2.5,
        vx: (Math.random()-.5)*2,
        vy: Math.random()*-2 - 0.5,
        life: 1,
        color,
        angle: Math.random()*Math.PI*2,
        rotSpeed: (Math.random()-.5)*0.08,
        wingPhase: Math.random()*Math.PI*2,
      });
      if (pts.current.length > 50) pts.current.splice(0, 5);
    };
    window.addEventListener("touchmove", onTouch, { passive: true });

    const onDown = () => mouse.current.isDown = true;
    const onUp = () => mouse.current.isDown = false;
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchend", onUp);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      pts.current = pts.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.006;
        p.vx *= 0.998;
        p.life -= 0.01;
        p.angle += p.rotSpeed;
        p.wingPhase += 0.12;
        p.size *= 0.998;
        if (p.life <= 0) return false;

        // Wing flap: oscillate the size slightly to mimic flutter
        const flutter = 0.7 + Math.sin(p.wingPhase) * 0.3;
        drawMiniButterfly(ctx, p.x, p.y, p.size * flutter, p.angle, p.color, p.life * 0.55);
        return true;
      });

      // Draw the main cursor butterfly
      if (mouse.current.x !== -100) {
        const speed = mouse.current.isDown ? 0.45 : 0.08;
        mouse.current.phase += speed;
        const mainFlutter = 0.6 + Math.sin(mouse.current.phase) * 0.4;
        drawMiniButterfly(ctx, mouse.current.x, mouse.current.y, 4, -Math.PI / 8, "#E8751A", 0.95);
      }

      raf.current = requestAnimationFrame(tick);
    };
    tick();
    
    return () => { 
      window.removeEventListener("resize", resize); 
      window.removeEventListener("mousemove", onMove); 
      window.removeEventListener("touchmove", onTouch); 
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchend", onUp);
      cancelAnimationFrame(raf.current); 
    };
  }, []);
  
  return <canvas ref={ref} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:2147483647 }} />;
};
