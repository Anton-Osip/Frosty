import { useEffect, useMemo } from 'react';
import { Dropdown } from '../../shared/ui/components';
import { SegmentedTabs, GameStatTable, type GameStatItem } from '../';
import s from './SlotsStats.module.css';
import { useAuthStore, useMyBetsStore, useTotalBetsStore, useHighBetsStore } from '../../shared/stores';
import type {
  GetMyBetsListQueryParams,
  GetTotalBetsListQueryParams,
  GetHighBetsListQueryParams,
} from '../../shared/api/slotegrator/statistics';

type Option = { label: string; value: string };

type SlotsStatsProps = {
  activeTab: string;
  itemsPerPage: string;
  uuid?: string;
  onTabChange: (value: string) => void;
  onItemsPerPageChange: (option: Option) => void;
};

const TAB_OPTIONS: Option[] = [
  { label: 'Крупные игроки', value: 'big_players' },
  { label: 'Мои ставки', value: 'my_bets' },
  { label: 'Все ставки', value: 'all_bets' },
];

const ITEMS_PER_PAGE_OPTIONS: Option[] = [
  { label: '10', value: '10' },
  { label: '20', value: '20' },
  { label: '30', value: '30' },
];

const formatAmount = (amount: number): string => {
  return amount.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const SlotsStats = ({ activeTab, itemsPerPage, onTabChange, onItemsPerPageChange, uuid }: SlotsStatsProps) => {
  const { fetchMyBetsList, data: myBetsData, isLoading: isMyBetsLoading } = useMyBetsStore();
  const { fetchTotalBetsList, data: totalBetsData, isLoading: isTotalBetsLoading } = useTotalBetsStore();
  const { fetchHighBetsList, data: highBetsData, isLoading: isHighBetsLoading } = useHighBetsStore();
  const { userId } = useAuthStore();

  useEffect(() => {
    const commonParams = {
      game_uuid: uuid ?? null,
      region: null,
      limit: Number(itemsPerPage),
    };

    if (activeTab === 'my_bets' && userId) {
      fetchMyBetsList({ ...commonParams, user_id: userId } as GetMyBetsListQueryParams);
    } else if (activeTab === 'all_bets') {
      fetchTotalBetsList({ ...commonParams, user_id: null } as GetTotalBetsListQueryParams);
    } else if (activeTab === 'big_players') {
      fetchHighBetsList({ ...commonParams, user_id: null } as GetHighBetsListQueryParams);
    }
  }, [activeTab, fetchMyBetsList, fetchTotalBetsList, fetchHighBetsList, itemsPerPage, userId, uuid]);

  const isLoading = useMemo(() => {
    if (activeTab === 'my_bets') {
      return isMyBetsLoading;
    } else if (activeTab === 'all_bets') {
      return isTotalBetsLoading;
    } else if (activeTab === 'big_players') {
      return isHighBetsLoading;
    }
    return false;
  }, [activeTab, isMyBetsLoading, isTotalBetsLoading, isHighBetsLoading]);

  const items: GameStatItem[] = useMemo(() => {
    const dataMap: Record<string, typeof myBetsData | typeof totalBetsData | typeof highBetsData> = {
      my_bets: myBetsData,
      all_bets: totalBetsData,
      big_players: highBetsData,
    };

    const data = dataMap[activeTab];
    if (!data) return [];

    return data.map(bet => ({
      name: bet.slot_name || undefined,
      amount: formatAmount(bet.amount),
      imageSrc: bet.slot_image_url || undefined,
      highlight: bet.type === 'win',
      gameUuid: bet.game_uuid || undefined,
    }));
  }, [activeTab, myBetsData, totalBetsData, highBetsData]);

  return (
    <div className={s.stats}>
      <div className={s.segmentsAndDropdown}>
        <SegmentedTabs tabs={TAB_OPTIONS} value={activeTab} onChange={onTabChange} />
        <Dropdown
          className={s.statsDropdown}
          options={ITEMS_PER_PAGE_OPTIONS}
          value={itemsPerPage}
          onChange={option => {
            if (!Array.isArray(option)) {
              onItemsPerPageChange(option);
            }
          }}
          variant='default'
          height={55}
        />
      </div>
      <GameStatTable items={items} isLoading={isLoading} />
    </div>
  );
};
