import { create } from 'zustand';
import { createElement, type ReactNode } from 'react';
import { TelegramIcon } from '../ui/icons';

interface ErrorPageButtonConfig {
  label: ReactNode | string;
  icon?: ReactNode | (() => ReactNode);
  onClick: () => void;
}

type setErrorArg = 'geo_block' | 'invalid_data' | 'unexpected_error' | 'game_block' | 'slot_access';

interface ErrorPageState {
  title: string;
  description: string;
  button: ErrorPageButtonConfig;

  setErrorPage: (error: setErrorArg) => void;

  reset: () => void;
}

const SESSION_STORAGE_KEY = 'error_page_state';

const baseDefaultState: Pick<ErrorPageState, 'title' | 'description' | 'button'> = {
  title: 'Игра недоступна!',
  description: 'К сожалению, данный провайдер недоступен для вашего региона.',
  button: {
    label: 'Назад',
    onClick: () => {
      window.history.back();
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
    title: 'Ошибка сервера!',
    description: 'Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте позже или перезапустите мини-приложение.',
    button: {
      label: 'Назад',
      onClick: () => {
        window.history.back();
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
    title: 'Игра недоступна!',
    description: 'К сожалению, данный провайдер недоступен для вашего региона.',
    button: {
      label: 'Назад',
      onClick: () => {
        window.history.back();
      },
    },
  },
  slot_access: {
    title: 'Доступ к слотам ограничен!',
    description: 'Промокоды без депозита работают только в TG-играх. Чтобы открыть доступ к слотам — пополните баланс.',
    button: {
      label: 'Назад',
      onClick: () => {
        window.history.back();
      },
    },
  },
};

const loadStateFromSession = (): Pick<ErrorPageState, 'title' | 'description' | 'button'> | null => {
  try {
    const savedErrorType = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedErrorType && savedErrorType in errorData) {
      return errorData[savedErrorType as setErrorArg];
    }
  } catch (error) {
    console.error('Ошибка при загрузке состояния из sessionStorage:', error);
  }
  return null;
};

const saveErrorTypeToSession = (errorType: setErrorArg) => {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, errorType);
  } catch (error) {
    console.error('Ошибка при сохранении в sessionStorage:', error);
  }
};

const clearSessionStorage = () => {
  try {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (error) {
    console.error('Ошибка при очистке sessionStorage:', error);
  }
};

const defaultState = loadStateFromSession() || baseDefaultState;

export const useErrorPageStore = create<ErrorPageState>(set => ({
  ...defaultState,

  setErrorPage: (error: setErrorArg) => {
    saveErrorTypeToSession(error);

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

  reset: () => {
    clearSessionStorage();
    set({ ...baseDefaultState });
  },
}));
