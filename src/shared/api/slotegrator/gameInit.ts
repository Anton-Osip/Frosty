import axios, { AxiosError } from 'axios';
import { apiClient } from '../config';

export interface InitGameRequest {
  user_id: number;
  game_uuid: string;
}

export interface InitGameResponse {
  url: string;
}

export interface InitGameDeniedDetail {
  code: 'slots_access_denied';
  required_deposit: string;
  active_promo_total: string;
  promo_bonus: string;
  promo_freespins: string;
}

export interface InitGameDeniedResponse {
  detail: InitGameDeniedDetail;
}

export interface InitGameErrorResponse {
  detail: string;
}

export interface InitDemoGameRequest {
  game_uuid: string;
}

export interface InitDemoGameResponse {
  url: string;
}

export interface InitDemoGameErrorResponse {
  detail: string;
}

export interface GameInitError extends Error {
  statusCode?: number;
  deniedDetail?: InitGameDeniedDetail;
}

export const initGame = async (request: InitGameRequest): Promise<InitGameResponse> => {
  try {
    const response = await apiClient.post<InitGameResponse>('/slotegrator/games/init', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<InitGameDeniedResponse | InitGameErrorResponse>;

      if (axiosError.response?.status === 403) {
        const deniedResponse = axiosError.response.data as InitGameDeniedResponse;
        const initError = new Error('Access denied') as GameInitError;
        initError.statusCode = 403;
        initError.deniedDetail = deniedResponse.detail;
        throw initError;
      }

      if (axiosError.response?.status === 500) {
        const errorResponse = axiosError.response.data as InitGameErrorResponse;
        const initError = new Error(errorResponse.detail || 'Internal Server Error') as GameInitError;
        initError.statusCode = 500;
        throw initError;
      }

      const initError = new Error(axiosError.message || 'Failed to initialize game') as GameInitError;
      initError.statusCode = axiosError.response?.status;
      throw initError;
    }

    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};

export const initDemoGame = async (request: InitDemoGameRequest): Promise<InitDemoGameResponse> => {
  try {
    const response = await apiClient.post<InitDemoGameResponse>('/slotegrator/games/init-demo', request);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<InitDemoGameErrorResponse>;

      if (axiosError.response?.status === 500) {
        const errorResponse = axiosError.response.data as InitDemoGameErrorResponse;
        const initError = new Error(errorResponse.detail || 'Internal Server Error') as GameInitError;
        initError.statusCode = 500;
        throw initError;
      }

      const initError = new Error(axiosError.message || 'Failed to initialize demo game') as GameInitError;
      initError.statusCode = axiosError.response?.status;
      throw initError;
    }

    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
};
