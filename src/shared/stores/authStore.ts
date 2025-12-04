import { create } from 'zustand';
import {
  getIpWithTimeout,
  getClientFingerprint,
  getUserAgent,
  getLanguage,
  getPlatform,
  getScreenRes,
  getTimezone,
  getOS,
  getDeviceType,
  getBrowser,
} from '../utils/clientInfo';
import { verifyWebappUser, type VerifyWebappUserResponse } from '../api/auth/verifyWebappUser.ts';

const SESSION_STORAGE_KEY = 'telegram_init_data';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  data: VerifyWebappUserResponse | null;
  userId: number | null;
  userPhoto: string | null;
  verify: () => Promise<void>;
  reset: () => void;
}

const extractUserIdFromInitData = (initData: string): number | null => {
  try {
    const params = new URLSearchParams(initData);
    const userParam = params.get('user');
    if (!userParam) return null;

    const decodedUser = decodeURIComponent(userParam);
    const userData = JSON.parse(decodedUser);
    return userData.id || null;
  } catch (error) {
    console.error('Failed to extract userId from initData:', error);
    return null;
  }
};

const extractUserPhotoFromInitData = (initData: string): string | null => {
  try {
    const params = new URLSearchParams(initData);
    const userParam = params.get('user');
    if (!userParam) return null;

    const decodedUser = decodeURIComponent(userParam);
    const userData = JSON.parse(decodedUser);
    return userData.photo_url || null;
  } catch (error) {
    console.error('Failed to extract user photo from initData:', error);
    return null;
  }
};

const restoreFromSessionStorage = (): { userId: number | null; userPhoto: string | null } => {
  try {
    const savedInitData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!savedInitData) {
      return { userId: null, userPhoto: null };
    }

    const userId = extractUserIdFromInitData(savedInitData);
    const userPhoto = extractUserPhotoFromInitData(savedInitData);
    return { userId, userPhoto };
  } catch (error) {
    console.error('Failed to restore from sessionStorage:', error);
    return { userId: null, userPhoto: null };
  }
};

const restoredData = restoreFromSessionStorage();

export const useAuthStore = create<AuthState>(set => ({
  isLoading: false,
  error: null,
  data: null,
  userId: restoredData.userId,
  userPhoto: restoredData.userPhoto,

  verify: async () => {
        set({ isLoading: true, error: null });

        try {
          const [webAppModule , clientIp] = await Promise.all([
            import('@twa-dev/sdk'),
            getIpWithTimeout(600),
            Promise.resolve(getClientFingerprint()),
          ]);
          const WebApp = webAppModule.default;
          let initData = WebApp.initData || '';
          
          // Если initData пустой, пробуем восстановить из sessionStorage
          if (!initData) {
            const savedInitData = sessionStorage.getItem(SESSION_STORAGE_KEY);
            if (savedInitData) {
              initData = savedInitData;
            }
          } else {
            sessionStorage.setItem(SESSION_STORAGE_KEY, initData);
          }
          
          const userId = extractUserIdFromInitData(initData);
          const userPhoto = extractUserPhotoFromInitData(initData);

          const requestData = {
            init_data: initData,
            client_ip: clientIp,
            userAgent: getUserAgent(),
            language: getLanguage(),
            platform: getPlatform(),
            screenRes: getScreenRes(),
            timezone: getTimezone(),
            os: getOS(),
            browser: getBrowser(),
            deviceType: getDeviceType(),
          };

          const response = await verifyWebappUser(requestData);

          set({ isLoading: false, data: response, error: null, userId, userPhoto });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          set({ isLoading: false, error: errorMessage, data: null, userId: null, userPhoto: null });
        }
      },

  reset: () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    set({ isLoading: false, error: null, data: null, userId: null, userPhoto: null });
  },
}));
