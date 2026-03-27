/**
 * Signature Interaction - The "viral moment" for FarfallaArt
 * 
 * Features:
 * - Interactive paint brush cursor
 * - Color-reactive hover states
 * - Artwork comes alive on interaction
 * - Screenshot-worthy moments
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export const PaintBrushCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [trailColors, setTrailColors] = useState([]);
  const cursorRef = useRef(null);

  const updatePosition = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsActive(true);
    // Add color to trail on click
    const colors = ['#c9a84c', '#40e0ff', '#ff4081', '#7c4dff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTrailColors(prev => [...prev.slice(-8), { 
      color: randomColor, 
      x: position.x, 
      y: position.y,
      id: Date.now() 
    }]);
  }, [position]);

  const handleMouseUp = useCallback(() => {
    setIsActive(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updatePosition, handleMouseDown, handleMouseUp]);

  // Auto-fade trail colors
  useEffect(() => {
    const interval = setInterval(() => {
      setTrailColors(prev => prev.slice(1));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: position.x - 12,
          top: position.y - 12,
          width: 24,
          height: 24,
          pointerEvents: 'none',
          zIndex: 9999,
          background: isActive 
            ? 'radial-gradient(circle, rgba(201,168,76,0.8) 0%, rgba(201,168,76,0.2) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.1) 70%, transparent 100%)',
          borderRadius: '50%',
          transform: `scale(${isActive ? 1.5 : 1})`,
          transition: 'transform 0.2s ease, background 0.2s ease',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Paint trail */}
      {trailColors.map((trail, index) => (
        <div
          key={trail.id}
          style={{
            position: 'fixed',
            left: trail.x - 6,
            top: trail.y - 6,
            width: 12,
            height: 12,
            background: trail.color,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            opacity: (index + 1) / trailColors.length * 0.7,
            transform: `scale(${(index + 1) / trailColors.length})`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            mixBlendMode: 'multiply'
          }}
        />
      ))}
    </>
  );
};

export const InteractiveArtwork = ({ src, alt, className = '' }) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const artworkRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!artworkRef.current) return;
    
    const rect = artworkRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setHoverPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <div
      ref={artworkRef}
      className={className}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        cursor: 'none'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: isHovering 
            ? `scale(1.02) translateX(${(hoverPosition.x - 0.5) * 10}px) translateY(${(hoverPosition.y - 0.5) * 10}px)`
            : 'scale(1)',
          transition: 'transform 0.3s ease',
          filter: isHovering 
            ? `brightness(1.1) saturate(1.2) hue-rotate(${hoverPosition.x * 10 - 5}deg)`
            : 'brightness(1) saturate(1)',
        }}
        loading="lazy"
        decoding="async"
      />
      
      {/* Color overlay effect */}
      {isHovering && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${hoverPosition.x * 100}% ${hoverPosition.y * 100}%, 
              rgba(201,168,76,0.15) 0%, 
              rgba(201,168,76,0.05) 30%, 
              transparent 60%)`,
            pointerEvents: 'none',
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
};

export const ColorHarmonyButton = ({ children, hue = 200, onClick, className = '' }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={className}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        background: `linear-gradient(135deg, 
          hsl(${hue}, 45%, 85%) 0%, 
          hsl(${hue + 20}, 50%, 90%) 100%)`,
        border: `2px solid hsl(${hue}, 60%, 70%)`,
        transform: isPressed ? 'scale(0.98) translateY(1px)' : 'scale(1) translateY(0px)',
        transition: 'all 0.15s ease',
        boxShadow: isPressed 
          ? `0 2px 8px hsla(${hue}, 40%, 60%, 0.3)`
          : `0 4px 12px hsla(${hue}, 40%, 60%, 0.4)`,
        cursor: 'none' // Use custom cursor
      }}
    >
      {children}
    </button>
  );
};

export default PaintBrushCursor;