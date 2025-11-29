import s from './SlotTabsSection.module.css';
import { SegmentedTabs, Winners } from '../';

type Option = { label: string; value: string };

type SlotTabsSectionProps = {
  activeTabSlot: string;
  onTabChangeSlot: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
  itemsPerPage: string;
  onItemsPerPageChange: (option: Option) => void;
};

const TAB_OPTIONS_SLOTS: Option[] = [
  { label: 'Крупные выигрыши', value: 'big_wins' },
  { label: 'Удачные ставки', value: 'successful_bets' },
];

export const SlotTabsSection = ({ activeTabSlot, onTabChangeSlot }: SlotTabsSectionProps) => {
  return (
    <div className={s.tabsSection}>
      <SegmentedTabs tabs={TAB_OPTIONS_SLOTS} value={activeTabSlot} onChange={onTabChangeSlot} />
      <Winners />
    </div>
  );
};
