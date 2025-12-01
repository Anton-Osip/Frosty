import { apiClient } from '../config';

export interface UserBalanceResponse {
  balance: number;
  cash: number;
  bonus: number;
}

export const getUserBalance = async (userId: number): Promise<UserBalanceResponse> => {
  const response = await apiClient.get<UserBalanceResponse>(`/users/balance/${userId}`);
  return response.data;
};
