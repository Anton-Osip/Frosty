import { apiClient } from '../config.ts';

export interface VerifyWebappUserRequest {
  init_data: string;
  client_ip?: string | null;
  userAgent?: string | null;
  language?: string | null;
  platform?: string | null;
  screenRes?: string | null;
  timezone?: string | null;
  os?: string | null;
  browser?: string | null;
  deviceType?: string | null;
}
export interface VerifyWebappUserSuccessResponse {
  ok: true;
}
export interface VerifyWebappUserErrorResponse {
  ok: false;
  reason: 'geo_block' | 'invalid_data' | 'unexpected_error';
}

export type VerifyWebappUserResponse = VerifyWebappUserSuccessResponse | VerifyWebappUserErrorResponse;

export const verifyWebappUser = async (data: VerifyWebappUserRequest): Promise<VerifyWebappUserResponse> => {
  const response = await apiClient.post<VerifyWebappUserResponse>('/auth/verify_webapp_user', data);
  return response.data;
};
