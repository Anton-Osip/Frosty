import { useCallback, useEffect, useState } from 'react';
import s from './Slots.module.css';
import { SlotsSection, SlotsFilters, SlotsGrid, SlotsStats } from '../../widgets';
import { useAuthStore,  useGamesStore, useUserInfoStore } from '../../shared/stores';
import type { GetGamesQueryParams } from '../../shared/api/slotegrator/games.ts';
import { isMobile } from '../../shared/utils/clientInfo';

export const Slots = () => {
  const { userId } = useAuthStore();
  const { fetchUserInfo } = useUserInfoStore();
  const { fetchGames, loadMore, data: gamesData, isLoading, isLoadingMore } = useGamesStore();
  const [providerFilter, setProviderFilter] = useState<string | string[]>('all');
  const [popularFilter, setPopularFilter] = useState('popular');
  const [activeTab, setActiveTab] = useState('big_players');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    if (userId) {
      fetchUserInfo(userId);
    }
  }, [fetchUserInfo, userId]);

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
        providers:
          Array.isArray(providerFilter) && providerFilter.length > 0
            ? providerFilter
            : typeof providerFilter === 'string' && providerFilter !== 'all'
              ? [providerFilter]
              : undefined,
        sort_order:
          popularFilter === 'new'
            ? 'new'
            : popularFilter === 'popular'
              ? 'popular'
              : popularFilter === 'a_to_z'
                ? 'asc'
                : popularFilter === 'z_to_a'
                  ? 'desc'
                  : undefined,
        only_favorites: false,
        user_id: userId,
        region: null,
        is_mobile: isMobile(),
        last_name: null,
        last_uuid: null,
        last_tx_count: null,
        last_created_at: null,
        limit: 9,
      };
      fetchGames(data);
    }
  }, [fetchGames, userId, providerFilter, popularFilter, debouncedSearchQuery]);

  const handleProviderChange = useCallback(
    (option: { label: string; value: string } | { label: string; value: string }[]) => {
      if (Array.isArray(option)) {
        const values = option.map(opt => opt.value);
        if (values.includes('all') || values.length === 0) {
          setProviderFilter('all');
        } else {
          setProviderFilter(values);
        }
      } else {
        setProviderFilter(option.value);
      }
    },
    [],
  );
  const handlePopularChange = useCallback(
    (option: { label: string; value: string } | { label: string; value: string }[]) => {
      if (!Array.isArray(option)) {
        setPopularFilter(option.value);
      }
    },
    [],
  );
  const handleItemsPerPageChange = useCallback(
    (option: { label: string; value: string }) => setItemsPerPage(option.value),
    [],
  );
  const handleTabChange = useCallback((value: string) => setActiveTab(value), []);
  const handleSearchChange = useCallback((value: string) => setSearchQuery(value), []);

  const handleLoadMore = useCallback(() => {
    if (!gamesData?.games.length || !userId || isLoadingMore) return;

    const lastGame = gamesData.games[gamesData.games.length - 1];
    const params: GetGamesQueryParams = {
      search: debouncedSearchQuery || undefined,
      sort_order:
        popularFilter === 'new'
          ? 'new'
          : popularFilter === 'popular'
            ? 'popular'
            : popularFilter === 'a_to_z'
              ? 'asc'
              : popularFilter === 'z_to_a'
                ? 'desc'
                : undefined,
      only_favorites: false,
      user_id: userId,
      region: null,
      is_mobile: isMobile(),
      last_name: lastGame.name || null,
      last_uuid: lastGame.uuid || null,
      last_tx_count: lastGame.tx_count || null,
      last_created_at: lastGame.created_at || null,
      limit: parseInt(itemsPerPage, 9) || 9,
      providers:
        Array.isArray(providerFilter) && providerFilter.length > 0
          ? providerFilter
          : typeof providerFilter === 'string' && providerFilter !== 'all'
            ? [providerFilter]
            : undefined,
    };
    loadMore(params);
  }, [gamesData, userId, isLoadingMore, debouncedSearchQuery, providerFilter, popularFilter, itemsPerPage, loadMore]);

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
          isLoading={isLoading || !gamesData}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
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
