import type { CSSProperties } from 'react';
import s from './Slot.module.css';

type SlotProps = {
  className?: string;
  src?: string;
  onClick?: () => void;
};

export const Slot = ({ className, src, onClick }: SlotProps) => {
  const style: CSSProperties = {
    background: 'var(--dark-sidebar, #131824)',
    cursor: onClick ? 'pointer' : 'default',
  };
  return (
    <div className={`${s.wrapper} ${className ?? ''}`.trim()} style={style} onClick={onClick}>
      {src && <img src={src} alt='slot' className={s.image} />}
    </div>
  );
};
