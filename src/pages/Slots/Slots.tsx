import { useCallback, useEffect, useState } from 'react';
import s from './Slots.module.css';
import { SlotsSection, SlotsFilters, SlotsGrid, SlotsStats } from '../../widgets';
import { useAuthStore, useBalanceStore, useGamesStore, useUserInfoStore } from '../../shared/stores';
import type { GetGamesQueryParams } from '../../shared/api/slotegrator/games.ts';

export const Slots = () => {
  const [providerFilter, setProviderFilter] = useState('all');
  const [popularFilter, setPopularFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('big_players');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

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
  const handleSearchChange = useCallback((value: string) => setSearchQuery(value), []);
  // ----------------
  const { userId } = useAuthStore();
  const { fetchUserInfo } = useUserInfoStore();
  const { fetchBalance } = useBalanceStore();
  const { fetchGames, loadMore, data: gamesData, isLoading, isLoadingMore } = useGamesStore();

  const handleLoadMore = useCallback(() => {
    if (!gamesData?.games.length || !userId || isLoadingMore) return;

    const lastGame = gamesData.games[gamesData.games.length - 1];
    const params: GetGamesQueryParams = {
      search: debouncedSearchQuery || undefined,
      providers: providerFilter !== 'all' ? [providerFilter] : undefined,
      sort_order:
        popularFilter === 'week'
          ? 'popular'
          : popularFilter !== 'all'
            ? (popularFilter as 'asc' | 'desc' | 'popular' | 'new')
            : undefined,
      only_favorites: false,
      user_id: userId,
      region: null,
      is_mobile: false,
      last_name: lastGame.name || null,
      last_uuid: lastGame.uuid || null,
      last_tx_count: lastGame.tx_count || null,
      last_created_at: lastGame.created_at || null,
      limit: parseInt(itemsPerPage, 9) || 9,
    };
    loadMore(params);
  }, [gamesData, userId, isLoadingMore, debouncedSearchQuery, providerFilter, popularFilter, itemsPerPage, loadMore]);

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

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (userId) {
      const data: GetGamesQueryParams = {
        search: debouncedSearchQuery || undefined,
        providers: providerFilter !== 'all' ? [providerFilter] : undefined,
        sort_order:
          popularFilter === 'week'
            ? 'popular'
            : popularFilter !== 'all'
              ? (popularFilter as 'asc' | 'desc' | 'popular' | 'new')
              : undefined,
        only_favorites: false,
        user_id: userId,
        region: null,
        is_mobile: false,
        last_name: null,
        last_uuid: null,
        last_tx_count: null,
        last_created_at: null,
        limit: 9,
      };
      fetchGames(data);
    }
  }, [fetchGames, userId, providerFilter, popularFilter, debouncedSearchQuery]);

  return (
    <div className={s.page}>
      <SlotsSection />

      <div className={s.content}>
        <SlotsFilters
          providerFilter={providerFilter}
          popularFilter={popularFilter}
          searchQuery={searchQuery}
          onProviderChange={handleProviderChange}
          onPopularChange={handlePopularChange}
          onSearchChange={handleSearchChange}
        />

        <SlotsGrid
          slotsData={gamesData?.games || []}
          isLoading={isLoading || !gamesData || gamesData.games.length === 0}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          hasMore={gamesData ? gamesData.games.length >= (parseInt(itemsPerPage, 9) || 9) : false}
        />

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
