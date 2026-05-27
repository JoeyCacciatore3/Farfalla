import { Component } from 'react';

/**
 * Standard React error boundary. Catches render errors and shows
 * a user-friendly fallback instead of a white screen.
 */
export class SecurityErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (!import.meta.env.PROD) {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          margin: '1rem'
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '1.2rem',
            fontStyle: 'italic',
            color: 'inherit',
            opacity: 0.6,
          }}>
            Something went wrong. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              border: '1px solid currentColor',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
              color: 'inherit',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SecurityErrorBoundary;
