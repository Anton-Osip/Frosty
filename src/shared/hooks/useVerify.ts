import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores';
import { ROUTES } from '../config/routes';

export const useVerify = () => {
  const { isVerify } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isVerify && location.pathname !== ROUTES.ROOT) {
      navigate(ROUTES.ROOT, { state: { from: location }, replace: true });
    }
  }, [isVerify, navigate, location]);
};
