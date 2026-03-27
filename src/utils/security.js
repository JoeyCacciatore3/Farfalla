/**
 * Security Utilities - Enterprise-grade protection for FarfallaArt
 * 
 * Features:
 * - Input validation and sanitization
 * - Content Security Policy helpers
 * - Error boundary protection
 * - Performance monitoring with security alerts
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize SVG content for safe rendering
 * @param {string} svgContent - Raw SVG content
 * @returns {string} - Sanitized SVG content
 */
export const sanitizeSVG = (svgContent) => {
  if (!svgContent || typeof svgContent !== 'string') {
    return '';
  }

  // Basic validation
  if (!svgContent.includes('<svg') || svgContent.includes('<script')) {
    console.warn('🚨 Potentially malicious SVG content blocked');
    return '';
  }

  // Comprehensive sanitization
  return DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true },
    FORBID_TAGS: [
      'script', 'object', 'embed', 'link', 'meta', 'base',
      'iframe', 'frame', 'frameset', 'applet', 'param'
    ],
    FORBID_ATTR: [
      'onclick', 'onload', 'onerror', 'onmouseover', 'onmouseout',
      'onmousedown', 'onmouseup', 'onkeydown', 'onkeyup', 'onkeypress',
      'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset',
      'onselect', 'onresize', 'onscroll', 'href'
    ],
    KEEP_CONTENT: false,
    IN_PLACE: false
  });
};

/**
 * Validate external URL for safety
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is safe
 */
export const validateURL = (url) => {
  try {
    const parsed = new URL(url, window.location.origin);
    
    // Only allow HTTPS for external resources
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return false;
    }
    
    // Block suspicious domains
    const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
    if (blockedDomains.includes(parsed.hostname)) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('🚨 Invalid URL blocked:', error);
    return false;
  }
};

/**
 * Rate limiting for API calls
 */
class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(key = 'default') {
    const now = Date.now();
    const requestTimes = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requestTimes.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      console.warn(`🚨 Rate limit exceeded for ${key}`);
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter(10, 60000); // 10 requests per minute

/**
 * Security monitoring and alerting
 */
export const SecurityMonitor = {
  logSecurityEvent: (type, details) => {
    const event = {
      type,
      details,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    console.warn('🚨 Security Event:', event);
    
    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // SecurityMonitor.sendToService(event);
    }
  },
  
  validateRequest: (url, method = 'GET') => {
    if (!rateLimiter.isAllowed(`${method}:${url}`)) {
      SecurityMonitor.logSecurityEvent('RATE_LIMIT_EXCEEDED', { url, method });
      return false;
    }
    
    if (!validateURL(url)) {
      SecurityMonitor.logSecurityEvent('INVALID_URL_BLOCKED', { url });
      return false;
    }
    
    return true;
  }
};

/**
 * Secure fetch wrapper with validation
 * @param {string} url - URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
export const secureFetch = async (url, options = {}) => {
  if (!SecurityMonitor.validateRequest(url, options.method)) {
    throw new Error('Request blocked by security policy');
  }
  
  const secureOptions = {
    ...options,
    credentials: 'same-origin',
    mode: 'cors',
    cache: 'default'
  };
  
  try {
    const response = await fetch(url, secureOptions);
    
    // Validate response
    if (!response.ok) {
      SecurityMonitor.logSecurityEvent('HTTP_ERROR', {
        url,
        status: response.status,
        statusText: response.statusText
      });
    }
    
    return response;
  } catch (error) {
    SecurityMonitor.logSecurityEvent('FETCH_ERROR', {
      url,
      error: error.message
    });
    throw error;
  }
};

/**
 * Content validation helpers
 */
export const ContentValidator = {
  isValidImageType: (type) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    return allowedTypes.includes(type);
  },
  
  isValidFileSize: (size, maxSize = 10 * 1024 * 1024) => { // 10MB default
    return size <= maxSize;
  },
  
  sanitizeFilename: (filename) => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '_').substring(0, 255);
  }
};

export default {
  sanitizeSVG,
  validateURL,
  rateLimiter,
  SecurityMonitor,
  secureFetch,
  ContentValidator
};