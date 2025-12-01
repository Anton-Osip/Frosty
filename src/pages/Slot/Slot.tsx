import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import s from './Slot.module.css';
import { SlotHeader, SlotTabsSection, SlotsStats } from '../../widgets';
import { useAuthStore, useGameInfoStore } from '../../shared/stores';


export const Slot = () => {
  const { id:uuid } = useParams();
  const { userId } = useAuthStore();
  const { fetchGameInfo, data, isLoading, toggleFavorite, isTogglingFavorite } = useGameInfoStore();

  const [activeTabSlot, setActiveTabSlot] = useState('big_wins');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [activeTab, setActiveTab] = useState('big_players');
  const [isToggleOn, setIsToggleOn] = useState(false);

  useEffect(() => {
    if (userId && uuid) {
      fetchGameInfo(uuid, { region: null, user_id: userId });
    }
  }, [fetchGameInfo, userId, uuid]);

  const handleItemsPerPageChange = useCallback((option: { label: string; value: string }) => {
    setItemsPerPage(option.value);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleTabChangeSlot = useCallback((value: string) => {
    setActiveTabSlot(value);
  }, []);

  const handlePlay = useCallback(() => {
    // Здесь логика для запуска игры
  }, []);

  const handleDemo = useCallback(() => {
    // Здесь логика для демо-режима
  }, []);

  const handleFavoriteClick = useCallback(() => {
    if (uuid && userId) {
      toggleFavorite(uuid, userId);
    }
  }, [uuid, userId, toggleFavorite]);

  return (
    <div className = {s.wrapper}>
      <SlotHeader
        slotImage = {data?.image || ''}
        name = {data?.name || ''}
        description = {null}
        isFavorite = {data?.is_favorite || false}
        id = {data?.uuid}
        isToggleOn = {isToggleOn}
        isLoading = {isLoading}
        isTogglingFavorite = {isTogglingFavorite}
        onToggleChange = {setIsToggleOn}
        onFavoriteClick = {handleFavoriteClick}
        onPlay = {handlePlay}
        onDemo = {handleDemo}
      />

      <SlotTabsSection
        activeTabSlot = {activeTabSlot}
        onTabChangeSlot = {handleTabChangeSlot}
        activeTab = {activeTab}
        onTabChange = {handleTabChange}
        itemsPerPage = {itemsPerPage}
        onItemsPerPageChange = {handleItemsPerPageChange}
      />

      <SlotsStats
        activeTab = {activeTab}
        itemsPerPage = {itemsPerPage}
        onTabChange = {handleTabChange}
        onItemsPerPageChange = {handleItemsPerPageChange}
      />
    </div>
  );
};
