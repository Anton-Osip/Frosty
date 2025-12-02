import { create } from 'zustand';
import { getTotalBetsList, type Bet, type GetTotalBetsListQueryParams } from '../api/slotegrator/statistics';

interface TotalBetsState {
  isLoading: boolean;
  error: string | null;
  data: Bet[] | null;
  fetchTotalBetsList: (params: GetTotalBetsListQueryParams) => Promise<void>;
  reset: () => void;
}

export const useTotalBetsStore = create<TotalBetsState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchTotalBetsList: async (params: GetTotalBetsListQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getTotalBetsList(params);
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
