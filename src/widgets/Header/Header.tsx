import { useCallback } from 'react';
import s from './Header.module.css';
import { Brand, BalanceCard, UserPhoto } from '../../shared/ui/components';
import { ChevronVertical } from '../../shared/ui/icons';
import { useBalanceStore } from '../../shared/stores';

export const Header = () => {
  const { data } = useBalanceStore();

  const handleChevronVerticalClick = useCallback(() => {
    // Логика открытия меню пользователя
  }, []);

  return (
    <header className={s.header}>
      <Brand />
      <div className={s.controls}>
        <BalanceCard balance={data?.balance || 0} />
        <button className={s.userButton} onClick={handleChevronVerticalClick}>
          <div className={s.userButtonContent}>
            <UserPhoto />
            <ChevronVertical className={s.chevron} />
          </div>
        </button>
      </div>
    </header>
  );
};
