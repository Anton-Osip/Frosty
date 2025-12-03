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
  const searchParams = new URLSearchParams();

  if (params?.user_id !== undefined && params.user_id !== null) {
    searchParams.set('user_id', params.user_id.toString());
  }
  if (params?.region !== undefined && params.region !== null) {
    searchParams.set('region', params.region);
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/slotegrator/providers?${queryString}` : '/slotegrator/providers';

  const response = await apiClient.get<Provider[]>(url);
  return response.data;
};
