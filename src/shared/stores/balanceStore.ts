import { create } from 'zustand';
import { getUserBalance, type UserBalanceResponse } from '../api/users/balance';

interface BalanceState {
  isLoading: boolean;
  error: string | null;
  data: UserBalanceResponse | null;
  fetchBalance: (userId: number) => Promise<void>;
  reset: () => void;
}

export const useBalanceStore = create<BalanceState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchBalance: async (userId: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getUserBalance(userId);
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
