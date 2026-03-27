import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'https://example.com',
    href: 'https://example.com/'
  },
  writable: true
})

// Mock navigator
Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Environment)',
  writable: true
})

// Mock fetch
global.fetch = vi.fn()

// Mock console methods for cleaner test output
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
  log: vi.fn()
}