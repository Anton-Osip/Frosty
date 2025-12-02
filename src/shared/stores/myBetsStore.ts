import { create } from 'zustand';
import { getMyBetsList, type Bet, type GetMyBetsListQueryParams } from '../api/slotegrator/statistics';

interface MyBetsState {
  isLoading: boolean;
  error: string | null;
  data: Bet[] | null;
  fetchMyBetsList: (params: GetMyBetsListQueryParams) => Promise<void>;
  reset: () => void;
}

export const useMyBetsStore = create<MyBetsState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchMyBetsList: async (params: GetMyBetsListQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getMyBetsList(params);
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
