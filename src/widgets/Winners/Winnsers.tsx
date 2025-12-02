import { useMemo } from 'react';
import s from './Winners.module.css';
import place1 from '../../assets/images/icons/place1.svg';
import place2 from '../../assets/images/icons/place2.svg';
import place3 from '../../assets/images/icons/place3.svg';
import type { BigWin, LuckyBet, TopPlayer } from '../../shared/api/slotegrator/statistics';

type Place = 1 | 2 | 3;

type WinnerData = {
  name: string;
  amount: string;
  place: Place;
  avatarUrl?: string | null;
  userId?: number;
};

type WinnersProps = {
  data: (BigWin | LuckyBet | TopPlayer)[];
  isLoading: boolean;
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

const PLACES: Place[] = [2, 1, 3];

const formatAmount = (amount: number): string => {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}K ₽`;
  }
  return `${amount.toFixed(2)} ₽`;
};

export const Winners = ({ data, isLoading }: WinnersProps) => {
  const winnersData: WinnerData[] = useMemo(() => {
    const placeMapping: [number, Place][] = [
      [0, 2],
      [1, 1],
      [2, 3],
    ];

    if (!data || data.length === 0) {
      return PLACES.map(place => ({
        name: '—',
        amount: '—',
        place,
      }));
    }

    return placeMapping.map(([dataIndex, place]) => {
      const item = data[dataIndex];
      if (!item) {
        return {
          name: '—',
          amount: '—',
          place,
        };
      }

      let amount: string;
      if ('payout' in item) {
        amount = formatAmount(item.payout);
      } else if ('average_payout' in item) {
        amount = formatAmount(item.average_payout);
      } else if ('total_bet' in item) {
        amount = formatAmount(item.total_bet);
      } else {
        amount = '—';
      }

      return {
        name: item.user_name,
        amount,
        place,
        avatarUrl: item.user_avatar_url,
        userId: item.user_id,
      };
    });
  }, [data]);

  return (
    <div className={s.winners}>
      <div className={s.winnersList}>
        {winnersData.map((winner, index) => (
          <div
            key={`${winner.userId || `empty-${index}`}-${index}`}
            className={`${s.winnerItem} ${s[`place${winner.place}`]}`}
          >
            <div className={s.winnerInfo}>
              {isLoading ? (
                <div className={s.avatarSkeleton}>
                  <div className={s.skeletonShimmer} />
                </div>
              ) : (
                <div
                  className={s.avatar}
                  style={
                    winner.avatarUrl
                      ? {
                          backgroundImage: `url(${winner.avatarUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : {}
                  }
                ></div>
              )}
              {isLoading ? (
                <div className={s.nameSkeleton}>
                  <div className={s.skeletonShimmer} />
                </div>
              ) : (
                <div className={s.name}>{winner.name}</div>
              )}
              {isLoading ? (
                <div className={s.amountSkeleton}>
                  <div className={s.skeletonShimmer} />
                </div>
              ) : (
                <div className={s.amount}>{winner.amount}</div>
              )}
            </div>

            <div style={{ aspectRatio: PLACE_RATIO[winner.place] }} className={s[`place${winner.place}`]}>
              <img src={PLACE_IMAGE[winner.place]} alt='place' style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
