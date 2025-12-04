import { create } from 'zustand';
import {
  initGame,
  initDemoGame,
  type InitGameRequest,
  type InitDemoGameRequest,
  type InitGameDeniedDetail,
  type GameInitError,
} from '../api/slotegrator/gameInit';

interface GameInitState {
  isLoading: boolean;
  isDemoLoading: boolean;
  error: string | null;
  errorStatusCode: number | null;
  deniedDetail: InitGameDeniedDetail | null;
  gameUrl: string | null;
  demoUrl: string | null;
  initGame: (request: InitGameRequest) => Promise<void>;
  initDemoGame: (request: InitDemoGameRequest) => Promise<void>;
  reset: () => void;
}

export const useGameInitStore = create<GameInitState>(set => ({
  isLoading: false,
  isDemoLoading: false,
  error: null,
  errorStatusCode: null,
  deniedDetail: null,
  gameUrl: null,
  demoUrl: null,

  initGame: async (request: InitGameRequest) => {
    set({ isLoading: true, error: null, errorStatusCode: null, deniedDetail: null, gameUrl: null });

    try {
      const response = await initGame(request);
      set({
        isLoading: false,
        gameUrl: response.url,
        error: null,
        errorStatusCode: null,
        deniedDetail: null,
      });
    } catch (error) {
      const gameInitError = error as GameInitError;
      if (gameInitError.deniedDetail) {
        set({
          isLoading: false,
          error: gameInitError.message,
          errorStatusCode: gameInitError.statusCode || null,
          deniedDetail: gameInitError.deniedDetail,
          gameUrl: null,
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        set({
          isLoading: false,
          error: errorMessage,
          errorStatusCode: gameInitError.statusCode || null,
          deniedDetail: null,
          gameUrl: null,
        });
      }
    }
  },

  initDemoGame: async (request: InitDemoGameRequest) => {
    set({ isDemoLoading: true, error: null, errorStatusCode: null, demoUrl: null });

    try {
      const response = await initDemoGame(request);
      set({
        isDemoLoading: false,
        demoUrl: response.url,
        error: null,
        errorStatusCode: null,
      });
    } catch (error) {
      const gameInitError = error as GameInitError;
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({
        isDemoLoading: false,
        error: errorMessage,
        errorStatusCode: gameInitError.statusCode || null,
        demoUrl: null,
      });
    }
  },

  reset: () => {
    set({
      isLoading: false,
      isDemoLoading: false,
      error: null,
      errorStatusCode: null,
      deniedDetail: null,
      gameUrl: null,
      demoUrl: null,
    });
  },
}));
