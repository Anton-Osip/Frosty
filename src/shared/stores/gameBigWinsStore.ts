import { create } from 'zustand';
import {
  getGameBigWins,
  type GetGameBigWinsResponse,
  type GetGameBigWinsQueryParams,
} from '../api/slotegrator/statistics';

interface GameBigWinsState {
  isLoading: boolean;
  error: string | null;
  data: GetGameBigWinsResponse | null;
  fetchGameBigWins: (params: GetGameBigWinsQueryParams) => Promise<void>;
  reset: () => void;
}

export const useGameBigWinsStore = create<GameBigWinsState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchGameBigWins: async (params: GetGameBigWinsQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getGameBigWins(params);
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
