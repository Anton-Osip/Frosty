import { create } from 'zustand';
import { getUserInfo, type UserInfoResponse } from '../api/users/userInfo';

interface UserInfoState {
  isLoading: boolean;
  error: string | null;
  data: UserInfoResponse | null;
  fetchUserInfo: (userId: number) => Promise<void>;
  reset: () => void;
}

export const useUserInfoStore = create<UserInfoState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchUserInfo: async (userId: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getUserInfo(userId);
      set({ isLoading: false, data: response, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, data: null });
    }
  },

  reset: () => {
    set({ isLoading: false, error: null, data: null });
  },
}));
