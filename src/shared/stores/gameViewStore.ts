import { create } from 'zustand';

interface GameViewState {
  isFullscreen: boolean;
  setFullscreen: (value: boolean) => void;
}

export const useGameViewStore = create<GameViewState>(set => ({
  isFullscreen: false,
  setFullscreen: (value: boolean) => set({ isFullscreen: value }),
}));
