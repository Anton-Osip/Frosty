import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/components';
import { getSlotRoute } from '../../shared/config/routes';
import s from './SlotsGrid.module.css';
import { SlotImage } from '../SlotImage/SlotImage.tsx';
import type { Game } from '../../shared/api/slotegrator/games.ts';

type SlotsGridProps = {
  slotsData: Game[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
};

export const SlotsGrid = ({ slotsData, isLoading, isLoadingMore = false, onLoadMore }: SlotsGridProps) => {
  const navigate = useNavigate();

  const skeletonItems = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => (
      <div key={index} className={s.skeletonSlot}>
        <div className={s.skeletonShimmer} />
      </div>
    ));
  }, []);

  const loadedSurfaceItems = useMemo(() => {
    return slotsData.map(slot => (
      <SlotImage
        key={slot.uuid}
        src={slot.image || ''}
        onClick={() =>
          navigate(
            `${getSlotRoute(slot.uuid)}?name=${encodeURIComponent(slot.name)}&image=${encodeURIComponent(slot.image || '')}`,
          )
        }
      />
    ));
  }, [slotsData, navigate]);

  const shouldShowButton = !isLoading && slotsData.length > 0;

  return (
    <div className={s.grid}>
      <div className={s.slots}>
        {isLoading ? (
          skeletonItems
        ) : slotsData.length === 0 ? (
          <div className={s.emptyMessage}>Игр не найдено</div>
        ) : (
          <>
            {loadedSurfaceItems}
            {isLoadingMore && skeletonItems}
          </>
        )}
      </div>
      {shouldShowButton && onLoadMore && (
        <div className={s.centeredButton}>
          <Button variant='dark' size='md' onClick={onLoadMore}>
            Смотреть больше
          </Button>
        </div>
      )}
    </div>
  );
};
