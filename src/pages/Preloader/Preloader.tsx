import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Preloader.module.css';
import preloaderSvg from '../../assets/images/png/preloader.png';
import { ROUTES } from '../../shared/config/routes';

export const Preloader = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.SLOTS, { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={s.preloader}>
      <div className={s.spinner}>
        <img src={preloaderSvg} alt='Loading' className={s.rotatingSvg} />
      </div>
    </div>
  );
};
