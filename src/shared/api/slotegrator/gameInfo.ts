import { apiClient } from '../config';

export interface GetGameInfoQueryParams {
  user_id?: number | null;
  region?: string | null;
}

export interface GameProvider {
  provider: string;
  label: string | null;
  image_url: string | null;
  game_count: number;
  supports_demo: boolean;
}

export interface GameInfoResponse {
  uuid: string;
  name: string;
  provider: GameProvider;
  image: string | null;
  rtp: number | null;
  volatility: string | null;
  is_mobile: boolean;
  has_freespins: boolean;
  is_favorite: boolean;
}

export const getGameInfo = async (
  uuid: string,
  params?: GetGameInfoQueryParams,
): Promise<GameInfoResponse> => {
  const response = await apiClient.get<GameInfoResponse>(`/slotegrator/games/info/${uuid}`, {
    params,
  });
  return response.data;
};

export interface FavoriteResponse {
  detail: string;
}

export const addToFavorites = async (
  uuid: string,
  userId: number,
): Promise<FavoriteResponse> => {
  const response = await apiClient.post<FavoriteResponse>(
    `/slotegrator/games/favorite/${uuid}`,
    null,
    {
      params: {
        user_id: userId,
      },
    },
  );
  return response.data;
};

export const removeFromFavorites = async (
  uuid: string,
  userId: number,
): Promise<FavoriteResponse> => {
  const response = await apiClient.delete<FavoriteResponse>(
    `/slotegrator/games/favorite/${uuid}`,
    {
      params: {
        user_id: userId,
      },
    },
  );
  return response.data;
};

