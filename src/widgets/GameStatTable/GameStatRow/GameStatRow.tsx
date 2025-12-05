import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './GameStatRow.module.css';
import { getSlotRoute } from '../../../shared/config/routes';

type Props = {
  name?: string;
  amount?: string;
  imageSrc?: string;
  className?: string;
  highlight?: boolean;
  gameUuid?: string;
};

export const GameStatRow = ({ name = 'Dice', amount = '0,00', imageSrc, className, highlight, gameUuid }: Props) => {
  const navigate = useNavigate();

  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');
  const amountClassName = highlight ? s.amountHighlight : s.amount;

  const thumbStyle: CSSProperties = imageSrc
    ? {
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  const handleClick = () => {
    if (!gameUuid) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(getSlotRoute(gameUuid));
  };

  // Форматируем число без дробной части
  const formatAmount = (value: string): string => {
    const numValue = parseFloat(value.replace(',', '.'));
    if (isNaN(numValue)) return value;
    return Math.floor(numValue).toString();
  };

  return (
    <div className={rootClassName} onClick={handleClick}>
      <div className={s.left}>
        <div className={s.thumb} style={thumbStyle} aria-hidden='true' />
        <span className={s.name} title={name}>
          {name}
        </span>
      </div>
      <span className={amountClassName}>{formatAmount(amount)} ₽</span>
    </div>
  );
};
