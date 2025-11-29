import { useMemo } from 'react';
import { Dropdown } from '../../shared/ui/components';
import { SegmentedTabs, GameStatTable } from '../';
import s from './SlotsStats.module.css';

type Option = { label: string; value: string };

type SlotsStatsProps = {
  activeTab: string;
  itemsPerPage: string;
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

export const SlotsStats = ({ activeTab, itemsPerPage, onTabChange, onItemsPerPageChange }: SlotsStatsProps) => {
  const emptyTableData = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      name: undefined,
      amount: undefined,
      imageSrc: undefined,
      highlight: false,
    }));
  }, []);

  return (
    <div className={s.stats}>
      <div className={s.segmentsAndDropdown}>
        <SegmentedTabs tabs={TAB_OPTIONS} value={activeTab} onChange={onTabChange} />
        <Dropdown
          options={ITEMS_PER_PAGE_OPTIONS}
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          variant='default'
          height={55}
        />
      </div>
      <GameStatTable items={emptyTableData} />
    </div>
  );
};
