import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import('@twa-dev/sdk')
  .then(async module => {
    const WebApp = module.default;

    if (WebApp && typeof WebApp.ready === 'function') {
      WebApp.ready();
    }

    const isMobile = WebApp && (WebApp.platform === 'android' || WebApp.platform === 'ios');

    if (isMobile) {
      if (WebApp && typeof WebApp.requestFullscreen === 'function') {
        try {
          await WebApp.requestFullscreen();
        } catch {}
      } else if (WebApp && typeof WebApp.expand === 'function') {
        WebApp.expand();
      }
    }
  })
  .catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
