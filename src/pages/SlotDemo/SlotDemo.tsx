import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import s from './SlotDemo.module.css';
import { useGameInitStore } from '../../shared/stores';
import { ROUTES } from '../../shared/config/routes';
import chipAnimation from '../../assets/anomation/chip.json';
import logoAnimation from '../../assets/anomation/logo.json';

const LoadingScreen = () => (
  <div className={s.loadingScreen}>
    <Lottie animationData={logoAnimation} className={s.logoAnimation} loop={true} />
    <Lottie animationData={chipAnimation} className={s.chipAnimation} loop={true} />
  </div>
);

export const SlotDemo = () => {
  const { id: uuid } = useParams();
  const navigate = useNavigate();
  const { initDemoGame, demoUrl, isDemoLoading, error, reset } = useGameInitStore();
  const hasInitializedRef = useRef<string | null>(null);

  // Сбрасываем состояние при переходе на страницу или изменении uuid
  useEffect(() => {
    if (!uuid) {
      return;
    }

    // Если это новый uuid, сбрасываем состояние
    if (hasInitializedRef.current !== uuid) {
      reset();
      hasInitializedRef.current = uuid;
    }
  }, [uuid, reset]);

  // Инициализируем демо игру когда есть uuid
  useEffect(() => {
    if (!uuid) {
      return;
    }

    // Инициализируем только если еще не инициализировали для этого uuid
    if (hasInitializedRef.current === uuid && !isDemoLoading && !demoUrl && !error) {
      initDemoGame({ game_uuid: uuid }).catch(err => {
        console.error('Failed to initialize demo game:', err);
      });
    }
  }, [uuid, initDemoGame, isDemoLoading, demoUrl, error]);

  // При ошибке сразу уходим на страницу ошибок
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate(ROUTES.ERROR, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  // Если ошибка, показываем загрузку пока идет редирект
  if (error) {
    return <LoadingScreen />;
  }

  // Если нет uuid - показываем загрузку
  if (!uuid) {
    return <LoadingScreen />;
  }

  // Пока идет загрузка или еще нет URL - показываем загрузку
  if (isDemoLoading || !demoUrl) {
    return <LoadingScreen />;
  }

  // Когда URL получен - показываем игру во фрейме
  return (
    <div className={s.wrapper}>
      <iframe
        src={demoUrl}
        className={s.gameFrame}
        title='Slot Demo'
        allow='fullscreen; autoplay; encrypted-media'
        allowFullScreen
      />
    </div>
  );
};
