import s from './GameStatTable.module.css';
import { GameStatRow } from './GameStatRow/GameStatRow.tsx';

export type GameStatItem = {
  name?: string;
  amount?: string;
  imageSrc?: string;
  /**
   * Подсветить сумму зелёным, как выигрыш
   */
  highlight?: boolean;
};

type Props = {
  items: GameStatItem[];
  className?: string;
};

export const GameStatTable = ({ items, className }: Props) => {
  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <div className={s.header}>
        <span className={s.headerCellLeft}>Игра</span>
        <span className={s.headerCellRight}>Выплата</span>
      </div>

      <div className={s.body}>
        {items.map((item, index) => (
          <GameStatRow
            key={`${item.name ?? 'game'}-${index}`}
            name={item.name}
            amount={item.amount}
            imageSrc={item.imageSrc}
            className={item.highlight ? s.rowHighlight : s.rowDefault}
          />
        ))}
      </div>
    </div>
  );
};
