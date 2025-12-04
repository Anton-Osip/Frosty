import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import('@twa-dev/sdk')
  .then(module => {
    const WebApp = module.default;
    if (WebApp && WebApp.ready) {
      WebApp.ready();
    }
  })
  .catch(() => {});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
