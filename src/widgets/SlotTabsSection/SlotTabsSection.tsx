import { useEffect, useMemo } from 'react';
import s from './SlotTabsSection.module.css';
import { SegmentedTabs, Winners } from '../';
import { useGameBigWinsStore, useGameLuckyBetsStore, useTopPlayersTodayStore } from '../../shared/stores';

type Option = { label: string; value: string };

type SlotTabsSectionProps = {
  activeTabSlot: string;
  onTabChangeSlot: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
  itemsPerPage: string;
  onItemsPerPageChange: (option: Option) => void;
  gameUuid?: string;
};

const TAB_OPTIONS_SLOTS: Option[] = [
  { label: 'Крупные выигрыши', value: 'big_wins' },
  { label: 'Удачные ставки', value: 'successful_bets' },
  { label: 'Лучшие за сегодня', value: 'lucky_bets' },
];

export const SlotTabsSection = ({ activeTabSlot, onTabChangeSlot, gameUuid }: SlotTabsSectionProps) => {
  const { fetchGameBigWins, data: bigWinsData, isLoading: isBigWinsLoading } = useGameBigWinsStore();
  const { fetchGameLuckyBets, data: luckyBetsData, isLoading: isLuckyBetsLoading } = useGameLuckyBetsStore();
  const { fetchTopPlayersToday, data: topPlayersData, isLoading: isTopPlayersLoading } = useTopPlayersTodayStore();

  useEffect(() => {
    if (!gameUuid) {
      return;
    }

    const commonParams = {
      game_uuid: gameUuid,
      limit: 3,
      region: null,
      user_id: null,
    };

    if (activeTabSlot === 'big_wins') {
      fetchGameBigWins(commonParams);
    } else if (activeTabSlot === 'successful_bets') {
      fetchGameLuckyBets(commonParams);
    } else if (activeTabSlot === 'lucky_bets') {
      fetchTopPlayersToday(commonParams);
    }
  }, [activeTabSlot, gameUuid, fetchGameBigWins, fetchGameLuckyBets, fetchTopPlayersToday]);

  const winnersData = useMemo(() => {
    if (activeTabSlot === 'big_wins') {
      return bigWinsData?.big_wins?.slice(0, 3) || [];
    } else if (activeTabSlot === 'successful_bets') {
      return luckyBetsData?.lucky_bets?.slice(0, 3) || [];
    } else if (activeTabSlot === 'lucky_bets') {
      return topPlayersData?.top_players_today?.slice(0, 3) || [];
    }
    return [];
  }, [activeTabSlot, bigWinsData, luckyBetsData, topPlayersData]);

  const isLoading = useMemo(() => {
    if (activeTabSlot === 'big_wins') {
      return isBigWinsLoading;
    } else if (activeTabSlot === 'successful_bets') {
      return isLuckyBetsLoading;
    } else if (activeTabSlot === 'lucky_bets') {
      return isTopPlayersLoading;
    }
    return false;
  }, [activeTabSlot, isBigWinsLoading, isLuckyBetsLoading, isTopPlayersLoading]);

  return (
    <div className={s.tabsSection}>
      <SegmentedTabs tabs={TAB_OPTIONS_SLOTS} value={activeTabSlot} onChange={onTabChangeSlot} />
      <Winners data={winnersData} isLoading={isLoading} />
    </div>
  );
};
