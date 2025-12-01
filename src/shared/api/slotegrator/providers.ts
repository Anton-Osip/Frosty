import { apiClient } from '../config';

export interface GetProvidersQueryParams {
  region?: string | null;
  user_id?: number | null;
}

export interface Provider {
  provider: string;
  label: string | null;
  image_url: string | null;
  game_count: number;
  supports_demo: boolean;
}

export const getProviders = async (params?: GetProvidersQueryParams): Promise<Provider[]> => {
  const response = await apiClient.get<Provider[]>('/slotegrator/providers', {
    params,
  });
  return response.data;
};
