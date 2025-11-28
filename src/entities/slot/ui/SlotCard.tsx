import { useParams, useSearchParams } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import s from './SlotCard.module.css';

import previewTest1 from '../../../assets/images/png/previewTest1.png';
import previewTest2 from '../../../assets/images/png/previewTest2.png';
import previewTest3 from '../../../assets/images/png/previewTest3.png';
import previewTest4 from '../../../assets/images/png/previewTest4.png';
import previewTest5 from '../../../assets/images/png/previewTest5.png';
import previewTest6 from '../../../assets/images/png/previewTest6.png';
import previewTest7 from '../../../assets/images/png/previewTest7.png';
import previewTest8 from '../../../assets/images/png/previewTest8.png';
import previewTest9 from '../../../assets/images/png/previewTest9.png';
import { SlotHeader, SlotTabsSection, SlotsStats } from '../../../widgets';

const IMAGE_MAP: { [key: string]: string } = {
  previewTest1: previewTest1,
  previewTest2: previewTest2,
  previewTest3: previewTest3,
  previewTest4: previewTest4,
  previewTest5: previewTest5,
  previewTest6: previewTest6,
  previewTest7: previewTest7,
  previewTest8: previewTest8,
  previewTest9: previewTest9,
};

const IMAGE_BY_ID: { [key: string]: string } = {
  '1': previewTest1,
  '2': previewTest2,
  '3': previewTest3,
  '4': previewTest4,
  '5': previewTest5,
  '6': previewTest6,
  '7': previewTest7,
  '8': previewTest8,
  '9': previewTest9,
};

export const SlotCard = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const description = searchParams.get('description');
  const imageKey = searchParams.get('image');

  const [activeTabSlot, setActiveTabSlot] = useState('big_wins');
  const [itemsPerPage, setItemsPerPage] = useState('10');
  const [activeTab, setActiveTab] = useState('big_players');
  const [isToggleOn, setIsToggleOn] = useState(false);

  const slotImage = useMemo(() => {
    if (imageKey && IMAGE_MAP[imageKey]) {
      return IMAGE_MAP[imageKey];
    }
    if (id && IMAGE_BY_ID[id]) {
      return IMAGE_BY_ID[id];
    }
    return previewTest2;
  }, [id, imageKey]);

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

  return (
    <div className={s.wrapper}>
      <SlotHeader
        slotImage={slotImage}
        name={name}
        description={description}
        id={id}
        isToggleOn={isToggleOn}
        onToggleChange={setIsToggleOn}
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
