import s from './Winners.module.css';
import { PlaceIcon } from '../../shared/ui/icons/PlaceIcon/PlaceIcon.tsx';

type Place = 1 | 2 | 3;

type WinnerData = {
  name: string;
  amount: string;
  place: Place;
};

const PLACE_HEIGHTS: Record<Place, string> = {
  1: '47%',
  2: '42.4%',
  3: '37.8%',
};

const PLACE_COLORS: Record<Place, string> = {
  1: '#ffc300',
  2: '#b8b8ff',
  3: '#ff6600',
};

const winnersData: WinnerData[] = [
  { name: 'Michael', amount: '15.01K ₽', place: 2 },
  { name: 'Michael', amount: '105.54K ₽', place: 1 },
  { name: 'Michael', amount: '32.46K ₽', place: 3 },
];

export const Winners = () => {
  return (
    <div className={s.winners}>
      <div className={s.winnersList}>
        {winnersData.map((winner, index) => (
          <div key={index} className={`${s.winnerItem} ${s[`place${winner.place}`]}`}>
            <div className={s.winnerInfo}>
              <div className={s.avatar}></div>
              <div className={s.name}>{winner.name}</div>
              <div className={s.amount}>{winner.amount}</div>
            </div>
            <PlaceIcon
              height={PLACE_HEIGHTS[winner.place]}
              width='100%'
              className={s[`place${winner.place}`]}
              text={winner.place}
              textColor={PLACE_COLORS[winner.place]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
