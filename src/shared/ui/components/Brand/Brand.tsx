import { useNavigate } from 'react-router-dom';
import s from './Brand.module.css';
import { FrostyLogo } from '../../icons';
import { ROUTES } from '../../../config/routes';

export const Brand = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div className={s.brand} onClick={handleClick}>
      <div className={s.logo}>
        <FrostyLogo />
      </div>
      <span className={s.brandName}>Frosty</span>
    </div>
  );
};
