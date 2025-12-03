import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import s from './SlotPlay.module.css';
import { useAuthStore, useErrorPageStore, useGameInitStore, useGameViewStore } from '../../shared/stores';
import { ROUTES } from '../../shared/config/routes';
import chipAnimation from '../../assets/anomation/chip.json';
import logoAnimation from '../../assets/anomation/logo.json';
import { Header } from '../../widgets';

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
  const setErrorPage = useErrorPageStore(state => state.setErrorPage);
  const { isFullscreen } = useGameViewStore();
  const hasInitializedRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

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
      setErrorPage('game_block');
      navigate(ROUTES.ERROR, { replace: true });
    }
  }, [error, navigate, setErrorPage]);

  // Таймаут на 6 секунд: если игра не запустилась, перенаправляем на ошибку
  useEffect(() => {
    if (!uuid || !userId) {
      return;
    }

    // Если началась загрузка игры, запускаем таймер
    if (isLoading && !gameUrl && !error) {
      timeoutRef.current = setTimeout(() => {
        // Проверяем, что игра все еще не загрузилась
        if (isLoading || !gameUrl) {
          setErrorPage('game_block');
          navigate(ROUTES.ERROR, { replace: true });
        }
      }, 6000);
    }

    // Если игра загрузилась или произошла ошибка, очищаем таймер
    if (gameUrl || error) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    // Очистка таймера при размонтировании или изменении uuid
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [uuid, userId, isLoading, gameUrl, error, navigate, setErrorPage]);

  if (!uuid || !userId) {
    return <LoadingScreen />;
  }

  if (isLoading || !gameUrl) {
    return <LoadingScreen />;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={`${s.wrapper} ${isFullscreen ? s.fullscreen : s.withHeader}`}>
      {!isFullscreen && <Header />}
      <div className={s.gameContainer}>
        <button className={s.closeButton} onClick={handleClose} aria-label='Закрыть'>
          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 4L4 12M4 4L12 12' stroke='#fff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
        </button>
        <iframe
          src={gameUrl}
          className={s.gameFrame}
          title='Slot Game'
          allow='fullscreen; autoplay; encrypted-media'
          allowFullScreen
        />
      </div>
    </div>
  );
};
