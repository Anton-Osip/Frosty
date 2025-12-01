import { useCallback } from 'react';
import s from './BalanceCard.module.css';
import { WalletIcon } from '../../icons';

type BalanceCardProps = {
  balance: number;
};

export const BalanceCard = ({ balance }: BalanceCardProps) => {
  const handleWalletButtonClick = useCallback(() => {
    // Логика для открытия модалки пополнения
  }, []);

  const formatBalance = (value: number): string => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className={s.balanceCard}>
      <span className={s.balanceValue}>{formatBalance(balance)} ₽</span>
      <button className={s.balanceButton} onClick={handleWalletButtonClick} type='button'>
        <WalletIcon className={s.icon} />
      </button>
    </div>
  );
};
