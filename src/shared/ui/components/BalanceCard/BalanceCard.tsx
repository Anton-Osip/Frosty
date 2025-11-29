import { useCallback } from 'react';
import s from './BalanceCard.module.css';
import { WalletIcon } from '../../icons';

export const BalanceCard = () => {
  const handleWalletButtonClick = useCallback(() => {
    // Логика для открытия модалки пополнения
  }, []);

  return (
    <div className={s.balanceCard}>
      <span className={s.balanceValue}>1 589,05 ₽</span>
      <button className={s.balanceButton} onClick={handleWalletButtonClick} type='button'>
        <WalletIcon className={s.icon} />
      </button>
    </div>
  );
};
