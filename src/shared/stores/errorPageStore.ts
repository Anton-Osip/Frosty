import { create } from 'zustand';
import { createElement, type ReactNode } from 'react';
import { TelegramIcon } from '../ui/icons';

interface ErrorPageButtonConfig {
  label: ReactNode | string;
  icon?: ReactNode | (() => ReactNode);
  onClick: () => void;
}

type setErrorArg = 'geo_block' | 'invalid_data' | 'unexpected_error' | 'game_block';

interface ErrorPageState {
  title: string;
  description: string;
  button: ErrorPageButtonConfig;

  setErrorPage: (error: setErrorArg) => void;

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

const errorData: Record<setErrorArg, Pick<ErrorPageState, 'title' | 'description' | 'button'>> = {
  geo_block: {
    title: 'Ошибка доступа!',
    description: 'Доступ к приложению ограничен для вашего региона.',
    button: {
      label: 'Frosty Casino',
      icon: (): ReactNode => createElement(TelegramIcon, { size: 20 }),
      onClick: () => {
        window.open('https://t.me/frosted', '_blank');
      },
    },
  },
  unexpected_error: {
    title: 'Ошибка доступа!',
    description: 'Перезапустите мини-приложение',
    button: {
      label: 'Frosty Casino',
      icon: (): ReactNode => createElement(TelegramIcon, { size: 20 }),
      onClick: () => {
        window.open('https://t.me/frosted', '_blank');
      },
    },
  },
  invalid_data: {
    title: 'Ошибка доступа!',
    description: 'Перезапустите мини-приложение',
    button: {
      label: 'Frosty Casino',
      icon: (): ReactNode => createElement(TelegramIcon, { size: 20 }),
      onClick: () => {
        window.open('https://t.me/frosted', '_blank');
      },
    },
  },
  game_block: {
    title: 'Игра не доступна!',
    description: 'К сожалению, данный провайдер не доступен для вашего региона.',
    button: {
      label: 'назад',
      onClick: () => {
        window.history.back();
      },
    },
  },
};

export const useErrorPageStore = create<ErrorPageState>(set => ({
  ...defaultState,

  setErrorPage: (error: setErrorArg) => {
    set({
      title: errorData[error].title,
      description: errorData[error].description,
      button: {
        label: errorData[error].button.label,
        icon: errorData[error].button.icon ?? null,
        onClick: errorData[error].button.onClick,
      },
    });
  },

  reset: () => set({ ...defaultState }),
}));
