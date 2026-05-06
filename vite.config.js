import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
    // Security optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    sourcemap: false, // Disable sourcemaps in production for security
    reportCompressedSize: true,
  },
  // Development security
  server: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self'; 
        script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:*; 
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
        font-src 'self' https://fonts.gstatic.com; 
        img-src 'self' data: blob:; 
        connect-src 'self' ws: localhost:*;
      `.replace(/\s+/g, ' '),
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    // Disable directory listing
    middlewareMode: false,
  },
  // Preview server security (for production builds)
  preview: {
    headers: {
      'Content-Security-Policy': `
        default-src 'self'; 
        script-src 'self'; 
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
        font-src 'self' https://fonts.gstatic.com; 
        img-src 'self' data: https:; 
        connect-src 'self' https:; 
        frame-ancestors 'none'; 
        base-uri 'self'; 
        object-src 'none';
      `.replace(/\s+/g, ' '),
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    },
  },
}))