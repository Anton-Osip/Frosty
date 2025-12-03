import { create } from 'zustand';
import type { ReactNode } from 'react';

interface ErrorPageButtonConfig {
  label: ReactNode | string;
  /**
   * Опциональная иконка слева от текста.
   */
  icon?: ReactNode;
  /**
   * Обработчик клика по кнопке.
   */
  onClick: () => void;
}

interface ErrorPageState {
  title: string;
  description: string;
  button: ErrorPageButtonConfig;

  setErrorPage: (payload: { title?: string; description?: string; button?: Partial<ErrorPageButtonConfig> }) => void;

  reset: () => void;
}

const defaultState: Pick<ErrorPageState, 'title' | 'description' | 'button'> = {
  title: 'Ошибка доступа!',
  description: 'Перезапустите мини-приложение',
  button: {
    label: 'Frosty Casino',
    onClick: () => {
      window.open('https://t.me/frosted', '_blank');
    },
  },
};

export const useErrorPageStore = create<ErrorPageState>(set => ({
  ...defaultState,

  setErrorPage: ({ title, description, button }) =>
    set(state => ({
      title: title ?? state.title,
      description: description ?? state.description,
      button: {
        ...state.button,
        ...(button ?? {}),
      },
    })),

  reset: () => set({ ...defaultState }),
}));
