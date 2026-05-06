import { useState, useRef, useCallback, useEffect } from 'react';

export const MagneticButton = ({ children, onClick, className = '', style = {}, strength = 20 }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const factor = strength / 130;
    setPosition({ x: (e.clientX - centerX) * factor, y: (e.clientY - centerY) * factor });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 1.02 : 1})`,
        transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'none',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export const ColorReactiveLink = ({ href, children, baseColor = '#c9a84c', className = '', style = {}, ...rest }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hue, setHue] = useState(42);

  useEffect(() => {
    const map = { '#c9a84c': 42, '#40e0ff': 190, '#ff6b6b': 0 };
    setHue(map[baseColor] ?? 42);
  }, [baseColor]);

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        position: 'relative',
        color: isHovering ? `hsl(${hue}, 60%, 55%)` : `hsl(${hue}, 45%, 65%)`,
        textDecoration: 'none',
        transition: 'color 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
      <span style={{
        position: 'absolute',
        bottom: -2,
        left: 0,
        width: isHovering ? '100%' : '0%',
        height: 2,
        background: `linear-gradient(90deg, hsl(${hue}, 60%, 55%), hsl(${hue + 20}, 55%, 60%))`,
        transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        borderRadius: 1,
      }}/>
    </a>
  );
};
