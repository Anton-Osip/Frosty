import { create } from 'zustand';
import { verifyWebappUser, type VerifyWebappUserResponse } from '../api/auth';
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

interface AuthState {
  isLoading: boolean;
  error: string | null;
  data: VerifyWebappUserResponse | null;
  verify: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isLoading: false,
  error: null,
  data: null,

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
