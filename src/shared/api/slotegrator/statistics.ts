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
