import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiBaseUrl = env.VITE_API_BASE_URL;
  const appDomainsEnv = env.VITE_APP_DOMAINS || '';
  const appDomains = appDomainsEnv
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);

  let apiHost: string | null = null;
  try {
    apiHost = new URL(apiBaseUrl).host;
  } catch {
    apiHost = null;
  }

  const connectSrcParts = [
    "'self'",
    'https://api.ipify.org',
    'https://staging.slotegrator.com',
    'https://*.slotegrator.com',
  ];
  if (apiHost) {
    connectSrcParts.push(`https://${apiHost}`);
  }

  const csp = [
    "default-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://telegram.org https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: blob: https://*",
    `connect-src ${connectSrcParts.join(' ')}`,
    "frame-src 'self' https://staging.slotegrator.com https://*.slotegrator.com https://*",
    "object-src 'none'",
    "base-uri 'self'",
    'frame-ancestors *',
  ].join('; ');

  return {
    plugins: [react()],
    server: {
      host: '0.0.0.0',
      port: 5173,
      strictPort: false,
      watch: {
        usePolling: true,
        interval: 100,
      },
      allowedHosts: appDomains.length ? appDomains : undefined,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': csp,
      },
    },
  };
});
