/**
 * Security-Enhanced Error Boundary
 * 
 * Features:
 * - Graceful error handling
 * - Security event logging
 * - Information leakage prevention
 * - User-friendly fallbacks
 */

import { Component } from 'react';
import { SecurityMonitor } from '../../utils/security.js';

export class SecurityErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorId: null,
      isSecurityError: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Generate safe error ID
    const errorId = `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Detect potential security issues
    const isSecurityError = error.message?.includes('script') || 
                           error.message?.includes('unsafe') ||
                           error.stack?.includes('eval');

    return { 
      hasError: true, 
      errorId,
      isSecurityError 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Log security event
    SecurityMonitor.logSecurityEvent('REACT_ERROR', {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isSecurityError: this.state.isSecurityError,
      props: this.props.componentName || 'Unknown'
    });

    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // Send sanitized error data only
      console.error(`Error ID: ${this.state.errorId}`);
    } else {
      // Development: show full error
      console.error('Development Error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Security error - minimal disclosure
      if (this.state.isSecurityError) {
        return (
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            background: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            margin: '1rem'
          }}>
            <h3>🔒 Security Protection Active</h3>
            <p>Content has been blocked for your safety.</p>
            <small>Error ID: {this.state.errorId}</small>
          </div>
        );
      }

      // Regular error - user-friendly fallback
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          margin: '1rem'
        }}>
          <h3>🎨 Oops! Something went wrong</h3>
          <p>We're working on fixing this. Please refresh the page or try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Refresh Page
          </button>
          {!import.meta.env.PROD && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary>Error Details (Development)</summary>
              <small>Error ID: {this.state.errorId}</small>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary;