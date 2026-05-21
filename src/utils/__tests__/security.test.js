import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sanitizeSVG } from '../security.js';

describe('sanitizeSVG', () => {
  beforeEach(() => {
    console.warn = vi.fn();
  });

  it('should block SVG content containing script tags', () => {
    const maliciousSVG = '<svg><script>alert("xss")</script><circle/></svg>';
    const result = sanitizeSVG(maliciousSVG);
    expect(result).toBe('');
    expect(console.warn).toHaveBeenCalledWith('Potentially malicious SVG content blocked');
  });

  it('should preserve safe SVG elements', () => {
    const safeSVG = '<svg><circle cx="50" cy="50" r="40"/></svg>';
    const result = sanitizeSVG(safeSVG);
    expect(result).toContain('<circle');
    expect(result).toContain('cx="50"');
  });

  it('should remove dangerous attributes', () => {
    const dangerousSVG = '<svg><circle onclick="alert(1)" onload="evil()"/></svg>';
    const result = sanitizeSVG(dangerousSVG);
    expect(result).not.toContain('onclick');
    expect(result).not.toContain('onload');
  });

  it('should handle empty or invalid input', () => {
    expect(sanitizeSVG('')).toBe('');
    expect(sanitizeSVG(null)).toBe('');
    expect(sanitizeSVG(undefined)).toBe('');
    expect(sanitizeSVG(123)).toBe('');
  });

  it('should block content without svg tag', () => {
    const noSVG = '<div>Not an SVG</div>';
    const result = sanitizeSVG(noSVG);
    expect(result).toBe('');
    expect(console.warn).toHaveBeenCalledWith('Potentially malicious SVG content blocked');
  });
});
