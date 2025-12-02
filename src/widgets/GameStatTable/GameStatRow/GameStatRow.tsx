import type { CSSProperties } from 'react';
import s from './GameStatRow.module.css';

type Props = {
  name?: string;
  amount?: string;
  imageSrc?: string;
  className?: string;
  highlight?: boolean;
};

export const GameStatRow = ({ name = 'Dice', amount = '0,00', imageSrc, className, highlight }: Props) => {
  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');
  const amountClassName = highlight ? s.amountHighlight : s.amount;

  const thumbStyle: CSSProperties = imageSrc
    ? {
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div className={rootClassName}>
      <div className={s.left}>
        <div className={s.thumb} style={thumbStyle} aria-hidden='true' />
        <span className={s.name} title={name}>
          {name}
        </span>
      </div>
      <span className={amountClassName}>{amount} ₽</span>
    </div>
  );
};
