import s from './SlotHeader.module.css';
import { HeartIcon } from '../../shared/ui/icons';
import { ToggleSwitch, Button } from '../../shared/ui/components';

type SlotHeaderProps = {
  slotImage: string;
  name: string | null;
  description: string | null;
  id: string | undefined;
  isToggleOn: boolean;
  onToggleChange: (value: boolean) => void;
  onPlay: () => void;
  onDemo: () => void;
};

export const SlotHeader = ({
  slotImage,
  name,
  description,
  id,
  isToggleOn,
  onToggleChange,
  onPlay,
  onDemo,
}: SlotHeaderProps) => {
  return (
    <div className={s.slotWrapper}>
      <div className={s.photoAndDescription}>
        <img src={slotImage} alt={name || 'Slot image'} className={s.slotImage} />

        <div className={s.descriptionHeartToggle}>
          <div className={s.descriptionHeart}>
            <div className={s.titleDescription}>
              <h1 className={s.title}>{name || `Детали слота ${id}`}</h1>
              <p className={s.description}>{description || 'Описание игрового автомата будет здесь'}</p>
            </div>

            <div className={s.heart}>
              <HeartIcon />
            </div>
          </div>

          <div className={s.toggleContainer}>
            <ToggleSwitch isOn={isToggleOn} onToggle={onToggleChange} />
            <span className={s.fullscreenLabel}>Полный экран</span>
          </div>
        </div>
      </div>

      <div className={s.buttons}>
        <Button onClick={onPlay} variant='accent' width='100%' height='39px' borderRadius={10}>
          Играть
        </Button>
        <Button onClick={onDemo} variant='dark' width='100%' height='39px' borderRadius={10}>
          Демо
        </Button>
      </div>
    </div>
  );
};
