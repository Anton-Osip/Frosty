export const ROUTES = {
  ROOT: '/',
  SLOTS: '/slots',
  SLOT: '/slot/:id',
  SLOT_PLAY: '/slot/:id/play',
  SLOT_DEMO: '/slot/:id/demo',
  ERROR: '/error',
} as const;

export const getSlotRoute = (id: string | number) => `/slot/${id}`;
export const getSlotPlayRoute = (id: string | number) => `/slot/${id}/play`;
export const getSlotDemoRoute = (id: string | number) => `/slot/${id}/demo`;
