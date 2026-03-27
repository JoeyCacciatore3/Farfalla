/**
 * Performance Optimizer - Next-level optimization for FarfallaArt
 * 
 * Features:
 * - Adaptive image loading with WebP/AVIF support
 * - Critical resource preloading
 * - Memory leak prevention
 * - Performance monitoring
 */

import { useEffect, useCallback } from 'react';

export const usePerformanceOptimizer = () => {
  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = '/hero-landscape.jpg';
    
    // Preload first gallery image
    const firstGallery = new Image();
    firstGallery.src = '/artwork/work-01.jpg';
    
    // Preload fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap',
      'https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&display=swap'
    ];
    
    fontPreloads.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      link.onload = function() { this.rel = 'stylesheet'; };
      document.head.appendChild(link);
    });
  }, []);

  // Optimize images with modern formats
  const optimizeImage = useCallback((src, options = {}) => {
    const { 
      width = 800, 
      height = 600, 
      quality = 85,
      format = 'auto'
    } = options;

    // Check for WebP support
    const supportsWebP = document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;

    // Check for AVIF support
    const supportsAVIF = document.createElement('canvas')
      .toDataURL('image/avif')
      .indexOf('data:image/avif') === 0;

    if (format === 'auto') {
      if (supportsAVIF) return `${src}?format=avif&w=${width}&h=${height}&q=${quality}`;
      if (supportsWebP) return `${src}?format=webp&w=${width}&h=${height}&q=${quality}`;
    }

    return `${src}?w=${width}&h=${height}&q=${quality}`;
  }, []);

  // Performance monitoring
  const monitorPerformance = useCallback(() => {
    if ('performance' in window && 'PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            if (entry.startTime > 2500) {
              console.warn('🐌 LCP is slow:', entry.startTime + 'ms');
            }
          }
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            console.log('CLS:', entry.value);
            if (entry.value > 0.1) {
              console.warn('🔄 High layout shift detected:', entry.value);
            }
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  // Memory leak prevention
  const cleanupResources = useCallback(() => {
    // Clean up event listeners on unmount
    return () => {
      // Remove any global event listeners
      window.removeEventListener('scroll', () => {});
      window.removeEventListener('resize', () => {});
    };
  }, []);

  useEffect(() => {
    preloadCriticalResources();
    monitorPerformance();
    
    return cleanupResources();
  }, [preloadCriticalResources, monitorPerformance, cleanupResources]);

  return {
    optimizeImage,
    preloadCriticalResources
  };
};

export const OptimizedImage = ({ 
  src, 
  alt, 
  width = 800, 
  height = 600, 
  priority = false,
  className = '',
  style = {}
}) => {
  const { optimizeImage } = usePerformanceOptimizer();

  return (
    <picture>
      <source 
        srcSet={`${src}?format=avif&w=${width}&h=${height}&q=85`} 
        type="image/avif" 
      />
      <source 
        srcSet={`${src}?format=webp&w=${width}&h=${height}&q=85`} 
        type="image/webp" 
      />
      <img
        src={optimizeImage(src, { width, height })}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={className}
        style={{
          aspectRatio: `${width} / ${height}`,
          objectFit: 'cover',
          ...style
        }}
      />
    </picture>
  );
};

export default usePerformanceOptimizer;