import { create } from 'zustand';
import WebApp from '@twa-dev/sdk';
import {
  getIpWithTimeout,
  getClientFingerprint,
  getUserAgent,
  getLanguage,
  getPlatform,
  getScreenRes,
  getTimezone,
  getOS,
  getBrowser,
  getDeviceType,
} from '../utils/clientInfo';
import { verifyWebappUser, type VerifyWebappUserResponse } from '../api/auth/verifyWebappUser.ts';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  data: VerifyWebappUserResponse | null;
  userId: number | null;
  userPhoto: string | null;
  verify: () => Promise<void>;
  reset: () => void;
  isVerify: boolean;
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

export const useAuthStore = create<AuthState>(set => ({
  isLoading: false,
  error: null,
  data: null,
  userId: null,
  userPhoto: null,
  isVerify: false,


  verify: async () => {
    set({ isLoading: true, error: null, isVerify: true });

    try {
      const [clientIp] = await Promise.all([
        getIpWithTimeout(600),
        Promise.resolve(getClientFingerprint()),
      ]);
      const initData = WebApp.initData || '';
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
    set({ isLoading: false, error: null, data: null, userId: null, userPhoto: null });
  },
}));
