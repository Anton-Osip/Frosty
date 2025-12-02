import { create } from 'zustand';
import {
  getGameLuckyBets,
  type GetGameLuckyBetsResponse,
  type GetGameLuckyBetsQueryParams,
} from '../api/slotegrator/statistics';

interface GameLuckyBetsState {
  isLoading: boolean;
  error: string | null;
  data: GetGameLuckyBetsResponse | null;
  fetchGameLuckyBets: (params: GetGameLuckyBetsQueryParams) => Promise<void>;
  reset: () => void;
}

export const useGameLuckyBetsStore = create<GameLuckyBetsState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchGameLuckyBets: async (params: GetGameLuckyBetsQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getGameLuckyBets(params);
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
