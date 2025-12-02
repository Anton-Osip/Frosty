import { apiClient } from '../config';

export interface GetMyBetsListQueryParams {
  user_id: number;
  game_uuid?: string | null;
  region?: string | null;
  limit: number;
}

export interface Bet {
  id: number;
  user_id: number;
  user_name: string;
  amount: number;
  comment: string | null;
  create_date: number;
  game_uuid: string | null;
  source: string;
  type: string;
  slot_name: string | null;
  slot_image_url: string | null;
}

export const getMyBetsList = async (params: GetMyBetsListQueryParams): Promise<Bet[]> => {
  const searchParams = new URLSearchParams();

  searchParams.set('user_id', params.user_id.toString());
  searchParams.set('limit', params.limit.toString());

  if (params.game_uuid !== undefined && params.game_uuid !== null) {
    searchParams.set('game_uuid', params.game_uuid);
  }
  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }

  const response = await apiClient.get<Bet[]>(`/slotegrator/statistics/my_bets_list?${searchParams.toString()}`);
  return response.data;
};

export interface GetTotalBetsListQueryParams {
  game_uuid?: string | null;
  region?: string | null;
  user_id?: number | null;
  limit: number;
}

export const getTotalBetsList = async (params: GetTotalBetsListQueryParams): Promise<Bet[]> => {
  const searchParams = new URLSearchParams();

  searchParams.set('limit', params.limit.toString());

  if (params.game_uuid !== undefined && params.game_uuid !== null) {
    searchParams.set('game_uuid', params.game_uuid);
  }
  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }
  if (params.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }

  const response = await apiClient.get<Bet[]>(`/slotegrator/statistics/total_bets_list?${searchParams.toString()}`);
  return response.data;
};

export interface GetHighBetsListQueryParams {
  game_uuid?: string | null;
  region?: string | null;
  user_id?: number | null;
  limit: number;
  min_bet: number;
}

export const getHighBetsList = async (params: GetHighBetsListQueryParams): Promise<Bet[]> => {
  const searchParams = new URLSearchParams();

  searchParams.set('limit', params.limit.toString());
  searchParams.set('min_bet', params.min_bet.toString());

  if (params.game_uuid !== undefined && params.game_uuid !== null) {
    searchParams.set('game_uuid', params.game_uuid);
  }
  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }
  if (params.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }

  const response = await apiClient.get<Bet[]>(`/slotegrator/statistics/high_bets_list?${searchParams.toString()}`);
  return response.data;
};

export interface GetGameTopPlayersTodayQueryParams {
  game_uuid: string;
  limit: number;
  region?: string | null;
  user_id?: number | null;
}

export interface TopPlayer {
  user_id: number;
  user_name: string;
  is_hidden: number;
  total_bet: number;
  bet_count: number;
  date: number;
  user_avatar_url: string | null;
}

export interface GetGameTopPlayersTodayResponse {
  top_players_today: TopPlayer[];
}

export const getGameTopPlayersToday = async (
  params: GetGameTopPlayersTodayQueryParams,
): Promise<GetGameTopPlayersTodayResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('game_uuid', params.game_uuid);
  searchParams.set('limit', params.limit.toString());

  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }
  if (params.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }

  const response = await apiClient.get<GetGameTopPlayersTodayResponse>(
    `/slotegrator/statistics/game/top_players_today?${searchParams.toString()}`,
  );
  return response.data;
};

export interface GetGameBigWinsQueryParams {
  game_uuid: string;
  limit: number;
  region?: string | null;
  user_id?: number | null;
}

export interface BigWin {
  user_id: number;
  user_name: string;
  is_hidden: number;
  payout: number;
  date: number;
  user_avatar_url: string | null;
}

export interface GetGameBigWinsResponse {
  big_wins: BigWin[];
}

export const getGameBigWins = async (params: GetGameBigWinsQueryParams): Promise<GetGameBigWinsResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('game_uuid', params.game_uuid);
  searchParams.set('limit', params.limit.toString());

  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }
  if (params.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }

  const response = await apiClient.get<GetGameBigWinsResponse>(
    `/slotegrator/statistics/game/big_wins?${searchParams.toString()}`,
  );
  return response.data;
};

export interface GetGameLuckyBetsQueryParams {
  game_uuid: string;
  limit: number;
  region?: string | null;
  user_id?: number | null;
}

export interface LuckyBet {
  user_id: number;
  user_name: string;
  is_hidden: number;
  average_payout: number;
  bet_count: number;
  date: number;
  user_avatar_url: string | null;
}

export interface GetGameLuckyBetsResponse {
  lucky_bets: LuckyBet[];
}

export const getGameLuckyBets = async (params: GetGameLuckyBetsQueryParams): Promise<GetGameLuckyBetsResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.set('game_uuid', params.game_uuid);
  searchParams.set('limit', params.limit.toString());

  if (params.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }
  if (params.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }

  const response = await apiClient.get<GetGameLuckyBetsResponse>(
    `/slotegrator/statistics/game/lucky_bets?${searchParams.toString()}`,
  );
  return response.data;
};
