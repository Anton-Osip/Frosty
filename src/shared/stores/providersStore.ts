import { create } from 'zustand';
import { getProviders, type Provider, type GetProvidersQueryParams } from '../api/slotegrator/providers';

interface ProvidersState {
  isLoading: boolean;
  error: string | null;
  data: Provider[] | null;
  fetchProviders: (params?: GetProvidersQueryParams) => Promise<void>;
  reset: () => void;
}

export const useProvidersStore = create<ProvidersState>(set => ({
  isLoading: false,
  error: null,
  data: null,

  fetchProviders: async (params?: GetProvidersQueryParams) => {
    set({ isLoading: true, error: null });

    try {
      const response = await getProviders(params);
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
