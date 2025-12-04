import axios, { AxiosError } from 'axios';
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

export interface SlotsAccessErrorResponse {
  detail: string;
}

export interface SlotsAccessError extends Error {
  statusCode?: number;
}

export const getSlotsAccess = async (params: GetSlotsAccessQueryParams): Promise<SlotsAccessResponse> => {
  try {
    const response = await apiClient.get<SlotsAccessResponse>('/promos/slots_access', {
      params: {
        user_id: params.user_id,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<SlotsAccessErrorResponse>;
      const slotsAccessError = new Error(
        axiosError.response?.data?.detail || axiosError.message || 'Failed to get slots access',
      ) as SlotsAccessError;
      slotsAccessError.statusCode = axiosError.response?.status;
      throw slotsAccessError;
    }

    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};
