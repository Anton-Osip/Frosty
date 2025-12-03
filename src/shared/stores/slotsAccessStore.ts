import { create } from 'zustand';
import { getSlotsAccess, type SlotsAccessResponse, type GetSlotsAccessQueryParams } from '../api/promos/slotsAccess';
import { ROUTES } from '../config/routes';
import { useErrorPageStore } from './errorPageStore';

interface SlotsAccessState {
  isLoading: boolean;
  error: string | null;
  data: SlotsAccessResponse | null;
  fetchSlotsAccess: (params: GetSlotsAccessQueryParams) => Promise<void>;
  reset: () => void;
}

export const useSlotsAccessStore = create<SlotsAccessState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchSlotsAccess: async (params: GetSlotsAccessQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getSlotsAccess(params);
      set({ isLoading: false, data: response, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, data: null });

      useErrorPageStore.getState().setErrorPage('unexpected_error');
      window.location.replace(ROUTES.ERROR);
    }
  },

  reset: () => {
    set({ isLoading: false, error: null, data: null });
  },
}));
