import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

interface LocationState {
  fromPreloader?: boolean;
}

export const useTelegramBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    import('@twa-dev/sdk')
      .then(module => {
        const WebApp = module.default;

        if (!WebApp || !WebApp.BackButton) {
          return;
        }

        const BackButton = WebApp.BackButton;

        let shouldShowBackButton = location.pathname !== ROUTES.ROOT && location.pathname !== ROUTES.SLOTS;

        if (location.pathname === ROUTES.ERROR) {
          const locationState = location.state as LocationState | null;
          if (locationState?.fromPreloader) {
            shouldShowBackButton = false;
          }
        }

        if (shouldShowBackButton) {
          BackButton.show();
        } else {
          BackButton.hide();
        }

        const handleBackClick = () => {
          if (isNavigatingRef.current) {
            return;
          }

          isNavigatingRef.current = true;

          const currentPath = location.pathname;

          if (currentPath.startsWith('/game/') && (currentPath.includes('/play') || currentPath.includes('/demo'))) {
            const slotId = currentPath.split('/')[2];
            if (slotId) {
              navigate(`/game/${slotId}`, { replace: false });
            } else {
              navigate(ROUTES.SLOTS, { replace: false });
            }
          } else if (currentPath === ROUTES.ERROR) {
            navigate(-1);
          } else if (currentPath.startsWith('/game/')) {
            navigate(ROUTES.SLOTS, { replace: false });
          } else {
            navigate(-1);
          }

          setTimeout(() => {
            isNavigatingRef.current = false;
          }, 500);
        };

        BackButton.onClick(handleBackClick);

        cleanup = () => {
          BackButton.offClick(handleBackClick);
        };
      })
      .catch(() => {});

    return () => {
      if (cleanup) {
        cleanup();
      }
      isNavigatingRef.current = false;
    };
  }, [location.pathname, location.state, navigate]);
};
