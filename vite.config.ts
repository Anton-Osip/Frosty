import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    watch: {
      usePolling: true,
      interval: 100,
    },
    allowedHosts: ['nonshrinkingly-hyperexcitable-shaquana.ngrok-free.dev'],
    hmr: {
      host: 'nonshrinkingly-hyperexcitable-shaquana.ngrok-free.dev',
      protocol: 'wss',
      clientPort: 443,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Security-Policy': [
        "default-src 'self' https://nonshrinkingly-hyperexcitable-shaquana.ngrok-free.dev 'unsafe-inline' 'unsafe-eval'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://cdnjs.cloudflare.com https://nonshrinkingly-hyperexcitable-shaquana.ngrok-free.dev",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
        "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
        "img-src 'self' data: blob: https://*",
        "media-src 'self' blob: https://pdd-base-course.hb.ru-msk.vkcloud-storage.ru https://*",
        "connect-src 'self' https://nonshrinkingly-hyperexcitable-shaquana.ngrok-free.dev wss://hadlee-tombless-unforgivably.ngrok-free.dev https://dev.antiblunder.com https://api.pddtv.ru https://dev-api.fr0.me https://api.ipify.org https://staging.slotegrator.com https://*.slotegrator.com",
        "frame-src 'self' https://staging.slotegrator.com https://*.slotegrator.com https://*",
        "object-src 'none'",
        "base-uri 'self'",
        'frame-ancestors *',
      ].join('; '),
      'X-Frame-Options': 'ALLOWALL',
    },
  },
});
