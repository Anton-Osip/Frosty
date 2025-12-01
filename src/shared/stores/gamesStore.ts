import { create } from 'zustand';
import { getGames, type GetGamesResponse, type GetGamesQueryParams } from '../api/slotegrator/games';

interface GamesState {
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  data: GetGamesResponse | null;
  fetchGames: (params?: GetGamesQueryParams) => Promise<void>;
  loadMore: (params: GetGamesQueryParams) => Promise<void>;
  reset: () => void;
}

export const useGamesStore = create<GamesState>(set => ({
  isLoading: false,
  isLoadingMore: false,
  error: null,
  data: null,

  fetchGames: async (params?: GetGamesQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getGames(params);
      set({ isLoading: false, data: response, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, data: null });
    }
  },

  loadMore: async (params: GetGamesQueryParams) => {
    set({ isLoadingMore: true, error: null });

    try {
      const response = await getGames(params);
      set(state => {
        if (!state.data) {
          return { isLoadingMore: false, data: response, error: null };
        }
        return {
          isLoadingMore: false,
          data: {
            ...state.data,
            games: [...state.data.games, ...response.games],
            providers: response.providers, // Обновляем провайдеры из последнего ответа
          },
          error: null,
        };
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoadingMore: false, error: errorMessage });
    }
  },

  reset: () => {
    set({ isLoading: false, isLoadingMore: false, error: null, data: null });
  },
}));
