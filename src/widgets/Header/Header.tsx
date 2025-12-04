import { useCallback, useEffect } from 'react';
import s from './Header.module.css';
import { Brand, BalanceCard, UserPhoto } from '../../shared/ui/components';
import { useBalanceStore, useAuthStore, useUserInfoStore } from '../../shared/stores';

export const Header = () => {
  const { data, fetchBalance } = useBalanceStore();
  const { userId } = useAuthStore();
  const { userPhoto } = useAuthStore();
  const { data: userInfo } = useUserInfoStore();

  const avatarUrl = userPhoto || userInfo?.avatar_url || undefined;

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [fetchBalance, userId]);

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
            <UserPhoto src={avatarUrl} />
          </div>
        </button>
      </div>
    </header>
  );
};
