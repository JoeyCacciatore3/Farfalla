/**
 * Runtime SEO helpers.
 *
 * Static foundation (title, description, OG, Twitter, canonical, Person + WebSite
 * structured data) lives in index.html so crawlers and social previews see it
 * without executing JS. The hooks here update meta tags client-side when route
 * or content changes, and inject an ImageGallery JSON-LD for the works.
 */

import { useEffect } from 'react';
import { WORKS } from '../../data/content';

const SITE_URL = 'https://millyfarfalla.com';
const SITE_NAME = 'Milly Farfalla';

const setMeta = (key, content) => {
  const isProperty = key.startsWith('og:') || key.startsWith('article:');
  const selector = isProperty
    ? `meta[property="${key}"]`
    : `meta[name="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(isProperty ? 'property' : 'name', key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

export const useSEO = ({
  title,
  description,
  image = '/hero-landscape.jpg',
  path = '/',
  type = 'website',
} = {}) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      setMeta('description', description);
      setMeta('og:description', description);
      setMeta('twitter:description', description);
    }
    if (title) {
      setMeta('og:title', title);
      setMeta('twitter:title', title);
    }
    const fullUrl = `${SITE_URL}${path}`;
    const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    setMeta('og:url', fullUrl);
    setMeta('og:image', fullImage);
    setMeta('og:site_name', SITE_NAME);
    setMeta('og:type', type);
    setMeta('twitter:image', fullImage);
    setMeta('twitter:card', 'summary_large_image');
  }, [title, description, image, path, type]);
};

export const CanonicalLink = ({ path = '/' }) => {
  useEffect(() => {
    const href = `${SITE_URL}${path}`;
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.rel = 'canonical';
      document.head.appendChild(el);
    }
    el.href = href;
  }, [path]);
  return null;
};

/**
 * Inject an ImageGallery + per-artwork VisualArtwork structured data block.
 * Person + WebSite are already declared statically in index.html.
 */
export const StructuredData = () => {
  useEffect(() => {
    const id = 'structured-data-gallery';
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    // Per-painting VisualArtwork JSON-LD. Fields are emitted ONLY when we have
    // verified data. `artMedium` / `artworkSurface` were previously hardcoded
    // to "Oil paint" / "Canvas" — that was AI-fabricated narrowing of Milly's
    // practice and is now omitted until she confirms each piece. Search engines
    // tolerate a sparse VisualArtwork; they do not tolerate fabricated facts.
    const data = {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Milly Farfalla — Works',
      url: `${SITE_URL}/`,
      author: { '@id': `${SITE_URL}/#person` },
      image: WORKS.map((w) => {
        const piece = {
          '@type': 'VisualArtwork',
          '@id': `${SITE_URL}/#${w.img}`,
          name: w.title,
          creator: { '@id': `${SITE_URL}/#person` },
          artform: 'Painting',
          contentUrl: `${SITE_URL}/${w.lightbox}.webp`,
          thumbnailUrl: `${SITE_URL}/${w.gallery}.webp`,
        };
        // Only emit medium/surface when the data file says so.
        if (w.medium) piece.artMedium = w.medium;
        return piece;
      }),
    };

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      const toRemove = document.getElementById(id);
      if (toRemove) toRemove.remove();
    };
  }, []);
  return null;
};

export const PreloadCriticalResources = () => {
  useEffect(() => {
    const resources = [
      { href: '/artwork/optimized/hero-lightbox.webp', as: 'image', type: 'image/webp', fetchpriority: 'high' },
      { href: '/artwork/optimized/work-01-gallery.webp', as: 'image', type: 'image/webp' },
    ];
    const added = [];
    resources.forEach((r) => {
      if (document.querySelector(`link[rel="preload"][href="${r.href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = r.href;
      link.as = r.as;
      if (r.type) link.type = r.type;
      if (r.fetchpriority) link.setAttribute('fetchpriority', r.fetchpriority);
      document.head.appendChild(link);
      added.push(link);
    });
    return () => added.forEach((l) => l.remove());
  }, []);
  return null;
};

export default useSEO;
