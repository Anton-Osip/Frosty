import { apiClient } from '../config';

export interface UserInfoResponse {
  id: number;
  user_id: number;
  user_firstname: string | null;
  user_name: string | null;
  reg_date: number;
  balance: number;
  ref_id: number | null;
  type_pay: number | null;
  personal_ref_link: string | null;
  active: -1 | 0 | 1;
  block: -1 | 0 | 1;
  is_hidden: -1 | 0 | 1;
  language_tag: string | null;
  country_code: string | null;
  region_key: string | null;
  region_title: string | null;
  region_emoji: string | null;
  webapp_url: string | null;
  images_url: string | null;
  language_locked: boolean;
  region_locked: boolean;
  avatar_url: string | null;
  locale_source: 'tg' | 'ip' | 'manual' | null;
}

export const getUserInfo = async (userId: number): Promise<UserInfoResponse> => {
  const response = await apiClient.get<UserInfoResponse>(`/users/user_info/${userId}`);
  return response.data;
};
