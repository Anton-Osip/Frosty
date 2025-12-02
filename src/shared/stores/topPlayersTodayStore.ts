import { create } from 'zustand';
import {
  getGameTopPlayersToday,
  type GetGameTopPlayersTodayResponse,
  type GetGameTopPlayersTodayQueryParams,
} from '../api/slotegrator/statistics';

interface TopPlayersTodayState {
  isLoading: boolean;
  error: string | null;
  data: GetGameTopPlayersTodayResponse | null;
  fetchTopPlayersToday: (params: GetGameTopPlayersTodayQueryParams) => Promise<void>;
  reset: () => void;
}

export const useTopPlayersTodayStore = create<TopPlayersTodayState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchTopPlayersToday: async (params: GetGameTopPlayersTodayQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getGameTopPlayersToday(params);
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
