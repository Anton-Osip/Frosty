import { apiClient } from '../config';

export interface SlotsAccessResponse {
  can_play: boolean;
  required_deposit: string;
  active_promo_total: string;
  promo_bonus: string;
  promo_freespins: string;
  freespin_allowed_game_uuids: string[];
}

export interface GetSlotsAccessQueryParams {
  user_id: number;
}

export const getSlotsAccess = async (params: GetSlotsAccessQueryParams): Promise<SlotsAccessResponse> => {
  const response = await apiClient.get<SlotsAccessResponse>('/promos/slots_access', {
    params: {
      user_id: params.user_id,
    },
  });
  return response.data;
};
