import { apiClient } from '../config';

export interface GetGamesQueryParams {
  search?: string;
  providers?: string[];
  sort_order?: 'asc' | 'desc' | 'popular' | 'new';
  only_favorites?: boolean;
  user_id?: number | null;
  region?: string | null;
  is_mobile?: boolean;
  last_name?: string | null;
  last_uuid?: string | null;
  last_tx_count?: number | null;
  last_created_at?: string | null;
  limit?: number;
}

export interface Game {
  uuid: string;
  name: string;
  provider_id: number;
  image: string | null;
  is_favorite: boolean;
  tx_count: number | null;
  created_at: string | null;
}

export interface Provider {
  provider: string;
  label: string | null;
  image_url: string | null;
  game_count: number;
  supports_demo: boolean;
}

export interface GetGamesResponse {
  games: Game[];
  providers: Provider[];
}

export const getGames = async (params?: GetGamesQueryParams): Promise<GetGamesResponse> => {
  const response = await apiClient.get<GetGamesResponse>('/slotegrator/games', {
    params,
  });
  return response.data;
};
