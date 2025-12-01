import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import s from './Slot.module.css';
import { SlotHeader, SlotTabsSection, SlotsStats } from '../../widgets';
import { useAuthStore, useGameInfoStore, useGameInitStore } from '../../shared/stores';

export const Slot = () => {
  const { id: uuid } = useParams();
  const { userId } = useAuthStore();
  const { fetchGameInfo, data, isLoading, toggleFavorite, isTogglingFavorite } = useGameInfoStore();
  const { initGame, initDemoGame, gameUrl, demoUrl } = useGameInitStore();

  const [activeTabSlot, setActiveTabSlot] = useState('big_wins');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [activeTab, setActiveTab] = useState('big_players');
  const [isToggleOn, setIsToggleOn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [uuid]);

  useEffect(() => {
    if (userId && uuid) {
      fetchGameInfo(uuid, { region: null, user_id: userId });
    }
  }, [fetchGameInfo, userId, uuid]);

  useEffect(() => {
    if (gameUrl) {
      import('@twa-dev/sdk').then(module => {
        const WebApp = module.default;
        WebApp.openLink(gameUrl);
      });
    }
  }, [gameUrl]);

  useEffect(() => {
    if (demoUrl) {
      import('@twa-dev/sdk').then(module => {
        const WebApp = module.default;
        WebApp.openLink(demoUrl);
      });
    }
  }, [demoUrl]);

  const handleItemsPerPageChange = useCallback((option: { label: string; value: string }) => {
    setItemsPerPage(option.value);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleTabChangeSlot = useCallback((value: string) => {
    setActiveTabSlot(value);
  }, []);

  const handlePlay = useCallback(async () => {
    if (!uuid || !userId) {
      console.error('Missing uuid or userId');
      return;
    }

    try {
      await initGame({ user_id: userId, game_uuid: uuid });
    } catch (error) {
      console.error('Failed to initialize game:', error);
    }
  }, [uuid, userId, initGame]);

  const handleDemo = useCallback(async () => {
    if (!uuid) {
      console.error('Missing uuid');
      return;
    }

    try {
      await initDemoGame({ game_uuid: uuid });
    } catch (error) {
      console.error('Failed to initialize demo game:', error);
    }
  }, [uuid, initDemoGame]);

  const handleFavoriteClick = useCallback(() => {
    if (uuid && userId) {
      toggleFavorite(uuid, userId);
    }
  }, [uuid, userId, toggleFavorite]);

  return (
    <div className={s.wrapper}>
      <SlotHeader
        slotImage={data?.image || ''}
        name={data?.name || ''}
        description={data?.provider.provider || ''}
        isFavorite={data?.is_favorite || false}
        id={data?.uuid}
        isToggleOn={isToggleOn}
        isLoading={isLoading}
        isTogglingFavorite={isTogglingFavorite}
        onToggleChange={setIsToggleOn}
        onFavoriteClick={handleFavoriteClick}
        onPlay={handlePlay}
        onDemo={handleDemo}
      />

      <SlotTabsSection
        activeTabSlot={activeTabSlot}
        onTabChangeSlot={handleTabChangeSlot}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <SlotsStats
        activeTab={activeTab}
        itemsPerPage={itemsPerPage}
        onTabChange={handleTabChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};
