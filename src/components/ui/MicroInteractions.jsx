/**
 * Micro-interactions - Professional UI polish with delightful details
 * 
 * Features:
 * - Magnetic button effects
 * - Smooth hover state transitions
 * - Interactive ripple effects
 * - Professional loading states
 * - Color-reactive feedback
 */

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
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

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
        cursor: 'none', // Use custom paint cursor
        ...style
      }}
    >
      {children}
    </button>
  );
};

export const RippleButton = ({ children, onClick, color = '#c9a84c', className = '', style = {} }) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const createRipple = useCallback((e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    if (onClick) onClick(e);
  }, [onClick]);

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseDown={createRipple}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        ...style
      }}
    >
      {children}
      
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: `${color}40`,
            transform: 'scale(0)',
            animation: 'rippleEffect 0.6s ease-out forwards',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            pointerEvents: 'none'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes rippleEffect {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export const ColorReactiveLink = ({ href, children, baseColor = '#c9a84c', className = '', style = {} }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hue, setHue] = useState(42); // Default gold hue

  useEffect(() => {
    // Extract hue from base color (simplified)
    const hueFromColor = (color) => {
      if (color === '#c9a84c') return 42; // Gold
      if (color === '#40e0ff') return 190; // Cyan
      if (color === '#ff6b6b') return 0; // Red
      return 42; // Default
    };
    
    setHue(hueFromColor(baseColor));
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
        ...style
      }}
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
        borderRadius: 1
      }} />
    </a>
  );
};

export const LoadingSpinner = ({ size = 24, color = '#c9a84c', thickness = 3 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid ${color}20`,
        borderTop: `${thickness}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    >
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export const ProgressiveImage = ({ 
  src, 
  alt, 
  placeholder = '', 
  className = '', 
  style = {},
  onLoad = () => {},
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    onLoad();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div style={{ position: 'relative', ...style }} className={className}>
      {/* Placeholder/loading state */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: placeholder || 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8
        }}>
          {isLoading && <LoadingSpinner />}
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(1.02)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...props}
      />
    </div>
  );
};

export const FloatingActionButton = ({ 
  onClick, 
  children, 
  color = '#c9a84c',
  position = 'fixed',
  bottom = 32,
  right = 32
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <MagneticButton
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsPressed(false);
        setIsHovering(false);
      }}
      style={{
        position,
        bottom,
        right,
        width: 56,
        height: 56,
        borderRadius: 28,
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        border: 'none',
        boxShadow: isHovering 
          ? `0 8px 25px ${color}40, 0 4px 12px ${color}20`
          : `0 4px 15px ${color}30, 0 2px 8px ${color}15`,
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 24,
        zIndex: 1000
      }}
    >
      {children}
    </MagneticButton>
  );
};

export const AnimatedCounter = ({ value, duration = 1000, formatter = (n) => n }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          const startTime = Date.now();
          const startValue = 0;
          const endValue = value;
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (endValue - startValue) * easeOut;
            
            setDisplayValue(Math.floor(currentValue));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, isVisible]);

  return (
    <span ref={counterRef}>
      {formatter(displayValue)}
    </span>
  );
};

export default {
  MagneticButton,
  RippleButton,
  ColorReactiveLink,
  LoadingSpinner,
  ProgressiveImage,
  FloatingActionButton,
  AnimatedCounter
};