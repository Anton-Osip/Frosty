import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Slot } from '../../entities/slot/ui';
import { Button } from '../../shared/ui/components';
import { getSlotRoute } from '../../shared/config/routes';
import s from './SlotsGrid.module.css';

type SlotData = {
  id: number;
  backgroundImage: string;
  name: string;
  description: string;
};

type SlotsGridProps = {
  slotsData: SlotData[];
  isLoading: boolean;
};

export const SlotsGrid = ({ slotsData, isLoading }: SlotsGridProps) => {
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
      <Slot
        key={slot.id}
        src={slot.backgroundImage}
        onClick={() =>
          navigate(
            `${getSlotRoute(slot.id)}?name=${encodeURIComponent(slot.name)}&description=${encodeURIComponent(slot.description)}&image=${encodeURIComponent(slot.backgroundImage)}`,
          )
        }
      />
    ));
  }, [slotsData, navigate]);

  return (
    <div className={s.grid}>
      <div className={s.slots}>{isLoading ? skeletonItems : loadedSurfaceItems}</div>
      <div className={s.centeredButton}>
        <Button variant='dark' size='md' style={{ width: '173px' }}>
          Смотреть больше
        </Button>
      </div>
    </div>
  );
};
