import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Preloader.module.css';
import preloaderSvg from '../../assets/images/png/preloader.png';
import { ROUTES } from '../../shared/config/routes';
import { useAuthStore } from '../../shared/stores';

export const Preloader = () => {
  const navigate = useNavigate();
  const { verify, isLoading, data, error } = useAuthStore();

  useEffect(() => {
    verify();
  }, [verify]);

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      if (data.ok) {
        navigate(ROUTES.SLOTS, { replace: true });
      } else {
        navigate(ROUTES.ERROR, { replace: true });
      }
    } else if (error) {
      navigate(ROUTES.ERROR, { replace: true });
    }
  }, [isLoading, data, error, navigate]);

  return (
    <div className={s.preloader}>
      <div className={s.spinner}>
        <img src={preloaderSvg} alt='Loading' className={s.rotatingSvg} />
      </div>
    </div>
  );
};
