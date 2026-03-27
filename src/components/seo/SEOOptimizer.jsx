/**
 * SEO Optimizer - World-class SEO for FarfallaArt
 * 
 * Features:
 * - Dynamic meta tags
 * - Open Graph optimization
 * - Schema.org structured data
 * - Performance tracking
 */

import { useEffect } from 'react';

export const useSEO = ({
  title = 'Farfalla Portfolio - Sicilian Artist',
  description = 'Discover the vibrant artwork of a Sicilian artist. Original paintings capturing the beauty and spirit of Sicily.',
  image = '/hero-landscape.jpg',
  url = 'https://joeycacciatore3.github.io/Farfalla/',
  type = 'website'
} = {}) => {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) || 
                 document.querySelector(`meta[property="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', 'art, sicily, painting, portfolio, artist, italian art');

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', `${url}${image}`);
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Farfalla Portfolio');
    updateMetaTag('og:locale', 'en_US');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `${url}${image}`);

    // Additional meta tags
    updateMetaTag('author', 'Farfalla Artist');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

  }, [title, description, image, url, type]);
};

export const StructuredData = () => {
  useEffect(() => {
    // Remove existing structured data
    const existingScript = document.querySelector('#structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "VisualArtwork",
      "name": "Farfalla Portfolio",
      "description": "Original paintings by a Sicilian artist capturing the beauty and spirit of Sicily",
      "creator": {
        "@type": "Person",
        "name": "Farfalla Artist",
        "nationality": "Italian",
        "birthPlace": "Sicily, Italy"
      },
      "artform": "Painting",
      "artMedium": "Oil on Canvas",
      "contentLocation": {
        "@type": "Place",
        "name": "Sicily, Italy"
      },
      "image": [
        "https://joeycacciatore3.github.io/Farfalla/hero-landscape.jpg",
        "https://joeycacciatore3.github.io/Farfalla/artwork/work-01.jpg",
        "https://joeycacciatore3.github.io/Farfalla/artwork/work-02.jpg"
      ],
      "url": "https://joeycacciatore3.github.io/Farfalla/",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://joeycacciatore3.github.io/Farfalla/"
      },
      "dateCreated": "2026",
      "inLanguage": "en-US",
      "genre": "Landscape Art",
      "artworkSurface": "Canvas"
    };

    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('#structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const CanonicalLink = ({ url }) => {
  useEffect(() => {
    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.appendChild(canonical);

    return () => {
      const canonicalToRemove = document.querySelector('link[rel="canonical"]');
      if (canonicalToRemove) {
        canonicalToRemove.remove();
      }
    };
  }, [url]);

  return null;
};

export const PreloadCriticalResources = () => {
  useEffect(() => {
    const criticalResources = [
      { href: '/hero-landscape.jpg', as: 'image', type: 'image/jpeg' },
      { href: '/artwork/work-01.jpg', as: 'image', type: 'image/jpeg' },
      { href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap', as: 'style' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      criticalResources.forEach(resource => {
        const linkToRemove = document.querySelector(`link[href="${resource.href}"]`);
        if (linkToRemove) {
          linkToRemove.remove();
        }
      });
    };
  }, []);

  return null;
};

export const SitemapGenerator = () => {
  useEffect(() => {
    // Generate dynamic sitemap data (for static site this would be build-time)
    const pages = [
      { url: '/', priority: '1.0', changefreq: 'weekly' },
      { url: '/sicilia', priority: '0.8', changefreq: 'monthly' }
    ];

    console.log('Sitemap data generated:', pages);
  }, []);

  return null;
};

export default useSEO;