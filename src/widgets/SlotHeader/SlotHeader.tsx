import s from './SlotHeader.module.css';
import { HeartIcon } from '../../shared/ui/icons';
import { ToggleSwitch, Button } from '../../shared/ui/components';

type SlotHeaderProps = {
  slotImage: string;
  name: string | null;
  description: string | null;
  isFavorite: boolean;
  id: string | undefined;
  isToggleOn: boolean;
  isLoading?: boolean;
  isTogglingFavorite?: boolean;
  onToggleChange: (value: boolean) => void;
  onFavoriteClick?: () => void;
  onPlay: (uuid?: string) => void;
  onDemo: (uuid?: string) => void;
};

export const SlotHeader = ({
  slotImage,
  name,
  description,
  id,
  isToggleOn,
  isLoading = false,
  isTogglingFavorite = false,
  onToggleChange,
  onFavoriteClick,
  onPlay,
  onDemo,
  isFavorite,
}: SlotHeaderProps) => {
  return (
    <div className={s.slotWrapper}>
      <div className={s.photoAndDescription}>
        {isLoading ? (
          <div className={s.skeletonImage}>
            <div className={s.skeletonShimmer} />
          </div>
        ) : slotImage ? (
          <img src={slotImage} alt={name || 'Slot image'} className={s.slotImage} />
        ) : (
          <div className={s.skeletonImage}>
            <div className={s.skeletonShimmer} />
          </div>
        )}

        <div className={s.descriptionHeartToggle}>
          <div className={s.descriptionHeart}>
            <div className={s.titleDescription}>
              <h1 className={s.title}>{name || `Детали слота ${id}`}</h1>
              {description && <p className={s.description}>{description}</p>}
            </div>
            <button
              className={s.heartButton}
              onClick={onFavoriteClick}
              disabled={isTogglingFavorite}
              aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <HeartIcon className={isFavorite ? s.isFavorite : ''} />
            </button>
          </div>

          <div className={s.toggleContainer}>
            <ToggleSwitch isOn={isToggleOn} onToggle={onToggleChange} />
            <span className={s.fullscreenLabel}>Полный экран</span>
          </div>
        </div>
      </div>

      <div className={s.buttons}>
        <Button
          onClick={() => onPlay(id)}
          variant='accent'
          width='100%'
          height='39px'
          style={{ minHeight: 'auto' }}
          borderRadius={10}
        >
          Играть
        </Button>
        <Button
          style={{ minHeight: 'auto' }}
          onClick={() => onDemo(id)}
          variant='dark'
          width='100%'
          height='39px'
          borderRadius={10}
        >
          Демо
        </Button>
      </div>
    </div>
  );
};
