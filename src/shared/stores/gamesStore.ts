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
      const uniqueGames = response.games.filter(
        (game, index, self) => index === self.findIndex(g => g.uuid === game.uuid)
      );
      set({ 
        isLoading: false, 
        data: { ...response, games: uniqueGames }, 
        error: null 
      });
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
          const uniqueGames = response.games.filter(
            (game, index, self) => index === self.findIndex(g => g.uuid === game.uuid)
          );
          return { 
            isLoadingMore: false, 
            data: { ...response, games: uniqueGames }, 
            error: null 
          };
        }
        
        const existingUuids = new Set(state.data.games.map(game => game.uuid));
        
        const newGames = response.games.filter(game => !existingUuids.has(game.uuid));
        
        return {
          isLoadingMore: false,
          data: {
            ...state.data,
            games: [...state.data.games, ...newGames],
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
