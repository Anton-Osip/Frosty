import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import s from './Preloader.module.css';
import chipAnimation from '../../assets/anomation/chip.json';
import logoAnimation from '../../assets/anomation/logo.json';
import { ROUTES } from '../../shared/config/routes';
import { useAuthStore, useErrorPageStore } from '../../shared/stores';

export const Preloader = () => {
  const navigate = useNavigate();
  const { verify, isLoading, data, error } = useAuthStore();
  const { setErrorPage } = useErrorPageStore();
  useEffect(() => {
    verify();
  }, [verify]);

  useEffect(() => {
    if (isLoading) return;

    if (data) {
      if (data.ok) {
        navigate(ROUTES.SLOTS, { replace: true });
      } else {
        setErrorPage(data.reason);
        navigate(ROUTES.ERROR, { replace: true });
      }
    } else if (error) {
      navigate(ROUTES.ERROR, { replace: true });
    }
  }, [isLoading, data, error, navigate, setErrorPage]);

  return (
    <div className={s.preloader}>
      <Lottie animationData={logoAnimation} className={s.logoAnimation} loop={true} />
      <Lottie animationData={chipAnimation} className={s.chipAnimation} loop={true} />
    </div>
  );
};
