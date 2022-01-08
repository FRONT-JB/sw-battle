import { valueTypes } from '~/types';

export const ROUTE_PATH = {
  ROOT: '/',
  ADMIN: 'admin',
  CREATE: 'create',
  DETAIL: 'detail',
  SIGNUP: 'signup',
  PARAMS: ':id',
} as const;

export type RoutePathTypes = valueTypes<typeof ROUTE_PATH>;
