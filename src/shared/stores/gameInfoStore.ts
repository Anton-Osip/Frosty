import { create } from 'zustand';
import {
  getGameInfo,
  addToFavorites,
  removeFromFavorites,
  type GameInfoResponse,
  type GetGameInfoQueryParams,
} from '../api/slotegrator/gameInfo';

interface GameInfoState {
  isLoading: boolean;
  isTogglingFavorite: boolean;
  error: string | null;
  data: GameInfoResponse | null;
  fetchGameInfo: (uuid: string, params?: GetGameInfoQueryParams) => Promise<void>;
  toggleFavorite: (uuid: string, userId: number) => Promise<void>;
  reset: () => void;
}

export const useGameInfoStore = create<GameInfoState>(set => ({
  isLoading: false,
  isTogglingFavorite: false,
  error: null,
  data: null,

  fetchGameInfo: async (uuid: string, params?: GetGameInfoQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getGameInfo(uuid, params);
      set({ isLoading: false, data: response, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, data: null });
    }
  },

  toggleFavorite: async (uuid: string, userId: number) => {
    set(state => {
      const currentData = state.data;
      const isFavorite = currentData?.is_favorite || false;

      // Оптимистично меняем флаг избранного сразу
      return {
        isTogglingFavorite: true,
        error: null,
        data: currentData
          ? {
              ...currentData,
              is_favorite: !isFavorite,
            }
          : null,
      };
    });

    try {
      const currentData = useGameInfoStore.getState().data;
      const isFavorite = currentData?.is_favorite || false;

      if (isFavorite) {
        await addToFavorites(uuid, userId);
      } else {
        await removeFromFavorites(uuid, userId);
      }

      const refreshed = await getGameInfo(uuid, { user_id: userId, region: null });

      set({
        isTogglingFavorite: false,
        data: refreshed,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      try {
        const fallback = await getGameInfo(uuid, { user_id: userId, region: null });
        set({
          isTogglingFavorite: false,
          data: fallback,
          error: errorMessage,
        });
      } catch {
        set({ isTogglingFavorite: false, error: errorMessage });
      }
    }
  },

  reset: () => {
    set({ isLoading: false, isTogglingFavorite: false, error: null, data: null });
  },
}));
