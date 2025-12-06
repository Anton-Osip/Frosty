import { useCallback, useEffect, useState } from 'react';
import s from './Header.module.css';
import { Brand, BalanceCard, UserPhoto } from '../../shared/ui/components';
import { useBalanceStore, useAuthStore, useUserInfoStore } from '../../shared/stores';

export const Header = () => {
  const { data, fetchBalance } = useBalanceStore();
  const { userPhoto } = useAuthStore();
  const { data: userInfo } = useUserInfoStore();
  const { userId } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  const avatarUrl = userPhoto || userInfo?.avatar_url || undefined;

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [fetchBalance, userId]);

  useEffect(() => {
    // Определяем мобильное устройство и устанавливаем safe area
    const updateSafeArea = () => {
      import('@twa-dev/sdk')
        .then(module => {
          const WebApp = module.default;
          if (WebApp) {
            const mobile = WebApp.platform === 'android' || WebApp.platform === 'ios';
            setIsMobile(mobile);

            if (mobile) {
              const isAndroidPlatform = WebApp.platform === 'android';
              const isIOSPlatform = WebApp.platform === 'ios';

              setIsAndroid(isAndroidPlatform);
              setIsIOS(isIOSPlatform);

              // Получаем contentSafeAreaInset и safeAreaInset
              const contentSafeArea = (WebApp as any).contentSafeAreaInset;
              const safeArea = (WebApp as any).safeAreaInset;
              const viewportStableHeight = (WebApp as any).viewportStableHeight;

              const contentSafeAreaTop = contentSafeArea?.top || 0;
              const safeAreaTop = safeArea?.top || 0;

              // Вычисляем высоту хедера Telegram отдельно
              let telegramHeaderHeight = 0;
              if (viewportStableHeight && viewportStableHeight > 0) {
                const windowHeight = window.innerHeight;
                telegramHeaderHeight = Math.max(windowHeight - viewportStableHeight, 0);
              } else {
                // Fallback: вычисляем как разницу между contentSafeArea и safeArea
                telegramHeaderHeight = Math.max(contentSafeAreaTop - safeAreaTop, 0);
              }

              // На Android суммируем оба значения, на iOS используем только высоту хедера Telegram
              if (isAndroidPlatform) {
                // Android: суммируем contentSafeAreaInset и safeAreaInset
                if (contentSafeAreaTop > 0) {
                  document.documentElement.style.setProperty('--tg-content-safe-area-top', `${contentSafeAreaTop}px`);
                }
                if (safeAreaTop > 0) {
                  document.documentElement.style.setProperty('--tg-safe-area-top', `${safeAreaTop}px`);
                }
                // На Android также устанавливаем высоту хедера, если доступна
                if (telegramHeaderHeight > 0) {
                  document.documentElement.style.setProperty('--tg-header-height', `${telegramHeaderHeight}px`);
                }
                document.body.classList.add('tg-mobile', 'tg-android');
                document.documentElement.classList.add('tg-mobile', 'tg-android');
              } else if (isIOSPlatform) {
                // iOS: используем только высоту хедера Telegram через viewportStableHeight
                // contentSafeAreaInset на iOS может быть неточным, поэтому используем прямой расчет
                if (telegramHeaderHeight > 0) {
                  document.documentElement.style.setProperty('--tg-header-height', `${telegramHeaderHeight}px`);
                } else {
                  // Fallback: если viewportStableHeight недоступен, используем фиксированное значение
                  const defaultHeaderHeight = 56; // Примерная высота хедера Telegram на iOS
                  document.documentElement.style.setProperty('--tg-header-height', `${defaultHeaderHeight}px`);
                }
                // Также устанавливаем системную safe area для вырезов экрана
                if (safeAreaTop > 0) {
                  document.documentElement.style.setProperty('--tg-safe-area-top', `${safeAreaTop}px`);
                }
                document.body.classList.add('tg-mobile', 'tg-ios');
                document.documentElement.classList.add('tg-mobile', 'tg-ios');
              } else {
                document.body.classList.add('tg-mobile');
                document.documentElement.classList.add('tg-mobile');
              }
            }
          } else {
            // Fallback: проверяем user agent
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|iphone|ipad|ipod/i.test(userAgent);
            setIsMobile(isMobileDevice);
            if (isMobileDevice) {
              document.body.classList.add('tg-mobile');
              document.documentElement.classList.add('tg-mobile');
            }
          }
        })
        .catch(() => {
          // Fallback: проверяем user agent
          const userAgent = navigator.userAgent.toLowerCase();
          const isMobileDevice = /android|iphone|ipad|ipod/i.test(userAgent);
          setIsMobile(isMobileDevice);
          if (isMobileDevice) {
            document.body.classList.add('tg-mobile');
            document.documentElement.classList.add('tg-mobile');
          }
        });
    };

    // Инициализируем safe area
    updateSafeArea();

    // Также обновляем после небольшой задержки (на случай если WebApp еще не загружен)
    const timeoutId = setTimeout(updateSafeArea, 100);

    return () => {
      clearTimeout(timeoutId);
      // Отписываемся от событий при размонтировании
      import('@twa-dev/sdk')
        .then(module => {
          const WebApp = module.default;
          if (WebApp && typeof WebApp.offEvent === 'function') {
            WebApp.offEvent('contentSafeAreaChanged', updateSafeArea);
            WebApp.offEvent('safeAreaChanged', updateSafeArea);
            WebApp.offEvent('viewportChanged', updateSafeArea);
          }
        })
        .catch(() => {});
    };
  }, []);

  const handleChevronVerticalClick = useCallback(() => {
    // Логика открытия меню пользователя
  }, []);

  return (
    <header className={`${s.header} ${isMobile ? s.mobile : ''} ${isAndroid ? s.android : ''} ${isIOS ? s.ios : ''}`}>
      <Brand />
      <div className={s.controls}>
        <BalanceCard balance={data?.balance || 0} />
        <button className={s.userButton} onClick={handleChevronVerticalClick}>
          <div className={s.userButtonContent}>
            <UserPhoto src={avatarUrl} />
          </div>
        </button>
      </div>
    </header>
  );
};
