/**
 * SVG sanitization for dangerouslySetInnerHTML usage (Sicily map).
 * This is the only real security need for a static portfolio site.
 */

import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize SVG content for safe rendering via dangerouslySetInnerHTML.
 * @param {string} svgContent - Raw SVG string
 * @returns {string} - Sanitized SVG string
 */
export const sanitizeSVG = (svgContent) => {
  if (!svgContent || typeof svgContent !== 'string') {
    return '';
  }

  if (!svgContent.includes('<svg') || svgContent.includes('<script')) {
    console.warn('Potentially malicious SVG content blocked');
    return '';
  }

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
