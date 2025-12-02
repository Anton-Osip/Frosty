import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import s from './SlotPlay.module.css';
import { useAuthStore, useGameInitStore } from '../../shared/stores';
import { ROUTES } from '../../shared/config/routes';
import chipAnimation from '../../assets/anomation/chip.json';
import logoAnimation from '../../assets/anomation/logo.json';

const LoadingScreen = () => (
  <div className={s.loadingScreen}>
    <Lottie animationData={logoAnimation} className={s.logoAnimation} loop={true} />
    <Lottie animationData={chipAnimation} className={s.chipAnimation} loop={true} />
  </div>
);

export const SlotPlay = () => {
  const { id: uuid } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  const { initGame, gameUrl, isLoading, error, reset } = useGameInitStore();
  const hasInitializedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!uuid) {
      return;
    }

    if (hasInitializedRef.current !== uuid) {
      reset();
      hasInitializedRef.current = uuid;
    }
  }, [uuid, reset]);

  useEffect(() => {
    if (!uuid || !userId) {
      return;
    }

    if (hasInitializedRef.current === uuid && !isLoading && !gameUrl && !error) {
      initGame({ user_id: userId, game_uuid: uuid }).catch(err => {
        console.error('Failed to initialize game:', err);
      });
    }
  }, [uuid, userId, initGame, isLoading, gameUrl, error]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate(ROUTES.ERROR, { replace: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (error) {
    return <LoadingScreen />;
  }

  if (!uuid || !userId) {
    return <LoadingScreen />;
  }

  if (isLoading || !gameUrl) {
    return <LoadingScreen />;
  }

  return (
    <div className={s.wrapper}>
      <iframe
        src={gameUrl}
        className={s.gameFrame}
        title='Slot Game'
        allow='fullscreen; autoplay; encrypted-media'
        allowFullScreen
      />
    </div>
  );
};
