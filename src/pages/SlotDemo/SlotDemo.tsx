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
  const { initDemoGame, demoUrl, isDemoLoading, error, reset, errorStatusCode } = useGameInitStore();
  const setErrorPage = useErrorPageStore(state => state.setErrorPage);
  const { isFullscreen } = useGameViewStore();
  const hasInitializedRef = useRef<string | null>(null);
  const errorHandledRef = useRef<string | null>(null);
  const loadingStartedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!uuid) {
      return;
    }

    if (hasInitializedRef.current !== uuid) {
      reset();
      hasInitializedRef.current = uuid;
      errorHandledRef.current = null;
      loadingStartedRef.current = null;
    }
  }, [uuid, reset]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  useEffect(() => {
    if (!uuid) {
      return;
    }

    if (hasInitializedRef.current === uuid && !isDemoLoading && !demoUrl && !error) {
      loadingStartedRef.current = uuid;
      initDemoGame({ game_uuid: uuid }).catch(err => {
        console.error('Failed to initialize demo game:', err);
      });
    }
  }, [uuid, initDemoGame, isDemoLoading, demoUrl, error]);

  useEffect(() => {
    if (
      !demoUrl &&
      !isDemoLoading &&
      hasInitializedRef.current === uuid &&
      loadingStartedRef.current === uuid &&
      errorHandledRef.current !== uuid
    ) {
      if (errorStatusCode === 500) {
        errorHandledRef.current = uuid;
        setErrorPage('unexpected_error');
        reset();
        navigate(ROUTES.ERROR, { replace: true });
      }
    }
  }, [errorStatusCode, demoUrl, isDemoLoading, uuid, navigate, reset, setErrorPage]);

  if (!uuid) {
    return <LoadingScreen />;
  }

  if (isDemoLoading || !demoUrl) {
    return <LoadingScreen />;
  }

  return (
    <div className={s.container}>
      {!isFullscreen && <Header />}
      <div className={`${s.wrapper} ${isFullscreen ? s.fullscreen : s.withHeader}`}>
        <div className={s.gameContainer}>
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
