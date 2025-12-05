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
  const { initGame, gameUrl, isLoading, error, reset, deniedDetail, errorStatusCode } = useGameInitStore();
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
    if (!uuid || !userId) {
      return;
    }

    if (hasInitializedRef.current === uuid && !isLoading && !gameUrl && !error) {
      loadingStartedRef.current = uuid;
      initGame({ user_id: userId, game_uuid: uuid }).catch(err => {
        console.error('Failed to initialize game:', err);
      });
    }
  }, [uuid, userId, initGame, isLoading, gameUrl, error]);

  useEffect(() => {
    if (
      !gameUrl &&
      !isLoading &&
      hasInitializedRef.current === uuid &&
      loadingStartedRef.current === uuid &&
      errorHandledRef.current !== uuid
    ) {
      if (deniedDetail && deniedDetail.code === 'slots_access_denied') {
        errorHandledRef.current = uuid;
        setErrorPage('game_block');
        reset();
        navigate(ROUTES.ERROR, { replace: true });
      } else if (errorStatusCode === 500) {
        errorHandledRef.current = uuid;
        setErrorPage('unexpected_error');
        reset();
        navigate(ROUTES.ERROR, { replace: true });
      }
    }
  }, [deniedDetail, errorStatusCode, gameUrl, isLoading, uuid, navigate, reset, setErrorPage]);

  if (!uuid || !userId) {
    return <LoadingScreen />;
  }

  if (isLoading || !gameUrl) {
    return <LoadingScreen />;
  }

  return (
    <div className={s.container}>
      {!isFullscreen && <Header />}
      <div className={`${s.wrapper} ${isFullscreen ? s.fullscreen : s.withHeader}`}>
        <div className={s.gameContainer}>
          <iframe
            src={gameUrl}
            className={s.gameFrame}
            title='Slot Game'
            allow='fullscreen; autoplay; encrypted-media'
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
