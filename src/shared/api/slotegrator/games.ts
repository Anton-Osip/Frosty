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
  const searchParams = new URLSearchParams();

  if (params?.search) {
    searchParams.set('search', params.search);
  }
  if (params?.sort_order) {
    searchParams.set('sort_order', params.sort_order);
  }
  if (params?.limit) {
    searchParams.set('limit', params.limit.toString());
  }
  if (params?.user_id) {
    searchParams.set('user_id', params.user_id.toString());
  }
  if (params?.only_favorites) {
    searchParams.set('only_favorites', 'true');
  }
  if (params?.last_name) {
    searchParams.set('last_name', params.last_name);
  }
  if (params?.last_uuid) {
    searchParams.set('last_uuid', params.last_uuid);
  }
  if (params?.last_tx_count != null) {
    searchParams.set('last_tx_count', params.last_tx_count.toString());
  }
  if (params?.last_created_at) {
    searchParams.set('last_created_at', params.last_created_at);
  }
  if (params?.region) {
    searchParams.set('region', params.region);
  }
  if (params?.is_mobile !== undefined) {
    searchParams.set('is_mobile', params.is_mobile.toString());
  }

  // Добавляем провайдеры через append, чтобы получить несколько параметров providers=value1&providers=value2
  if (params?.providers && params.providers.length > 0) {
    for (const provider of params.providers) {
      searchParams.append('providers', provider);
    }
  }

  const response = await apiClient.get<GetGamesResponse>(`/slotegrator/games?${searchParams.toString()}`);
  return response.data;
};
