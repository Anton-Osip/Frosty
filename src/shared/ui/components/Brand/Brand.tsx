import { useNavigate } from 'react-router-dom';
import s from './Brand.module.css';
import { FrostyLogo } from '../../icons';
import { ROUTES } from '../../../config/routes';
import { useBalanceStore } from '../../../stores';

export const Brand = () => {
  const navigate = useNavigate();
  const { data } = useBalanceStore();
  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <div className={s.brand} onClick={handleClick}>
      <div className={s.logo}>
        <FrostyLogo />
      </div>
      <span className={`${s.brandName}  ${data?.balance && data.balance > 99999 ? s.brandNameHidden : ''}`}>Frosty</span>
    </div>
  );
};
