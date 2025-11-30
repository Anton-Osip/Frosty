export const getIpWithTimeout = async (timeoutMs: number): Promise<string | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.ip || null;
  } catch {
    return null;
  }
};

export const getClientFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px "Arial"';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText('Fingerprint', 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText('Fingerprint', 4, 17);
  }

  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join('|');

  return btoa(fingerprint).substring(0, 32);
};

export const getUserAgent = (): string => {
  return navigator.userAgent;
};

export const getLanguage = (): string => {
  return navigator.language || navigator.languages?.[0] || 'en';
};

export const getPlatform = (): string => {
  return navigator.platform || 'Unknown';
};

export const getScreenRes = (): string => {
  return `${screen.width}x${screen.height}`;
};

export const getTimezone = (): string => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
};

export const getOS = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
};

export const getBrowser = (): string => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edg')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  return 'Unknown';
};

export const getDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  const width = screen.width;
  const height = screen.height;

  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
    return 'mobile';
  }

  if (width <= 768 || height <= 768) {
    return 'tablet';
  }

  return 'desktop';
};
