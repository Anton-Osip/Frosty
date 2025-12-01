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
  getBrowser,
  getDeviceType,
} from '../utils/clientInfo';
import { verifyWebappUser, type VerifyWebappUserResponse } from '../api/auth/verifyWebappUser.ts';

interface AuthState {
  isLoading: boolean;
  error: string | null;
  data: VerifyWebappUserResponse | null;
  userId: number | null;
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

export const useAuthStore = create<AuthState>(set => ({
  isLoading: false,
  error: null,
  data: null,
  userId: null,

  verify: async () => {
    set({ isLoading: true, error: null });

    try {
      const [webAppModule, clientIp] = await Promise.all([
        import('@twa-dev/sdk'),
        getIpWithTimeout(600),
        Promise.resolve(getClientFingerprint()),
      ]);
      const WebApp = webAppModule.default;
      const initData = WebApp.initData || '';
      const userId = extractUserIdFromInitData(initData);
      // const requestData= {'init_data': 'query_id=AAEVTZd2AwAAABVNl3YV9ubM&user=%7B%22id%22%3A8432078101%2C%22first_name%22%3A%22Valera%22%2C%22last_name%22%3A%22%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FOX4wRp1XApMo4ZP_tmIiv3FPIeXfpqac0NcNMcp0tk9WYjyMsAOrAG8iUfUkbDZd.svg%22%7D&auth_date=1764491797&signature=MmOLLzgTC_4Yg0aqdqTIpLSIvWLgsIO7CvB0s9wJH9BqUd7ZrI_K2wnQBooVRbzBJXs6Kmfdx_5mfP12Y9qPAw&hash=ce21a8f51f33347685fb64ebf14807a21f0bed0716d1dfd320c9d22ae2dbf7d7', 'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'language': 'ru', 'platform': 'Win32', 'screenRes': '1536x864', 'timezone': 'Europe/Moscow', 'os': 'Windows', 'browser': 'Chrome', 'deviceType': 'desktop', 'client_ip': '169.197.85.170'}
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

      set({ isLoading: false, data: response, error: null, userId });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ isLoading: false, error: errorMessage, data: null, userId: null });
    }
  },

  reset: () => {
    set({ isLoading: false, error: null, data: null, userId: null });
  },
}));
