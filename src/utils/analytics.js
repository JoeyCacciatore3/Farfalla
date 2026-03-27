/**
 * Privacy-First Analytics - Lightweight tracking for FarfallaArt
 * 
 * Features:
 * - No personal data collection
 * - Performance monitoring
 * - User experience insights
 * - GDPR compliant
 */

export class PrivacyAnalytics {
  constructor(options = {}) {
    this.enabled = options.enabled !== false;
    this.debug = options.debug || false;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
  }

  generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }

  track(event, properties = {}) {
    if (!this.enabled) return;

    const eventData = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        userAgent: navigator.userAgent.substr(0, 100), // Truncated for privacy
        referrer: document.referrer ? new URL(document.referrer).hostname : 'direct'
      }
    };

    this.events.push(eventData);

    if (this.debug) {
      console.log('📊 Analytics Event:', eventData);
    }

    // Send to privacy-focused analytics service (if configured)
    this.sendEvent(eventData);
  }

  sendEvent(eventData) {
    // In a real implementation, this would send to Plausible, Fathom, or similar
    // For now, just log to console in debug mode
    if (this.debug) {
      console.log('🚀 Sending event:', eventData.event);
    }
  }

  // Performance tracking
  trackPerformance() {
    if (!this.enabled || !('performance' in window)) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');
        
        const performanceData = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          timeToInteractive: navigation.loadEventEnd - navigation.fetchStart
        };

        this.track('page_performance', performanceData);
      }, 1000);
    });
  }

  // User experience tracking
  trackUserExperience() {
    if (!this.enabled) return;

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0 && maxScroll > 0) {
          this.track('scroll_depth', { percent: maxScroll });
        }
      }
    };

    window.addEventListener('scroll', trackScroll, { passive: true });

    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.startTime;
      this.track('time_on_page', { 
        duration: timeOnPage,
        durationMinutes: Math.round(timeOnPage / 60000 * 10) / 10
      });
    });

    // Track clicks on artworks
    document.addEventListener('click', (e) => {
      const artwork = e.target.closest('[data-artwork]');
      if (artwork) {
        this.track('artwork_interaction', {
          artworkId: artwork.dataset.artwork,
          interactionType: 'click'
        });
      }
    });
  }

  // Error tracking
  trackErrors() {
    if (!this.enabled) return;

    window.addEventListener('error', (e) => {
      this.track('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
      });
    });

    window.addEventListener('unhandledrejection', (e) => {
      this.track('promise_rejection', {
        reason: e.reason?.toString() || 'Unknown'
      });
    });
  }

  // Initialize all tracking
  init() {
    if (!this.enabled) return;

    this.track('page_view', {
      path: window.location.pathname,
      title: document.title,
      language: navigator.language
    });

    this.trackPerformance();
    this.trackUserExperience();
    this.trackErrors();
  }

  // Get analytics summary
  getSummary() {
    return {
      sessionId: this.sessionId,
      eventsCount: this.events.length,
      sessionDuration: Date.now() - this.startTime,
      lastEvent: this.events[this.events.length - 1]
    };
  }
}

// Singleton instance
export const analytics = new PrivacyAnalytics({
  enabled: import.meta.env.PROD, // Only in production
  debug: import.meta.env.DEV     // Debug in development
});

// Convenience methods
export const trackEvent = (event, properties) => analytics.track(event, properties);
export const initAnalytics = () => analytics.init();

export default analytics;