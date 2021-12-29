import { valueTypes } from '~/types';

export const ROUTE_PATH = {
  ROOT: '/',
  ADMIN: 'admin',
  DEFENSE: 'defense',
  DETAIL: 'detail',
} as const;

export type RoutePathTypes = valueTypes<typeof ROUTE_PATH>;
