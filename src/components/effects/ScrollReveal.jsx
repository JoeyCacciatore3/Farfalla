/**
 * ScrollReveal - Signature interaction for FarfallaArt
 * 
 * Features:
 * - Parallax artwork reveal
 * - Staggered typography animations  
 * - Intersection Observer performance
 * - Reduced motion support
 */

import { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)';
        case 'down': return 'translateY(-40px)';
        case 'left': return 'translateX(40px)';
        case 'right': return 'translateX(-40px)';
        case 'scale': return 'scale(0.95)';
        case 'fade': return 'translateY(20px)';
        default: return 'translateY(40px)';
      }
    }
    return 'translateY(0px) translateX(0px) scale(1)';
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

export const ParallaxImage = ({ src, alt, speed = 0.5, className = '' }) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const parallax = scrolled * speed;
      
      setOffset(parallax);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};

export const StaggeredReveal = ({ children, staggerDelay = 100 }) => {
  return (
    <>
      {children.map((child, index) => (
        <ScrollReveal
          key={index}
          delay={index * staggerDelay}
          direction="fade"
        >
          {child}
        </ScrollReveal>
      ))}
    </>
  );
};

export default ScrollReveal;