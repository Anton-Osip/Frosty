import s from './GameStatTable.module.css';
import { GameStatRow } from './GameStatRow/GameStatRow.tsx';

export type GameStatItem = {
  id?: string | number;
  name?: string;
  amount?: string;
  imageSrc?: string;
  highlight?: boolean;
  gameUuid?: string;
};

type Props = {
  items: GameStatItem[];
  className?: string;
  isLoading?: boolean;
};

export const GameStatTable = ({ items, className, isLoading = false }: Props) => {
  const rootClassName = [s.root, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={rootClassName}>
      <div className={s.header}>
        <span className={s.headerCellLeft}>Игра</span>
        <span className={s.headerCellRight}>Выплата</span>
      </div>

      <div className={s.body}>
        {isLoading ? (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className={s.skeletonRow}>
                <div className={s.skeletonLeft}>
                  <div className={s.skeletonThumb} />
                  <div className={s.skeletonName} />
                </div>
                <div className={s.skeletonAmount} />
                <div className={s.skeletonShimmer} />
              </div>
            ))}
          </>
        ) : items.length === 0 ? (
          <div className={s.emptyMessage}>
            <span>Нет данных для отображения</span>
          </div>
        ) : (
          items.map(item => (
            <GameStatRow
              key={item.id}
              name={item.name}
              amount={item.amount}
              imageSrc={item.imageSrc}
              className={item.highlight ? s.rowHighlight : s.rowDefault}
              highlight={item.highlight}
              gameUuid={item.gameUuid}
            />
          ))
        )}
      </div>
    </div>
  );
};
