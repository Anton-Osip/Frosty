import s from './Winners.module.css';
import place1 from '../../assets/images/icons/place1.svg'
import place2 from '../../assets/images/icons/place2.svg'
import place3 from '../../assets/images/icons/place3.svg'
type Place = 1 | 2 | 3;

type WinnerData = {
  name: string;
  amount: string;
  place: Place;
};

const PLACE_IMAGE: Record<Place, string> = {
  1: place1,
  2: place2,
  3: place3,
};
const PLACE_RATIO: Record<Place, string> = {
  1: '128/102',
  2: '91/92',
  3: '91/82',
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

            <div style={{ aspectRatio: PLACE_RATIO[winner.place] }} className={s[`place${winner.place}`]}>
              <img src={PLACE_IMAGE[winner.place]} alt="place" style={{ width: '100%',height: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
