import { useCallback, useEffect, useState } from 'react';
import s from './Slots.module.css';
import { SlotsSection, SlotsFilters, SlotsGrid, SlotsStats } from '../../widgets';

import previewTest1 from '../../assets/images/png/previewTest1.png';
import previewTest2 from '../../assets/images/png/previewTest2.png';
import previewTest3 from '../../assets/images/png/previewTest3.png';
import previewTest4 from '../../assets/images/png/previewTest4.png';
import previewTest5 from '../../assets/images/png/previewTest5.png';
import previewTest6 from '../../assets/images/png/previewTest6.png';
import previewTest7 from '../../assets/images/png/previewTest7.png';
import previewTest8 from '../../assets/images/png/previewTest8.png';
import previewTest9 from '../../assets/images/png/previewTest9.png';
import { useAuthStore, useBalanceStore, useUserInfoStore } from '../../shared/stores';

const MOCK_SLOTS_DATA = [
  { id: 1, backgroundImage: previewTest1, name: 'Sweet Bonanza 1000', description: 'Pragmatic Play' },
  { id: 2, backgroundImage: previewTest2, name: 'Zeus vs Hades: Gods of War', description: 'Pragmatic Play' },
  { id: 3, backgroundImage: previewTest3, name: 'Starlight Princess', description: 'Pragmatic Play' },
  { id: 4, backgroundImage: previewTest4, name: 'Sugar Rush', description: 'Pragmatic Play' },
  { id: 5, backgroundImage: previewTest5, name: 'Fruit Party', description: 'Pragmatic Play' },
  { id: 6, backgroundImage: previewTest6, name: 'Dog House', description: 'Pragmatic Play' },
  { id: 7, backgroundImage: previewTest7, name: 'Sugar Rush 1000', description: 'Pragmatic Play' },
  { id: 8, backgroundImage: previewTest8, name: 'Cleocatra', description: 'Pragmatic Play' },
  { id: 9, backgroundImage: previewTest9, name: 'Sweet Bonanza Xmas', description: 'Pragmatic Play' },
];

export const Slots = () => {
  const [providerFilter, setProviderFilter] = useState('all');
  const [popularFilter, setPopularFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('big_players');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [isLoading, setIsLoading] = useState(true);
  const [slotsData, setSlotsData] = useState<typeof MOCK_SLOTS_DATA>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlotsData(MOCK_SLOTS_DATA);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleProviderChange = useCallback(
    (option: { label: string; value: string }) => setProviderFilter(option.value),
    [],
  );
  const handlePopularChange = useCallback(
    (option: { label: string; value: string }) => setPopularFilter(option.value),
    [],
  );
  const handleItemsPerPageChange = useCallback(
    (option: { label: string; value: string }) => setItemsPerPage(option.value),
    [],
  );
  const handleTabChange = useCallback((value: string) => setActiveTab(value), []);
  // ----------------
  const { userId } = useAuthStore();
  const { fetchUserInfo } = useUserInfoStore();
  const { fetchBalance } = useBalanceStore();

  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [fetchUserInfo, userId]);

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [fetchBalance, userId]);

  return (
    <div className={s.page}>
      <SlotsSection />

      <div className={s.content}>
        <SlotsFilters
          providerFilter={providerFilter}
          popularFilter={popularFilter}
          onProviderChange={handleProviderChange}
          onPopularChange={handlePopularChange}
        />

        <SlotsGrid slotsData={slotsData} isLoading={isLoading} />

        <SlotsStats
          activeTab={activeTab}
          itemsPerPage={itemsPerPage}
          onTabChange={handleTabChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
};
