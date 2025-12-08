export const ROUTES = {
  ROOT: '/',
  SLOTS: '/games',
  SLOT: '/game/:id',
  SLOT_PLAY: '/game/:id/play',
  SLOT_DEMO: '/game/:id/demo',
  ERROR: '/error',
} as const;

export const getSlotRoute = (id: string | number) => `/game/${id}`;
export const getSlotPlayRoute = (id: string | number) => `/game/${id}/play`;
export const getSlotDemoRoute = (id: string | number) => `/game/${id}/demo`;
