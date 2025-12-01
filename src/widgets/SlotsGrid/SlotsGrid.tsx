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
  hasMore?: boolean;
};

export const SlotsGrid = ({
  slotsData,
  isLoading,
  isLoadingMore = false,
  onLoadMore,
  hasMore = false,
}: SlotsGridProps) => {
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

  return (
    <div className={s.grid}>
      <div className={s.slots}>
        {isLoading ? (
          skeletonItems
        ) : (
          <>
            {loadedSurfaceItems}
            {isLoadingMore && skeletonItems}
          </>
        )}
      </div>
      {hasMore && !isLoading && !isLoadingMore && (
        <div className={s.centeredButton}>
          <Button variant='dark' size='md' style={{ width: '173px' }} onClick={onLoadMore}>
            Смотреть больше
          </Button>
        </div>
      )}
    </div>
  );
};
