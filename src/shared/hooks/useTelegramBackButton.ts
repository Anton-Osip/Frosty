import { useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

interface LocationState {
  fromPreloader?: boolean;
}

export const useTelegramBackButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNavigatingRef = useRef(false);
  const locationRef = useRef(location);
  const backButtonRef = useRef<any>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const navigateRef = useRef(navigate);

  // Обновляем ref при изменении location и navigate
  useEffect(() => {
    locationRef.current = location;
    navigateRef.current = navigate;
  }, [location, navigate]);

  // Функция для установки обработчика и видимости кнопки
  const setupBackButton = useCallback(() => {
    const BackButton = backButtonRef.current;
    if (!BackButton) {
      return;
    }

    // Очищаем предыдущий обработчик
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    const currentLocation = locationRef.current;
    let shouldShowBackButton = currentLocation.pathname !== ROUTES.ROOT && currentLocation.pathname !== ROUTES.SLOTS;

    if (currentLocation.pathname === ROUTES.ERROR) {
      const locationState = currentLocation.state as LocationState | null;
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

      // Используем актуальное значение из ref
      const currentPath = locationRef.current.pathname;
      const currentNavigate = navigateRef.current;

      if (currentPath.startsWith('/slot/') && (currentPath.includes('/play') || currentPath.includes('/demo'))) {
        const slotId = currentPath.split('/')[2];
        if (slotId) {
          currentNavigate(`/slot/${slotId}`, { replace: false });
        } else {
          currentNavigate(ROUTES.SLOTS, { replace: false });
        }
      } else if (currentPath === ROUTES.ERROR) {
        currentNavigate(-1);
      } else if (currentPath.startsWith('/slot/')) {
        currentNavigate(ROUTES.SLOTS, { replace: false });
      } else {
        currentNavigate(-1);
      }

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 500);
    };

    BackButton.onClick(handleBackClick);

    cleanupRef.current = () => {
      BackButton.offClick(handleBackClick);
    };
  }, []);

  // Инициализация BackButton и установка обработчика сразу после инициализации
  useEffect(() => {
    import('@twa-dev/sdk')
      .then(module => {
        const WebApp = module.default;

        if (!WebApp || !WebApp.BackButton) {
          return;
        }

        backButtonRef.current = WebApp.BackButton;
        
        // Устанавливаем обработчик сразу после инициализации
        setupBackButton();
      })
      .catch(() => {});
  }, [setupBackButton]);

  // Обновление обработчика и видимости при изменении location
  useEffect(() => {
    setupBackButton();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      isNavigatingRef.current = false;
    };
  }, [location.pathname, location.state, setupBackButton]);
};
