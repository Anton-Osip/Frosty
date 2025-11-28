import type { CSSProperties } from 'react';
import s from './GameStatRow.module.css';

type Props = {
  /** Название игры, по умолчанию "Dice" */
  name?: string;
  /** Сумма в рублях, уже отформатированная, по умолчанию "0,00" */
  amount?: string;
  /** URL иконки игры; если не передан — показываем квадратный плейсхолдер */
  imageSrc?: string;
  /** Дополнительные классы-обёртки */
  className?: string;
};

export const GameStatRow = ({ name = 'Dice', amount = '0,00', imageSrc, className }: Props) => {
  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');

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
      <span className={s.amount}>{amount} ₽</span>
    </div>
  );
};
