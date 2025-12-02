import { create } from 'zustand';
import { getHighBetsList, type Bet, type GetHighBetsListQueryParams } from '../api/slotegrator/statistics';

interface HighBetsState {
  isLoading: boolean;
  error: string | null;
  data: Bet[] | null;
  fetchHighBetsList: (params: GetHighBetsListQueryParams) => Promise<void>;
  reset: () => void;
}

export const useHighBetsStore = create<HighBetsState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchHighBetsList: async (params: GetHighBetsListQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getHighBetsList(params);
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
