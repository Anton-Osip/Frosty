export const ROUTES = {
  ROOT: '/',
  SLOTS: '/slots',
  SLOT: '/slot/:id',
  ERROR: '/error',
} as const;

export const getSlotRoute = (id: string | number) => `/slot/${id}`;
