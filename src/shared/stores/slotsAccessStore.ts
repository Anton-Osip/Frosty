import { create } from 'zustand';
import {
  getSlotsAccess,
  type SlotsAccessResponse,
  type GetSlotsAccessQueryParams,
  type SlotsAccessError,
} from '../api/promos/slotsAccess';

interface SlotsAccessState {
  isLoading: boolean;
  error: string | null;
  errorStatusCode: number | null;
  data: SlotsAccessResponse | null;
  fetchSlotsAccess: (params: GetSlotsAccessQueryParams) => Promise<void>;
  reset: () => void;
}

export const useSlotsAccessStore = create<SlotsAccessState>(set => ({
  isLoading: false,
  error: null,
  errorStatusCode: null,
  data: null,

  fetchSlotsAccess: async (params: GetSlotsAccessQueryParams) => {
    set({ isLoading: true, error: null, errorStatusCode: null });

    try {
      const response = await getSlotsAccess(params);
      set({ isLoading: false, data: response, error: null, errorStatusCode: null });
    } catch (error) {
      const slotsAccessError = error as SlotsAccessError;
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, errorStatusCode: slotsAccessError.statusCode || null, data: null });
    }
  },

  reset: () => {
    set({ isLoading: false, error: null, errorStatusCode: null, data: null });
  },
}));
