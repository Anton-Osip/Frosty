import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import s from './SlotDemo.module.css';
import { useErrorPageStore, useGameInitStore, useGameViewStore } from '../../shared/stores';
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

export const SlotDemo = () => {
  const { id: uuid } = useParams();
  const navigate = useNavigate();
  const { initDemoGame, demoUrl, isDemoLoading, error, reset } = useGameInitStore();
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
    if (!uuid) {
      return;
    }

    if (hasInitializedRef.current === uuid && !isDemoLoading && !demoUrl && !error) {
      initDemoGame({ game_uuid: uuid }).catch(err => {
        console.error('Failed to initialize demo game:', err);
      });
    }
  }, [uuid, initDemoGame, isDemoLoading, demoUrl, error]);

  useEffect(() => {
    if (error) {
      setErrorPage('game_block');
      navigate(ROUTES.ERROR, { replace: true });
    }
  }, [error, navigate, setErrorPage]);

  useEffect(() => {
    if (!uuid) {
      return;
    }

    if (isDemoLoading && !demoUrl && !error) {
      timeoutRef.current = setTimeout(() => {
        if (isDemoLoading || !demoUrl) {
          setErrorPage('game_block');
          navigate(ROUTES.ERROR, { replace: true });
        }
      }, 6000);
    }

    if (demoUrl || error) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [uuid, isDemoLoading, demoUrl, error, navigate, setErrorPage]);

  if (!uuid) {
    return <LoadingScreen />;
  }

  if (isDemoLoading || !demoUrl) {
    return <LoadingScreen />;
  }

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className={s.container}>
      {!isFullscreen && <Header />}
      <div className={`${s.wrapper} ${isFullscreen ? s.fullscreen : s.withHeader}`}>
        <div className={s.gameContainer}>
          <button className={s.closeButton} onClick={handleClose} aria-label='Закрыть'>
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 4L4 12M4 4L12 12'
                stroke='#fff'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>
          <iframe
            src={demoUrl}
            className={s.gameFrame}
            title='Slot Demo'
            allow='fullscreen; autoplay; encrypted-media'
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
